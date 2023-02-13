import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseaxios from '../../API/baseaxios'
import Nav from '../../components/mainpage/Nav'
import PieChart from '../../components/mainpage/PieChart'
import Record from '../../components/mainpage/Record'
import '../../scss/MianPage.scss'
import profileimg from '../../img/profile.jpg'
import { getCookie, removeCookie } from '../../cookies/Cookies'

const Mainpage = () => {
  const [userInfo, setUserInfo] = useState([])
  const [pointsInfo, setpointsInfo] = useState({})
  const [rankingInfo, setRankingInfo] = useState([])
  const [myRanking, setMyRanking] = useState('')
  const [seletedCategory, setSeletedCategory] = useState('totalgame')
  const [gamesInfo, setGamesInfo] = useState([])
  const { nickName } = useParams()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem('access-token')) {
  //     navigate('/beomi')
  //   } else {
  //     navigate('/')
  //   }
  // }, [localStorage.getItem('access-token')])

  useEffect(() => {
    if (getCookie('token')) {
    } else {
      navigate('/')
    }
    fetchData()
    document.documentElement.style.setProperty('--bar-size', '30%')
  }, [])

  const fetchData = async () => {
    const requestUser = await baseaxios.get(`/api/v1/user/${nickName}`)
    const requestPoints = await baseaxios.get(`/api/v1/data/points/${nickName}`)
    const requestRankings = await baseaxios.get(`/api/v1/data/ranking/user/${nickName}`)
    const requestGames = await baseaxios.get(`/api/v1/games/${nickName}`)
    const userData = requestUser.data
    const pointsData = requestPoints.data
    const rankingData = requestRankings.data
    const gamesData = requestGames.data.games
    console.log(gamesData)
    console.log(pointsData)
    setMyRanking(rankingData[2].ranking)
    setUserInfo(userData)
    setpointsInfo(pointsData)
    setRankingInfo(rankingData)
    setGamesInfo(gamesData)
  }

  const handleClick = selected => {
    if (selected !== seletedCategory) {
      setSeletedCategory(selected)
    }
  }

  return (
    <div className="PageBase">
      <Nav />
      <div className="MainBox">
        <h2 className="UserNickName">{userInfo.nickname}</h2>
        <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
        <div className="MainInnerBox">
          <img src={profileimg} alt="ProfileImage" className="ProfileImg" />
          <div className="AvgBox">
            <div className="PieCharts">
              <PieChart
                title="Last Score"
                id="LS"
                startColor="#FF4C61"
                endColor="#FFD2D7"
                score={pointsInfo.lastestGameTotalScore}
              />
              <PieChart
                title="3 Games Avg"
                id="GA"
                startColor="#FFB800"
                endColor="#FFF7E1"
                score={pointsInfo.last3GameAverageTotalScore}
              />
              <PieChart
                title="High Score"
                id="HS"
                startColor="#3CBA94"
                endColor="#D4F3E9"
                score={pointsInfo.highestTotalScore}
              />
            </div>
            <button className="Button">점수 그래프</button>
          </div>
        </div>
      </div>

      <div className="FlexBox">
        <div>
          <div className="MainBox TierBox">
            <h2 className="BoxTitle">RANK</h2>
            <div className="TierInnerBox">
              <img src={require('../../img/tierdia.png')} alt="tier" className="TierImg" />
              <div>
                <h2 className="TierText">Diamond</h2>
                <p className="TierSubText">{myRanking}위</p>
              </div>
            </div>
          </div>
          <div className="MainBox RateBox">
            <h2 className="BoxTitle">최근 랭킹전 20Games 승률</h2>
            <div className="RecordRateBar">
              <div className="ProgressLine">
                16패<span className="SpanBar">14승</span>
              </div>
              <div className="Info">
                <span className="ProgressLineText">70%</span>
              </div>
            </div>
          </div>
          <div className="MainBox UserRankingBox">
            <div className="UserRankingBoxTitle">
              <h2 className="BoxTitle">나의 랭킹</h2>
              <span className="RankingNav" onClick={() => (window.location.href = '/ranking')}>
                more▶
              </span>
            </div>
            {rankingInfo.map((data, index) => {
              return (
                <div index={index} key={index} className={`RankingTextBox ${index === 2 && 'MyRankingTextBox'}`}>
                  <span>{data.ranking}위</span> <span>{data.nickname}</span> <span>{data.point}pt</span>
                </div>
              )
            })}
          </div>
        </div>
        {/* </div>

      <div> */}
        <div className="MainBox RecordsBox">
          <div className="RecordNav">
            <h2 className="BoxTitle">전적관리</h2>
            <div className="NavCategory">
              <span
                className={`Category ${seletedCategory === 'totalgame' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('totalgame')}
              >
                전체
              </span>
              <span
                className={`Category ${seletedCategory === 'rankgame' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('rankgame')}
              >
                랭킹전
              </span>
              <span
                className={`Category ${seletedCategory === 'normalgame' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('normalgame')}
              >
                친선전
              </span>
            </div>
          </div>
          {gamesInfo.map((gameInfo, index) => {
            return <Record gameInfo={gameInfo} key={index} />
          })}
          <Record />
        </div>
      </div>
    </div>
  )
}

export default Mainpage
