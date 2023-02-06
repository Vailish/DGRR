import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate('/main')
    } else {
      navigate('/')
    }
  }, [localStorage.getItem('access-token')])
  return (
    <div>
      <h2>메인 페이지 입니다.</h2>
    </div>
  )
}
export default MainPage
