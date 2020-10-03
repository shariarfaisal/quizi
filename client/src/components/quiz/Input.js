import React from 'react'

const Input = ({ value, label, name, setValue, error }) => (
  <div className="col-6 px-3 py-2 d-flex">
    <div className="input-group-prepend">
      <label htmlFor={label} className="text-uppercase rounded-0 border-0 input-group-text px-3">{label}</label>
    </div>
    <input placeholder={`Option ${label}`} required onChange={e => setValue(e.target.value)} id={label} name={name} className="form-control rounded-0 border-0" type="text" value={value} />
    <small style={{fontSize: '9px'}} className="text-danger">{error[name] && error[name]}</small>
  </div>
)

export default React.memo(Input)
