import React from 'react'
import UsersBody from '../../components/users/Users'
import AdminLayout from '../../components/layout/admin/AdminLayout'
import AdminBaseContextProvider from '../../components/contexts/AdminBaseContext'


const Users = (props) => {
  return(
    <AdminLayout>
      <AdminBaseContextProvider>
        <UsersBody />
      </AdminBaseContextProvider>
    </AdminLayout>
  )
}
export default Users
