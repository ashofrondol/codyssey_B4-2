/**
 * books 테이블에 대한 데이터 접근 계층.
 *
 * 경계: 이 파일(과 `supabase.js`)만 Supabase 를 안다. `hooks/` 는 React 상태를,
 * `pages/`·`components/` 는 화면을 맡고, 어느 쪽도 쿼리 문법을 알지 못한다.
 * `scripts/check.mjs` 가 `src/lib/` 밖에서의 `lib/supabase` import 를 0건으로 강제한다.
 *
 * 검증 규칙도 여기에 둔다. 예전에는 `BookForm.jsx` 안에만 있어서, 폼을 거치지 않는
 * 저장 경로(다른 화면·스크립트·테스트)가 생기면 제약이 조용히 사라지는 구조였다.
 * 이제 폼과 저장 함수가 같은 `validateBook()` 을 읽는다.
 */
import { supabase, BOOKS_TABLE } from './supabase.js'

/** 입력 제약의 단일 정의. 폼의 maxLength 와 저장 전 검증이 같은 값을 읽는다. */
export const BOOK_LIMITS = {
  titleMax: 120,
  authorMax: 80,
  noteMax: 2000,
  ratingMin: 0,
  ratingMax: 5,
}

/** 빈 폼의 기준값. 부분 입력을 병합할 때도 기준이 된다. */
export const EMPTY_BOOK = { title: '', author: '', rating: 0, note: '' }

const asText = (value) => String(value ?? '')

/**
 * 필드별 에러 메시지를 담은 객체를 돌려준다. 문제가 없으면 빈 객체.
 * 반환값이 비었는지로 유효성을 판단한다(던지지 않는다) — 폼이 필드 옆에 그대로 그린다.
 */
export function validateBook(values) {
  const v = { ...EMPTY_BOOK, ...values }
  const errors = {}

  const title = asText(v.title)
  if (!title.trim()) errors.title = '제목을 입력해주세요.'
  if (title.length > BOOK_LIMITS.titleMax) {
    errors.title = `제목은 ${BOOK_LIMITS.titleMax}자 이내여야 합니다.`
  }

  if (asText(v.author).length > BOOK_LIMITS.authorMax) {
    errors.author = `저자는 ${BOOK_LIMITS.authorMax}자 이내여야 합니다.`
  }

  const rating = Number(v.rating)
  if (!Number.isFinite(rating) || rating < BOOK_LIMITS.ratingMin || rating > BOOK_LIMITS.ratingMax) {
    errors.rating = `별점은 ${BOOK_LIMITS.ratingMin}~${BOOK_LIMITS.ratingMax} 사이여야 합니다.`
  }

  if (asText(v.note).length > BOOK_LIMITS.noteMax) {
    errors.note = `리뷰는 ${BOOK_LIMITS.noteMax}자 이내여야 합니다.`
  }

  return errors
}

/** 화면 입력값을 테이블 컬럼 모양으로 다듬는다(공백 제거, 별점 숫자화). */
export function normalizeBook(values) {
  const v = { ...EMPTY_BOOK, ...values }
  return {
    title: asText(v.title).trim(),
    author: asText(v.author).trim(),
    note: asText(v.note).trim(),
    rating: Number(v.rating) || 0,
  }
}

/**
 * 저장 직전의 마지막 관문.
 *
 * 폼이 이미 막아주지만, 폼을 거치지 않은 호출이 잘못된 행을 DB 에 남기는 것보다
 * 여기서 던지는 편이 낫다 — 잘못된 행은 조용하고, 던진 예외는 화면 배너로 보인다.
 */
function toRow(values) {
  const row = normalizeBook(values)
  const errors = validateBook(row)
  const messages = Object.keys(errors).map((key) => errors[key])
  if (messages.length > 0) {
    throw new Error(`저장할 수 없는 값입니다 — ${messages.join(' ')}`)
  }
  return row
}

export async function listBooks() {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message || '목록을 불러오지 못했습니다.')
  return data ?? []
}

/** 없는 id 는 에러가 아니라 `null`. "못 찾음"과 "조회 실패"는 화면에서 다르게 처리된다. */
export async function getBook(id) {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message || '항목을 불러오지 못했습니다.')
  return data ?? null
}

export async function createBook(values) {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .insert(toRow(values))
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateBook(id, values) {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .update(toRow(values))
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteBook(id) {
  const { error } = await supabase.from(BOOKS_TABLE).delete().eq('id', id)
  if (error) throw new Error(error.message)
}
