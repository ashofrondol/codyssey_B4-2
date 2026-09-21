import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTES, bookPath } from '../routes.js'
import { createBook } from '../lib/books.js'
import BookForm from '../components/BookForm.jsx'

export default function NewBookPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createBook(values)
      navigate(bookPath(created.id), { replace: true })
    } catch (e) {
      setSubmitError(e.message || '저장에 실패했습니다. 다시 시도해주세요.')
      setSubmitting(false)
    }
  }

  return (
    <section className="stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>새 독서 기록</h1>
        <Link to={ROUTES.books} className="muted">
          ← 목록으로
        </Link>
      </div>
      <BookForm
        submitLabel="등록"
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.books)}
        submitting={submitting}
        submitError={submitError}
      />
    </section>
  )
}
