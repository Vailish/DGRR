import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseaxios from '../../API/baseaxios'
import Nav from '../../components/mainpage/Nav'
import PieChart from '../../components/mainpage/PieChart'
import Record from '../../components/mainpage/Record'
import '../../scss/MianPage.scss'
import PointCharts from '../../components/mainpage/PointCharts'
import { getCookie } from '../../cookies/Cookies'
import { useLocation } from "react-router-dom";

const Mainpage = () => {
  const [myNickname, setMyNickname] = useState("")
  const [userInfo, setUserInfo] = useState([])
  const [userImgUrl, setUserImgUrl] = useState([])
  const [pointsInfo, setpointsInfo] = useState({})
  const [rankingInfo, setRankingInfo] = useState([])
  const [myRanking, setMyRanking] = useState('')
  const [seletedCategory, setSeletedCategory] = useState('all')
  const [gamesInfo, setGamesInfo] = useState([])
  const [winning, setWinning] = useState({})
  const [visible, setVisible] = useState(false)
  const [tier, setTier] = useState("Bronze")
  const { nickName } = useParams()
  const { pathName } = useLocation();
  const winningBar = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    if (getCookie('token')) {
    } else {
      alert('로그인 후 이용해 주세요.')
      navigate('/')
    }
    fetchUserNick()
  }, []) 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName])
  

  useEffect(() => {
    if (userInfo.points) {
      if (userInfo.points <= 999) {
        setTier('Bronze')
      } else if (1000 <= userInfo.points && userInfo.points <= 1099) {
        setTier('Silver')
      } else if (1100 <= userInfo.points && userInfo.points  <= 1199) {
        setTier('Gold')
      } else if (1200 <= userInfo.points && userInfo.points  <= 1299) {
        setTier('Platinum')
      } else {
        setTier('Diamond')
      }
    }
  }, [userInfo])

  useEffect(() => {
    fetchMatchData()
  }, [seletedCategory])

  useEffect(() => {
    fetchData()
    fetchMatchData()
  }, [nickName])
  
  useEffect(() => {
    inputWinning()
  }, [winning])
  

  const fetchData = useCallback(async () => {
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
  }, [nickName])

  const fetchMatchData = async () => {
    const requestGames = await baseaxios.get(`/api/v1/games/${seletedCategory}/${nickName}`)
    const gamesData = requestGames.data.games
    setGamesInfo(gamesData)
  }

  const fetchUserNick = async () => {
    try {
      const userNum = getCookie('identifier')
      const requestNickname = await baseaxios.post('api/v1/identifier', { 'identifier': userNum })
      const nickData = requestNickname.data
      setMyNickname(nickData.nickname)
    } catch (error) {
      console.log('fetchUserNick', error)
    }
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

  const clickMoreButton = () => {
    navigate('/ranking', {state : {nickname : myNickname}})
  }

  const clickRankingBar = (nick) => {
    console.log('asdasdas')
    window.location.href = `/${nick}`
  }

  return (
    <div className="PageBase">
      <Nav/>
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
              <span className="RankingNav" onClick={() => clickMoreButton()}>
                more▶
              </span>
            </div>
            {rankingInfo.map((data, index) => {
              return (
                <div index={index} key={index}
                  className={`RankingTextBox ${data.nickname === nickName && 'MyRankingTextBox'}`}
                  onClick={() => clickRankingBar(data.nickname)}
                >
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
