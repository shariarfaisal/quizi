import React,{ useState, useContext, useEffect } from 'react'
import {UserBaseContext} from '../../contexts/UserBaseContext'
import { Link, useHistory } from 'react-router-dom'
import Input from '../Input'
import SuccessMsg from '../SuccessMsg'
import ErrorMsg from '../ErrorMsg'

const Login = (props) => {
  const history = useHistory()
  const { getLogin, user } = useContext(UserBaseContext)
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

  useEffect(() => {
    if(user){
      history.push('/')
    }
  },[user,history])

    return(
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 p-4 shadow bg-light">
        <form onSubmit={submitHandler} className="">
          <h5 className="text-center text-info">Sign In</h5>
          {errors.msg && <ErrorMsg msg={errors.msg} />}
          {success && <SuccessMsg msg={success} />}

          <Input
            type="text"
            label="Username"
            value={username}
            setValue={setUsername}
            error={errors.username ? errors.username : ''}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
            error={errors.password ? errors.password : ''}
          />

          <div className="d-flex justify-content-center">
            <button
              style={{borderRadius: '20px'}}
              disabled={loading || (!username || !password)}
              className="btn btn-info px-5 d-flex align-items-center" type="submit">
              <i className="bx bx-log-in mr-2"></i>
              Signin
              {loading && <i className="bx bx-loader bx-spin"></i>}
            </button>
          </div>
          <div style={{fontSize: '12px'}} className="mt-2 text-center">
            <Link to="/signup">Register account</Link>
          </div>
        </form>
      </div>
    )
}

export default Login
