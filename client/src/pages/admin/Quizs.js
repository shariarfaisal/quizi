import React from 'react'
import QuizContent from '../../components/quiz/QuizContent'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminQuizContextProvider from '../../components/contexts/AdminQuizContext'


const Quizs = (props) => {
  return(
    <AdminLayout>
      <AdminQuizContextProvider>
        <QuizContent />
      </AdminQuizContextProvider>
    </AdminLayout>
  )
}
export default Quizs
