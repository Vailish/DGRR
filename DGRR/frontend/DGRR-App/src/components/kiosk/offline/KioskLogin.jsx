import React from 'react'
import '../../../scss/KioskLogin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPlayer, loadPlayers } from '../../../modules/OfflineLoginUsers'
import { api } from '../../../API/api'
import KioskLoginPlayer from './KioskLoginPlayer'
import KioskNavBlock from '../KioskNavBlock'
import QRImage from '../../../img/mLogin.png'

const KioskLogin = () => {
  let pinNumber = undefined
  const dispatch = useDispatch()
  const players = useSelector(state => state.OfflineLoginUsers.players)
  const navigate = useNavigate()

  const onAddPlayer = async pin => {
    if (players.length < 4) {
      const pinNum = String(pin)
      const url = '/api/v1/matching/' + pinNum
      console.log('url : ', url)
      const response = await api.get(url)
      console.log('response : ', response)
      const addingPlayer = { ...response.data }
      const imgUrl = '/api/v1/request/userimg/' + addingPlayer.nickname
      const requestImg = await api.get(imgUrl)
      console.log('requestIMG : ', requestImg.data)
      const profile = requestImg.data
      dispatch(addPlayer({ ...addingPlayer, profile }))
    }
  }
  const inputPinNumber = e => {
    pinNumber = e.target.value
    console.log(pinNumber)
  }
  const onGameStart = () => {
    if (players.length > 0) {
      dispatch(loadPlayers())
      navigate('/KioskOfflineGame')
    }
  }
  const CustomInput = props => {
    const { InputValue, InputPin, InputClassName } = props
    return <input type="number" value={InputValue} onChange={InputPin} className={InputClassName} />
  }

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
            <img className="QRImage" src={QRImage}></img>
            <div className="QRTitle">QR코드로 PIN번호 받기</div>
            <div className="QRText">
              QR스캔을 통해 웹사이트에 접속하여 로그인 후 화면에 출력되는 개인 PIN번호를 입력해주세요
            </div>
          </div>
          <div className="PinInputBlock">
            <CustomInput InputClassName="PinInput" InputPin={inputPinNumber} InputValue={pinNumber}></CustomInput>
            <button className="PinPlus" onClick={() => onAddPlayer(pinNumber)}>
              +
            </button>
          </div>
        </div>
        <div className="UsersBlock">
          <div className="PlayersBlock">
            <div className="PlayerTextBlock">
              <div className="PlayerText">플레이어</div>
            </div>
            <div className="PlayersList">
              {always4Blocks().map((player, index) => {
                return player.nickname ? (
                  <KioskLoginPlayer player={player} key={`KioskLoginPlayer-${index}`} />
                ) : (
                  <KioskLoginPlayer player="" key={`KioskLoginPlayer-${index}`} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="GameStartBlock">
        <div to="/KioskOfflineGame" className="GameStartButton" onClick={onGameStart}>
          시작
        </div>
      </div>
    </div>
  )
}

export default KioskLogin
