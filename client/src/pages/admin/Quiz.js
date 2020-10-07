import React from 'react'
import QuizContent from '../../components/quiz/Quiz'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminQuizContextProvider from '../../components/contexts/AdminQuizContext'


const Quiz = (props) => {
  return(
    <AdminLayout>
      <AdminQuizContextProvider>
        <QuizContent />
      </AdminQuizContextProvider>
    </AdminLayout>
  )
}
export default Quiz
