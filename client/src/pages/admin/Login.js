import React,{ useState, useContext, useEffect } from 'react'
import {AdminBaseContext} from '../../components/contexts/AdminBaseContext'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
  const { getLogin, admin } = useContext(AdminBaseContext)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState('')
  const [success,setSuccess] = useState('')
  const [loading,setLoading] = useState(false)
  const history = useHistory()

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
    if(admin){
      history.push('/admin')
    }
  },[admin,history])

    return(
        <div className="admin-login">
            <div className="row mx-0 justify-content-center align-items-center" style={{height: '100vh'}}>
              <div className="col-10 col-sm-8 col-md-6 col-lg-5 shadow p-4" style={{minHeight: '200px'}}>
                <h3 className="text-center">Sign In</h3>
                <form onSubmit={submitHandler} className="">
                  {errors.msg && <p className="text-danger text-center" style={{fontSize: '13px'}}> <i className="bx bx-error bx-flashing"></i> { errors.msg}</p>}
                  {success && <p className="text-success text-center" style={{fontSize: '13px'}}><i className="bx bx-check-double"></i> {success}</p>}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Username"
                      className="form-control"
                      required
                    />
                  <small style={{fontSize: '10px'}} className="text-danger">{errors.username && errors.username}</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      className="form-control"
                      required
                    />
                  <small style={{fontSize: '10px'}} className="text-danger">{errors.password &&  errors.password}</small>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      disabled={loading || (!username || !password)}
                      className="btn btn-info px-3" type="submit">
                      Signin
                      {loading && <i className="bx bx-loader bx-spin"></i>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
    )
}

export default Login
