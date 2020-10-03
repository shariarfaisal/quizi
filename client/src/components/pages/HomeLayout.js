import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserBaseContext } from '../contexts/UserBaseContext'


const HomeLayout = ({ children }) => {
  const { user, getLogout } = useContext(UserBaseContext)
  return(
    <div className="wrapper">

      { /* Heading Navigation */ }
      <div className="bg-light shadow-sm">
        <div className="d-flex container align-items-center py-2">
          <h4>Quiz App</h4>
          <ul className="nav ml-auto" style={{fontSize: '12px'}}>
            {user && <li className="nav-item text-info">
              <span className="nav-link">{user.username}</span>
            </li>}
            {user && <li className="nav-item text-danger pointer">
              <span onClick={getLogout} className="nav-link"><i className="bx bx-log-out mr-2"></i>logout</span>
            </li>}
          </ul>
        </div>
      </div>

      {/* Content section */}
      <div className="home-content">
        { children }
      </div>
    </div>
  )
}
export default HomeLayout
