import React from 'react'
import SubmissionComponent from '../../components/home/Submission'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminSubmissionContextProvider from '../../components/contexts/AdminSubmissionContext'


const Submission = (props) => {
  return(
    <AdminLayout>
      <AdminSubmissionContextProvider>
        <SubmissionComponent />
      </AdminSubmissionContextProvider>
    </AdminLayout>
  )
}
export default Submission
