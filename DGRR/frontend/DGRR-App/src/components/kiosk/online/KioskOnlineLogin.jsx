import React from 'react'
import '../../../scss/KioskOnlineLogin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPlayer, removePlayer } from '../../../modules/OnlineLoginUser'
import { api } from '../../../API/api'
import KioskNavBlock from '../KioskNavBlock'
import KioskOnlineProfile from './KioskOnlineProfile'
import QRImage from '../../../img/mLogin.png'

const KioskOnlineLogin = () => {
  let pinNumber = undefined
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const player = useSelector(state => state.OnlineLoginUser.player)
  const nickname = player.nickname
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
    const pinNum = String(pinNumber)
    const url = '/api/v1/matching/' + pinNum
    try {
      const response = await api.get(url)
      const addingPlayer = { ...response.data }
      const imgUrl = '/api/v1/request/userimg/' + addingPlayer.nickname
      const requestImg = await api.get(imgUrl)
      console.log('response : ', response.data)
      const profile = requestImg.data
      dispatch(addPlayer({ ...addingPlayer, profile }))
    } catch {
      alert('다시 입력해주세요')
    }
  }
  const onLogout = () => {
    dispatch(removePlayer())
  }
  const reqJoin = async nickname => {
    if (nickname) {
      console.log(nickname)
      const url = '/api/v1/game/matching/join'
      const response = await api.post(url, JSON.stringify({ nickname }))
      console.log(JSON.stringify({ nickname }))
      console.log(response.data)
      if (response.data) navigate('/KioskOnlineFind')
    } else {
      alert('먼저 로그인을 해주세요')
    }
  }
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskSelect" />
      <div className="OnlineContentBlock">
        <div className="OnlinePinQRBlock">
          <div className="OnlineQRBlock">
            <img className="OnlineQRImage" src={QRImage} alt="QRImage"></img>
            <div className="OnlineQRTitle">QR코드로 PIN번호 받기</div>
            <div className="OnlineQRText">
              QR스캔을 통해 웹사이트에 접속하여 로그인 후 화면에 출력되는 개인 PIN번호를 입력해주세요
            </div>
          </div>
          <div className="OnlinePinInputBlock">
            <CustomInput InputClassName="OnlinePinInput" InputPin={inputPinNumber} InputValue={pinNumber}></CustomInput>
            <button className="OnlinePinOkButton" onClick={onAddPlayer}>
              확인
            </button>
          </div>
        </div>
        <div className="OnlineUsersBlock">
          <div className="OnlinePlayersBlock">
            {player.nickname ? (
              <div className="KioskOnlineLogout" onClick={onLogout}>
                X
              </div>
            ) : null}
            <div className="OnlineWelcomePlayer">
              {nickname ? <KioskOnlineProfile player={player} /> : 'DGRR에 오신 것을 환영합니다.'}
            </div>
          </div>
        </div>
      </div>
      <div className="OnlineGameStartBlock">
        <div className="OnlineGameStartButton" onClick={() => reqJoin(nickname)}>
          시작
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineLogin
