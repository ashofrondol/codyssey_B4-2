# 📚 Reading Log — React SPA 독서 기록 서비스

Codyssey B4-2 미션 결과물입니다. React 18 + Vite + React Router + Supabase 로 구성된 SPA 로,
내가 읽은 책의 제목 · 저자 · 별점 · 메모를 등록 / 조회 / 수정 / 삭제할 수 있습니다.

## 0. 과제 명세 (원본 미션 요구사항)

> 출처: `codyssey_assignments/B4-2.pdf` — 원문 요구사항을 그대로 옮기고, 해설은 💡 로 구분했다.

### 0.1 미션 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 분야 | AI/SW 기초 |
| 구분 | 웹 기초와 프론트엔드 |
| 학습시간 | 80시간 |
| 미션 제목 | 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기 |
| 문서 구분 | 문제기술 / 기술적 설명 |

#### 미션 소개 (원문)

어떤 상태가 어디에 있어야 하는지, 언제 리렌더링이 일어나는지 이론만으로는 감이 잘 안 잡힙니다. 상태 관리가 왜 어려운지는 SPA를 직접 만들어봐야 알 수 있습니다. 컴포넌트 구조와 데이터 흐름을 결과물로 확인하는 것, 그게 이번 미션의 목표입니다.

React는 전 세계에서 가장 널리 사용되는 프론트엔드 UI 라이브러리입니다. 컴포넌트 기반으로 화면을 구성하고, 상태(state)와 이벤트를 중심으로 UI를 선언적으로 업데이트하는 방식이 핵심입니다.

이 미션에서는 React로 하나의 SPA 서비스를 직접 구현하며, 컴포넌트 설계, 라우팅, 상태 관리, 비동기 데이터 처리의 흐름을 체계적으로 경험합니다. 단순히 화면을 그리는 것이 아니라, "사용자 이벤트 → 상태 변화 → 렌더링 변화"가 연결되는 React의 동작 원리를 결과물로 확인합니다.

또한 Supabase 또는 Firebase를 최소 범위로 연동하여, 실제 서비스에서 자주 등장하는 로딩/에러/빈 상태를 일관된 UI 패턴으로 처리하는 경험을 쌓습니다. 이 미션의 평가는 백엔드 구현이 아니라 React 관점의 구조와 데이터 흐름 완성도를 중심으로 진행됩니다.

> 💡 **(해설) 이 과제가 진짜로 묻는 것**
>
> 1. 이 과제는 "화면을 예쁘게 만들 수 있는가"를 묻지 않는다. 원문이 명시적으로 **"UI 고퀄리티보다 'React 구조와 데이터 흐름'이 우선이다"** 라고 못 박았다. 평가 축은 *구조*다.
> 2. 핵심 질문은 **"상태가 어디에 있어야 하는가"** 다. 폼 상태는 폼 컴포넌트에, 서버 데이터는 커스텀 훅에, 페이지 간 공유가 필요한 것은 상위로 — 이 배치를 스스로 설명할 수 있어야 한다.
> 3. 백엔드(Supabase/Firebase)는 **비동기 상태(로딩/성공/실패/빈)를 만들어내기 위한 장치**로 도입된다. RLS나 스키마 설계 역량을 보려는 것이 아니다(원문: 백엔드 고급 기능은 필수가 아니다).
> 4. "최소 5개 라우트", "최소 8개 재사용 컴포넌트", "최소 3군데 렌더링 변화", "최소 1개 커스텀 훅" 이라는 **숫자 임계값**이 곳곳에 박혀 있다. 이 숫자들은 채점 시 그대로 센다.
> 5. 배포는 부록이 아니라 요구사항이다. 원문은 **"환경변수 등 설정 누락으로 인해 배포 환경에서 기능이 일부라도 동작하지 않으면 요구사항을 충족하지 못한다"** 고 단정한다. 로컬에서만 되는 것은 0점 처리 대상이다.

---

### 0.2 최종 산출물 (제출물)

**원문 2. 최종 결과물**

다음 조건을 만족하는 React 기반 웹 서비스 1개를 완성한다. (백엔드는 Supabase 또는 Firebase 중 하나를 선택)

1. **라우팅이 있는 SPA**
   - 최소 5개 이상의 페이지 라우트가 존재한다.
     (예: `/` , `/login` , `/items` , `/items/:id` , `/items/new` , `/profile` )
2. **핵심 데이터 CRUD**
   - "서비스의 핵심 데이터(게시물/할 일/리뷰/예약 등)"를 등록/조회/수정/삭제할 수 있다.
   - 목록 페이지와 상세 페이지가 존재한다.
3. **React 폼 기반 입력 경험**
   - 등록/수정 화면에 폼이 있고, 유효성 검증 + 에러 표시 + 제출 중 상태가 UI로 드러난다.
4. **상태 관리가 설계된 UI**
   - 로딩/에러/빈 상태가 모든 핵심 화면에서 일관된 방식으로 처리된다.
   - 컴포넌트 단위로 상태가 적절히 분리되어 있다.
5. **배포**
   - 외부에서 접속 가능한 제출 URL(예: Vercel/Netlify 등)로 배포되어야 한다.
   - 소스 코드 공유 링크(GitHub 레포지토리 URL)를 함께 제출한다.
   - `README.md` 에 실행 방법(로컬 설치/실행 명령어)과 사용한 기술 스택을 명시한다.

#### 제출 증거 체크리스트

- [ ] 배포된 서비스 URL (외부에서 접속 가능해야 함)
- [ ] GitHub 레포지토리 URL (소스 코드 공유 링크)
- [ ] `README.md` — 로컬 설치/실행 명령어 기재
- [ ] `README.md` — 사용한 기술 스택 명시
- [ ] 백엔드로 Supabase 또는 Firebase 중 **하나**를 선택하여 연동

> 💡 (해설) 제출물은 "코드"가 아니라 **"동작하는 URL + 코드 + README" 3종 세트**다. 셋 중 하나라도 비면 제출이 성립하지 않는다.

---

### 0.3 과제 목표 — 수료 후 스스로 설명할 수 있어야 하는 것

**원문 3. 과제 목표**

이 과제를 마친 후, 학습자는 아래를 스스로 설명할 수 있어야 한다.

- [ ] **G1.** React에서 컴포넌트가 왜 필요한지, 그리고 본인이 어떤 기준으로 컴포넌트를 쪼갰는지 설명할 수 있다.
- [ ] **G2.** `props` 와 `state` 의 차이, 그리고 상태를 어디에 두었는지(상향/하향 흐름) 설명할 수 있다.
- [ ] **G3.** `useEffect` 가 언제 실행되고, 어떤 의존성으로 동작하며, 데이터 요청과 어떤 관계가 있는지 설명할 수 있다.
- [ ] **G4.** 비동기 흐름에서 로딩/성공/실패/빈 상태를 React UI로 어떻게 표현했는지 설명할 수 있다.
- [ ] **G5.** "하나의 기능"을 만들기 위해 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링이 어떻게 연결되는지 설명할 수 있다.

> 💡 (해설) 이 5개 항목은 그대로 **구술 평가 문항**이다. 평가 체크리스트(`react_crud_app.md`)의 "3. 핵심 개념 이해" / "4. 확장 사고 및 트러블슈팅" 절이 G1~G5와 1:1로 대응한다. 즉 코드가 돌아가는 것만으로는 부족하고, **자기 코드의 특정 줄을 짚어가며** 답할 수 있어야 한다.

---

### 0.4 기능 요구 사항 (필수)

**원문 4. 기능 요구 사항 — 다음 요구사항을 모두 만족해야 한다.**

#### R1. 프로젝트 기본 구성

- [ ] **R1** 프로젝트 기본 구성을 갖춘다.
  - [ ] **R1-1** React 프로젝트로 시작한다.
  - [ ] **R1-2** 폴더 구조가 최소한 다음 역할을 분리한다.
    - `pages` (라우트 단위 화면)
    - `components` (재사용 컴포넌트)
    - `hooks` 또는 `lib` (커스텀 훅/유틸)
  - [ ] **R1-3** 공통 레이아웃(헤더/네비게이션)이 주요 페이지에 적용되어야 한다.
  - [ ] **R1-4** "서비스 주제(데이터 종류)"는 학습자가 직접 정하되, 단일 핵심 데이터 CRUD가 가능한 수준으로 제한한다.

#### R2. 라우팅(React Router 등)

- [ ] **R2** 라우팅을 구성한다.
  - [ ] **R2-1** 최소 5개 라우트가 동작해야 한다.
  - [ ] **R2-2** 목록/상세 라우트가 포함되어야 한다. (예: `/items` , `/items/:id` )
  - [ ] **R2-3** 잘못된 주소 접근 시 Not Found 페이지가 있어야 한다.
  - [ ] **R2-4** 네비게이션을 통해 주요 라우트로 이동 가능한 링크가 제공되어야 한다.

#### R3. 컴포넌트 설계

- [ ] **R3** 컴포넌트를 설계한다.
  - [ ] **R3-1** 최소 8개 이상의 "재사용 컴포넌트"가 존재해야 한다.
    - 예: `Button` , `Input` , `Card` , `EmptyState` , `ErrorState` , `Loading` , `ItemList` , `ItemForm` 등
  - [ ] **R3-2** 재사용 컴포넌트는 최소 1개 이상의 prop을 받아 동작이나 표시가 달라지는 컴포넌트를 의미한다.
  - [ ] **R3-3** "페이지 컴포넌트"와 "UI 컴포넌트"가 섞이지 않도록 분리되어야 한다.
  - [ ] **R3-4** 동일한 UI 패턴(로딩/에러/빈 상태)은 페이지마다 따로 만들지 않고 재사용 가능한 컴포넌트로 통일되어야 한다.

> 💡 (해설) R3-2 는 **"8개 세는 규칙"** 이다. prop을 하나도 받지 않아 항상 똑같이 그려지는 컴포넌트는 "재사용 컴포넌트" 8개 카운트에 들어가지 않는다고 읽는 것이 안전하다.

#### R4. 상태 관리(React 중심)

- [ ] **R4** 아래 상태를 React 방식으로 관리해야 한다.
  - [ ] **R4-1** 폼 입력 상태 (controlled input)
  - [ ] **R4-2** 목록/상세 데이터 상태
  - [ ] **R4-3** 로딩/에러 상태
  - [ ] **R4-4** 데이터 조회/갱신 흐름 중 최소 1개 이상은 커스텀 훅으로 분리되어야 한다.
    - 예: `useItems()` , `useItemDetail(id)` 등

#### R5. CRUD

- [ ] **R5** CRUD를 구현한다.
  - [ ] **R5-1** CRUD는 반드시 Supabase 또는 Firebase의 원격 데이터 기준으로 동작해야 한다.
  - [ ] **R5-2** 목록 조회: 리스트 UI가 렌더링된다.
  - [ ] **R5-3** 상세 조회: 라우트 파라미터로 특정 데이터를 불러와 렌더링한다.
  - [ ] **R5-4** 등록/수정: 폼 입력 → 제출 → 성공 시 이동/갱신 흐름이 존재한다.
  - [ ] **R5-5** 삭제: 삭제 후 목록 갱신 또는 이동 흐름이 존재한다.

> 💡 (해설) R5-1 의 "반드시 … 원격 데이터 기준"은 **localStorage / 하드코딩 배열 / mock JSON으로 CRUD를 흉내내면 불합격**이라는 뜻이다. 새로고침해도 데이터가 남아 있어야 하고, 다른 브라우저에서 접속해도 같은 데이터가 보여야 한다.

#### R6. 폼 UX

- [ ] **R6** 폼 UX를 구현한다.
  - [ ] **R6-1** 등록/수정 폼에 필수값 검증이 존재해야 한다. (예: 제목/내용 비어있으면 제출 불가)
  - [ ] **R6-2** 에러 메시지가 입력 필드 근처 또는 상단에 표시된다.
  - [ ] **R6-3** 제출 중에는 버튼 비활성화 또는 스피너 등 "진행 중" 상태가 표시된다.
  - [ ] **R6-4** 요청 실패 시(네트워크/권한/기타 오류) 사용자에게 실패 사실이 화면에 표시되어야 한다.

> 💡 (해설) R6-1(검증 실패 에러)과 R6-4(요청 실패 에러)는 **서로 다른 에러**다. 전자는 제출 전 클라이언트 검증, 후자는 제출 후 서버/네트워크 실패다. 둘 다 화면에 나타나야 한다.

#### R7. React 이벤트 & 렌더링

- [ ] **R7** 이벤트와 렌더링을 연결한다.
  - [ ] **R7-1** 사용자 이벤트(클릭/입력/제출 등)가 상태 변경으로 이어지고, 렌더링이 변하는 흐름이 명확해야 한다.
  - [ ] **R7-2** 상태 변경이 렌더링 변화로 이어지는 지점이 최소 3군데 이상 명확해야 한다.
    - 예: 필터 변경 → 목록 변경, 입력값 변경 → 미리보기 변경, 저장 성공 → 알림 표시 등

#### R8. 배포

- [ ] **R8** 배포된 URL에서 아래 흐름이 모두 동작해야 한다.
  - [ ] **R8-1** 목록/상세 조회
  - [ ] **R8-2** 등록/수정/삭제
  - [ ] **R8-3** 환경변수 등 설정 누락으로 인해 배포 환경에서 기능이 일부라도 동작하지 않으면 요구사항을 충족하지 못한다.

---

### 0.5 보너스 과제 (선택)

**원문 5. 보너스 과제 (선택)**

- [ ] **B1. 전역 상태 도입** — 로그인 사용자, 테마, 알림 중 하나를 전역 상태(Context 등)로 관리해본다.
- [ ] **B2. 성능 최적화** — 불필요한 리렌더링을 줄이기 위해 메모이제이션(`useMemo`/`useCallback`/`React.memo`) 중 1개 이상을 적용해본다.
- [ ] **B3. 인증 추가** — Supabase/Firebase Auth로 로그인 흐름을 붙이고, 보호 라우트를 적용해본다.

> 💡 (해설) B3 를 하면 최종 결과물 예시의 `/login` 라우트가 자연스럽게 채워져 R2-1(5개 라우트)도 함께 충족된다. B1 과 B3 는 세트로 묶기 좋다(로그인 사용자 = 전역 상태).

---

### 0.6 개발 환경 · 제약 사항

#### 원문 6. 개발 환경

- **React 18 이상**

#### 원문 7. 제약 사항

- **프레임워크**: React 기반으로 구현한다.
- **핵심 목표**: React의 컴포넌트/상태/이벤트/비동기 렌더링 학습이 중심이다.
- **백엔드**
  - Supabase 또는 Firebase 사용한다.
  - 백엔드 고급 기능(권한/RLS/Rules, 복잡한 관계 설계)은 필수가 아니다.
- **구조**
  - 라우팅이 존재해야 한다.
  - 페이지/컴포넌트/훅(또는 lib)이 분리되어야 한다.
- **기능 범위**
  - UI 고퀄리티보다 "React 구조와 데이터 흐름"이 우선이다.
  - 백엔드 서버를 직접 구현하는 방식은 요구하지 않는다.
- **언어 및 스타일링**
  - TypeScript 사용은 선택 사항이다. JavaScript만으로 구현해도 무방하며, TypeScript를 사용할 경우 가산점은 없으나 코드 품질 향상에 도움이 될 수 있다.
  - 스타일링 방식은 자유롭게 선택한다. 아래 중 어떤 방식을 사용해도 된다.
    - 순수 CSS / CSS Modules
    - Tailwind CSS
    - styled-components / Emotion 등 CSS-in-JS
    - UI 라이브러리 (MUI, Chakra UI, Ant Design 등)
  - 반응형 디자인은 필수가 아닌 선택 사항이다.
- **환경변수 및 보안**
  - API Key 등 민감 정보는 `.env` 파일에 저장하고, `.gitignore` 에 `.env` 가 포함되어 있는지 **반드시 확인**한다.
  - API Key가 포함된 코드를 GitHub에 **절대 푸시하지 않는다**.
  - 배포 시에는 Vercel/Netlify 등의 대시보드에서 Environment Variables를 별도로 등록한다.

#### ⛔ 하면 안 되는 것 / 반드시 지켜야 하는 것 (요약)

| 구분 | 내용 | 근거 |
| --- | --- | --- |
| 필수 | React **18 이상** | 원문 6 |
| 필수 | 백엔드는 **Supabase 또는 Firebase 중 하나** | 원문 2, R5-1 |
| 필수 | `.env` 를 `.gitignore` 에 포함 | 원문 7 |
| 금지 | API Key가 포함된 코드를 GitHub에 푸시 | 원문 7 |
| 금지 | 백엔드 서버를 직접 구현 (요구하지 않음) | 원문 7 |
| 금지 | 로컬 상태/하드코딩 데이터로 CRUD 대체 | R5-1 |
| 선택 | TypeScript (가산점 없음) | 원문 7 |
| 선택 | 스타일링 방식, 반응형 디자인 | 원문 7 |
| 선택 | 백엔드 권한/RLS/Rules, 복잡한 관계 설계 | 원문 7 |

> 💡 (해설) 원문 5페이지/6페이지의 좌측 라벨에 `개발환경`, `제약조건`, `Test Case` 라는 항목 구분자가 찍혀 있다. `Test Case` 라벨 뒤에 별도의 테스트 케이스 표는 제공되지 않으며, 실질적으로 **0.7 결과 예시**가 그 자리를 대신한다.

---

### 0.7 결과/출력 예시

**원문 8. 결과 예시**

> 아래는 정답이 아니라 참고 예시다. 실제 문구, 디자인은 얼마든지 달라도 된다.

```
- /items 에서 카드 리스트가 보이고, 로딩 중에는 스피너가 보인다.
- 리스트 항목 클릭 시 /items/123 로 이동하고 상세가 뜬다.
- /items/new 에서 폼을 작성하고 저장하면 목록 또는 상세로 이동한다.
- 빈 데이터면 "표시할 데이터가 없습니다."가 보인다.
- 에러면 "요청에 실패했습니다. 다시 시도하세요."가 보인다.
```

**예시에 등장한 문자열 (원문 그대로)**

| 상태 | 화면 문구 |
| --- | --- |
| 빈 상태 | `표시할 데이터가 없습니다.` |
| 에러 상태 | `요청에 실패했습니다. 다시 시도하세요.` |

**예시에 등장한 라우트 (원문 그대로)**

| 라우트 | 역할 |
| --- | --- |
| `/` | 홈 |
| `/login` | 로그인 |
| `/items` | 목록 |
| `/items/:id` | 상세 (예시 URL: `/items/123`) |
| `/items/new` | 등록 폼 |
| `/profile` | 프로필 |

> 💡 (해설) 문구와 디자인은 자유지만, **"로딩 중 스피너 / 빈 상태 문구 / 에러 문구"라는 3가지 상태 화면이 실제로 눈에 보여야 한다**는 점은 예시가 아니라 요구사항(R6-3, R3-4, 최종결과물 4)이다. 예시의 문구를 그대로 써도 무방하다.

---

### 0.8 📚 이 과제가 공부하길 원하는 것 (학습 지도)

> 💡 아래 표는 전부 (해설)이다. 왼쪽 두 칸은 원문 요구사항에 뿌리를 두고, 오른쪽 두 칸은 평가 체크리스트(`checklists_md/react_crud_app.md`)의 "구현 구조 설명 / 핵심 개념 이해 / 확장 사고 및 트러블슈팅" 항목을 녹여 재구성했다.

| 요구사항 | 표면적으로 시키는 일 | 실제로 학습시키려는 개념 | 스스로 답해볼 질문 |
| --- | --- | --- | --- |
| **R1-2** (pages/components/hooks 분리) | 폴더 3개 만들기 | **관심사의 분리(Separation of Concerns)**. "라우트에 묶인 화면"과 "어디서든 쓰는 UI 조각"과 "데이터 로직"은 변경 이유가 다르다. 변경 이유가 다르면 파일이 달라야 한다. | 이 파일을 `components/` 가 아니라 `pages/` 에 둔 이유를 한 문장으로 말할 수 있는가? 폴더를 이렇게 나눈 이유를 남에게 설명할 수 있는가? |
| **R1-3** (공통 레이아웃) | 헤더/네비 붙이기 | **레이아웃 합성(composition)과 `children` / `<Outlet />`**. 상속이 아니라 합성으로 UI를 재사용하는 React의 기본 사고방식. | 헤더를 페이지마다 복붙하지 않고 한 곳에서 관리하려면 라우터 구조가 어떻게 돼야 하는가? |
| **R2-1, R2-2** (5개 라우트, `/items/:id`) | 라우트 등록 | **클라이언트 사이드 라우팅과 URL = 상태**. 상세 페이지의 "어떤 아이템인가"는 컴포넌트 state가 아니라 **URL 파라미터**가 들고 있다. URL도 하나의 상태 저장소다. | `/items/123` 을 주소창에 직접 붙여넣고 새로고침해도 동작하는가? id를 useState로 들고 있지는 않은가? |
| **R2-3** (Not Found) | 404 페이지 만들기 | **라우트 매칭의 fallback과 catch-all(`path="*"`)**. 그리고 SPA 배포 시 서버 rewrite 설정(모든 경로를 `index.html`로) 없이는 새로고침이 404가 난다는 사실. | 배포된 URL에서 `/items/123` 을 **새로고침**해도 페이지가 뜨는가, 아니면 호스팅 404가 뜨는가? |
| **R3-1, R3-2** (8개 이상, prop 기반) | 컴포넌트 숫자 채우기 | **컴포넌트 추출 기준과 props 인터페이스 설계**. 잘라낼 근거는 "길어서"가 아니라 "재사용" 또는 "책임 분리"여야 한다. prop은 부모→자식 단방향 입력이다. | 어떤 기준으로 이 8개를 잘랐는가? prop 이름만 보고 이 컴포넌트가 뭘 하는지 알 수 있는가? |
| **R3-3** (페이지/UI 컴포넌트 분리) | 폴더 나누기 | **Presentational vs Container 패턴**. UI 컴포넌트는 데이터 fetch를 모르고, 페이지 컴포넌트는 픽셀을 덜 안다. 테스트 가능성과 재사용성이 여기서 갈린다. | `Card` 안에서 supabase를 직접 호출하고 있지는 않은가? 그러면 왜 문제인가? |
| **R3-4** (로딩/에러/빈 상태 통일) | 컴포넌트 3개 만들기 | **UI 상태 머신과 DRY**. 비동기 데이터는 `idle → loading → success(데이터 있음/없음) → error` 라는 유한한 상태를 가진다. 이걸 페이지마다 if문으로 다시 쓰면 반드시 어긋난다. | 페이지 A와 페이지 B의 로딩 화면이 서로 다르게 생기지는 않았는가? 상태 분기를 한 군데에서 관리할 수 있는가? |
| **R4-1** (controlled input) | `value` + `onChange` 달기 | **제어 컴포넌트 vs 비제어 컴포넌트**. React state를 "단 하나의 진실 공급원(single source of truth)"으로 삼고 DOM을 그 투영으로 만드는 것. | `value` 만 주고 `onChange` 를 빼면 왜 입력이 안 되는가? 이 현상이 단방향 데이터 흐름과 무슨 관계인가? |
| **R4-2, G2** (데이터 상태 위치) | useState 선언 | **State colocation과 lifting state up**. 상태는 "그 상태를 필요로 하는 모든 컴포넌트의 최소 공통 조상"에 둔다. 너무 위에 두면 전체가 리렌더되고, 너무 아래 두면 공유가 안 된다. | 이 state를 한 단계 아래로 내릴 수 있는가? 없다면 왜 없는가? (= 누가 같이 쓰는가) |
| **R4-3** (로딩/에러 상태) | boolean 하나 추가 | **불가능한 상태를 불가능하게 만들기**. `isLoading`, `error`, `data` 를 각각 독립 boolean으로 두면 "로딩 중인데 에러도 있는" 모순 상태가 생긴다. 상태 모델링 연습. | `loading=true` 이면서 `error≠null` 인 순간이 생길 수 있는가? 생긴다면 화면은 무엇을 그리는가? |
| **R4-4** (커스텀 훅 분리) | `useItems()` 만들기 | **로직 재사용 단위로서의 Hook**. 컴포넌트에서 "상태 + 부수효과"만 떼어내 이름을 붙이는 것. Hook 규칙(최상위에서만 호출, 컴포넌트/훅에서만 호출)의 이유. | 왜 유틸 함수가 아니라 **훅**이어야 했는가? (힌트: 내부에서 useState/useEffect를 쓰기 때문) |
| **R5-1** (원격 데이터 필수) | Supabase/Firebase 붙이기 | **클라이언트–서버 경계와 비동기의 본질**. 네트워크는 느리고, 실패하고, 순서가 보장되지 않는다. 이걸 직접 겪어야 R4-3이 왜 필요한지 이해된다. | 왜 이 과제는 localStorage를 허용하지 않았을까? Supabase를 고른 이유와 연동하며 겪은 어려움을 구체적으로 말할 수 있는가? |
| **R5-3** (라우트 파라미터 조회) | `useParams()` 쓰기 | **URL → 데이터 fetch 파이프라인**. 파라미터가 바뀌면 재요청이 일어나야 한다 = `useEffect` 의존성 배열에 `id` 가 들어가는 이유. | 상세 페이지에서 다른 아이템으로 이동했을 때 데이터가 갱신되는가, 아니면 이전 데이터가 남는가? |
| **R5-4, R5-5** (성공 후 이동/갱신) | `navigate()` 호출 | **낙관적 UI vs 재조회(refetch), 그리고 캐시 무효화**. "서버는 바뀌었는데 화면은 옛날 목록"이 바로 상태 동기화 문제의 실체다. | 삭제 후 목록으로 돌아갔을 때 지운 항목이 잠깐이라도 보이는가? 안 보이게 하려면 무엇을 해야 하는가? |
| **R6-1 vs R6-4** (검증 에러 vs 요청 에러) | 에러 메시지 띄우기 | **에러의 출처 구분과 에러 경계 설계**. 사용자 입력 오류(고칠 수 있음)와 시스템 오류(재시도해야 함)는 다른 문구, 다른 복구 경로를 가져야 한다. | 두 에러가 같은 자리에 같은 스타일로 뜨고 있지는 않은가? 사용자는 무엇을 해야 할지 알 수 있는가? |
| **R6-3** (제출 중 상태) | 버튼 disabled | **중복 제출 방지와 in-flight 상태**. 더블클릭 한 번이면 데이터가 2개 생긴다. UI 상태가 곧 안전장치다. | 저장 버튼을 빠르게 3번 누르면 어떻게 되는가? 실제로 해봤는가? |
| **R7-1, R7-2** (렌더링 변화 3군데) | 화면 바뀌게 하기 | **선언적 렌더링과 단방향 데이터 흐름**. DOM을 직접 건드리는 게 아니라 "상태를 바꾸면 화면은 따라온다". React의 핵심 정신. | 내 코드에서 `document.querySelector` 로 화면을 바꾸는 곳이 있는가? 있다면 왜 React 방식이 아닌가? |
| **G3** (`useEffect` 의존성) | 배열에 뭔가 넣기 | **effect의 실행 시점, 클린업, 경쟁 상태(race condition)**. 빈 배열/생략/의존성 있음이 각각 언제 도는지, 언마운트 시 setState 하면 왜 문제인지. | 상세 페이지를 빠르게 왔다갔다 하면 이전 요청의 응답이 나중에 도착해 화면을 덮어쓸 수 있는가? 어떻게 막는가? |
| **R8-3** (환경변수) | `.env` 만들기 | **빌드 타임 주입과 클라이언트 번들의 투명성**. Vite/CRA의 `VITE_` / `REACT_APP_` 접두사 규칙, 그리고 "프론트엔드 환경변수는 결국 번들에 박혀 누구나 본다"는 사실(→ 그래서 RLS/Rules가 존재한다). | 로컬은 되는데 배포는 안 되는 전형적 원인 3가지를 말할 수 있는가? 브라우저에 노출되어도 되는 키와 절대 안 되는 키를 구분할 수 있는가? |
| **B2** (메모이제이션) | `useMemo` 붙이기 | **리렌더링의 원인과 참조 동일성(referential equality)**. 부모가 리렌더되면 자식도 리렌더된다, 인라인 객체/함수는 매번 새 참조다 — 이걸 모르면 `React.memo` 는 무용지물이다. | `React.memo` 를 씌웠는데도 리렌더가 계속된다면 원인은 무엇인가? |
| **G5** (전체 흐름) | 기능 하나 완성 | **수직 슬라이스(vertical slice)로 시스템을 꿰는 능력**. 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링 → 네트워크 → 다시 렌더링까지 한 줄로 설명하는 것이 이 과제의 최종 관문. | "등록 버튼을 누르면 무슨 일이 일어나는가"를 파일 이름과 함수 이름을 짚어가며 90초 안에 설명할 수 있는가? |

---

### 0.9 자주 놓치는 함정

> 💡 전부 (해설)이지만, 각 항목의 근거가 되는 원문 요구사항 ID를 함께 적었다.

1. **"최소 5개 라우트"에 Not Found는 포함되지 않는다고 보는 편이 안전하다.** (R2-1 / R2-3)
   원문은 5개 라우트와 Not Found를 **별개 항목**으로 나열했다. 예시에 나온 `/`, `/login`, `/items`, `/items/:id`, `/items/new`, `/profile` 처럼 **의미 있는 화면 5개 이상 + Not Found**로 세어두면 논쟁의 여지가 없다.

2. **"재사용 컴포넌트 8개"는 prop을 받아야 카운트된다.** (R3-1 / R3-2)
   `<Header />` 처럼 prop 없이 항상 동일하게 그려지는 것으로 숫자를 채우면 R3-2 정의를 빗나간다. `Button(variant, disabled, onClick)`, `EmptyState(message)`, `ErrorState(message, onRetry)` 처럼 **prop에 따라 표시/동작이 달라지는** 것으로 채워라.

3. **로딩/에러/빈 상태를 "만들었는지"가 아니라 "통일했는지"를 본다.** (R3-4 / 최종결과물 4)
   페이지마다 `{loading && <p>로딩중</p>}` 를 각각 써 놓으면 요구사항 미충족이다. 공통 컴포넌트 하나를 **모든 핵심 화면이 함께 쓰는지**가 판정 기준이다.

4. **"빈 상태"를 빠뜨리기 쉽다.** (R3-4 / 결과 예시)
   로딩과 에러는 대부분 구현하지만, **데이터가 0건일 때의 화면**(`표시할 데이터가 없습니다.`)은 빼먹기 쉽다. 게다가 "로딩 끝 + 에러 없음 + 길이 0"이라는 조건 분기를 정확히 써야 한다.

5. **검증 에러(R6-1)와 요청 실패 에러(R6-4)는 별개 요구사항이다.**
   필수값 검증만 구현하고 "저장 실패 시 화면 표시"를 안 하면 R6-4가 비어 있는 것이다. 네트워크를 끊고 저장을 눌러 **실제로 실패 메시지가 뜨는지** 확인하라.

6. **CRUD가 "원격 데이터 기준"이어야 한다.** (R5-1)
   useState 배열이나 localStorage로 만든 CRUD는 요구사항 위반이다. **새로고침 후에도, 다른 기기에서도 같은 데이터**가 보여야 한다.

7. **배포에서 "일부라도" 동작하지 않으면 미충족이다.** (R8-3)
   원문의 표현이 "기능이 일부라도 동작하지 않으면"이다. 흔한 원인 세 가지를 반드시 점검하라.
   - 호스팅 대시보드에 Environment Variables를 등록하지 않음 (로컬 `.env` 는 배포에 올라가지 않는다)
   - Vite/CRA 환경변수 접두사(`VITE_` / `REACT_APP_`)를 빠뜨림 — 접두사 없는 변수는 번들에 주입되지 않는다
   - SPA fallback rewrite 미설정 — `/items/123` 직접 접속/새로고침 시 호스팅 404

8. **`.env` 를 `.gitignore` 에 넣는 것은 "권장"이 아니라 "반드시 확인"이다.** (제약 사항 — 환경변수 및 보안)
   이미 커밋한 뒤에 `.gitignore` 에 추가해도 **git 히스토리에는 키가 남는다.** `git log -p` 로 키가 남아 있지 않은지 확인하고, 노출됐다면 키를 재발급하라.

9. **TypeScript는 가산점이 없다.** (제약 사항 — 언어 및 스타일링)
   원문이 "가산점은 없으나"라고 명시했다. TS 설정에 시간을 쏟느라 R3/R4 구조를 놓치면 손해다. 마찬가지로 **반응형 디자인과 UI 완성도도 채점 우선순위가 아니다**("UI 고퀄리티보다 'React 구조와 데이터 흐름'이 우선이다").

10. **README에 "실행 방법 + 기술 스택"이 없으면 제출물 요건 미달이다.** (최종결과물 5)
    코드와 배포 URL이 완벽해도 README가 비어 있으면 감점 요소다. 로컬 설치/실행 명령어를 그대로 복사해 실행 가능한 형태로 적어라.

### 0.10 ✅ 과제 수행 점검 (명세 대조)

> 점검 방식: 저장소의 실제 소스를 명세의 요구사항 ID 와 1:1 대조. 판정 근거는 파일 경로로 명시.

**종합 판정: 대체로 충족** — 필수 38개 중 충족 34 / 부분 1 / 미충족 0 / 로컬검증불가 3

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R1 | 프로젝트 기본 구성 | ✅ 충족 | 아래 R1-1~R1-4 전부 충족 |
| R1-1 | React 프로젝트로 시작 | ✅ 충족 | `package.json:11-13` — `react ^18.3.1` / `react-dom ^18.3.1` (설치본도 18.3.1). `vite.config.js:1-7` — Vite + `@vitejs/plugin-react` |
| R1-2 | `pages` / `components` / `hooks`·`lib` 역할 분리 | ✅ 충족 | `src/pages/` 7개, `src/components/` 12개, `src/hooks/` 2개, `src/lib/supabase.js` — 4개 폴더 모두 존재 |
| R1-3 | 공통 레이아웃(헤더/네비)이 주요 페이지에 적용 | ✅ 충족 | `src/components/Layout.jsx:4-13` (`<Navbar/>` + `<Outlet/>`), `src/App.jsx:14-22` — 모든 라우트가 `Layout` 하위에 중첩(404 포함) |
| R1-4 | 단일 핵심 데이터 CRUD 수준의 주제 | ✅ 충족 | `src/lib/supabase.js:14` — `BOOKS_TABLE = 'books'` 단일 테이블. 주제 = 독서 기록(제목/저자/별점/메모) |
| R2 | 라우팅 구성 | ✅ 충족 | `src/App.jsx:13-23` — `react-router-dom` v6 `Routes/Route` |
| R2-1 | 최소 5개 라우트 동작 | ✅ 충족 | `src/App.jsx:15-20` — `/`, `/books`, `/books/new`, `/books/:id`, `/books/:id/edit`, `/about` = **의미 있는 라우트 6개** (404 제외하고도 5개 초과). ⚠️ 단, README.md:458 은 catch-all 을 포함해 "7개"로 셈 |
| R2-2 | 목록/상세 라우트 포함 | ✅ 충족 | `src/App.jsx:16` (`/books`), `src/App.jsx:18` (`/books/:id`) |
| R2-3 | Not Found 페이지 | ✅ 충족 | `src/App.jsx:21` (`path="*"`), `src/pages/NotFoundPage.jsx:5-16` — 공통 `EmptyState` 재사용 + 홈 복귀 버튼 |
| R2-4 | 네비게이션 링크 제공 | ✅ 충족 | `src/components/Navbar.jsx:4-9` (링크 테이블), `:18-31` (`NavLink` + `isActive` 활성 스타일) |
| R3 | 컴포넌트 설계 | ✅ 충족 | 아래 R3-1~R3-4 전부 충족 |
| R3-1 | 최소 8개 재사용 컴포넌트 | ✅ 충족 | `src/components/` 총 12개 중 **prop 기반 10개**: `Button.jsx:3-11`, `Input.jsx:3-13`, `Textarea.jsx:3-13`, `Card.jsx:3`, `Loading.jsx:3`, `ErrorState.jsx:4-7`, `EmptyState.jsx:3-7`, `RatingStars.jsx:5`, `BookList.jsx:6`, `BookForm.jsx:20-27` |
| R3-2 | 재사용 컴포넌트는 prop 1개 이상 수용 | ✅ 충족 | 예: `Button.jsx:12,17,21` — `variant`/`disabled`/`loading` 에 따라 클래스·비활성·라벨이 달라짐. `RatingStars.jsx:5-8` — `readOnly` 면 클릭 무시. ⚠️ `Navbar.jsx`·`Layout.jsx` 는 prop 무수용이라 카운트 제외했으나, 나머지 10개만으로 8개 임계값 초과 |
| R3-3 | 페이지 컴포넌트 / UI 컴포넌트 분리 | ✅ 충족 | `grep -rn "lib/supabase" src/components/` 결과 0건 — UI 컴포넌트는 데이터 fetch 를 모름. supabase 호출은 `src/hooks/*` 와 `src/pages/*` 에만 존재 |
| R3-4 | 로딩/에러/빈 상태를 공통 컴포넌트로 통일 | ✅ 충족 | `Loading.jsx` / `ErrorState.jsx` / `EmptyState.jsx` 를 `BooksPage.jsx:41,43,46`, `BookDetailPage.jsx:32,33,36,63`, `EditBookPage.jsx:30,31,34`, `NotFoundPage.jsx:7` 에서 공유. 페이지별 인라인 `{loading && <p>…</p>}` 중복 없음 |
| R4 | React 방식 상태 관리 | ✅ 충족 | 아래 R4-1~R4-4 전부 충족 |
| R4-1 | 폼 입력 상태 (controlled input) | ✅ 충족 | `BookForm.jsx:28` (`useState`), `:32-35` (`change` 핸들러), `Input.jsx:26-27` / `Textarea.jsx:26-27` — `value` + `onChange` 쌍 완비 |
| R4-2 | 목록/상세 데이터 상태 | ✅ 충족 | `hooks/useBooks.js:5` (`items`), `hooks/useBookDetail.js:5` (`item`) |
| R4-3 | 로딩/에러 상태 | ✅ 충족 | `hooks/useBooks.js:6-7,10-11,17-22`, `hooks/useBookDetail.js:6-7,11-12,18-24`. 페이지 레벨 제출 상태도 별도 보유 (`NewBookPage.jsx:8-9`, `EditBookPage.jsx:15-16`, `BookDetailPage.jsx:16-17`) |
| R4-4 | 조회/갱신 흐름 최소 1개 커스텀 훅 분리 | ✅ 충족 | **2개**: `src/hooks/useBooks.js:4-30` (`useBooks` — 목록 + `refetch`), `src/hooks/useBookDetail.js:4-32` (`useBookDetail(id)` — `id` 의존 재요청) |
| R5 | CRUD 구현 | ✅ 충족 | 아래 R5-1~R5-5 전부 충족 |
| R5-1 | CRUD 가 Supabase/Firebase 원격 데이터 기준 | ✅ 충족 | `src/lib/supabase.js:1-12` (`createClient`), `hooks/useBooks.js:12-15`(select) `:32-40`(insert) `:42-51`(update) `:53-56`(delete). `grep -rn "localStorage\|sessionStorage" src/` **0건**, 하드코딩 목록/mock JSON 없음 |
| R5-2 | 목록 조회 리스트 UI 렌더링 | ✅ 충족 | `BooksPage.jsx:12,63` → `BookList.jsx:6-26` (`items.map` → `Card` 리스트) |
| R5-3 | 라우트 파라미터로 상세 조회 | ✅ 충족 | `BookDetailPage.jsx:13,15` (`useParams()` → `useBookDetail(id)`), `useBookDetail.js:16` (`.eq('id', id)`), `:25` — 의존성 배열에 `id` 포함되어 파라미터 변경 시 재요청 |
| R5-4 | 등록/수정 → 제출 → 성공 시 이동/갱신 | ✅ 충족 | 등록: `NewBookPage.jsx:11-21` (`createBook` → `navigate('/books/'+created.id, {replace:true})`). 수정: `EditBookPage.jsx:18-28` (`updateBook` → 상세로 이동) |
| R5-5 | 삭제 후 목록 갱신 또는 이동 | ✅ 충족 | `BookDetailPage.jsx:19-30` — `deleteBook(id)` 성공 시 `navigate('/books', {replace:true})`; 목록은 `useBooks` 가 마운트 시 재조회(`useBooks.js:25-27`) |
| R6 | 폼 UX | ✅ 충족 | 아래 R6-1~R6-4 전부 충족 |
| R6-1 | 필수값 검증 존재 | ✅ 충족 | `BookForm.jsx:10-18` (`validate` — 제목 필수 + 길이/별점 범위), `:41-44` — 에러 있으면 `return` 으로 제출 차단 |
| R6-2 | 에러 메시지가 필드 근처 또는 상단 표시 | ✅ 충족 | 필드 근처: `Input.jsx:31` / `Textarea.jsx:31` (`errorText`), `BookForm.jsx:88` (별점 에러). 상단: `BookForm.jsx:58-62` (`role="alert"` 배너) |
| R6-3 | 제출 중 비활성화/진행 표시 | ✅ 충족 | `BookForm.jsx:103,107` (`disabled={submitting}` `loading={submitting}`) → `Button.jsx:17` (`disabled \|\| loading`), `:21` (라벨 "처리 중…"). 스피너 CSS: `Status.module.css:25-38` |
| R6-4 | 요청 실패 시 화면 표시 | ✅ 충족 | 등록 실패 `NewBookPage.jsx:17-19` → `BookForm.jsx:58-62` 배너. 수정 실패 `EditBookPage.jsx:24-26`. 삭제 실패 `BookDetailPage.jsx:26-28,63` (`ErrorState`). 조회 실패 `useBooks.js:16-18` → `BooksPage.jsx:43` (`onRetry={refetch}`) |
| R7 | 이벤트 ↔ 렌더링 연결 | ✅ 충족 | 아래 R7-1, R7-2 충족. `grep -rn "document.querySelector\|getElementById" src/` 는 `main.jsx:7` (루트 마운트) 1건뿐 — 명령형 DOM 조작 없음 |
| R7-1 | 이벤트 → 상태 변경 → 렌더링 변화 | ✅ 충족 | `BooksPage.jsx:37` (`onChange` → `setKeyword`) → `:15-22` (`useMemo` 재계산) → `:45-63` (빈 상태/리스트 분기) |
| R7-2 | 렌더링 변화 지점 최소 3군데 | ✅ 충족 | ① 검색어 입력 → 목록 필터 (`BooksPage.jsx:13,15-22,63`) ② 별점 클릭 → 별 UI 즉시 변경 (`BookForm.jsx:37,87` → `RatingStars.jsx:18-27`) ③ 제출 중 → 버튼 라벨/비활성 전환 (`BookForm.jsx:107` → `Button.jsx:17,21`) ④ 로딩/에러/빈/성공 4분기 전환 (`BooksPage.jsx:41-63`) — **4군데** |
| R8 | 배포 URL 에서 전체 흐름 동작 | ⬜ 로컬 검증 불가 | **증거 불충분.** 저장소 어디에도 배포된 서비스 URL 이 없다. `README.md:565-123` 은 Vercel 배포 *절차*만 기술. 스크린샷·배포 로그·`.vercel/` 설정 파일도 없음. `git remote -v` 상 GitHub 원격(`github.com/ashofrondol/codyssey_B4-2.git`)은 존재하나 README 에 명시되지 않음 |
| R8-1 | 배포 환경에서 목록/상세 조회 | ⬜ 로컬 검증 불가 | 코드상 흐름은 완비(R5-2·R5-3 충족). 실제 배포 URL 부재로 동작 확인 불가 |
| R8-2 | 배포 환경에서 등록/수정/삭제 | ⬜ 로컬 검증 불가 | 코드상 흐름은 완비(R5-4·R5-5 충족). 실제 배포 URL 부재로 동작 확인 불가 |
| R8-3 | 환경변수 등 설정 누락 없음 | 🟡 부분 충족 | 준비는 양호: `VITE_` 접두사 정확(`src/lib/supabase.js:3-4`, `.env.example:7-8`), 미설정 시 경고(`supabase.js:6-10`), SPA fallback `vercel.json:1-5`, 대시보드 등록 안내 `README.md:570`. **다만** 실제 배포본에서 환경변수가 주입되었는지 확인할 증거가 없어 "일부라도 동작하지 않으면 미충족" 조건을 입증할 수 없다. 추가로 `vercel.json:3` 의 `"destination": "/"` 는 Vercel 권장 표기(`/index.html`)와 다름 |

#### 보너스 과제

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| B1 | 전역 상태 도입 (Context 등) | ❌ 미충족 | `grep -rn "createContext\|useContext" src/` **0건**. 상태는 전부 페이지/컴포넌트 지역 상태 또는 커스텀 훅 내부 |
| B2 | 메모이제이션 1개 이상 적용 | ✅ 충족 | `BooksPage.jsx:1,15-22` (`useMemo` — 검색 필터 재계산 방지), `useBooks.js:9-23` / `useBookDetail.js:9-25` (`useCallback` — effect 의존성 안정화). 단 `React.memo` 는 미사용 |
| B3 | 인증 + 보호 라우트 | ❌ 미충족 | `grep -rn "supabase.auth\|signIn\|ProtectedRoute\|PrivateRoute" src/` **0건**. `src/App.jsx:13-23` 에 `/login` 라우트 및 라우트 가드 없음 |

#### 제약 사항 준수 점검

| 제약 | 판정 | 근거 |
| --- | --- | --- |
| React 18 이상 | ✅ | `package.json:11-12` (`^18.3.1`), `node_modules/react/package.json` 설치본 18.3.1 |
| 백엔드는 Supabase 또는 Firebase 중 **하나** | ✅ | Supabase 단독. `grep -rni firebase src/ package.json README.md` **0건** |
| `.env` 가 `.gitignore` 에 포함 | ✅ | `.gitignore:12-14` — `.env`, `.env.local`, `.env.*.local` |
| API Key 커밋 금지 | ✅ | `git ls-files` 에 `.env` 없음(`.env.example` 만 존재, 값은 `YOUR-PROJECT` / `YOUR-ANON-KEY` 플레이스홀더). 전체 히스토리(커밋 1개) 대상 JWT 패턴(`eyJ…`) 검색 0건 |
| 백엔드 서버 직접 구현 금지 | ✅ | 서버 코드/Express 등 없음. supabase-js 클라이언트 SDK 직접 호출만 존재 |
| 로컬 상태/하드코딩 데이터로 CRUD 대체 금지 | ✅ | `localStorage`/`sessionStorage`/mock 배열 0건 (R5-1 근거 참조) |

#### 🔍 발견된 격차와 보완 제안

1. **[치명] R8 — 배포 URL 이 저장소 어디에도 없다.**
   무엇이 부족한가: 명세 0.2 "최종 산출물"은 *동작하는 URL + 코드 + README* 3종 세트를 요구하고, 제출 증거 체크리스트 첫 줄이 "배포된 서비스 URL"이다. `README.md:565-123` 에는 Vercel 배포 *방법*만 있고 실제 접속 주소가 없다.
   어떻게 고치면 되는가: Vercel/Netlify 에 실제 배포한 뒤 README 최상단에 `🔗 배포 URL: https://…` 와 `🔗 GitHub: https://github.com/ashofrondol/codyssey_B4-2` 두 줄을 추가하라. 배포 후 `/books/<실제 id>` 를 **주소창에 직접 입력하고 새로고침**해서 404 가 아닌지, 목록·등록·수정·삭제가 전부 도는지 확인한 스크린샷을 함께 남기면 R8-1·R8-2 의 로컬 검증 불가 상태가 해소된다.

2. **[중요] R8-3 — 배포 환경 변수 주입 증거가 없다.**
   무엇이 부족한가: 코드 측 준비(`VITE_` 접두사, `.env.example`, 미설정 경고, `vercel.json` rewrite)는 모두 갖춰져 있으나, Vercel 대시보드에 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 를 등록했다는 증거가 없다. 접두사만 맞고 대시보드 등록을 빠뜨리면 배포본에서 목록이 영구 빈 화면이 되는데, 이때 `supabase.js:6-10` 의 경고는 콘솔에만 찍혀 사용자 화면에는 아무 단서가 없다.
   어떻게 고치면 되는가: (a) 배포본 첫 화면 스크린샷을 README 에 첨부, (b) `vercel.json:3` 의 `"destination": "/"` 를 Vercel 문서 표준인 `"/index.html"` 로 바꾸면 의도가 더 분명하다, (c) 환경변수 누락을 콘솔 경고가 아니라 화면 배너(`ErrorState`)로 띄우면 배포 사고를 즉시 알 수 있다.

3. **[경미] B1 / B3 미구현 (보너스, 감점 아님).**
   B1 은 테마 토글이나 전역 토스트 알림을 `createContext` 로 빼는 것이 가장 작은 비용이고, B3 는 Supabase Auth 매직링크 + `<Route element={<RequireAuth/>}>` 중첩 가드로 `/login` 라우트를 채우면 된다(명세 해설대로 B1·B3 는 세트로 묶기 좋다).

4. **[경미] README 의 자체 집계가 실제보다 후하다 (요구사항 판정 자체에는 영향 없음).**
   `README.md:458` 은 catch-all `*` 을 포함해 "라우팅 7개"로, `README.md:475,132` 는 prop 을 받지 않는 `Navbar`·`Layout` 을 포함해 "재사용 UI 12개"로 센다. 명세 0.9 함정 1·2 의 셈법(404 제외, prop 수용분만)으로는 각각 6개·10개다. 둘 다 임계값(5개·8개)은 여유롭게 넘으므로 판정은 충족이지만, 구술 평가에서 "12개"라고 답하면 R3-2 정의를 되묻는 질문이 들어온다. 실제 셈법 기준으로 문구를 고쳐두는 편이 안전하다.

5. **[경미, 요구사항 외 — 학습 지도 G3 관련] `useBookDetail` 에 경쟁 상태(race condition) 방어가 없다.**
   `src/hooks/useBookDetail.js:27-29` 의 effect 에는 클린업이 없어, 상세 페이지를 빠르게 왔다갔다 하면 먼저 보낸 요청의 늦은 응답이 나중 상태를 덮어쓸 수 있다. 명세 0.8 표의 G3 항목이 정확히 이 질문("이전 요청의 응답이 나중에 도착해 화면을 덮어쓸 수 있는가")을 구술 문항으로 예고한다. `let alive = true` 플래그 또는 `AbortController` 를 추가하고 `return () => { alive = false }` 로 막아두면 답변까지 함께 준비된다. `useBooks.js:25-27` 도 동일.

6. **[경미, 구조 정리] CRUD 헬퍼가 훅 파일 안에 산다.**
   `createBook`/`updateBook`/`deleteBook` (`src/hooks/useBooks.js:32-56`)은 훅이 아닌 순수 async 함수인데 `hooks/` 에 있어, `BookDetailPage.jsx:4` 처럼 "훅 파일에서 훅이 아닌 것을 import" 하는 모양이 된다. 명세 R1-2 는 `hooks` **또는** `lib` 를 허용하므로 위반은 아니지만, `src/lib/books.js` 로 옮기면 R3-3(관심사 분리) 설명이 훨씬 깔끔해진다.

7. **[경미, 동작] `index.html:5` 가 존재하지 않는 파비콘을 참조한다.**
   `href="/vite.svg"` 인데 `public/` 디렉터리 자체가 없어 배포본에서 파비콘 404 가 난다. 기능에는 영향 없으나 `public/vite.svg` 를 추가하거나 해당 `<link>` 를 지우면 된다.

#### 🧪 실행 검증 기록

저장소를 변경하지 않는 범위에서만 검증했다. `npm install` / `npm run build`(=`dist/` 생성) / 개발 서버 기동은 **실행하지 않았다** — 각각 네트워크 설치 또는 저장소 내 파일 생성을 유발하기 때문.

1. **JSX/ES 모듈 전체 파싱·번들 검증 — 실행함, 성공**
   ```
   ./node_modules/.bin/esbuild src/main.jsx --bundle \
     --outfile=<scratchpad>/b42_build/bundle.js \
     --loader:.js=jsx --format=esm --loader:.css=empty \
     --external:react --external:react-dom/client \
     --external:react-router-dom --external:@supabase/supabase-js
   ```
   → `bundle.js 29.5kb`, `bundle.css 5.7kb`, `⚡ Done in 11ms`, **exit 0**. 출력은 전부 scratchpad 로 보냈고 저장소에는 아무것도 쓰지 않았다. `src/` 전 파일의 구문 오류·import 경로 오류·CSS Modules 참조 누락이 없음을 확인 (미해결 import 가 하나라도 있으면 esbuild 번들이 실패한다).

2. **정적 검색 검증 — 실행함**
   - `grep -rn "localStorage\|sessionStorage" src/` → 0건 (R5-1 위반 없음)
   - `grep -rni "firebase" src/ package.json README.md` → 0건 (백엔드 단일 선택 준수)
   - `grep -rn "createContext\|useContext" src/` → 0건 (B1 미구현 확정)
   - `grep -rn "supabase.auth\|signIn\|ProtectedRoute\|PrivateRoute" src/` → 0건 (B3 미구현 확정)
   - `grep -rn "document.querySelector\|getElementById" src/` → `src/main.jsx:7` 1건(루트 마운트)만 (R7 선언적 렌더링 준수)
   - `grep -rn "lib/supabase" src/components/` → 0건 (R3-3 Presentational 분리 준수)

3. **비밀정보 유출 점검 — 실행함**
   `git ls-files` 에 `.env` 없음, 추적 파일은 `.env.example` 뿐(플레이스홀더 값). 전체 히스토리(커밋 1개 `6683992`) 대상 `eyJ[A-Za-z0-9_-]{10,}` (Supabase anon key 의 JWT 접두) 검색 0건. `.gitignore:12-14` 에 `.env` 계열 3종 등재 확인.

4. **런타임/브라우저 동작 — 미실행**
   실제 렌더링, Supabase 원격 CRUD 왕복, 배포 URL 접속은 유효한 Supabase 프로젝트 자격 증명과 네트워크가 필요해 검증하지 않았다. 해당 항목(R8, R8-1, R8-2)은 ⬜ 로 판정하고 저장소 내 대체 증거의 충분성만 평가했다.

---

## ✨ 기능 요약

- **라우팅 (7개)** : `/`, `/books`, `/books/new`, `/books/:id`, `/books/:id/edit`, `/about`, `*` (Not Found)
- **CRUD** : Supabase 의 `books` 테이블에 대해 등록 / 목록 / 상세 / 수정 / 삭제
- **폼 UX** : 필수값 검증, 필드별 에러 표시, 제출 중 버튼 비활성화 / 로딩 표시
- **공통 상태 UI** : 로딩 · 에러 · 빈 상태를 재사용 컴포넌트로 통일
- **검색 필터** : 목록에서 제목/저자로 클라이언트 사이드 필터링 (입력 → 렌더링 흐름 학습)

## 🧱 폴더 구조

```
src/
├── App.jsx                # 라우트 정의
├── main.jsx               # 진입점 (BrowserRouter)
├── lib/
│   └── supabase.js        # Supabase 클라이언트
├── hooks/
│   ├── useBooks.js        # 목록 조회 훅 + CRUD 헬퍼
│   └── useBookDetail.js   # 상세 조회 훅
├── components/            # 재사용 UI (12개)
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Textarea.jsx
│   ├── Card.jsx
│   ├── Loading.jsx
│   ├── ErrorState.jsx
│   ├── EmptyState.jsx
│   ├── RatingStars.jsx
│   ├── BookList.jsx
│   ├── BookForm.jsx
│   ├── Navbar.jsx
│   └── Layout.jsx
├── pages/                 # 라우트 단위 화면 (7개)
│   ├── HomePage.jsx
│   ├── BooksPage.jsx
│   ├── BookDetailPage.jsx
│   ├── NewBookPage.jsx
│   ├── EditBookPage.jsx
│   ├── AboutPage.jsx
│   └── NotFoundPage.jsx
└── styles/global.css
```

## 🛠 기술 스택

| 분류         | 기술                          |
| ------------ | ----------------------------- |
| UI 라이브러리 | React 18                      |
| 빌드 도구     | Vite 5                        |
| 라우팅        | React Router DOM v6           |
| 백엔드        | Supabase (PostgreSQL + REST)  |
| 스타일링      | CSS Modules                   |
| 언어          | JavaScript (ES2022)           |

## 🚀 로컬 실행 방법

### 1) 의존성 설치

```bash
npm install
```

### 2) Supabase 프로젝트 준비

1. [supabase.com](https://supabase.com) 에서 무료 프로젝트를 만듭니다.
2. **SQL Editor** 에서 아래 쿼리를 실행해 `books` 테이블을 만듭니다.

```sql
create table if not exists books (
  id         uuid        primary key default gen_random_uuid(),
  title      text        not null,
  author     text        default '',
  rating     int         default 0 check (rating between 0 and 5),
  note       text        default '',
  created_at timestamptz default now()
);

-- 실습용: 익명 클라이언트가 읽고 쓸 수 있도록 RLS 끄거나 정책 추가
alter table books disable row level security;
```

> 운영 서비스라면 RLS 를 활성화하고 정책을 설정해야 합니다. 학습 목적상 비활성화 예시입니다.

### 3) 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 Supabase Dashboard → Project Settings → API 에서 값을 복사합니다.

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

> `.env` 는 `.gitignore` 에 포함되어 있어 절대 커밋되지 않습니다.

### 4) 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

### 5) 프로덕션 빌드

```bash
npm run build      # dist/ 생성
npm run preview    # 빌드 결과 미리보기
```

## ☁️ 배포 (Vercel 기준)

1. 이 레포지토리를 GitHub 에 푸시합니다.
2. [Vercel](https://vercel.com) 에서 **New Project → Import GitHub Repo** 를 선택합니다.
3. Build Command 는 `npm run build`, Output Directory 는 `dist` (기본값).
4. **Environment Variables** 에 위의 두 키(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)를 등록합니다.
5. Deploy 클릭. SPA 새로고침 404 방지용 `vercel.json` 이 포함되어 있어 라우팅이 정상 동작합니다.

Netlify 를 쓴다면 `_redirects` 에 `/* /index.html 200` 한 줄을 추가하세요.

## 🔍 학습 포인트 — 미션 평가 항목 매핑

| 평가 항목                | 어디에 구현되어 있나요?                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| 5개 이상 라우트          | `src/App.jsx` (7개 라우트)                                              |
| 목록 / 상세 페이지       | `BooksPage`, `BookDetailPage`                                          |
| CRUD                     | `useBooks.js` 의 `createBook` / `updateBook` / `deleteBook` + `useBooks` |
| 8개 이상 재사용 컴포넌트 | `src/components/` 아래 12개 컴포넌트                                    |
| 폼 검증 + 제출 상태      | `BookForm.jsx` 의 `validate`, `submitting`, `submitError`               |
| 로딩 / 에러 / 빈 상태    | `Loading.jsx`, `ErrorState.jsx`, `EmptyState.jsx` 를 모든 페이지에서 재사용 |
| 커스텀 훅                | `useBooks`, `useBookDetail`                                            |
| 상태 → 렌더링 연결       | 검색어 입력 → 목록 필터, 폼 입력 → 별점 미리보기, 저장 성공 → 라우트 이동 |
| Not Found 처리           | `NotFoundPage.jsx` + `path="*"`                                         |

## ❓ 자주 발생하는 문제

- **목록이 빈 화면이고 콘솔에 `VITE_SUPABASE_*` 경고가 보인다**
  → `.env` 파일이 누락되었거나 키 이름 오타입니다. `.env.example` 을 참조하세요.
- **`new row violates row-level security policy`**
  → Supabase 의 RLS 가 켜져 있고 정책이 없을 때 발생합니다. 위 SQL 의 `disable row level security` 를 실행하거나 정책을 추가하세요.
- **배포 후 새로고침 시 404**
  → Vercel 은 `vercel.json` 으로, Netlify 는 `_redirects` 로 SPA fallback 을 설정해야 합니다.
