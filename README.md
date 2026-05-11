# 📚 Reading Log — React SPA 독서 기록 서비스

Codyssey B4-2 미션 결과물입니다. React 18 + Vite + React Router + Supabase 로 구성된 SPA 로,
내가 읽은 책의 제목 · 저자 · 별점 · 메모를 등록 / 조회 / 수정 / 삭제할 수 있습니다.

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
