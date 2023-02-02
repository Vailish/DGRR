import React from 'react'
import '../../scss/MianPage.scss'

const Nav = () => {
  return (
    <nav className='Nav'>
      <p className='NavLogo'>DG.RR</p>
      <div className='NavAvatar'>
        <p>user102</p>
        <p>|</p>
        <p>Logout</p>
      </div>
    </nav>
  )
}

export default Nav