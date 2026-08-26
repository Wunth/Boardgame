import { Outlet } from 'react-router'

import Header from './Header.tsx'
import Footer from './Footer.tsx'

export default function Layout() {
  return (
    <>
      <Header />
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}
