import React from 'react'
import ScoreTable from '../kiosk/offline/ScoreTable'

const Record = () => {
  return (
    <div className='RecordBox'>
      <div className='BaseRecordBox'>
        <div className='LeftInfo'>
          <span>2023. 01. 18(수) 친선전</span>
          <div className='MyScoreBoard'>
            <div>
              <img
                className='CrownImg'
                src={require('../../img/Crown.png')} alt="Crown.png" />
              <h2 className='RoundRankingText'>1위</h2>
              <span className='RoundScoreText'>178점</span>
            </div>
            <div>
              <ScoreTable isInput={false} />
            </div>
          </div>
        </div>
        <div className='DivideLine'></div>
        <div className='RightInfo'>
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className='ResultImg' /> <span>2위 151점</span>
          </div>
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className='ResultImg' /> <span>3위 120점</span>
          </div>
          <div>
            <img src={require('../../img/profile.jpg')} alt="profileimg" className='ResultImg' /> <span>4위 110점</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Record