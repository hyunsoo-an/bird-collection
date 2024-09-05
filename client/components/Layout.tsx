import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <Outlet />
        </div>
      </div>
    </>
  )
}
