import React from 'react'
import LoginForm from './containers/user/LoginForm'
import RegisterForm from './containers/user/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import KioskSelect from './components/kiosk/KioskSelect'
import KioskLogin from './components/kiosk/offline/KioskLogin'
import KioskOfflineGame from './components/kiosk/offline/KioskOfflineGame'
import KioskOfflineResult from './components/kiosk/offline/KioskOfflineResult'
import KioskOnlineLogin from './components/kiosk/online/KioskOnlineLogin'
import KioskOnlineProfile from './components/kiosk/online/KioskOnlineProfile'
import KioskOnlineFind from './components/kiosk/online/KioskOnlineFind'
import KioskOnlineMatching from './components/kiosk/online/KioskOnlineMatching'
import KioskOnlineGame from './components/kiosk/online/KioskOnlineGame'
import MainPage from './pages/Mainpage'
import Rankingpage from './pages/Rankingpage'
import OnlineScoreTable from './components/kiosk/online/OnlineScoreTable'
import KioskOnlineResult from './components/kiosk/online/KioskOnlineResult'

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
      <Route path="/KioskSelect" element={<KioskSelect />} />
      <Route path="/KioskLogin" element={<KioskLogin />} />
      <Route path="/KioskOfflineGame" element={<KioskOfflineGame />} />
      <Route path="/KioskOfflineResult" element={<KioskOfflineResult />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="ranking" element={<Rankingpage />} />
      <Route path=":nickName" element={<MainPage />} />
      <Route path="/KioskOnlineLogin" element={<KioskOnlineLogin />} />
      <Route path="/KioskOnlineProfile" element={<KioskOnlineProfile />} />
      <Route path="/KioskOnlineFind" element={<KioskOnlineFind />} />
      <Route path="/KioskOnlineMatching" element={<KioskOnlineMatching />} />
      <Route path="/KioskOnlineGame" element={<KioskOnlineGame />} />
      <Route path="/OnlineScoreTable" element={<OnlineScoreTable />} />
      <Route path="/findId" element={<FindIdForm />} />
      <Route path="/findIdSuccess" element={<IdFindSuccess />} />
      <Route path="/findPw" element={<FindPwForm />} />
      <Route path="/findPwSuccess" element={<PwFindSuccess />} />
      <Route path="/mLogin" element={<MobileForm />} />
      <Route path="/mPin" element={<MobilePin />} />
      <Route path="/KioskOnlineResult" element={<KioskOnlineResult />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
