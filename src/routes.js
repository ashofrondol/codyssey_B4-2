/**
 * 라우트 경로의 단일 정의.
 *
 * 왜 파일을 따로 두는가: 이전에는 `App.jsx` 의 `<Route path=…>` 와 별개로 같은 경로
 * 문자열이 8개 파일에 22곳 다시 적혀 있었다. 경로를 하나 바꾸면 22곳을 손으로 찾아야
 * 했고, 하나를 빠뜨려도 아무것도 실패하지 않은 채 링크만 조용히 404 가 됐다.
 * 이제 `App.jsx` 의 라우트 정의와 모든 `<Link to=…>` / `navigate(…)` 가 이 표를 읽는다.
 *
 * `scripts/check.mjs` 가 (1) 이 파일 밖에 라우트 리터럴이 남아 있지 않은지,
 * (2) 여기 정의된 라우트가 전부 `App.jsx` 에 등록돼 있는지를 실제로 검사한다.
 */

/** 라우트 패턴. `:param` 자리는 `bookPath()` 같은 빌더가 채운다. */
export const ROUTES = {
  home: '/',
  books: '/books',
  newBook: '/books/new',
  bookDetail: '/books/:id',
  editBook: '/books/:id/edit',
  about: '/about',
  notFound: '*',
}

/**
 * 패턴의 `:param` 을 실제 값으로 채운다.
 *
 * 값이 비어 있으면 던진다. 예전에는 `` `/books/${id}` `` 에 `undefined` 가 들어가면
 * `/books/undefined` 라는 그럴듯한 주소로 이동해 상세 페이지가 "찾을 수 없습니다"를
 * 띄웠다 — 원인이 라우팅인지 데이터인지 화면만 봐서는 구분할 수 없었다.
 */
function fillPath(pattern, params) {
  return pattern.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const value = params[key]
    if (value === undefined || value === null || value === '') {
      throw new Error(`[routes] ${pattern} 의 :${key} 에 넘길 값이 없습니다.`)
    }
    return encodeURIComponent(String(value))
  })
}

export const bookPath = (id) => fillPath(ROUTES.bookDetail, { id })
export const editBookPath = (id) => fillPath(ROUTES.editBook, { id })

/** 네비게이션 바가 그리는 링크. `end` 는 NavLink 의 정확 일치 옵션. */
export const NAV_LINKS = [
  { to: ROUTES.home, label: '홈', end: true },
  { to: ROUTES.books, label: '독서 목록' },
  { to: ROUTES.newBook, label: '새 기록' },
  { to: ROUTES.about, label: '소개' },
]
