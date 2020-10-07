import React from 'react'

const SuccessMsg = ({ msg }) => (
  <p className="text-success text-center" style={{fontSize: '13px'}}>
    <i className="bx bx-check-double"></i>
    <span>{msg}</span>
  </p>
)
export default SuccessMsg
