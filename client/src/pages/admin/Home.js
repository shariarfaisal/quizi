import React from 'react'
import HomeBody from '../../components/home/HomeBody'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminSubmissionContextProvider from '../../components/contexts/AdminSubmissionContext'


const Home = (props) => {
  return(
    <AdminLayout>
      <AdminSubmissionContextProvider>
        <HomeBody />
      </AdminSubmissionContextProvider>
    </AdminLayout>
  )
}
export default Home
