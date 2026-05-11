import { useState } from 'react'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import Button from './Button.jsx'
import RatingStars from './RatingStars.jsx'
import styles from './BookForm.module.css'

const EMPTY = { title: '', author: '', rating: 0, note: '' }

function validate(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = '제목을 입력해주세요.'
  if (values.title.length > 120) errors.title = '제목은 120자 이내여야 합니다.'
  if (values.author.length > 80) errors.author = '저자는 80자 이내여야 합니다.'
  if (values.rating < 0 || values.rating > 5) errors.rating = '별점은 0~5 사이여야 합니다.'
  if (values.note.length > 2000) errors.note = '리뷰는 2000자 이내여야 합니다.'
  return errors
}

export default function BookForm({
  initialValues = EMPTY,
  submitLabel = '저장',
  onSubmit,
  onCancel,
  submitting = false,
  submitError,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const setRating = (rating) => setValues((v) => ({ ...v, rating }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    setTouched(true)
    if (Object.keys(next).length > 0) return
    onSubmit?.({
      ...values,
      title: values.title.trim(),
      author: values.author.trim(),
      note: values.note.trim(),
      rating: Number(values.rating) || 0,
    })
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
        maxLength={120}
      />

      <Input
        label="저자"
        name="author"
        value={values.author}
        onChange={change}
        placeholder="예: 로버트 C. 마틴"
        error={showError('author')}
        maxLength={80}
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
