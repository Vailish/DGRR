import React, { useRef, useState, useEffect, useCallback } from 'react'
import Nav from '../../components/mainpage/Nav'
import '../../scss/RankingPage.scss'
import baseaxios from '../../API/baseaxios'
import { useNavigate } from 'react-router-dom'
;<script src="https://kit.fontawesome.com/d97b87339f.js" crossorigin="anonymous"></script>
const Rankingpage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [rankData, setRankData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [totalPageNum, setTotalPageNum] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const requestRankings = await baseaxios.get(`/api/v1/data/ranking/page/${pageNum}`)
    const rankingsData = requestRankings.data.rankings
    const totalPageNumData = requestRankings.data.pageNumber
    setRankData(rankingsData)
    setTotalPageNum([...Array(totalPageNumData).keys()].map(key => key + 1))
  }

  const onMoveNickPage = nickname => {
    navigate(`/${nickname}`)
    nickname = ''
  }

  const handleChange = e => {
    setSearchValue(e.target.value)
  }

  const userSearch = async e => {
    e.preventDefault()
    const searchRequest = await baseaxios.get(`/api/v1/data/ranking/myranking/${searchValue}`)
    setSearchValue('')
    console.log(searchRequest)
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
      <Nav />
      <div className="ProfileBox">
        <div className="ProfileLeftBox">
          <div>
            <h2 className="UserNickName">beomi</h2>
            <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
          </div>
          <img src={require('../../img/profile.jpg')} alt="ProfileImage" className="ProfileImg" />
        </div>
        <div className="ProfileRightBox">
          <h2 className="RankText">랭크</h2>
          <div className="TierBox">
            <img src={require('../../img/Diamond.png')} alt="tierImg" className="TierImg" />
            <div className="TierTextBox">
              <span className="TierText">Diamond</span>
              <div className="TierInfoText">
                <span>랭킹 17위</span> <span>랭킹포인트 1231pt</span>
              </div>
            </div>
          </div>
          <span className="RecordText">전체 전적</span>
          <div className="RecordInfoBox">
            <span>37 전</span> <span>26 승</span> <span>11 패</span>
          </div>
        </div>
      </div>

      <form className="search-box" onSubmit={userSearch}>
        <input
          value={searchValue}
          className="search-input"
          type="text"
          placeholder="플레이어 닉네임"
          onChange={handleChange}
          onSubmit={() => {
            console.log('제출확인')
          }}
        />
        <button type="sumbit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>

      <table className="RankingTable">
        <tbody>
          <tr className="RankHeaderTable">
            <th>ranking</th>
            <th>Player</th>
            <th>Point</th>
            <th>Rate</th>
            <th>Wins</th>
            <th>Losses</th>
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

      <div>
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
