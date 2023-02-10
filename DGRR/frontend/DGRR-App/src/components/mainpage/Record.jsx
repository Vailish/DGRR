import React from 'react'
import ScoreTable from '../kiosk/offline/ScoreTable'

const Record = () => {
  const scoreArray = [1, 2, 4, '/', 5, 2, 6, 3, 'x', '', 'x', '', 1, '/', 'x', '', 'x', '', 5, '/', 'x']
  const scoreSumArray = [3, 18, 25, 34, 55, 75, 95, 120, 140, 160]
  return (
    <div className="RecordBox">
      <div className="BaseRecordBox">
        <div className="LeftInfo">
          <span>2023. 01. 18(수) 친선전</span>
          <div className="MyScoreBoard">
            <div>
              <img className="CrownImg" src={require('../../img/Crown.png')} alt="Crown.png" />
              <h2 className="RoundRankingText">1위</h2>
              <span className="RoundScoreText">178점</span>
            </div>
            <div>
              <ScoreTable isInput={false} scoreArray={scoreArray} scoreSumArray={scoreSumArray} />
            </div>
          </div>
        </div>
        <div className="DivideLine"></div>
        <div className="RightInfo">
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className="ResultImg" /> <span>2위</span>{' '}
            <span> 151점</span>
          </div>
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className="ResultImg" /> <span>3위</span>{' '}
            <span> 120점</span>
          </div>
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className="ResultImg" /> <span>4위</span>{' '}
            <span> 110점</span>
          </div>
          <div className="DetailInfo">▼</div>
        </div>
      </div>
    </div>
  )
}

export default Record
