import React,{ createContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const AdminSubmissionContext = createContext()


const AdminSubmissionContextProvider = ({ children }) => {
  const history = useHistory()
  const [submissions,setSubmissions] = useState(null)
  const [userSubmissions,setUserSubmissions] = useState(null)
  const [submission,setSubmission] = useState(null)


  const getSubmissions = async ({ userId }) => {
    try{
      const get = await axios.get(`/submission${userId? `?userId=${userId}`: ''}`)
      if(get.data){
        setSubmissions(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/admin/login')
      }else{
        window.alert(err.response.data)
      }
    }
  }


  const getSubmissionsByUserId = async ({ userId }) => {
    try{
      const get = await axios.get(`/submission/${userId}/user`)
      if(get.data){
        setUserSubmissions(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/admin/login')
      }else{
        window.alert(err.response.data)
      }
    }
  }

  const getSubmission = async ({
    id, setError
  }) => {
    try{
      const get = await axios.get(`/submission/${id}`)
      if(get.data){
        setSubmission(get.data)
      }
    }catch(err){
      if(err.response.status === 404){
        setError("Not found.")
      }else if(err.response.status === 401){
        history.push('/admin/login')
      }else if(err.response){
        window.alert(err.response.data.message)
      }
    }
  }



  return(
    <AdminSubmissionContext.Provider value={{
      submissions, getSubmissions, getSubmissionsByUserId, userSubmissions, getSubmission, submission
    }}>
      { children }
    </AdminSubmissionContext.Provider>
  )
}
export default AdminSubmissionContextProvider
