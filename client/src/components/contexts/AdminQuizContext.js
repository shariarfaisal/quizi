import React,{ createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export const AdminQuizContext = createContext()

const AdminQuizContextProvider = ({ children }) => {
  const [quizs,setQuizs] = useState(null)
  const [quiz,setQuiz] = useState(null)
  const [error,setError] = useState('')
  const history = useHistory()

  const checkErrors = ({
    err, setError
  }) => {
    if(err.response.status === 400){
      setError(err.response.data.errors)
    }else if(err.response.status === 404){
      // setError(err.response.data)
      window.alert(err.response.data.message)
    }else if(err.response.status === 401){
      localStorage.removeItem('x-admin-token')
      history.push('/admin/login')
    }else if(err.response.status === 500){
      window.alert("Server error")
      // FIXME: server error handling ...
    }
  }

  const createQuiz = async ({
    payloads,
    setData,
    setError,
    setLoading
  }) => {
    setLoading(true)
    try{
      const create = await axios.post('/quiz/create', payloads)
      if(create.data){
        setLoading(false)
        setError('')
        quizs.unshift(create.data)
        setQuizs([...quizs])
        setData(create.data)
      }
    }catch(err){
      setLoading(false)
      checkErrors({
        err, setError
      })
    }
  }

  const createQuestion = async ({
    quizId,
    payloads,
    setLoading,
    setEdit,
    setError
  }) => {
    setLoading(true)
    try{
      const { data } = await axios.post(`/quiz/${quizId}/question`, payloads)
      if(data){
        setLoading(false)
        setError('')

        quiz.questions.unshift(data)
        quiz.questionCount += 1
        setQuiz({...quiz})
        setEdit(false)
      }
    }catch(err){
      setLoading(false)
      if(err.response){
        console.log(err.response.data.errors);
        checkErrors({err,setError})
      }
    }
  }

  const updateQuestion = async ({
    quizId,
    questionId,
    payloads,
    setLoading,
    setEdit,
    setError
  }) => {
    setLoading(true)
    try{
      const { data } = await axios.put(`/quiz/${quizId}/${questionId}/update`, payloads)
      if(data){
        setLoading(false)
        setError('')

        let item = quiz.questions.find(i => {
          return i.id.toString() === data.id.toString()
        })
        item.name = data.name
        item.optionA = data.optionA
        item.optionB = data.optionB
        item.optionC = data.optionC
        item.optionD = data.optionD
        item.answer = data.answer
        setQuiz({...quiz})
        setEdit(false)
      }
    }catch(err){
      setLoading(false)
      if(err.response){
        console.log(err.response.data.errors);
        checkErrors({err,setError})
      }
    }
  }

  const publishQuiz = async ({
    quizId,
    setError,
    setLoading,
    published
  }) => {
    try{
      const { data } = await axios.put(`/quiz/${quizId}/published`,{ published })
      if(data){
        setLoading(false)
        quiz.published = data.published
        setQuiz({...quiz})
      }
    }catch(err){
      setLoading(false)
      checkErrors({err,setError})
    }
  }

  const deleteQuestion = async ({
    quizId,
    questionId,
    setLoading
  }) => {
    try{
      const { data } = await axios.delete(`/quiz/${quizId}/${questionId}/delete`)
      if(data){
        setLoading(false)
        let index = quiz.questions.findIndex(i => i.id === questionId)
        quiz.questions.splice(index,1)
        quiz.questionCount -= 1
        setQuiz({...quiz})
      }
    }catch(err){
      setLoading(false)
      console.log(err.response.data);
    }
  }


  const getQuizs = async () => {
    try{
      const items = await axios.get('/quiz')
      if(items.data){
        setError('')
        setQuizs(items.data)
      }
    }catch(err){
      checkErrors({
        err, setError
      })
    }
  }

  const getQuiz = async ({
    id,
    setError,
    setLoading
  }) => {
    setLoading(true)
    try{
      const item = await axios.get(`/quiz/${id}`)
      if(item.data){
        setLoading(false)
        setError('')
        setQuiz(item.data)
      }
    }catch(err){
      setLoading(false)
      checkErrors({
        err, setError,
      })
    }
  }

  useEffect(() => {
    if(history.location.pathname === '/admin/quiz' || history.location.pathname === '/admin/quiz/'){
      getQuizs()
    }
  },[])


  return(
    <AdminQuizContext.Provider value={{
      createQuiz, quizs, getQuiz, quiz, updateQuestion, createQuestion, deleteQuestion, publishQuiz
    }}>
      { children }
    </AdminQuizContext.Provider>
  )
}
export default AdminQuizContextProvider
