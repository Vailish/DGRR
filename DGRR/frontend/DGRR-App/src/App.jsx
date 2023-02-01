import React from 'react'
import LoginForm from './containers/user/LoginForm'
import RegisterForm from './containers/user/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/Mainpage'
import Rankingpage from './pages/Rankingpage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/main" element={<MainPage />} />
      <Route path=":nickName" element={<MainPage />} />
      <Route path="ranking" element={<Rankingpage />} />
    </Routes>
  )
}

export default App
