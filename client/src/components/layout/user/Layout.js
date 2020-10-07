import React,{ useContext } from 'react'
import { UserBaseContext } from '../../contexts/UserBaseContext'
import Header from './Header'

const Layout = ({ children }) => {
  const { user, getLogout, loading } = useContext(UserBaseContext)
  return(
    <div className="wrapper">

      {loading && <div className="text-muted">loading...</div>}

      {!loading && <div>
        <Header
          user={user}
          getLogout={getLogout}
        />

        <div className="home-content">
          { children }
        </div>
      </div>}

    </div>
  )
}
export default Layout
