import React, { useState, useEffect } from 'react'
import '../../scss/MobilePin.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { getCookie, removeCookie } from '../../cookies/Cookies'
import { request } from '../../API/request'
const MobilePin = () => {
  const [min, setMin] = useState(5)
  const [sec, setSec] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { username, password } = location.state

  useEffect(() => {
    if (getCookie('token')) {
    } else {
      navigate('/mLogin')
    }
  })
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1)
      }
      if (parseInt(sec) === 0) {
        if (parseInt(min) === 0) {
          clearInterval(countdown)
          window.location.reload()
        } else {
          setMin(parseInt(min) - 1)
          setSec(59)
        }
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [min, sec])

  const [pin, setPin] = useState('')
  const reqPinNumber = async (username, password) => {
    try {
      const userInfo = {
        username: username,
        password: password,
      }
      const response = await request.post('/api/v1/request/pin', JSON.stringify(userInfo), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      if (response.status === 200) {
        console.log(response.data)
        setPin(response.data)
      }
    } catch (e) {
      console.log('에러가 났어요')
    }
  }

  const onPinCheck = () => {
    removeCookie('token')
    navigate('/mLogin')
  }

  useEffect(() => {
    if (username && password) {
      reqPinNumber(username, password)
    }
  }, [username, password])
  return (
    <div className="MobilePinTheme">
      <div className="MobilePin">
        <div className="MobilePinText">
          <div className="MobilePinTitleText">
            <h1>DG.RR</h1>
          </div>
        </div>
        <div className="MobilePinForm">
          <div className="MobilePinName">pinNo</div>
          <div className="MobilePinCount">
            <div className="MobileUserName">{username}</div>
            <div style={{ color: min < 1 ? 'red' : '' }} className="MobileCountDown">
              {min}:{sec < 10 ? `0${sec}` : sec}
            </div>
          </div>
          <div className="MobilePinNumber">{pin}</div>
          <div className="MobilePinButton">
            <button onClick={onPinCheck}>확인</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobilePin
