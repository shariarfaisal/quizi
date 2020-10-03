import React from 'react'
import { Link } from 'react-router-dom'
 
const NavItem = ({ name, link }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link text-info" to={link}>{name}</Link>
    </li>
  )
}

export default NavItem
