import React,{ useState, useContext } from 'react'
import {UserBaseContext} from '../contexts/UserBaseContext'
import AuthForm from './AuthForm'

const UserLogin = (props) => {
  const { getLogin, setSignupMode, setLoginMode } = useContext(UserBaseContext)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState('')
  const [success,setSuccess] = useState('')
  const [loading,setLoading] = useState(false)

  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
    getLogin({
      payloads:{ username, password },
      setSuccess,
      setErrors,
      setLoading
    })
  }

  const modeSwip = () => {
    setLoginMode(false)
    setSignupMode(true)
  }

    return(
      <div className="col-sm-8 col-md-6 col-lg-4 p-4 shadow bg-light">
        <AuthForm
          submitHandler={submitHandler}
          errors={errors}
          success={success}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loading={loading}
          type="signin"
          setMode={modeSwip}
        />
      </div>
    )
}

export default UserLogin
