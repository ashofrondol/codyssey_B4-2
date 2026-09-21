import Loading from './Loading.jsx'
import ErrorState from './ErrorState.jsx'
import EmptyState from './EmptyState.jsx'

/**
 * 비동기 데이터의 로딩 / 에러 / 빈 / 성공 4분기를 한 곳에 모은 컴포넌트.
 *
 * 예전에는 세 페이지가 같은 분기를 손으로 복사해 갖고 있었고, 이미 갈라져 있었다.
 * 목록 페이지는 `{loading && …}` 을 나열해 에러와 빈 상태가 동시에 보일 수 있었고,
 * 상세·수정 페이지는 이른 `return` 을 써서 순서가 달랐다. 한 곳으로 모으면 네 분기의
 * 우선순위(로딩 > 에러 > 빈 > 성공)가 모든 화면에서 같아진다.
 *
 * `children` 은 함수로도 줄 수 있다. 성공 분기에서만 데이터를 건드려야 하는 화면
 * (`item.title` 처럼)이 빈 분기에서 터지지 않게 하기 위해서다.
 */
export default function AsyncView({
  loading,
  error,
  onRetry,
  loadingMessage,
  isEmpty = false,
  emptyProps,
  children,
}) {
  if (loading) return <Loading message={loadingMessage} />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (isEmpty) return <EmptyState {...emptyProps} />
  return typeof children === 'function' ? children() : children
}
