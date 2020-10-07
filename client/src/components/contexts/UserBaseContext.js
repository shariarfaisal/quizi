import React,{ createContext,useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export const UserBaseContext = createContext()


const UserBaseContextProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  const header = 'x-user-token'
  const history = useHistory()


  // User Login method ...
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


// User Signup Method ...
  const getSignup = async ({
    payloads,
    setSuccess,
    setErrors,
    setLoading
  }) => {
    setLoading(true)
    try{
      const signup = await axios.post('/user/signup',payloads)
      if(signup.data){
        setLoading(false)
        setErrors('')
        setSuccess('Signup successful.')
        setTimeout(() => {
          history.push('/login')
        },1000)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 400){
        setErrors(err.response.data.errors)
      }
    }
  }

  // User logout method ...
  const getLogout = (e) => {
    localStorage.removeItem(header)
    window.location = '/login'
  }



  // Get User profile ...
  const getUserProfile = async () => {
    try{
      const user = await axios.get('/user/profile')
      if(user.data){
        setLoading(false)
        setUser(user.data)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 401){
        localStorage.removeItem(header)
        history.push('/login')
      }
    }
  }



  useEffect(() => {
    if(!history.location.pathname.includes('/admin')){
      if(localStorage.getItem(header)){
        getUserProfile()
      }else{
        history.push('/login')
      }
    }
  },[])


  return(
    <UserBaseContext.Provider value={{
      getLogin,
      getSignup,
      getLogout,
      user,
      header,
      loading,
      setLoading
    }}>
      { children }
    </UserBaseContext.Provider>
  )
}
export default UserBaseContextProvider
