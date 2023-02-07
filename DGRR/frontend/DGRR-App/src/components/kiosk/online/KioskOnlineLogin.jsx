import React from 'react'
import '../../../scss/KioskOnlineLogin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import KioskNavBlock from '../KioskNavBlock'

const KioskOnlineLogin = () => {
  let pinNumber = undefined
  const dispatch = useDispatch()
  const inputPinNumber = e => {
    pinNumber = e.target.value
  }
  const CustomInput = props => {
    const { InputValue, InputPin, InputClassName } = props
    return <input value={InputValue} onChange={InputPin} className={InputClassName} />
  }
  const onAddPlayer = () => {
    // pinNumber = ''
    dispatch(addPlayer(pinNumber))
    console.log(pinNumber)
  }
  const players = useSelector(state => state.OfflineLoginUsers.players)
  const always4Blocks = () => {
    const playersList = [...players]
    for (let i = playersList.length; i < 4; i++) {
      playersList.push({})
    }
    return playersList
  }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskSelect" />
      <div className="ContentBlock">
        <div className="PinQRBlock">
          <div className="QRBlock">
            <div className="QRImage"></div>
            <div className="QRTitle">QR코드로 PIN번호 받기</div>
            <div className="QRText">
              QR스캔을 통해 웹사이트에 접속하여 로그인 후 화면에 출력되는 개인 PIN번호를 입력해주세요
            </div>
          </div>
          <div className="OnlinePinInputBlock">
            <CustomInput InputClassName="PinInput" InputPin={inputPinNumber} InputValue={pinNumber}></CustomInput>
            <button className="PinOkButton" onClick={onAddPlayer}>
              확인
            </button>
          </div>
        </div>
        <div className="UsersBlock">
          <div className="PlayersBlock">
            <div className="WelcomePlayer">
              <div className="WelcomeText">떼구르르에 오신 것을 환영합니다. 볼링 실력을 뽐내보세요</div>
            </div>
          </div>
        </div>
      </div>
      <div className="GameStartBlock">
        <Link to="/KioskOnlineProfile" className="GameStartButton">
          START
        </Link>
      </div>
    </div>
  )
}

export default KioskOnlineLogin
