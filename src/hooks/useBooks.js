import { useCallback, useEffect, useState } from 'react'
import { listBooks } from '../lib/books.js'

/**
 * 목록 조회 훅. 쿼리는 `lib/books.js` 가 맡고, 여기서는 로딩·에러·데이터 상태만 다룬다.
 *
 * CRUD 헬퍼(`createBook`/`updateBook`/`deleteBook`)는 훅이 아니므로 이 파일에 두지 않는다.
 * 필요한 화면은 `lib/books.js` 에서 직접 가져다 쓴다.
 */
export function useBooks() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItems(await listBooks())
    } catch (e) {
      setError(e.message || '목록을 불러오지 못했습니다.')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { items, loading, error, refetch: fetchAll }
}
