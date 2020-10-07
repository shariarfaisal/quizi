import React from 'react'
import './style.scss'
import NavItem from './NavItem'

const getLogout = e => {
  localStorage.removeItem('x-admin-token')
  window.location = '/admin/login'
}

const Nav = (props) => {
  return(
    <div className="layout-nav">
      <ul className="nav flex-column pl-4">
        <NavItem name="Home" link="/admin" />
          <NavItem name="Quiz" link="/admin/quiz" />
        <NavItem name="Admins" link="/admin/admins" />
        <NavItem name="Users" link="/admin/users" />
        <li className="nav-item">
          <span onClick={getLogout} className="nav-link text-info pointer"><i className="bx bx-log-out mr-3"></i>Logout</span>
        </li>
      </ul>
    </div>
  )
}
export default Nav
