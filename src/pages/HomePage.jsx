import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'

export default function HomePage() {
  return (
    <section className="stack">
      <header>
        <h1>📚 Reading Log</h1>
        <p className="muted">
          내가 읽은 책의 제목, 저자, 별점, 짧은 감상을 기록하는 SPA 입니다.
        </p>
      </header>

      <Card>
        <h2>이 앱으로 무엇을 할 수 있나요?</h2>
        <ul>
          <li>독서 목록을 카드 형태로 한눈에 확인하기</li>
          <li>책 한 권을 클릭해서 상세 페이지에서 자세히 보기</li>
          <li>새 책 기록 등록 / 수정 / 삭제 (Supabase 연동)</li>
          <li>로딩, 에러, 빈 상태를 일관된 UI로 처리</li>
        </ul>

        <div className="row" style={{ marginTop: 16 }}>
          <Link to="/books">
            <Button>독서 목록 보러가기</Button>
          </Link>
          <Link to="/books/new">
            <Button variant="secondary">새 기록 추가</Button>
          </Link>
        </div>
      </Card>
    </section>
  )
}
