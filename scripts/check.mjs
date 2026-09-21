#!/usr/bin/env node
/**
 * 저장소 규칙 검사 — `npm run lint`
 *
 * 이 파일이 있는 이유: README 0.10 은 `grep -rn "lib/supabase" src/components/ → 0건`
 * 같은 근거를 여러 개 적어 두었지만, 그 grep 을 실제로 돌리는 것은 아무것도 없었다.
 * 문서에만 적힌 규칙은 규칙이 아니라 희망이다. 아래 검사들은 전부 실행되고, 깨지면
 * 종료 코드 1 로 말한다.
 *
 * 의존성 0 — Node 내장 모듈만 쓴다. `npm install` 없이도 돌아간다.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')

const failures = []
const fail = (rule, detail) => failures.push({ rule, detail })

/** src/ 아래 모든 .js/.jsx 를 순회한다. 손으로 적은 목록이 아니라 파일시스템이 기준이다 — 새 파일은 저절로 검사에 붙는다. */
function sourceFiles(dir = SRC) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full))
    else if (['.js', '.jsx'].includes(extname(name))) out.push(full)
  }
  return out.sort()
}

/** README 근거가 가리킬 수 있는 스타일 파일도 이름으로 찾을 수 있어야 한다. */
function cssFiles(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...cssFiles(full))
    else if (extname(name) === '.css') out.push(full)
  }
  return out
}

const FILES = sourceFiles()
const rel = (p) => relative(ROOT, p).split('\\').join('/')
const read = (p) => readFileSync(p, 'utf8')

/**
 * 주석을 지운 소스를 돌려준다. 문자열·템플릿 리터럴 안의 `/` 는 건드리지 않는다.
 * (주석에 적힌 `path/like/this` 가 검사에 걸리는 오탐을 막는다.)
 */
function stripComments(text) {
  let out = ''
  let i = 0
  let quote = null
  while (i < text.length) {
    const c = text[i]
    const next = text[i + 1]
    if (quote) {
      if (c === '\\') { out += c + (next ?? ''); i += 2; continue }
      if (c === quote) quote = null
      out += c; i += 1; continue
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; out += c; i += 1; continue }
    if (c === '/' && next === '/') { while (i < text.length && text[i] !== '\n') i += 1; continue }
    if (c === '/' && next === '*') {
      i += 2
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i += 1
      i += 2; continue
    }
    out += c; i += 1
  }
  return out
}

const code = (p) => stripComments(read(p))

/** `import … from '…'` 의 지정자를 뽑아 실제 파일 경로로 푼다. */
function importsOf(file) {
  const text = code(file)
  const specs = [...text.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
  return specs
    .filter((s) => s.startsWith('.'))
    .map((s) => ({ spec: s, target: rel(resolve(dirname(file), s)) }))
}

// ── 검사 1. Supabase 는 src/lib/ 밖으로 새지 않는다 (README 0.10 R3-3 / R5-1 의 근거) ──
for (const file of FILES) {
  if (rel(file).startsWith('src/lib/')) continue
  for (const { spec, target } of importsOf(file)) {
    if (target === 'src/lib/supabase.js') {
      fail('layer/supabase', `${rel(file)} 가 ${spec} 를 직접 import 한다. 데이터 접근은 src/lib/books.js 를 거쳐야 한다.`)
    }
  }
}

// ── 검사 2. 의존 방향 (lib ← hooks ← pages, components 는 데이터 계층을 모른다) ──
const LAYER_OF = (p) =>
  p.startsWith('src/lib/') ? 'lib'
    : p.startsWith('src/hooks/') ? 'hooks'
      : p.startsWith('src/components/') ? 'components'
        : p.startsWith('src/pages/') ? 'pages' : 'app'
const FORBIDDEN = {
  lib: ['hooks', 'components', 'pages'],
  hooks: ['components', 'pages'],
  components: ['pages'],
  pages: [],
  app: [],
}
for (const file of FILES) {
  const from = LAYER_OF(rel(file))
  for (const { spec, target } of importsOf(file)) {
    const to = LAYER_OF(target)
    if (FORBIDDEN[from].includes(to)) {
      fail('layer/direction', `${rel(file)} (${from}) 가 ${spec} (${to}) 를 import 한다. 의존 방향이 뒤집혔다.`)
    }
  }
}

// ── 검사 3. 라우트 경로 리터럴은 src/routes.js 에만 있다 (축 5: 같은 사실을 두 곳에 두지 마라) ──
const ROUTE_LITERAL = /(['"`])(\/(?:[A-Za-z0-9:_$*{}.\-]*)(?:\/[^'"`\n]*)?)\1/g
for (const file of FILES) {
  if (rel(file) === 'src/routes.js') continue
  for (const [, , literal] of code(file).matchAll(ROUTE_LITERAL)) {
    fail('routes/literal', `${rel(file)} 에 라우트 리터럴 "${literal}" 이 있다. src/routes.js 의 ROUTES / bookPath() 를 써라.`)
  }
}

// ── 검사 4. ROUTES 표와 App.jsx 의 <Route> 등록이 정확히 일치한다 ──
const { ROUTES } = await import(pathToFileURL(join(SRC, 'routes.js')).href)
const declared = Object.keys(ROUTES).sort()
const mounted = [...new Set([...code(join(SRC, 'App.jsx')).matchAll(/path=\{ROUTES\.(\w+)\}/g)].map((m) => m[1]))].sort()
for (const key of declared) {
  if (!mounted.includes(key)) fail('routes/unmounted', `ROUTES.${key} (${ROUTES[key]}) 가 App.jsx 에 등록돼 있지 않다.`)
}
for (const key of mounted) {
  if (!declared.includes(key)) fail('routes/undeclared', `App.jsx 가 ROUTES.${key} 를 쓰는데 src/routes.js 에 그런 키가 없다.`)
}

// ── 검사 5. 과제 제약 (README 0.6): 로컬 저장소로 CRUD 대체 금지 / 백엔드는 Supabase 단독 ──
for (const file of FILES) {
  const text = code(file)
  for (const banned of ['localStorage', 'sessionStorage']) {
    if (text.includes(banned)) {
      fail('spec/remote-crud', `${rel(file)} 가 ${banned} 를 쓴다. 명세는 원격 데이터 기준 CRUD 를 요구한다.`)
    }
  }
  if (/firebase/i.test(text)) {
    fail('spec/single-backend', `${rel(file)} 에 firebase 언급이 있다. 백엔드는 하나만 골라야 한다.`)
  }
}
// 두 번째 백엔드는 import 보다 의존성으로 먼저 들어온다. package.json 도 같이 본다.
// (README 0.10 의 근거가 `src/ package.json` 두 곳을 말하므로, 검사도 두 곳을 봐야 한다.)
const pkg = JSON.parse(read(join(ROOT, 'package.json')))
for (const field of ['dependencies', 'devDependencies']) {
  for (const name of Object.keys(pkg[field] ?? {})) {
    if (/firebase/i.test(name)) {
      fail('spec/single-backend', `package.json ${field} 에 "${name}" 이 있다. 백엔드는 하나만 골라야 한다.`)
    }
  }
}

// ── 검사 6. 비밀값 (README 0.6): .env 는 무시되어야 하고, 키는 소스에 없어야 한다 ──
const gitignore = existsSync(join(ROOT, '.gitignore')) ? read(join(ROOT, '.gitignore')) : ''
if (!gitignore.split('\n').map((l) => l.trim()).includes('.env')) {
  fail('spec/env-ignored', '.gitignore 에 `.env` 항목이 없다.')
}
for (const file of [...FILES, join(ROOT, '.env.example'), join(ROOT, 'vercel.json')]) {
  if (!existsSync(file)) continue
  if (/eyJ[A-Za-z0-9_-]{10,}/.test(read(file))) {
    fail('spec/no-secret', `${rel(file)} 에 JWT 모양의 문자열이 있다. anon key 가 커밋되려는 중일 수 있다.`)
  }
}

// ── 검사 7. README 0.10 의 판정 근거가 여전히 코드를 가리키는가 ──
// 이 절은 한때 `파일:줄번호` 로 근거를 적었고, README 맨 앞에 블록이 하나 삽입되자
// 전부 거짓이 됐다. 지금은 `파일 › 식별자` 로 적고, 그 이름이 실제로 있는지 여기서 확인한다.
// 문서가 코드를 가리킨다면, 그 화살표가 아직 유효한지도 검사가 말해야 한다.
const readme = read(join(ROOT, 'README.md'))
const section = readme.slice(readme.indexOf('### 0.10 '), readme.indexOf('## ✨ 기능 요약'))
const basenames = new Map()
const EXTRA = ['package.json', 'vite.config.js', 'vercel.json', 'index.html', '.env.example', 'scripts/check.mjs'].map((f) => join(ROOT, f))
for (const f of [...FILES, ...cssFiles(SRC), ...EXTRA]) {
  if (existsSync(f)) basenames.set(f.split('/').pop(), f)
}
for (const m of section.matchAll(/`([\w./-]+\.(?:jsx|js|json|css|mjs|example))\s*›\s*([^`]+)`/g)) {
  const [, path, ident] = m

  // 디렉터리까지 적은 참조는 그 경로 그대로 있어야 한다. 파일명만 적은 참조(`Button.jsx` 등)
  // 에만 basename 으로 찾아준다. 둘을 섞으면, 파일이 `hooks/` 에서 `lib/` 로 옮겨가도
  // README 의 옛 경로가 basename 덕에 조용히 통과한다 — 이 저장소가 실제로 겪은 그 이동이다.
  const exact = [join(ROOT, path), join(SRC, path)].find((f) => existsSync(f))
  const file = exact ?? (path.includes('/') ? undefined : basenames.get(path))
  if (!file) {
    fail('docs/refs', `README 0.10 이 없는 파일 "${path}" 를 근거로 든다.`)
    continue
  }

  // 첫 토큰만 보면 `<Button … disabled={submitting}>` 같은 근거에서 뒤쪽 이름이 바뀌어도 통과한다.
  // 근거에 등장하는 이름은 전부 그 파일 안에 있어야 한다.
  const text = read(file)
  const missing = [...new Set(ident.match(/[A-Za-z_$][\w$]*/g) ?? [])].filter((t) => !text.includes(t))
  if (missing.length > 0) {
    fail('docs/refs', `README 0.10 의 근거 "${path} › ${ident}" — ${rel(file)} 안에 ${missing.map((t) => `"${t}"`).join(', ')} 이(가) 없다. 이름이 바뀌었거나 사라졌다.`)
  }
}

// ── 결과 ──
const RULES = ['layer/supabase', 'layer/direction', 'routes/literal', 'routes/unmounted', 'routes/undeclared', 'spec/remote-crud', 'spec/single-backend', 'spec/env-ignored', 'spec/no-secret', 'docs/refs']
if (failures.length === 0) {
  console.log(`✅ 검사 ${RULES.length}종 통과 — 소스 ${FILES.length}개`)
  process.exit(0)
}
console.error(`❌ ${failures.length}건 위반\n`)
for (const { rule, detail } of failures) console.error(`  [${rule}] ${detail}`)
console.error('')
process.exit(1)
