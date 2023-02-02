import React from 'react'
import LoginForm from './containers/user/LoginForm'
import RegisterForm from './containers/user/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import MainPage from './containers/mainPage/MainPage'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  )
}

export default App
