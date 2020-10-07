import React from 'react'
import QuizsItem from './QuizsItem'
import QuizsItemHeader from './QuizsItemHeader'


const Quizs = ({ quizs }) => {
  return(
    <div className="list-group mt-3">
      <QuizsItemHeader />
      {quizs.length === 0 && <div className="list-group-item my-2 p-3 rounded-0 border-0 text-center">No Item</div>}
      {quizs.map((quiz,i) => <QuizsItem key={i} i={i+1} {...quiz} />)}
    </div>
  )
}
export default Quizs
