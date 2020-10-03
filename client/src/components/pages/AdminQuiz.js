import React from 'react'
import QuizContent from '../quiz/Quiz'
import AdminLayout from './AdminLayout'
import AdminQuizContextProvider from '../contexts/AdminQuizContext'


const AdminQuiz = (props) => {
  return(
    <AdminLayout>
      <AdminQuizContextProvider>
        <QuizContent />
      </AdminQuizContextProvider>
    </AdminLayout>
  )
}
export default AdminQuiz
