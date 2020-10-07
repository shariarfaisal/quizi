import React from 'react'
import HomeBody from '../../components/users/Submissions'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminSubmissionContextProvider from '../../components/contexts/AdminSubmissionContext'


const UserSubmission = (props) => {
  return(
    <AdminLayout>
      <AdminSubmissionContextProvider>
        <HomeBody />
      </AdminSubmissionContextProvider>
    </AdminLayout>
  )
}
export default UserSubmission
