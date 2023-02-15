import React from 'react'
import '../../../scss/KioskLoginPlayer.scss'
import { removePlayer } from '../../../modules/OfflineLoginUsers'
import { useDispatch } from 'react-redux'

const KioskLoginPlayer = props => {
  const { player } = props
  const dispatch = useDispatch()

  const onRemovePlayer = () => dispatch(removePlayer(player))

  const playerClass = player === '' ? 'EachPlayer' : 'EachPlayer PlayerLogin'
  return (
    <div className={playerClass}>
      {player !== '' ? (
        <>
          <div className="PlayerProfileBlock">
            <img className="PlayerProfile" src={player.profile}></img>
          </div>
          <div className="PlayerInfoBlock">
            <div className="PlayerNameAndRank">
              <div className="PlayerName">{player.nickname}</div>
              <div className="PlayerRank">{player.rank} 위</div>
            </div>
            <div className="PlayerRecordBlock">
              <div className="PlayerRecordTitle">전적</div>
              <div className="PlayerRecordContent">
                {player.record[0].totalGame} 전 {player.record[0].winGame} 승 {player.record[0].loseGame} 패
              </div>
            </div>
          </div>
          <div className="PlayerAverageBlock">
            <div className="PlayerAverageText">AVG</div>
            <div className="PlayerAverageScore">{player.average}</div>
          </div>
          <div className="PlayerCancelCircle" onClick={onRemovePlayer}>
            X
          </div>
        </>
      ) : null}
    </div>
  )
}
export default KioskLoginPlayer
