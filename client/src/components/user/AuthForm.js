import React from 'react'

const AuthForm = ({
  submitHandler,
  errors,
  success,
  username,
  setUsername,
  password,
  setPassword,
  loading,
  type,
  setMode
}) => {
  return(
    <form onSubmit={submitHandler} className="">
      <h5 className="text-center text-info">
        {type === 'signin' ? 'Sign In': 'Sign Up'}
      </h5>
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
      <div className="d-flex justify-content-center">
        <button
          style={{borderRadius: '20px'}}
          disabled={loading || (!username || !password)}
          className="btn btn-info px-5 d-flex align-items-center" type="submit">
          {type === 'signin' && <i className="bx bx-log-in mr-2"></i>}
          {type === 'signin'? 'Signin': 'Signup'}
          {loading && <i className="bx bx-loader bx-spin"></i>}
        </button>
      </div>
      <div style={{fontSize: '12px'}} className="mt-2 text-center">
        <small onClick={setMode} className="pointer text-info">
          {type === 'signin'? 'Register account': 'Log into your account'}
        </small>
      </div>
    </form>
  )
}
export default AuthForm
