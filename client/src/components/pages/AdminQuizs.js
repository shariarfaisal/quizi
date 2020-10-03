import React from 'react'
import QuizContent from '../quiz/QuizContent'
import AdminLayout from './AdminLayout'
import AdminQuizContextProvider from '../contexts/AdminQuizContext'


const AdminQuizs = (props) => {
  return(
    <AdminLayout>
      <AdminQuizContextProvider>
        <QuizContent />
      </AdminQuizContextProvider>
    </AdminLayout>
  )
}
export default AdminQuizs
