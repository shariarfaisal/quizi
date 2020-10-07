import React,{ createContext,useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const AdminBaseContext = createContext()


const AdminBaseContextProvider = ({ children }) => {
  const [admin,setAdmin] = useState(null)
  const [admins,setAdmins] = useState(null)
  const [users,setUsers] = useState(null)
  const header = 'x-admin-token'
  const history = useHistory()


  // Get All users
  const getUsers = async () => {
    try{
      const get = await axios.get('/user')
      if(get.data){
        setUsers(get.data)
      }
    }catch(err){
      if(err.response.status === 401){
        history.push('/admin/login')
      }else{
        console.log(err);
      }
    }
  }


  // Get Admin Login ...
  const getLogin = async ({
    payloads,
    setSuccess,
    setErrors,
    setLoading
  }) => {
    try{
      const signin = await axios.post('/admin/signin',payloads)
      if(signin.data){
        setLoading(false)
        setErrors('')
        setSuccess('Login successful.')
        localStorage.setItem(header,'Bearer '+signin.data.accessToken)
        setTimeout(() => {
          window.location = '/admin'
        },1000)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 400){
        setErrors(err.response.data.errors)
      }
    }
  }

  // Get Admin profile ...
  const getAdmin = async () => {
    try{
      const admin = await axios.get('/admin/profile')
      if(admin.data){
        setAdmin(admin.data)
      }
    }catch(err){
      if(err.response.status === 401){
        localStorage.removeItem(header)
        history.push('/admin/login')
      }
    }
  }


  // Get Admins Data ...
  const getAdmins = async ({
    setLoading,
    setErrors
  }) => {
    setLoading(true)
    try{
      const admins = await axios.get('/admin')
      if(admins.data){
        setLoading(false)
        setAdmins(admins.data)
      }
    }catch(err){
      setLoading(false)
      if(err.response.status === 401){
        history.push('/admin/login')
      }else if(err.response.status === 500){
        // FIXME: Server error handling ...
      }
    }
  }

  useEffect(() => {
    if(history.location.pathname.includes('/admin')){
      if(localStorage.getItem(header)){
        getAdmin()
      }else{
        history.push('/admin/login')
      }
    }
  },[])


  return(
    <AdminBaseContext.Provider value={{
      getLogin, admin, getAdmins, admins, header, users, getUsers
    }}>
      { children }
    </AdminBaseContext.Provider>
  )
}
export default AdminBaseContextProvider
