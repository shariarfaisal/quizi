import React, { useState } from 'react'
import CreateQuizForm from './CreateQuizForm'

const CreateQuiz = (props) => {
  const [open,setOpen] = useState(false)
  return(
    <div className="col-12 py-4 mt-5">
      <div onClick={e => setOpen(true)} className="pointer text-info">
        <i className="bx bx-plus"></i>
        <span>Create New</span>
      </div>
      {open && <div className="slow-mo row mx-0 justify-content-center">
        <div className="col-lg-10 shadow p-3 bg-light mt-4" style={{minHeight: '150px'}}>

          <CreateQuizForm setOpen={setOpen} />

        </div>
      </div>}
    </div>
  )
}
export default CreateQuiz
