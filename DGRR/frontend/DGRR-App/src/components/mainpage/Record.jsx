import React, { useState, useEffect, useRef } from 'react'
import baseaxios from '../../API/baseaxios'
import ScoreTable from '../kiosk/offline/ScoreTable'

const Record = ({ gameInfo }) => {
  const [userImgUrl, setUserImgUrl] = useState()
  const [test, setTest] = useState({})

  useEffect(() => {
    
  },)
  const fetchImg = async (userNickname) => {
    try {
      const requestUserimg = await baseaxios.get(`/api/v1/request/userimg/${userNickname}`)
      const userimgData = requestUserimg.data
    
      return userimgData
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="RecordBox">
      <div className="BaseRecordBox">
        <div className="LeftInfo">
          <span>{gameInfo.gameDate} {gameInfo.gameType ? '랭킹전' : '친선전'}</span>
          <div className="MyScoreBoard">
            <div>
              <img className={`CrownImg ${gameInfo.rank !== 1 ? "Hidden": undefined }`} src={require('../../img/Crown.png')} alt="Crown.png" />
              <h2 className="RoundRankingText">{gameInfo.rank}위</h2>
              <span className="RoundScoreText">{gameInfo.sumScore[gameInfo.sumScore.length-1]}점</span>
            </div>
            <div>
              <ScoreTable isInput={false} scoreArray={gameInfo.score} scoreSumArray={gameInfo.sumScore} />
            </div>
          </div>
        </div>
        <div className="DivideLine"></div>
        <div className="RightInfo">
          {(gameInfo.otherPlayers).map((data, index) => {
            return (
              <div index={index} key={index}>
                <img src={fetchImg(data.nickname)} alt="profileimg" className="ResultImg" /> <span>{data.rank}위</span>{' '}
                <span> {data.sumScore[data.sumScore.length - 1]}점</span>
              </div>
              )
          })}
          
        </div>
      </div>
    </div>
  )
}

export default Record
