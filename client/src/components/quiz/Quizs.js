import React from 'react'
import QuizsItem from './QuizsItem'
import QuizsItemHeader from './QuizsItemHeader'


const Quizs = ({ quizs }) => {
  return(
    <div className="list-group mt-3">
      <QuizsItemHeader />
      {quizs.map((quiz,i) => <QuizsItem key={i} i={i+1} {...quiz} />)}
    </div>
  )
}
export default Quizs
