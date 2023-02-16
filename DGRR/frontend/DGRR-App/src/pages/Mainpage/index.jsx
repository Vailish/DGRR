import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseaxios from '../../API/baseaxios'
import Nav from '../../components/mainpage/Nav'
import PieChart from '../../components/mainpage/PieChart'
import Record from '../../components/mainpage/Record'
import '../../scss/MianPage.scss'
import PointCharts from '../../components/mainpage/PointCharts'
import { getCookie, removeCookie, setCookie } from '../../cookies/Cookies'

const Mainpage = () => {
  const [userInfo, setUserInfo] = useState([])
  const [userImgUrl, setUserImgUrl] = useState([])
  const [pointsInfo, setpointsInfo] = useState({})
  const [rankingInfo, setRankingInfo] = useState([])
  const [myRanking, setMyRanking] = useState('')
  const [seletedCategory, setSeletedCategory] = useState('all')
  const [gamesInfo, setGamesInfo] = useState([])
  const [winning, setWinning] = useState({})
  const { nickName } = useParams()
  const [visible, setVisible] = useState(false)
  const [tier, setTier] = useState("Bronze")
  const winningBar = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    if (getCookie('token')) {
    } else {
      alert('로그인 후 이용해 주세요.')
      navigate('/')
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (userInfo.points < 1000) {
      setTier('Bronze')
    } else if (1000 <= userInfo.points < 1100) {
      setTier('Silver')
    } else if (1100 <= userInfo.points < 1200) {
      setTier('Gold')
    } else if (1200 <= userInfo.points < 1300) {
      setTier('Platinum')
    } else {
      setTier('Diamond')
    }
  }, [userInfo])

  useEffect(() => {
    fetchMatchData()
  }, [seletedCategory])

  useEffect(() => {
    fetchData()
  }, [nickName])
  
  useEffect(() => {
    inputWinning()
  }, [winning])
  

  const fetchData = async () => {
    const requestUser = await baseaxios.get(`/api/v1/user/${nickName}`)
    const requestPoints = await baseaxios.get(`/api/v1/data/points/${nickName}`)
    const requestRankings = await baseaxios.get(`/api/v1/data/ranking/user/${nickName}`)
    const requestUserimg = await baseaxios.get(`/api/v1/request/userimg/${nickName}`)
    const requestWinning = await baseaxios.get(`/api/v1/data/twentygame/${nickName}`)
    const userData = requestUser.data
    const pointsData = requestPoints.data
    const rankingData = requestRankings.data
    const winningData = requestWinning.data
    const userimgData = requestUserimg.data
    setMyRanking(rankingData.filter(data => data.nickname === nickName)[0].ranking)
    setUserInfo(userData)
    setpointsInfo(pointsData)
    setRankingInfo(rankingData)
    setWinning(winningData)
    setUserImgUrl(userimgData)
  }

  const fetchMatchData = async () => {
    const requestGames = await baseaxios.get(`/api/v1/games/${seletedCategory}/${nickName}`)
    const gamesData = requestGames.data.games
    setGamesInfo(gamesData)
  }

  const handleClick = selected => {
    if (selected !== seletedCategory) {
      setSeletedCategory(selected)
    }
  }

  const inputWinning = () => {
    winningBar.current.style.width = isNaN(parseInt(winning.winGame / winning.gameNumber * 100)) ? '50%' : `${parseInt(winning.winGame / winning.gameNumber * 100)}%`
  }

  const onVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className="PageBase">
      <Nav username={userInfo.username} />
      <div className="MainBox">
        <h2 className="UserNickName">{userInfo.nickname}</h2>
        
        <div className="MainInnerBox">
          <img src={userImgUrl} alt="ProfileImage" className="ProfileImg" />
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
            <button className="Button" onClick={onVisible}>
              점수 그래프
            </button>
            <div>{visible === true ? <PointCharts nickname={nickName} /> : null}</div>
          </div>
        </div>
      </div>

      <div className="FlexBox">
        <div>
          <div className="MainBox TierBox">
            <h2 className="BoxTitle">랭크</h2>
            <div className="TierInnerBox">
              <img src={require(`../../img/${tier}.png`)} alt="tier" className="TierImg" />
              <div>
                <h2 className="TierText">{tier}</h2>
                <p className="TierSubText">{myRanking}위</p>
              </div>
            </div>
          </div>
          <div className="MainBox RateBox">
            <h2 className="BoxTitle">최근 랭킹전 {winning.gameNumber === 0 ? null : winning.gameNumber}게임 승률</h2>
            <div className="RecordRateBar">
              <div className="ProgressLine">
                {winning.loseGame}패<span id="SpanBar" ref={winningBar}>{winning.winGame}승</span>
              </div>
              <div className="Info">
                <div className="ProgressLineText">{isNaN(parseInt(winning.winGame / winning.gameNumber * 100)) ? '전적없음' : `${parseInt(winning.winGame / winning.gameNumber * 100)}%`}</div>
              </div>
            </div>
          </div>
          <div className="MainBox UserRankingBox">
            <div className="UserRankingBoxTitle">
              <h2 className="BoxTitle">나의 랭킹</h2>
              <span className="RankingNav" onClick={() => navigate('/ranking', {state : {nickname : userInfo.nickname}})}>
                more▶
              </span>
            </div>
            {rankingInfo.map((data, index) => {
              return (
                <div index={index} key={index} className={`RankingTextBox ${data.nickname === nickName && 'MyRankingTextBox'}`}>
                  <span>{data.ranking}위</span> <span>{data.nickname}</span> <span>{data.point}pt</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="MainBox RecordsBox">
          <div className="RecordNav">
            <h2 className="BoxTitle">전적관리</h2>
            <div className="NavCategory">
              <span
                className={`Category ${seletedCategory === 'all' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('all')}
              >
                전체
              </span>
              <span
                className={`Category ${seletedCategory === 'online' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('online')}
              >
                랭킹전
              </span>
              <span
                className={`Category ${seletedCategory === 'offline' ? 'SelectedCategory' : undefined}`}
                onClick={() => handleClick('offline')}
              >
                친선전
              </span>
            </div>
          </div>
          {gamesInfo.map((gameInfo, index) => {
            return <Record gameInfo={gameInfo} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Mainpage
