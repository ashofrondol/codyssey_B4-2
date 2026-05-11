import { useCallback, useEffect, useState } from 'react'
import { supabase, BOOKS_TABLE } from '../lib/supabase.js'

export function useBookDetail(id) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOne = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from(BOOKS_TABLE)
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (err) {
      setError(err.message || '항목을 불러오지 못했습니다.')
      setItem(null)
    } else {
      setItem(data ?? null)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchOne()
  }, [fetchOne])

  return { item, loading, error, refetch: fetchOne }
}
