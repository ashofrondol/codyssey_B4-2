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

> 점검 방식: 저장소의 실제 소스를 명세의 요구사항 ID 와 1:1 대조.
>
> **판정 근거의 좌표에 대하여.** 이 표는 처음에 `파일:줄번호` 로 근거를 적었는데, 줄번호는
> 리팩터링에 견디지 못하는 좌표다. 실제로 2026-09-19 에 README 맨 앞에 「0. 과제 명세」를
> 삽입했을 때 이 절의 자기 참조 줄번호가 통째로 밀려 거짓이 됐다. 그래서 2026-09-21 의
> 구조 개선과 함께 근거를 **`파일 › 식별자`** 형태(함수·컴포넌트·상수 이름)로 바꿨다.
> 이름은 `grep` 으로 찾을 수 있고, 줄이 밀려도 따라 움직이며, 사라지면 `grep` 이 0건을 내서
> 참조가 깨진 사실이 드러난다.
>
> 근거 중 실행 가능한 것들(`grep … → 0건` 류)은 **`npm run lint`(`scripts/check.mjs`) 가 실제로 돌린다.**
> 문서에만 적힌 규칙은 규칙이 아니라 희망이라, 열 종을 종료 코드로 말하게 옮겼다.
> 그중 `docs/refs` 는 **이 표 자체를 검사한다** — 여기 적힌 `파일 › 식별자` 가 실제로 존재하는지 확인해,
> 코드가 움직였는데 문서만 남는 상황을 다시 만들지 않는다.

**종합 판정: 대체로 충족** — 필수 38개 중 충족 34 / 부분 1 / 미충족 0 / 로컬검증불가 3

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| R1 | 프로젝트 기본 구성 | ✅ 충족 | 아래 R1-1~R1-4 전부 충족 |
| R1-1 | React 프로젝트로 시작 | ✅ 충족 | `package.json › dependencies.react` — `^18.3.1` / `react-dom ^18.3.1` (설치본도 18.3.1). `vite.config.js › defineConfig` — Vite + `@vitejs/plugin-react`. `package.json › engines.node` 가 `^18.0.0 \|\| >=20.0.0` 로 Node 하한도 선언 |
| R1-2 | `pages` / `components` / `hooks`·`lib` 역할 분리 | ✅ 충족 | `src/pages/` 7개, `src/components/` 13개, `src/hooks/` 2개, `src/lib/` 2개(`supabase.js`·`books.js`), 그리고 `src/routes.js`. 계층 규칙은 문서가 아니라 `scripts/check.mjs › 검사 1·2` 가 강제한다 |
| R1-3 | 공통 레이아웃(헤더/네비)이 주요 페이지에 적용 | ✅ 충족 | `src/components/Layout.jsx › Layout` (`<Navbar/>` + `<Outlet/>`), `src/App.jsx › App` — 모든 라우트가 `<Route element={<Layout />}>` 하위에 중첩(404 포함) |
| R1-4 | 단일 핵심 데이터 CRUD 수준의 주제 | ✅ 충족 | `src/lib/supabase.js › BOOKS_TABLE` = `'books'` 단일 테이블. 주제 = 독서 기록(제목/저자/별점/메모) |
| R2 | 라우팅 구성 | ✅ 충족 | `src/App.jsx › App` — `react-router-dom` v6 `Routes/Route`, 경로는 `src/routes.js › ROUTES` 한 곳에서 온다 |
| R2-1 | 최소 5개 라우트 동작 | ✅ 충족 | `src/routes.js › ROUTES` — `home` `/`, `books` `/books`, `newBook` `/books/new`, `bookDetail` `/books/:id`, `editBook` `/books/:id/edit`, `about` `/about` = **의미 있는 라우트 6개** (404 제외하고도 5개 초과). `scripts/check.mjs › 검사 4` 가 ROUTES 의 모든 키가 `App.jsx` 에 등록됐는지 양방향으로 대조한다 |
| R2-2 | 목록/상세 라우트 포함 | ✅ 충족 | `ROUTES.books`, `ROUTES.bookDetail` → `src/App.jsx › App` 의 `<Route path={ROUTES.books}>` / `<Route path={ROUTES.bookDetail}>` |
| R2-3 | Not Found 페이지 | ✅ 충족 | `ROUTES.notFound` = `'*'`, `src/pages/NotFoundPage.jsx › NotFoundPage` — 공통 `EmptyState` 재사용 + 홈 복귀 버튼 |
| R2-4 | 네비게이션 링크 제공 | ✅ 충족 | `src/routes.js › NAV_LINKS` (링크 테이블), `src/components/Navbar.jsx › Navbar` (`NavLink` + `isActive` 활성 스타일) |
| R3 | 컴포넌트 설계 | ✅ 충족 | 아래 R3-1~R3-4 전부 충족 |
| R3-1 | 최소 8개 재사용 컴포넌트 | ✅ 충족 | `src/components/` 총 13개 중 **prop 기반 11개**: `Button` `Input` `Textarea` `Card` `Loading` `ErrorState` `EmptyState` `RatingStars` `BookList` `BookForm` `AsyncView` |
| R3-2 | 재사용 컴포넌트는 prop 1개 이상 수용 | ✅ 충족 | 예: `Button.jsx › VARIANT_CLASS` 조회 + `disabled \|\| loading` — `variant`/`disabled`/`loading` 에 따라 클래스·비활성·라벨이 달라짐. `RatingStars.jsx › handle` — `readOnly` 면 클릭 무시. ⚠️ `Navbar`·`Layout` 은 prop 무수용이라 카운트 제외했으나, 나머지 11개만으로 8개 임계값 초과 |
| R3-3 | 페이지 컴포넌트 / UI 컴포넌트 분리 | ✅ 충족 | `grep -rn "lib/supabase" src/components/` 결과 0건 — UI 컴포넌트는 데이터 fetch 를 모른다. **그리고 이 grep 은 이제 실행된다**: `scripts/check.mjs › 검사 1` 이 `src/lib/` 밖의 `lib/supabase` import 를 0건으로 강제하고, 위반 시 `npm run lint` 가 종료 코드 1 을 낸다 |
| R3-4 | 로딩/에러/빈 상태를 공통 컴포넌트로 통일 | ✅ 충족 | `Loading` / `ErrorState` / `EmptyState` 를 `src/components/AsyncView.jsx › AsyncView` 한 곳이 같은 우선순위(로딩 > 에러 > 빈 > 성공)로 분기하고, `BooksPage` · `BookDetailPage` · `EditBookPage` 가 그것을 공유한다. `NotFoundPage` 는 `EmptyState` 직접 사용. 페이지별 인라인 `{loading && <p>…</p>}` 중복 없음 |
| R4 | React 방식 상태 관리 | ✅ 충족 | 아래 R4-1~R4-4 전부 충족 |
| R4-1 | 폼 입력 상태 (controlled input) | ✅ 충족 | `BookForm.jsx › values` (`useState`) + `› change` 핸들러, `Input.jsx` / `Textarea.jsx` — `value` + `onChange` 쌍 완비 |
| R4-2 | 목록/상세 데이터 상태 | ✅ 충족 | `hooks/useBooks.js › items`, `hooks/useBookDetail.js › item` |
| R4-3 | 로딩/에러 상태 | ✅ 충족 | `hooks/useBooks.js › fetchAll` 의 `loading`/`error`, `hooks/useBookDetail.js › fetchOne` 의 `loading`/`error`. 페이지 레벨 제출 상태도 별도 보유 (`NewBookPage › submitting/submitError`, `EditBookPage › submitting/submitError`, `BookDetailPage › deleting/deleteError`) |
| R4-4 | 조회/갱신 흐름 최소 1개 커스텀 훅 분리 | ✅ 충족 | **2개**: `src/hooks/useBooks.js › useBooks` (목록 + `refetch`), `src/hooks/useBookDetail.js › useBookDetail(id)` (`id` 의존 재요청). 쿼리 자체는 `src/lib/books.js` 로 내려가, 훅은 React 상태만 맡는다 |
| R5 | CRUD 구현 | ✅ 충족 | 아래 R5-1~R5-5 전부 충족 |
| R5-1 | CRUD 가 Supabase/Firebase 원격 데이터 기준 | ✅ 충족 | `src/lib/supabase.js › createClient`, `src/lib/books.js › listBooks`(select) `› getBook`(select) `› createBook`(insert) `› updateBook`(update) `› deleteBook`(delete). `grep -rn "localStorage\|sessionStorage" src/` **0건** — `scripts/check.mjs › 검사 5` 가 이 0건을 매 `npm run lint` 마다 재확인한다. 하드코딩 목록/mock JSON 없음 |
| R5-2 | 목록 조회 리스트 UI 렌더링 | ✅ 충족 | `BooksPage.jsx › useBooks()` → `<AsyncView>` 성공 분기 → `BookList.jsx › items.map` (`Card` 리스트) |
| R5-3 | 라우트 파라미터로 상세 조회 | ✅ 충족 | `BookDetailPage.jsx › useParams()` → `useBookDetail(id)`, `lib/books.js › getBook` 의 `.eq('id', id)`, `useBookDetail.js › fetchOne` 의 의존성 배열에 `id` 포함되어 파라미터 변경 시 재요청 |
| R5-4 | 등록/수정 → 제출 → 성공 시 이동/갱신 | ✅ 충족 | 등록: `NewBookPage.jsx › handleSubmit` (`createBook` → `navigate(bookPath(created.id), {replace:true})`). 수정: `EditBookPage.jsx › handleSubmit` (`updateBook` → `bookPath(id)` 로 이동). 경로는 `src/routes.js › bookPath` 가 만든다 |
| R5-5 | 삭제 후 목록 갱신 또는 이동 | ✅ 충족 | `BookDetailPage.jsx › handleDelete` — `deleteBook(id)` 성공 시 `navigate(ROUTES.books, {replace:true})`; 목록은 `useBooks.js › useEffect(fetchAll)` 가 마운트 시 재조회 |
| R6 | 폼 UX | ✅ 충족 | 아래 R6-1~R6-4 전부 충족 |
| R6-1 | 필수값 검증 존재 | ✅ 충족 | `src/lib/books.js › validateBook` (제목 필수 + 길이/별점 범위, 한계값은 `› BOOK_LIMITS`), `BookForm.jsx › handleSubmit` 이 에러가 있으면 `return` 으로 제출 차단. 같은 규칙을 `lib/books.js › toRow` 가 저장 직전에 다시 적용해, 폼을 거치지 않은 호출도 잘못된 행을 남기지 못한다 |
| R6-2 | 에러 메시지가 필드 근처 또는 상단 표시 | ✅ 충족 | 필드 근처: `Input.jsx` / `Textarea.jsx` 의 `errorText`, `BookForm.jsx › styles.errorText` (별점 에러). 상단: `BookForm.jsx › styles.submitError` (`role="alert"` 배너) |
| R6-3 | 제출 중 비활성화/진행 표시 | ✅ 충족 | `BookForm.jsx › <Button type="submit" disabled={submitting} loading={submitting}>` → `Button.jsx` 의 `disabled \|\| loading` 과 라벨 "처리 중…". 스피너 CSS: `Status.module.css › .spinner` |
| R6-4 | 요청 실패 시 화면 표시 | ✅ 충족 | 등록 실패 `NewBookPage.jsx › handleSubmit` 의 `catch` → `BookForm` 상단 배너. 수정 실패 `EditBookPage.jsx › handleSubmit` 의 `catch`. 삭제 실패 `BookDetailPage.jsx › deleteError` → `ErrorState`. 조회 실패 `useBooks.js › fetchAll` 의 `catch` → `AsyncView` 의 에러 분기(`onRetry={refetch}`) |
| R7 | 이벤트 ↔ 렌더링 연결 | ✅ 충족 | 아래 R7-1, R7-2 충족. `grep -rn "document.querySelector\|getElementById" src/` 는 `src/main.jsx › createRoot` (루트 마운트) 1건뿐 — 명령형 DOM 조작 없음 |
| R7-1 | 이벤트 → 상태 변경 → 렌더링 변화 | ✅ 충족 | `BooksPage.jsx › onChange → setKeyword` → `› filtered` (`useMemo` 재계산) → `<AsyncView>` 의 빈 상태/리스트 분기 |
| R7-2 | 렌더링 변화 지점 최소 3군데 | ✅ 충족 | ① 검색어 입력 → 목록 필터 (`BooksPage.jsx › keyword/filtered`) ② 별점 클릭 → 별 UI 즉시 변경 (`BookForm.jsx › setRating` → `RatingStars.jsx › handle`) ③ 제출 중 → 버튼 라벨/비활성 전환 (`BookForm.jsx › submitting` → `Button.jsx`) ④ 로딩/에러/빈/성공 4분기 전환 (`AsyncView.jsx › AsyncView`) — **4군데** |
| R8 | 배포 URL 에서 전체 흐름 동작 | ⬜ 로컬 검증 불가 | **증거 불충분.** 저장소 어디에도 배포된 서비스 URL 이 없다. README `## ☁️ 배포 (Vercel 기준)` 절은 배포 *절차*만 기술. 스크린샷·배포 로그·`.vercel/` 설정 파일도 없음. `git remote -v` 상 GitHub 원격(`github.com/ashofrondol/codyssey_B4-2.git`)은 존재하나 README 에 명시되지 않음 |
| R8-1 | 배포 환경에서 목록/상세 조회 | ⬜ 로컬 검증 불가 | 코드상 흐름은 완비(R5-2·R5-3 충족). 실제 배포 URL 부재로 동작 확인 불가 |
| R8-2 | 배포 환경에서 등록/수정/삭제 | ⬜ 로컬 검증 불가 | 코드상 흐름은 완비(R5-4·R5-5 충족). 실제 배포 URL 부재로 동작 확인 불가 |
| R8-3 | 환경변수 등 설정 누락 없음 | 🟡 부분 충족 | 준비는 양호: `VITE_` 접두사 정확(`src/lib/supabase.js › url/anonKey`, `.env.example`), 미설정 시 경고(`supabase.js › console.warn`), SPA fallback `vercel.json › rewrites`, 대시보드 등록 안내 README `## ☁️ 배포 (Vercel 기준)` 4번. **다만** 실제 배포본에서 환경변수가 주입되었는지 확인할 증거가 없어 "일부라도 동작하지 않으면 미충족" 조건을 입증할 수 없다. 추가로 `vercel.json › rewrites[0].destination` 의 `"/"` 는 Vercel 권장 표기(`/index.html`)와 다름 |

#### 보너스 과제

| ID | 요구사항 (요약) | 판정 | 근거 / 비고 |
| --- | --- | --- | --- |
| B1 | 전역 상태 도입 (Context 등) | ❌ 미충족 | `grep -rn "createContext\|useContext" src/` **0건**. 상태는 전부 페이지/컴포넌트 지역 상태 또는 커스텀 훅 내부 |
| B2 | 메모이제이션 1개 이상 적용 | ✅ 충족 | `BooksPage.jsx › filtered` (`useMemo` — 검색 필터 재계산 방지), `useBooks.js › fetchAll` / `useBookDetail.js › fetchOne` (`useCallback` — effect 의존성 안정화). 단 `React.memo` 는 미사용 |
| B3 | 인증 + 보호 라우트 | ❌ 미충족 | `grep -rn "supabase.auth\|signIn\|ProtectedRoute\|PrivateRoute" src/` **0건**. `src/routes.js › ROUTES` 에 `/login` 항목 및 라우트 가드 없음 |

#### 제약 사항 준수 점검

| 제약 | 판정 | 근거 | 자동 검사 |
| --- | --- | --- | --- |
| React 18 이상 | ✅ | `package.json › dependencies.react` (`^18.3.1`), `node_modules/react/package.json` 설치본 18.3.1 | — |
| 백엔드는 Supabase 또는 Firebase 중 **하나** | ✅ | Supabase 단독. `grep -rni firebase src/ package.json` **0건** (README.md 의 Firebase 언급은 0.4~0.6 이 인용한 명세 원문이라 검색 대상에서 뺀다 — 코드가 아니다) | `check.mjs › spec/single-backend` |
| `.env` 가 `.gitignore` 에 포함 | ✅ | `.gitignore › # env / secrets` 블록 — `.env`, `.env.local`, `.env.*.local` | `check.mjs › spec/env-ignored` |
| API Key 커밋 금지 | ✅ | `git ls-files` 에 `.env` 없음(`.env.example` 만 존재, 값은 `YOUR-PROJECT` / `YOUR-ANON-KEY` 플레이스홀더). 히스토리 대상 JWT 패턴(`eyJ…`) 검색 0건 | `check.mjs › spec/no-secret` |
| 백엔드 서버 직접 구현 금지 | ✅ | 서버 코드/Express 등 없음. supabase-js 클라이언트 SDK 직접 호출만 존재 | — |
| 로컬 상태/하드코딩 데이터로 CRUD 대체 금지 | ✅ | `localStorage`/`sessionStorage`/mock 배열 0건 (R5-1 근거 참조) | `check.mjs › spec/remote-crud` |

#### 🔍 발견된 격차와 보완 제안

1. **[치명] R8 — 배포 URL 이 저장소 어디에도 없다.**
   무엇이 부족한가: 명세 0.2 "최종 산출물"은 *동작하는 URL + 코드 + README* 3종 세트를 요구하고, 제출 증거 체크리스트 첫 줄이 "배포된 서비스 URL"이다. README `## ☁️ 배포 (Vercel 기준)` 절에는 Vercel 배포 *방법*만 있고 실제 접속 주소가 없다.
   어떻게 고치면 되는가: Vercel/Netlify 에 실제 배포한 뒤 README 최상단에 `🔗 배포 URL: https://…` 와 `🔗 GitHub: https://github.com/ashofrondol/codyssey_B4-2` 두 줄을 추가하라. 배포 후 `/books/<실제 id>` 를 **주소창에 직접 입력하고 새로고침**해서 404 가 아닌지, 목록·등록·수정·삭제가 전부 도는지 확인한 스크린샷을 함께 남기면 R8-1·R8-2 의 로컬 검증 불가 상태가 해소된다.

2. **[중요] R8-3 — 배포 환경 변수 주입 증거가 없다.**
   무엇이 부족한가: 코드 측 준비(`VITE_` 접두사, `.env.example`, 미설정 경고, `vercel.json` rewrite)는 모두 갖춰져 있으나, Vercel 대시보드에 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 를 등록했다는 증거가 없다. 접두사만 맞고 대시보드 등록을 빠뜨리면 배포본에서 목록이 영구 빈 화면이 되는데, 이때 `supabase.js › console.warn` 은 콘솔에만 찍혀 사용자 화면에는 아무 단서가 없다.
   어떻게 고치면 되는가: (a) 배포본 첫 화면 스크린샷을 README 에 첨부, (b) `vercel.json › rewrites[0].destination` 의 `"/"` 를 Vercel 문서 표준인 `"/index.html"` 로 바꾸면 의도가 더 분명하다, (c) 환경변수 누락을 콘솔 경고가 아니라 화면 배너(`ErrorState`)로 띄우면 배포 사고를 즉시 알 수 있다.

3. **[경미] B1 / B3 미구현 (보너스, 감점 아님).**
   B1 은 테마 토글이나 전역 토스트 알림을 `createContext` 로 빼는 것이 가장 작은 비용이고, B3 는 Supabase Auth 매직링크 + `<Route element={<RequireAuth/>}>` 중첩 가드로 `ROUTES.login` 을 채우면 된다(명세 해설대로 B1·B3 는 세트로 묶기 좋다).

4. **[경미] README 의 자체 집계가 실제보다 후하다 (요구사항 판정 자체에는 영향 없음).**
   README `## ✨ 기능 요약` 은 catch-all `*` 을 포함해 "라우팅 7개"로, `## 🧱 폴더 구조` 는 prop 을 받지 않는 `Navbar`·`Layout` 을 포함해 "재사용 UI 13개"로 센다. 명세 0.9 함정 1·2 의 셈법(404 제외, prop 수용분만)으로는 각각 6개·11개다. 둘 다 임계값(5개·8개)은 여유롭게 넘으므로 판정은 충족이지만, 구술 평가에서 "13개"라고 답하면 R3-2 정의를 되묻는 질문이 들어온다. 실제 셈법 기준으로 문구를 고쳐두는 편이 안전하다.

5. **[경미, 요구사항 외 — 학습 지도 G3 관련] `useBookDetail` 에 경쟁 상태(race condition) 방어가 없다.**
   `src/hooks/useBookDetail.js › useEffect(fetchOne)` 에는 클린업이 없어, 상세 페이지를 빠르게 왔다갔다 하면 먼저 보낸 요청의 늦은 응답이 나중 상태를 덮어쓸 수 있다. 명세 0.8 표의 G3 항목이 정확히 이 질문("이전 요청의 응답이 나중에 도착해 화면을 덮어쓸 수 있는가")을 구술 문항으로 예고한다. `let alive = true` 플래그 또는 `AbortController` 를 추가하고 `return () => { alive = false }` 로 막아두면 답변까지 함께 준비된다. `useBooks.js › useEffect(fetchAll)` 도 동일.

6. **[해소됨 · 2026-09-21] CRUD 헬퍼가 훅 파일 안에 산다.**
   ~~`createBook`/`updateBook`/`deleteBook` 이 훅이 아닌 순수 async 함수인데 `hooks/` 에 있다~~ → `src/lib/books.js` 로 내려보냈다. 조회 쿼리(`listBooks`/`getBook`)와 검증 규칙(`validateBook`/`BOOK_LIMITS`)도 함께 옮겨, `hooks/` 는 React 상태만, `lib/` 는 Supabase 와 규칙만 맡는다. 검증 규칙이 `BookForm` 안에만 있어 저장 계층과 갈라져 있던 문제도 같이 사라졌다 — 폼과 `toRow()` 가 같은 `validateBook` 을 읽는다. 이 경계는 `scripts/check.mjs › layer/supabase`·`layer/direction` 이 강제한다.

7. **[경미, 동작] `index.html` 이 존재하지 않는 파비콘을 참조한다.**
   `href="/vite.svg"` 인데 `public/` 디렉터리 자체가 없어 배포본에서 파비콘 404 가 난다. 기능에는 영향 없으나 `public/vite.svg` 를 추가하거나 해당 `<link>` 를 지우면 된다.

#### 🧪 실행 검증 기록

1. **프로덕션 빌드 — 실행함, 성공** (2026-09-21)
   ```
   npm run build   →  ✓ 110 modules transformed / ✓ built in 1.39s / exit 0
   ```
   `dist/` 는 `.gitignore` 에 있어 저장소에 남지 않는다. 구조 개선 직전의 같은 명령은 `✓ 107 modules transformed`(exit 0) 였다 — 늘어난 3개는 새로 추가한 `src/routes.js`, `src/lib/books.js`, `src/components/AsyncView.jsx` 다.

2. **저장소 규칙 검사 — 실행함, 성공** (2026-09-21)
   ```
   npm run lint    →  ✅ 검사 10종 통과 — 소스 27개 / exit 0
   ```
   `scripts/check.mjs` 는 의존성 0(Node 내장 모듈만)이라 `npm install` 없이도 돈다.
   **검사가 실제로 깨지는지 일부러 확인했다** — 아래 10가지를 하나씩 되돌려 보고 전부 exit 1 과 지목 메시지를 확인한 뒤 원복했다:
   라우트 리터럴 복귀 / `App.jsx` 에서 라우트 1개 제거 / `ROUTES` 에 없는 키를 `App.jsx` 가 사용 /
   페이지가 `lib/supabase` 직접 import / 훅이 페이지를 import(의존 방향 역전) / `localStorage` 사용 /
   `firebase` import / `.gitignore` 에서 `.env` 제거 / `.env.example` 에 JWT 모양 값 삽입 /
   README 가 가리키는 함수 이름을 코드에서 변경(`validateBook` → `checkBook`) · 없는 파일을 근거로 지목.
   깨지지 않는 검사는 검사가 아니다.

3. **검증 규칙 이관의 동등성 — 실행함, 차이 0건** (2026-09-21)
   `lib/books.js › validateBook`/`normalizeBook` 이 이관 전 `BookForm` 의 `validate`/인라인 trim 과 같은 결과를 내는지 6개 입력(정상·공백만·길이 초과·앞뒤 공백·별점 6·별점 -1)으로 대조했다 → **차이 0건**.

4. **정적 검색 검증 — 실행함** (이제 `npm run lint` 가 같은 사실을 매번 재확인한다)
   - `grep -rn "localStorage\|sessionStorage" src/` → 0건 (R5-1 위반 없음)
   - `grep -rni "firebase" src/ package.json` → 0건 (백엔드 단일 선택 준수).
     README.md 는 대상에서 제외한다 — 0.4~0.6 이 명세 원문("Supabase 또는 Firebase 중 하나")을 그대로 인용하고 있어 14건이 나오지만, 전부 과제 설명 문장이지 구현이 아니다.
   - `grep -rn "createContext\|useContext" src/` → 0건 (B1 미구현 확정)
   - `grep -rn "supabase.auth\|signIn\|ProtectedRoute\|PrivateRoute" src/` → 0건 (B3 미구현 확정)
   - `grep -rn "document.querySelector\|getElementById" src/` → `src/main.jsx` 1건(루트 마운트)만 (R7 선언적 렌더링 준수)
   - `grep -rn "lib/supabase" src/components/` → 0건 (R3-3 Presentational 분리 준수)

5. **비밀정보 유출 점검 — 실행함**
   `git ls-files` 에 `.env` 없음, 추적 파일은 `.env.example` 뿐(플레이스홀더 값). JWT 접두(`eyJ[A-Za-z0-9_-]{10,}`) 검색 0건. `.gitignore` 의 `# env / secrets` 블록에 `.env` 계열 3종 등재 확인.

6. **런타임/브라우저 동작 — 부분 실행**
   `Button` 과 `AsyncView` 는 서버 렌더링으로 실제 출력을 확인했다 — `variant="primry"` 오타가 `console.error` 경고 1건 + `primary` 스타일 대체로 이어지는 것, `AsyncView` 의 4분기가 로딩 > 에러 > 빈 > 성공 순서로 갈리고 성공 분기에서만 데이터를 건드리는 것.
   반면 실제 브라우저 렌더링, Supabase 원격 CRUD 왕복, 배포 URL 접속은 유효한 Supabase 자격 증명과 네트워크가 필요해 검증하지 않았다. 해당 항목(R8, R8-1, R8-2)은 ⬜ 로 판정하고 저장소 내 대체 증거의 충분성만 평가했다.

---

## ✨ 기능 요약

- **라우팅 (7개)** : `/`, `/books`, `/books/new`, `/books/:id`, `/books/:id/edit`, `/about`, `*` (Not Found)
- **CRUD** : Supabase 의 `books` 테이블에 대해 등록 / 목록 / 상세 / 수정 / 삭제
- **폼 UX** : 필수값 검증, 필드별 에러 표시, 제출 중 버튼 비활성화 / 로딩 표시
- **공통 상태 UI** : 로딩 · 에러 · 빈 상태를 재사용 컴포넌트로 통일
- **검색 필터** : 목록에서 제목/저자로 클라이언트 사이드 필터링 (입력 → 렌더링 흐름 학습)

## 🧱 폴더 구조

```
scripts/
└── check.mjs              # 저장소 규칙 검사 (npm run lint, 의존성 0)
src/
├── App.jsx                # 라우트 정의 (경로는 routes.js 에서 온다)
├── main.jsx               # 진입점 (BrowserRouter)
├── routes.js              # 라우트 경로의 단일 정의 + 경로 빌더(bookPath 등)
├── lib/                   # 바깥 세계(Supabase)와 규칙
│   ├── supabase.js        # Supabase 클라이언트
│   └── books.js           # books 데이터 접근 + 검증 규칙(validateBook/BOOK_LIMITS)
├── hooks/                 # React 상태만 담당 (쿼리는 lib/books.js 가 맡는다)
│   ├── useBooks.js        # 목록 조회 훅
│   └── useBookDetail.js   # 상세 조회 훅
├── components/            # 재사용 UI (13개)
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Textarea.jsx
│   ├── Card.jsx
│   ├── Loading.jsx
│   ├── ErrorState.jsx
│   ├── EmptyState.jsx
│   ├── AsyncView.jsx      # 로딩 / 에러 / 빈 / 성공 4분기를 한 곳에
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

**의존 방향은 한 방향이다** — `lib` ← `hooks` ← `pages`, 그리고 `components` 는 데이터 계층을 모른다.
이 규칙은 주석이 아니라 `scripts/check.mjs` 가 강제한다. 어기면 `npm run lint` 가 종료 코드 1 을 낸다.

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

### 6) 저장소 규칙 검사

```bash
npm run lint       # scripts/check.mjs — 계층·라우트·과제 제약·문서 참조 10종
npm run verify     # lint + build 를 한 번에
```

`scripts/check.mjs` 는 Node 내장 모듈만 쓰므로 `npm install` 전에도 돌아간다. 검사하는 것:

| 규칙 | 무엇을 막는가 |
| --- | --- |
| `layer/supabase` | `src/lib/` 밖에서 Supabase 클라이언트를 직접 부르는 것 |
| `layer/direction` | 의존 방향 역전 (`lib`→`hooks`, `hooks`→`pages`, `components`→`pages`) |
| `routes/literal` | `src/routes.js` 밖에 라우트 경로 문자열을 다시 적는 것 |
| `routes/unmounted` · `routes/undeclared` | `ROUTES` 표와 `App.jsx` 의 `<Route>` 등록이 어긋나는 것 |
| `spec/remote-crud` | `localStorage`/`sessionStorage` 로 원격 CRUD 를 대체하는 것 (명세 R5-1) |
| `spec/single-backend` | Firebase 가 섞여 들어오는 것 (명세 0.6) |
| `spec/env-ignored` · `spec/no-secret` | `.env` 가 추적되거나 anon key 가 소스에 박히는 것 (명세 0.6) |
| `docs/refs` | README 0.10 의 판정 근거가 없는 파일·**옮겨간 경로**·사라진 이름을 가리키는 것 (근거에 적힌 이름은 하나도 빠짐없이 그 파일 안에 있어야 한다) |

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
| 5개 이상 라우트          | `src/routes.js` 의 `ROUTES` (7개) + `src/App.jsx` 가 그 표를 그린다       |
| 목록 / 상세 페이지       | `BooksPage`, `BookDetailPage`                                          |
| CRUD                     | `src/lib/books.js` 의 `listBooks`/`getBook`/`createBook`/`updateBook`/`deleteBook` |
| 8개 이상 재사용 컴포넌트 | `src/components/` 아래 13개 (그중 prop 수용 11개)                        |
| 폼 검증 + 제출 상태      | `lib/books.js` 의 `validateBook`/`BOOK_LIMITS` + `BookForm.jsx` 의 `submitting`, `submitError` |
| 로딩 / 에러 / 빈 상태    | `AsyncView.jsx` 하나가 `Loading`/`ErrorState`/`EmptyState` 를 같은 순서로 분기 |
| 커스텀 훅                | `useBooks`, `useBookDetail` (상태만 담당, 쿼리는 `lib/books.js`)         |
| 상태 → 렌더링 연결       | 검색어 입력 → 목록 필터, 폼 입력 → 별점 미리보기, 저장 성공 → 라우트 이동 |
| Not Found 처리           | `NotFoundPage.jsx` + `ROUTES.notFound` (`'*'`)                          |
| 설계 규칙의 실행         | `scripts/check.mjs` — 위 경계들을 `npm run lint` 가 종료 코드로 말한다     |

## ❓ 자주 발생하는 문제

- **목록이 빈 화면이고 콘솔에 `VITE_SUPABASE_*` 경고가 보인다**
  → `.env` 파일이 누락되었거나 키 이름 오타입니다. `.env.example` 을 참조하세요.
- **`new row violates row-level security policy`**
  → Supabase 의 RLS 가 켜져 있고 정책이 없을 때 발생합니다. 위 SQL 의 `disable row level security` 를 실행하거나 정책을 추가하세요.
- **배포 후 새로고침 시 404**
  → Vercel 은 `vercel.json` 으로, Netlify 는 `_redirects` 로 SPA fallback 을 설정해야 합니다.
