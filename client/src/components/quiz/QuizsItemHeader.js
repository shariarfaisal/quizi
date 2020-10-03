import React from 'react'

const QuizsItemHeader = (props) => {
  return(
    <div style={{
      fontSize: '10px'
    }} className="list-group-item py-3 my-2 border-0 bg-info rounded-0 shadow-sm">
      <div className="d-flex justify-content-around align-items-center text-light text-bold">
        <div style={{width: '8%'}}>#</div>
        <div style={{width: '50%'}}>Title</div>
        <div style={{width: '14%'}}>Published</div>
        <div style={{width: '14%'}}>Duration</div>
        <div style={{width: '14%'}}>Questions</div>
      </div>
    </div>
  )
}
export default QuizsItemHeader
