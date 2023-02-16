import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../../cookies/Cookies'
import baseaxios from '../../API/baseaxios'
import ProfileModal from '../mainpage/ProfileModal'
import '../../scss/MianPage.scss'

const Nav = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [userNick, setUserNick] = useState("")
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    fetchUserNick()
    navigate(`/${userNick}`)
    window.scrollTo(0, 0);
  };

  const logout = () => {
    removeCookie('token')
    removeCookie('identifier')
    alert("로그아웃 되었습니다.")
    navigate('/')
  }

  const toMain = () => {
    fetchUserNick()
    navigate(`/${userNick}`)
    window.scrollTo(0, 0);
  }

  const fetchUserNick = async () => {
    try {
      const userNum = getCookie('identifier')
      const requestNickname = await baseaxios.post('api/v1/identifier', { 'identifier': userNum })
      const nickData = requestNickname.data
      setUserNick(nickData.nickname)
      
    } catch (error) {
      console.log('fetchUserNick', error)
    }
  }

  const fetchUserName = async () => {
    try {
      const requestUser = await baseaxios.get(`/api/v1/user/${userNick}`)
      const userData = requestUser.data
      setUserName(userData.username)
      
    } catch (error) {
      console.log('fetchUserName', error)
    }
  }

  useEffect(() => {
    fetchUserNick()
  }, [])

  useEffect(() => {
    if (userNick) {
      fetchUserName()
    }
  }, [userNick])
  

  return (
    <nav className='Nav'>
      <p className='NavLogo' onClick={() => toMain(userNick)}>DG.RR</p>
      <div className='NavAvatar'>
        <div className='UserNameText' onClick={() => handleClick()}>{userName}</div>
        <div className='DivideLine'>|</div>
        <div className='LogoutText' onClick={() => logout()}>로그아웃</div>
      </div>
      {modalOpen && (
        <ProfileModal setModalOpen={setModalOpen} />
      )}
    </nav>
  )
}

export default Nav