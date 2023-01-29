import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import KioskSelect from './components/kiosk/KioskSelect'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/KioskSelect" element={<KioskSelect />} />
    </Routes>
  )
}

export default App
