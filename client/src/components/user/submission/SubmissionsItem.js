import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const SubmissionsItem = ({i, id, quiz, result, createdAt}) => {
  const [counter,setCounter] = useState(null)
  useEffect(() => {
    if(counter !== 'Time over'){
      setTimeout(() => {
        const create = new Date(createdAt).getTime()
        const duration = quiz.duration * 60 * 1000
        const deadline = create + duration
        const now = new Date().getTime()

        const due = deadline - now

        const dueSec = due/1000
        const dueMin = dueSec / 60
        const dueHour = Math.floor(dueMin) / 60

        if(due < 0){
          setCounter('Time over')
        }else{
          setCounter(`
            ${dueHour >= 1 ? Math.floor(dueHour)+':' : ''}
            ${Math.floor(dueMin)}:
            ${Math.floor((dueMin - Math.floor(dueMin)) * 60)}
          `)
        }
      },1000)
    }
  },[createdAt,counter,quiz])


  return(
    <div style={{fontSize: '12px'}}  className="list-group-item my-2 p-3 shadow-sm bg-light border-0 rounded-0 d-flex align-items-center">
      <div style={{width: "10%"}}>{i}</div>
      <div style={{width: "60%"}}><Link to={`/submission/${id}`}>{quiz.title}</Link></div>
      <div style={{width: "15%"}}>{ counter === 'Time over'? quiz.duration+'min' : counter}</div>
      <div style={{width: "15%"}}>{result? result: 0}</div>
    </div>
  )
}
export default SubmissionsItem
