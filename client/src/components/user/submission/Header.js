import React from 'react'

const Header = ({ title, counter, result,wrong, done }) => {
  return(
    <div className="d-flex justify-content-between align-items-center bg-light my-3 p-4 text-muted shadow">
      <h4>{title}</h4>
      <div className="d-flex"  style={{fontSize: '10px'}}>
        <div className="mx-3 d=flex">
          <strong>Score: </strong>
          <span className="badge badge-success px-2">{result ? result: 0}</span>
          <span className="badge badge-danger px-2 mx-2">{wrong}</span>
        </div>
        {!done && <span className="d-flex align-items-center mx-2">
          <i className="bx bxs-time mr-2"></i>
          {counter && counter}
        </span>}
      </div>
    </div>
  )
}
export default Header
