import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import KioskSelect from './components/kiosk/KioskSelect'
import KioskLogin from './components/kiosk/offline/KioskLogin'
import KioskOfflineGame from './components/kiosk/offline/KioskOfflineGame'
import KioskOfflineResult from './components/kiosk/offline/KioskOfflineResult'
import ScoreTable from './components/kiosk/offline/ScoreTable'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/KioskSelect" element={<KioskSelect />} />
      <Route path="/KioskLogin" element={<KioskLogin />} />
      <Route path="/KioskOfflineGame" element={<KioskOfflineGame />} />
      <Route path="/ScoreTable" element={<ScoreTable />} />
      <Route path="/KioskOfflineResult" element={<KioskOfflineResult />} />
    </Routes>
  )
}

export default App
