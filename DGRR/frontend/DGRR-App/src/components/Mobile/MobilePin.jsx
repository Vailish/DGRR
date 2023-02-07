import React, { useState, useEffect } from 'react'
import '../../scss/MobilePin.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
const MobilePin = () => {
  const [pin, setPin] = useState('')
  const reqPinNumber = async (username, password) => {
    try {
      const userInfo = {
        username: username,
        password: password,
      }
      const response = await axios.post('http://192.168.31.142:8080/api/v1/request/pin', JSON.stringify(userInfo), {
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
  const navigate = useNavigate()
  const location = useLocation()
  const { username, password } = location.state
  const onPinCheck = () => {
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
          <div className="MobilePinCount">
            {username} <br />
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
