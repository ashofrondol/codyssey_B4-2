import { useCallback, useEffect, useState } from 'react'
import { supabase, BOOKS_TABLE } from '../lib/supabase.js'

export function useBooks() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from(BOOKS_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    if (err) {
      setError(err.message || '목록을 불러오지 못했습니다.')
      setItems([])
    } else {
      setItems(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { items, loading, error, refetch: fetchAll }
}

export async function createBook(payload) {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .insert(payload)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateBook(id, payload) {
  const { data, error } = await supabase
    .from(BOOKS_TABLE)
    .update(payload)
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
