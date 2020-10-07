import React,{ createContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const UserSubmissionContext = createContext()


const UserSubmissionContextProvider = ({ children }) => {
  const history = useHistory()
  const [submissions,setSubmissions] = useState(null)
  const [quizs,setQuizs] = useState(null)
  const [submission,setSubmission] = useState(null)

  const getSubmissions = async () => {
    try{
      const get = await axios.get('/submission/user')
      if(get.data){
        setSubmissions(get.data)
      }
    }catch(err){
      console.log(err);
      if(err.response.status === 401){
        history.push('/login')
      }else{
        window.alert(err.response.data)
      }
    }
  }

  const getQuizs = async () => {
    try{
      const get = await axios.get('/quiz/user')
      if(get.data){
        setQuizs(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/login')
      }
      window.alert(err.response.data)
    }
  }

  const takeQuiz = async ({
    id,
    setLoading
  }) => {
    try{
      setLoading(true)
      const create = await axios.post(`/submission/${id}/create`)
      if(create.data){
        setLoading(false)
        history.push(`/submission/${create.data.id}`)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 401){
        history.push('/login')
      }else if(err.response.status === 400){
        window.alert(err.response.data.errors.msg)
      }
      else if(err.response.status === 404){
        window.alert(err.response.data.message)
      }else{
        window.alert(err.response.data.message)
      }
    }
  }

  const getSubmission = async ({
    id
  }) => {
    try{
      const get = await axios.get(`/submission/${id}/foruser`)
      if(get.data){
        setSubmission(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/')
      }else if(err.response){
        window.alert(err.response.data.message)
      }
    }
  }

  const makeAnswer = async ({
    submissionId, questionId, payloads
  }) => {
    try{
      const get = await axios.post(`/submission/${submissionId}/${questionId}/answer`,payloads)
      if(get.data){
        submission.answers.push(get.data)

        if(get.data.question.answer === get.data.answer){
          submission.result += 1
        }

        setSubmission({...submission})
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/')
      }else if(err.response){
        window.alert(err.response.data.message)
      }
    }
  }



  return(
    <UserSubmissionContext.Provider value={{
      takeQuiz, submissions, getSubmissions, getSubmission, submission, getQuizs, quizs, makeAnswer
    }}>
      { children }
    </UserSubmissionContext.Provider>
  )
}
export default UserSubmissionContextProvider
