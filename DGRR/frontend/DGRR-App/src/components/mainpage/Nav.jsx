import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../../cookies/Cookies'
import baseaxios from '../../API/baseaxios'
import ProfileModal from '../mainpage/ProfileModal'
import '../../scss/MianPage.scss'

const Nav = ({ username }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [userNick, setUserNick] = useState("")
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const logout = () => {
    removeCookie('token')
    removeCookie('identifier')
    navigate('/')
  }

  const toMain = () => {
    navigate(`/${userNick}`)
  }

  const fetchUserNick = async () => {
    const userNum = getCookie('identifier')
    const requestNickname = await baseaxios.post('api/v1/identifier', { 'identifier': userNum })
    const nickData = requestNickname.data
    setUserNick(nickData.nickname)
    setUserName(username)
  }

  useEffect(() => {
    fetchUserNick()
  }, [])

  return (
    <nav className='Nav'>
      <p className='NavLogo' onClick={() => toMain(userNick)}>DG.RR</p>
      <div className='NavAvatar'>
        <p onClick={() => handleClick()}>{userName}</p>
        <p>|</p>
        <p onClick={() => logout()}>로그아웃</p>
      </div>
      {modalOpen && (
        <ProfileModal setModalOpen={setModalOpen} />
      )}
    </nav>
  )
}

export default Nav