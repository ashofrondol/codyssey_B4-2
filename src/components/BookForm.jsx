import { useState } from 'react'
import { BOOK_LIMITS, EMPTY_BOOK, normalizeBook, validateBook } from '../lib/books.js'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import Button from './Button.jsx'
import RatingStars from './RatingStars.jsx'
import styles from './BookForm.module.css'

// 검증 규칙과 길이 제한은 `lib/books.js` 한 곳에만 있다.
// 폼이 막는 값과 저장 함수가 거부하는 값이 서로 다른 상황을 애초에 만들지 않기 위해서다.

export default function BookForm({
  initialValues = EMPTY_BOOK,
  submitLabel = '저장',
  onSubmit,
  onCancel,
  submitting = false,
  submitError,
}) {
  const [values, setValues] = useState({ ...EMPTY_BOOK, ...initialValues })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const setRating = (rating) => setValues((v) => ({ ...v, rating }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validateBook(values)
    setErrors(next)
    setTouched(true)
    if (Object.keys(next).length > 0) return
    onSubmit?.(normalizeBook(values))
  }

  const showError = (key) => (touched ? errors[key] : undefined)

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {submitError && (
        <div className={styles.submitError} role="alert">
          ⚠️ {submitError}
        </div>
      )}

      <Input
        label="책 제목"
        name="title"
        value={values.title}
        onChange={change}
        placeholder="예: 클린 코드"
        required
        error={showError('title')}
        maxLength={BOOK_LIMITS.titleMax}
      />

      <Input
        label="저자"
        name="author"
        value={values.author}
        onChange={change}
        placeholder="예: 로버트 C. 마틴"
        error={showError('author')}
        maxLength={BOOK_LIMITS.authorMax}
      />

      <div className={styles.rating}>
        <span className={styles.ratingLabel}>별점</span>
        <RatingStars value={values.rating} onChange={setRating} size="lg" />
        {showError('rating') && <span className={styles.errorText}>{errors.rating}</span>}
      </div>

      <Textarea
        label="리뷰 / 메모"
        name="note"
        value={values.note}
        onChange={change}
        placeholder="이 책에 대한 감상을 자유롭게 적어보세요."
        rows={6}
        error={showError('note')}
      />

      <div className={styles.actions}>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel} disabled={submitting}>
            취소
          </Button>
        )}
        <Button type="submit" disabled={submitting} loading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
