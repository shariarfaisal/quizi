import React,{ useContext } from 'react'
import UserLogin from './UserLogin'
import UserSignup from './UserSignup'
import { UserBaseContext } from '../contexts/UserBaseContext'
import TakeQuiz from './TakeQuiz'

const Home = (props) => {
  const { user, loginMode, signupMode } = useContext(UserBaseContext)
  return(
    <div style={{minHeight: '80vh'}} className="row mx-0 justify-content-center align-items-center">
      {!user && loginMode && <UserLogin />}
      {!user && signupMode && <UserSignup />}
      {user && <TakeQuiz />}
    </div>
  )
}
export default Home
