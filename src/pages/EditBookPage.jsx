import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTES, bookPath } from '../routes.js'
import { updateBook } from '../lib/books.js'
import { useBookDetail } from '../hooks/useBookDetail.js'
import AsyncView from '../components/AsyncView.jsx'
import BookForm from '../components/BookForm.jsx'
import Button from '../components/Button.jsx'

export default function EditBookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading, error, refetch } = useBookDetail(id)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await updateBook(id, values)
      navigate(bookPath(id), { replace: true })
    } catch (e) {
      setSubmitError(e.message || '수정에 실패했습니다.')
      setSubmitting(false)
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
        title: '수정할 기록을 찾을 수 없습니다.',
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
            <h1 style={{ margin: 0 }}>기록 수정</h1>
            <Link to={bookPath(id)} className="muted">
              ← 상세로
            </Link>
          </div>
          <BookForm
            initialValues={{
              title: item.title ?? '',
              author: item.author ?? '',
              rating: item.rating ?? 0,
              note: item.note ?? '',
            }}
            submitLabel="수정 저장"
            onSubmit={handleSubmit}
            onCancel={() => navigate(bookPath(id))}
            submitting={submitting}
            submitError={submitError}
          />
        </section>
      )}
    </AsyncView>
  )
}
