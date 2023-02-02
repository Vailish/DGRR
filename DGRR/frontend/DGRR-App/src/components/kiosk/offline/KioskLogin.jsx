import React from 'react'
import '../../../scss/KioskLogin.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import KioskNavBlock from './KioskNavBlock'

const ShowNumber = () => {
  return
}

const KioskLoginPlayer = props => {
  const dispatch = useDispatch()

  const onAddPlayer = () => dispatch(addPlayer())

  const player = props.player
  const playerClass = player === '' ? 'EachPlayer' : 'EachPlayer PlayerLogin'
  return <div className={playerClass}> {player.playerNickname} </div>
}

const axiosSend = async () => {
  let myData = await apis.random()
  console.log(myData)
}

const KioskLogin = () => {
  const players = useSelector(state => state.OfflineLoginUsers.players)
  const playersNow = players.map(player => `<div class='Player'> ${{ ...player }} </div>`)

  return (
    <div className="KioskBackground">
      <KioskNavBlock />
      <div className="ContentBlock">
        <div className="PinQRBlock">
          <div className="QRBlock">
            <div className="QRImage"></div>
            <div className="QRTitle">QR코드로 PIN번호 받기</div>
            <div className="QRText">
              QR스캔을 통해 웹사이트에 접속하여 로그인 후 화면에 출력되는 개인 PIN번호를 입력해주세요
            </div>
          </div>
          <div className="PinInputBlock">
            <input className="PinInput"></input>
            <button className="PinPlus" onClick={axiosSend}></button>
          </div>
        </div>
        <div className="UsersBlock">
          <div className="PlayersBlock">
            <div className="PlayerText">Players</div>
            <div className="PlayersList">
              {players.map(player => {
                return player === null ? <KioskLoginPlayer player="" /> : <KioskLoginPlayer player={player} />
              })}
              {/* <div className="Player"></div>
              <div className="Player"></div>
              <div className="Player"></div>
              <KioskLoginPlayer /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="GameStartBlock">
        <Link to="/KioskOfflineGame" className="GameStartButton">
          START
        </Link>
      </div>
    </div>
  )
}

export default KioskLogin
