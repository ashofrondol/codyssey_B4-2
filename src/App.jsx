import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './routes.js'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import NewBookPage from './pages/NewBookPage.jsx'
import EditBookPage from './pages/EditBookPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.books} element={<BooksPage />} />
        <Route path={ROUTES.newBook} element={<NewBookPage />} />
        <Route path={ROUTES.bookDetail} element={<BookDetailPage />} />
        <Route path={ROUTES.editBook} element={<EditBookPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
