import { useCallback, useEffect, useState } from 'react'
import { getBook } from '../lib/books.js'

/** 상세 조회 훅. `id` 가 바뀌면 다시 요청한다. 쿼리 자체는 `lib/books.js` 에 있다. */
export function useBookDetail(id) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOne = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      setItem(await getBook(id))
    } catch (e) {
      setError(e.message || '항목을 불러오지 못했습니다.')
      setItem(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchOne()
  }, [fetchOne])

  return { item, loading, error, refetch: fetchOne }
}
