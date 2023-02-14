import React, { useState } from 'react'
import ProfileModal from '../mainpage/ProfileModal'
import '../../scss/MianPage.scss'

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <nav className='Nav'>
      <p className='NavLogo'>DG.RR</p>
      <div className='NavAvatar'>
        <p onClick={() => handleClick()}>user102</p>
        <p>|</p>
        <p>Logout</p>
      </div>
      {modalOpen && (
        <ProfileModal setModalOpen={setModalOpen} />
      )}
    </nav>

  )
}

export default Nav