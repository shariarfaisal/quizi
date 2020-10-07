import React from 'react'
import HomeLayout from '../../components/layout/user/Layout'
import SubmissionsContent from '../../components/user/submission/Submissions'
import UserSubmissionContextProvider from '../../components/contexts/UserSubmissionContext'

const Submissions = (props) => {
  return(
    <HomeLayout>
      <UserSubmissionContextProvider>
        <SubmissionsContent />
      </UserSubmissionContextProvider>
    </HomeLayout>
  )
}
export default Submissions
