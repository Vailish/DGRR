import React, { useRef, useState, useEffect, useCallback } from 'react'
import Nav from '../../components/mainpage/Nav'
import '../../scss/RankingPage.scss'
import baseaxios from '../../API/baseaxios'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { getCookie, removeCookie } from '../../cookies/Cookies'

const Rankingpage = () => {
  const [userNick, setUserNick] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [userImgUrl, setUserImgUrl] = useState([])
  const [rankingInfo, setRankingInfo] = useState([])
  const [myRanking, setMyRanking] = useState('')
  const [winning, setWinning] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const [rankData, setRankData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [tier, setTier] = useState("Bronze")
  const [totalPageNum, setTotalPageNum] = useState([])
  const navigate = useNavigate()
  const nick = useLocation();
 
  useEffect(() => {
    if (getCookie('token')) {
      setUserNick(nick.state.nickname)
    } else {
      alert('로그인 후 이용해 주세요.')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (userNick) {
      fetchData(userNick)
    }
  }, [userNick])
  
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

  const fetchData = async (nickname) => {
    const requestRankingsPage = await baseaxios.get(`/api/v1/data/ranking/page/${1}`)
    const rankingsData = requestRankingsPage.data.rankings
    const totalPageNumData = requestRankingsPage.data.pageNumber
    setRankData(rankingsData)
    setTotalPageNum([...Array(totalPageNumData).keys()].map(key => key + 1))

    try {
      const requestUser = await baseaxios.get(`/api/v1/user/${nickname}`)
      const userData = requestUser.data
      setUserInfo(userData)
    } catch (e) {
      console.log(e)
    }

    try {
      const requestRankings = await baseaxios.get(`/api/v1/data/ranking/user/${nickname}`)
      const rankingData = requestRankings.data
      setMyRanking(rankingData.filter(data => data.nickname === userNick)[0].ranking)
      setRankingInfo(rankingData)
    } catch (error) {
      console.log(error)
    }
   
    try {
      const requestUserimg = await baseaxios.get(`/api/v1/request/userimg/${nickname}`)
      const userimgData = requestUserimg.data
      setUserImgUrl(userimgData)
    } catch (error) {
      console.log(error)
    }

    try {
      const requestWinning = await baseaxios.get(`/api/v1/data/twentygame/${nickname}`)
      const winningData = requestWinning.data
      setWinning(winningData)
    } catch (error) {
      console.log(error)
    }
  }

  const onMoveNickPage = nickname => {
    navigate(`/${nickname}`)
    nickname = ''
  }

  const reqPageNation = async page => {
    try {
      const response = await baseaxios.get(`/api/v1/data/ranking/page/${page}`)
      console.log(response)
      let newRank = response.data.rankings
      setRankData(newRank)
    } catch (e) {
      console.log(e)
    }
  }

  const pageMove = page => {
    reqPageNation(page)
  }

  return (
    <div className="PageBase">
      <Nav username={userInfo.username}/>
      <div className="ProfileBox">
        <div className="ProfileLeftBox">
          <div>
            <h2 className="UserNickName">{userInfo.nickname}</h2>
            <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
          </div>
          <img src={userImgUrl} alt="ProfileImage" className="ProfileImg" />
        </div>
        <div className="ProfileRightBox">
          <h2 className="RankText">랭크</h2>
          <div className="TierBox">
            <img src={require(`../../img/${tier}.png`)} alt="tierImg" className="TierImg" />
            <div className="TierTextBox">
              <span className="TierText">{tier}</span>
              <div className="TierInfoText">
                <span>랭킹 {myRanking}위</span> <span>랭킹포인트 {userInfo.points}pt</span>
              </div>
            </div>
          </div>
          <span className="RecordText">최근 랭킹 {winning.gameNumber === 0 ? null : winning.gameNumber} 게임 전적</span>
          <div className="RecordInfoBox">
            <span>{winning.gameNumber} 전</span> <span>{winning.winGame} 승</span> <span>{winning.loseGame} 패</span>
          </div>
        </div>
      </div>


      <table className="RankingTable">
        <tbody>
          <tr className="RankHeaderTable">
            <th>랭킹</th>
            <th>플레이어</th>
            <th>포인트</th>
            <th>전</th>
            <th>승</th>
            <th>패</th>
          </tr>

          {rankData.map((info, i) => {
            return (
              <tr
                className="Tr"
                key={i}
                onClick={() => {
                  onMoveNickPage(info.nickname)
                }}
              >
                <td>{info.ranking} </td>
                <td>{info.nickname}</td>
                <td>{info.point} </td>
                <td>{info.totalGameNumber} </td>
                <td>{info.winGameNumber} </td>
                <td>{info.lossesGameNumber} </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className='pageNation'>
        {totalPageNum.map((pageNum, index) => {
          return (
            <span index={index} key={index}>
              <button type="button" onClick={() => pageMove(index + 1)}>
                {index + 1}
              </button>{' '}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Rankingpage
