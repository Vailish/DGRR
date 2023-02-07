import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseaxios from '../../API/baseaxios'
import Nav from '../../components/mainpage/Nav'
import PieChart from '../../components/mainpage/PieChart'
import '../../scss/MianPage.scss'
import profileimg from '../../img/profile.jpg'

const Mainpage = () => {
  const [userInfo, setUserInfo] = useState([])
  const [pointsInfo, setpointsInfo] = useState({})
  const [rankingInfo, setRankingInfo] = useState([])
  const [myRanking, setMyRanking] = useState("")
  const [seletedCategory, setseletedCategory] = useState(second)
  const { nickName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const requestUser = await baseaxios.get(`/api/v1/user/${nickName}`)
    const requestPoints = await baseaxios.get(`/api/v1/data/points/${nickName}`)
    const requestRankings = await baseaxios.get(`/api/v1/data/ranking/${nickName}`)
    setMyRanking(rankingData[2].ranking)
    setUserInfo(userData)
    setpointsInfo(pointsData)
    setRankingInfo(rankingData)
  }

  return (
    <div className="PageBase">
      <Nav />
      <div className="MainBox">
        <h2 className="UserNickName">{ userInfo.nickname }</h2>
        <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
        <div className="MainInnerBox">
          <img src={profileimg} alt="ProfileImage" className="ProfileImg" />
            <div className='AvgBox'>
              <div className="PieCharts">
                <PieChart title="Last Score" id="LS" startColor="#FF4C61" endColor="#FFD2D7" score={pointsInfo.lastest_game_total_score}/>
                <PieChart title="3 Games Avg" id="GA" startColor="#FFB800" endColor="#FFF7E1" score={pointsInfo.last_3_game_average_total_score}/>
                <PieChart title="High Score" id="HS" startColor="#3CBA94" endColor="#D4F3E9" score={pointsInfo.highest_total_score}/>
              </div>
              <button className='Button'>점수 그래프</button>
          </div>
        </div>
      </div>
      <div>
        <div className="MainBox TierBox">
          <h2 className='BoxTitle'>RANK</h2>
          <div className='TierInnerBox'>
            <img src={require("../../img/tierdia.png")} alt="tier" className='TierImg' />
            <div>
              <h2 className='TierText'>Diamond</h2>
              <p className='TierSubText'>{myRanking}위</p>
            </div>
          </div>
        </div>
        <div className="MainBox RateBox">
          <h2 className='BoxTitle'>
            최근 랭킹전 20Games 승률
          </h2>
          <div className='RecordRateBar'>
            <div className='ProgressLine'>16패<span className='SpanBar'>14승</span></div>
            <div className='Info'>
              <span className='ProgressLineText'>70%</span>
            </div>
          </div>
        </div>
        <div className="MainBox UserRankingBox">
          <div className='UserRankingBoxTitle'>
            <h2 className='BoxTitle'>
              나의 랭킹
            </h2>
            <span className='RankingNav' onClick={() => (window.location.href = "/ranking")}>more▶</span>
          </div>
          {rankingInfo.map((data, index) => {
            return(
              <div index={index} key={index} className={`RankingTextBox ${(index === 2) && "MyRankingTextBox"}`}>
                <span>{data.ranking}위</span> <span>{data.nickname}</span> <span>{data.point}pt</span>
            </div>
            )})
          }
        </div>
      </div>

      <div>
        <div className="MainBox RecordBox">
          <div className='RecordNav'>
            <h2 className='BoxTitle'>전적관리</h2>
            <div className='NavCategory'>
              <span className='Category'>전체</span>
              <span className='Category'>랭킹전</span>
              <span className='Category'>친선전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainpage
