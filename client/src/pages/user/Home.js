import React from 'react'
import HomeLayout from '../../components/layout/user/Layout'
import HomeContet from '../../components/user/Home'
import UserSubmissionContextProvider from '../../components/contexts/UserSubmissionContext'


const Home = (props) => {
  return(
    <HomeLayout>
      <UserSubmissionContextProvider>
        <HomeContet />
      </UserSubmissionContextProvider>
    </HomeLayout>
  )
}
export default Home
