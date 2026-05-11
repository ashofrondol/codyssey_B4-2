import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BookForm from '../components/BookForm.jsx'
import { createBook } from '../hooks/useBooks.js'

export default function NewBookPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createBook(values)
      navigate(`/books/${created.id}`, { replace: true })
    } catch (e) {
      setSubmitError(e.message || '저장에 실패했습니다. 다시 시도해주세요.')
      setSubmitting(false)
    }
  }

  return (
    <section className="stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>새 독서 기록</h1>
        <Link to="/books" className="muted">
          ← 목록으로
        </Link>
      </div>
      <BookForm
        submitLabel="등록"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/books')}
        submitting={submitting}
        submitError={submitError}
      />
    </section>
  )
}
