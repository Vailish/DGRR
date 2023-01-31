import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import MainPage from './components/mainpage/MainPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  )
}

export default App
