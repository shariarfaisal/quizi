import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ user, getLogout }) => {
  return(
    <div className="shadow-sm">
      <div className="d-flex container align-items-center py-2">
        <Link style={{textDecoration: 'none'}} className="text-info" to="/">Quiz App</Link>
        <ul className="nav ml-auto" style={{fontSize: '12px'}}>
          {user && <li className="nav-item text-info">
            <Link to="/submission" className="nav-link text-info">submissions</Link>
          </li>}
          {user && <li className="nav-item text-info">
            <span className="nav-link">{user.username}</span>
          </li>}
          {user && <li className="nav-item text-danger pointer">
            <span onClick={getLogout} className="nav-link"><i className="bx bx-log-out mr-2"></i>logout</span>
          </li>}
          {!user && <li className="nav-item text-danger pointer">
            <Link className="nav-link" to="/login">Login</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}
export default Header
