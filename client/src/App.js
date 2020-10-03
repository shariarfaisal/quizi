import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminLogin from './components/pages/AdminLogin'
import AdminHome from './components/pages/AdminHome'
import AdminQuizs from './components/pages/AdminQuizs'
import AdminQuiz from './components/pages/AdminQuiz'
import Admins from './components/pages/Admins'
import Home from './components/pages/Home'
import UserSubmission from './components/pages/UserSubmission'
import AdminBaseContextProvider from './components/contexts/AdminBaseContext'
import UserBaseContextProvider from './components/contexts/UserBaseContext'


// const adminRoutes = [
//   {path:"/admin",component: AdminHome},
//   {path:"/admin/admins",component: Admins},
//   {path:"/admin/quiz",component: AdminQuizs},
//   {path:"/admin/quiz/:id",component: AdminQuiz},
//   {path:"/admin/login",component: AdminLogin},
// ]

const App = (props) => {
  return(
    <Router>
      <Switch>
        <AdminBaseContextProvider>
          <UserBaseContextProvider>
            <Route path="/" exact component={Home} />
            <Route path="/submission/:id" exact component={UserSubmission} />
            <Route path="/admin" exact component={AdminHome} />
            <Route path="/admin/admins" exact component={Admins} />
            <Route path="/admin/quiz" exact component={AdminQuizs} />
            <Route path="/admin/quiz/:id" exact component={AdminQuiz} />
            <Route path="/admin/login" exact component={AdminLogin} />
          </UserBaseContextProvider>
        </AdminBaseContextProvider>
      </Switch>
    </Router>
  )
}
export default App
