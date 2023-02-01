import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import MainPage from './pages/Mainpage'
import Rankingpage from './pages/Rankingpage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path=":nickName" element={<MainPage />} />
      <Route path="ranking" element={<Rankingpage />} />
    </Routes>
  )
}

export default App
