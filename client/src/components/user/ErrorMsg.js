import React from 'react'

const ErrorMsg = ({ msg }) => (
  <p className="text-danger text-center" style={{fontSize: '13px'}}>
    <i className="bx bx-error bx-flashing mr-3"></i>
    <span>{msg}</span>
  </p>
)
export default ErrorMsg
