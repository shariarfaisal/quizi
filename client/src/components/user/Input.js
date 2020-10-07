import React from 'react'

const Input = ({ type, label, value, setValue, error }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <input
      id={label}
      type={type}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={label}
      className="form-control"
      required
    />
    <small style={{fontSize: '10px'}} className="text-danger">{error}</small>
  </div>
)

export default Input
