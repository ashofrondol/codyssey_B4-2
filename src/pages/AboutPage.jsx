import Card from '../components/Card.jsx'

export default function AboutPage() {
  return (
    <section className="stack">
      <h1>소개</h1>
      <Card>
        <h2>학습 목표</h2>
        <p>이 프로젝트는 React의 핵심 개념을 직접 구현하며 학습하기 위한 SPA 입니다.</p>
        <ul>
          <li>컴포넌트 단위로 화면을 분할하고 재사용한다.</li>
          <li>props 와 state 를 구분해 적절한 위치에 상태를 둔다.</li>
          <li>useEffect 의존성 배열을 활용해 비동기 데이터를 불러온다.</li>
          <li>로딩 / 에러 / 빈 / 성공 상태를 일관된 UI 패턴으로 처리한다.</li>
          <li>React Router 로 SPA 라우팅을 구성한다.</li>
        </ul>
      </Card>

      <Card>
        <h2>기술 스택</h2>
        <ul>
          <li>React 18 + Vite</li>
          <li>React Router v6</li>
          <li>Supabase (PostgreSQL)</li>
          <li>CSS Modules</li>
        </ul>
      </Card>
    </section>
  )
}
