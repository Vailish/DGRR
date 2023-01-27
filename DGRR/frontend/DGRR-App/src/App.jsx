import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IdFind from './components/user/Find/IdFind'
import PwFind from './components/user/Find/PwFind'
import Login from './components/user/Login/Login'
import Join from './components/user/Join/Join'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/findId" element={<IdFind />} />
      <Route path="/findPw" element={<PwFind />} />
    </Routes>
  )
}

export default App
