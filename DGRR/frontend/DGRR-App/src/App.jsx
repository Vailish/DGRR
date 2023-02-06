import React from 'react'
import LoginForm from './containers/user/LoginForm'
import RegisterForm from './containers/user/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import MainPage from './containers/mainPage/MainPage'
import FindIdForm from './containers/user/FindIdForm'
import FindPwForm from './containers/user/FindPwForm'
import NotFound from './components/notfound/NotFound'
import IdFindSuccess from './components/user/Find/IdFindSuccess'
import PwFindSuccess from './components/user/Find/PwFindSuccess'
import MobileForm from './containers/user/MobileForm'
import MobilePin from './components/Mobile/MobilePin'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/findId" element={<FindIdForm />} />
      <Route path="/findIdSuccess" element={<IdFindSuccess />} />
      <Route path="/findPw" element={<FindPwForm />} />
      <Route path="/findPwSuccess" element={<PwFindSuccess />} />
      <Route path="/mLogin" element={<MobileForm />} />
      <Route path="/mPin" element={<MobilePin />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
