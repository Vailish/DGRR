import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../../cookies/Cookies'
import baseaxios from '../../API/baseaxios'
import ProfileModal from '../mainpage/ProfileModal'
import '../../scss/MianPage.scss'

const Nav = () => {
  const navigate = useNavigate()
  const [userNick, setUserNick] = useState("")
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const logout = () => {
    removeCookie('token')
    removeCookie('idetifier')
  }

  const toMain = () => {
    navigate(`/${userNick}`)
  }

  const fetchUserNick = async () => {
    const userNum = getCookie('identifier')
    const requestNickname = await baseaxios.post('api/v1/identifier', { 'identifier': userNum })
    const nickData = requestNickname.data
    setUserNick(nickData.nickname)
  }

  useEffect(() => {
    fetchUserNick()
  }, [])

  return (
    <nav className='Nav'>
      <p className='NavLogo' onClick={() => toMain()}>DG.RR</p>
      <div className='NavAvatar'>
        <p onClick={() => handleClick()}>user102</p>
        <p>|</p>
        <p onClick={() => logout()}>Logout</p>
      </div>
      {modalOpen && (
        <ProfileModal setModalOpen={setModalOpen} />
      )}
    </nav>
  )
}

export default Nav