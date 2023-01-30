import React from 'react'
import '../../scss/MianPage.scss'

const Nav = () => {
  return (
    <nav className='nav'>
      <p className='nav__logo'>DG.RR</p>
      <div className='nav__avatar'>
        <p>user102</p>
        <p>|</p>
        <p>Logout</p>
      </div>
    </nav>
  )
}

export default Nav