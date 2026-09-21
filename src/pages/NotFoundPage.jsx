import { Link } from 'react-router-dom'
import { ROUTES } from '../routes.js'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFoundPage() {
  return (
    <EmptyState
      title="404 - 페이지를 찾을 수 없습니다."
      description="요청하신 주소는 존재하지 않거나 이동되었습니다."
      action={
        <Link to={ROUTES.home}>
          <Button>홈으로 돌아가기</Button>
        </Link>
      }
    />
  )
}
