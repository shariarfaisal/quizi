import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Admin Pages
import AdminLogin from './pages/admin/Login'
import AdminHome from './pages/admin/Home'
import Users from './pages/admin/Users'
import AdminUserSubmission from './pages/admin/UserSubmission'
import AdminSubmission from './pages/admin/Submission'
import AdminQuizs from './pages/admin/Quizs'
import AdminQuiz from './pages/admin/Quiz'
import Admins from './pages/admin/Admins'
// User Pages
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import UserSubmission from './pages/user/Submission'
import UserSubmissions from './pages/user/Submissions'
import AdminBaseContextProvider from './components/contexts/AdminBaseContext'
import UserBaseContextProvider from './components/contexts/UserBaseContext'


const App = (props) => {
  return(
    <Router>
      <Switch>
        <AdminBaseContextProvider>
          <UserBaseContextProvider>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/submission" exact component={UserSubmissions} />
            <Route path="/submission/:id" exact component={UserSubmission} />
            <Route path="/admin" exact component={AdminHome} />
            <Route path="/admin/users" exact component={Users} />
            <Route path="/admin/users/:userId/submissions" exact component={AdminUserSubmission} />
            <Route path="/admin/submission/:id" exact component={AdminSubmission} />
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
