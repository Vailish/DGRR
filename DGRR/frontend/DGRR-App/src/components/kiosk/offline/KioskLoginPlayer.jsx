import React from 'react'
import '../../../scss/KioskLoginPlayer.scss'
import { removePlayer } from '../../../store/OfflineLoginUsers'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

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
            <div className="PlayerProfile"></div>
          </div>
          <div className="PlayerInfoBlock">
            <div className="PlayerNameAndRank">
              <div className="PlayerName">{player.nickname}</div>
              <div className="PlayerRank">{player.rank} 위</div>
            </div>
            <div className="PlayerRecordBlock">
              <div className="PlayerRecordTitle">전적</div>
              <div className="PlayerRecordContent">
                {player.record[0]} 전 {player.record[1]} 승 {player.record[2]} 패
              </div>
            </div>
          </div>
          <div className="PlayerAverageBlock">
            <div className="PlayerAverageText">avg</div>
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
