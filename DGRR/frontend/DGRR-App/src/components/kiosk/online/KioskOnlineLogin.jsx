import React from 'react'
import '../../../scss/KioskOnlineLogin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OnlineLoginUser'
// import axios from 'axios'
import { api } from '../../../API/api'
import KioskNavBlock from '../KioskNavBlock'
import KioskOnlineProfile from './KioskOnlineProfile'

const KioskOnlineLogin = () => {
  let pinNumber = undefined
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const player = useSelector(state => state.OnlineLoginUser.player)
  const nickname = player.nickname
  // const nickname = '김볼링'
  console.log(nickname)
  console.log(player)
  const inputPinNumber = e => {
    pinNumber = e.target.value
    console.log(pinNumber)
  }
  const CustomInput = props => {
    const { InputValue, InputPin, InputClassName } = props
    return (
      <input
        type="number"
        value={InputValue}
        onChange={InputPin}
        className={InputClassName}
        style={{ fontSize: '2vw' }}
      />
    )
  }
  const onAddPlayer = async () => {
    // pinNumber = ''
    const pinNum = String(pinNumber)
    const url = '/v1/matching/' + pinNum
    const response = await api.get(url)
    console.log('response : ', response)
    dispatch(addPlayer(response.data))
  }
  const reqJoin = async nickname => {
    const url = '/v1/game/matching/join'
    const response = await api.post(url, JSON.stringify({ nickname }))
    if (response.data) navigate('/KioskOnlineFind')
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
            <div className="WelcomePlayer">{nickname ? <KioskOnlineProfile player={player} /> : null}</div>
          </div>
        </div>
      </div>
      <div className="GameStartBlock">
        <Link
          to={nickname === 'test!' ? '/KioskOnlineMatching' : '/KioskOnlineFind'}
          className="GameStartButton"
          onClick={() => reqJoin(nickname)}
        >
          시작
        </Link>
      </div>
    </div>
  )
}

export default KioskOnlineLogin
