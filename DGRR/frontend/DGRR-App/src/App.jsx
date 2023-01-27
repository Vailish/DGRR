import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import KioskSelect from './components/kiosk/KioskSelect'
import TEST from './components/kiosk/TEST'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/KioskSelect" element={<KioskSelect />} />
      <Route path="/TEST" element={<TEST/>} />
    </Routes>
  )
}

export default App
