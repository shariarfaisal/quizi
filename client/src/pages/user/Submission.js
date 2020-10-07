import React from 'react'
import HomeLayout from '../../components/layout/user/Layout'
import SubmissionContent from '../../components/user/submission/Submission'
import UserSubmissionContextProvider from '../../components/contexts/UserSubmissionContext'

const Submission = (props) => {
  return(
    <HomeLayout>
      <UserSubmissionContextProvider>
        <SubmissionContent />
      </UserSubmissionContextProvider>
    </HomeLayout>
  )
}
export default Submission
