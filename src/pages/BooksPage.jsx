import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooks } from '../hooks/useBooks.js'
import BookList from '../components/BookList.jsx'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'

export default function BooksPage() {
  const { items, loading, error, refetch } = useBooks()
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q),
    )
  }, [items, keyword])

  return (
    <section className="stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>독서 목록</h1>
        <Link to="/books/new">
          <Button>+ 새 기록</Button>
        </Link>
      </div>

      <Input
        label="검색"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="제목이나 저자로 검색"
      />

      {loading && <Loading message="목록을 불러오는 중…" />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={
            keyword
              ? '검색 결과가 없습니다.'
              : '아직 기록된 책이 없습니다.'
          }
          description={keyword ? undefined : '첫 번째 독서 기록을 남겨보세요.'}
          action={
            !keyword && (
              <Link to="/books/new">
                <Button>첫 기록 추가하기</Button>
              </Link>
            )
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && <BookList items={filtered} />}
    </section>
  )
}
