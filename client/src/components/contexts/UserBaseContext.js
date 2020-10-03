import React,{ createContext,useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const UserBaseContext = createContext()


const UserBaseContextProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loginMode,setLoginMode] = useState(false)
  const [signupMode,setSignupMode] = useState(false)
  const header = 'x-user-token'
  const history = useHistory()


  // Get User Login ...
  const getLogin = async ({
    payloads,
    setSuccess,
    setErrors,
    setLoading
  }) => {
    try{
      const signin = await axios.post('/user/signin',payloads)
      if(signin.data){
        setLoading(false)
        setErrors('')
        setSuccess('Login successful.')
        localStorage.setItem(header,'Bearer '+signin.data.accessToken)
        setTimeout(() => {
          window.location = '/'
        },1000)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 400){
        setErrors(err.response.data.errors)
      }
    }
  }


  const getSignup = async ({
    payloads,
    setSuccess,
    setErrors,
    setLoading,
    setMode
  }) => {
    setLoading(true)
    try{
      const signup = await axios.post('/user/signup',payloads)
      if(signup.data){
        setLoading(false)
        setErrors('')
        setSuccess('Signup successful.')
        setTimeout(() => {
          setMode()
        },1000)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 400){
        setErrors(err.response.data.errors)
      }
    }
  }

  const getLogout = (e) => {
    localStorage.removeItem(header)
    window.location = '/'
  }

  // Get User profile ...
  const getUserProfile = async () => {
    try{
      const user = await axios.get('/user/profile')
      if(user.data){
        setUser(user.data)
      }
    }catch(err){
      if(err.response.status === 401){
        localStorage.removeItem(header)
        setLoginMode(true)
      }
    }
  }

  const takeQuiz = async ({
    setData,
    setError,
    setLoading
  }) => {
    try{
      setLoading(true)
      const quiz = await axios.get('/submission/take')
      if(quiz.data){
        setLoading(false)
        setData(quiz.data)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 401){
        setLoginMode(true)
      }else if(err.response.status === 404){
        setError("Not found")
      }else{
        console.log(err.response);
      }
    }
  }


  const getSubmission = async ({
    id, setData
  }) => {
    try{
      const get = await axios.get(`/submission/${id}`)
      if(get.data){
        setData(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/')
      }else if(err.response){
        window.alert(err.response.data.message)
      }

    }
  }


  useEffect(() => {
    if(localStorage.getItem(header)){
      getUserProfile()
    }else{
      setLoginMode(true)
    }
  },[])


  return(
    <UserBaseContext.Provider value={{
      takeQuiz, getLogin, getSignup, getLogout, user, header, loginMode, signupMode, setLoginMode, setSignupMode, getSubmission
    }}>
      { children }
    </UserBaseContext.Provider>
  )
}
export default UserBaseContextProvider
