import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTES, editBookPath } from '../routes.js'
import { deleteBook } from '../lib/books.js'
import { useBookDetail } from '../hooks/useBookDetail.js'
import AsyncView from '../components/AsyncView.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import ErrorState from '../components/ErrorState.jsx'
import RatingStars from '../components/RatingStars.jsx'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading, error, refetch } = useBookDetail(id)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const handleDelete = async () => {
    if (!window.confirm('이 기록을 삭제하시겠습니까?')) return
    setDeleting(true)
    setDeleteError(null)
    try {
      await deleteBook(id)
      navigate(ROUTES.books, { replace: true })
    } catch (e) {
      setDeleteError(e.message || '삭제에 실패했습니다.')
      setDeleting(false)
    }
  }

  return (
    <AsyncView
      loading={loading}
      error={error}
      onRetry={refetch}
      loadingMessage="기록을 불러오는 중…"
      isEmpty={!item}
      emptyProps={{
        title: '해당 기록을 찾을 수 없습니다.',
        action: (
          <Link to={ROUTES.books}>
            <Button variant="secondary">목록으로</Button>
          </Link>
        ),
      }}
    >
      {() => (
        <section className="stack">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <Link to={ROUTES.books} className="muted">
              ← 목록으로
            </Link>
            <div className="row">
              <Link to={editBookPath(item.id)}>
                <Button variant="secondary">수정</Button>
              </Link>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
                loading={deleting}
              >
                삭제
              </Button>
            </div>
          </div>

          {deleteError && <ErrorState message={deleteError} />}

          <Card>
            <h1 style={{ marginBottom: 4 }}>{item.title}</h1>
            <p className="muted">{item.author || '저자 미상'}</p>
            <div style={{ marginTop: 12 }}>
              <RatingStars value={item.rating ?? 0} readOnly size="lg" />
            </div>

            {item.note ? (
              <p style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{item.note}</p>
            ) : (
              <p className="muted" style={{ marginTop: 16 }}>
                남긴 메모가 없습니다.
              </p>
            )}

            {item.created_at && (
              <p className="muted" style={{ fontSize: 12, marginTop: 16 }}>
                등록일: {new Date(item.created_at).toLocaleString('ko-KR')}
              </p>
            )}
          </Card>
        </section>
      )}
    </AsyncView>
  )
}
