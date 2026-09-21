import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes.js'
import { useBooks } from '../hooks/useBooks.js'
import AsyncView from '../components/AsyncView.jsx'
import BookList from '../components/BookList.jsx'
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
        <Link to={ROUTES.newBook}>
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

      {/* 헤더와 검색창은 로딩·에러 중에도 그대로 둔다. 아래 영역만 4분기로 바뀐다. */}
      <AsyncView
        loading={loading}
        error={error}
        onRetry={refetch}
        loadingMessage="목록을 불러오는 중…"
        isEmpty={filtered.length === 0}
        emptyProps={{
          title: keyword ? '검색 결과가 없습니다.' : '아직 기록된 책이 없습니다.',
          description: keyword ? undefined : '첫 번째 독서 기록을 남겨보세요.',
          action: keyword ? undefined : (
            <Link to={ROUTES.newBook}>
              <Button>첫 기록 추가하기</Button>
            </Link>
          ),
        }}
      >
        {() => <BookList items={filtered} />}
      </AsyncView>
    </section>
  )
}
