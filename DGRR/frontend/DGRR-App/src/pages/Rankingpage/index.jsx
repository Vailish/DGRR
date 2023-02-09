import React, { useRef, useState, useEffect, useCallback } from 'react'
import Nav from '../../components/mainpage/Nav'
import '../../scss/RankingPage.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Rankingpage = () => {
  const [rankData, setRankData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://192.168.31.142:8080/api/v1/data/ranking', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then(res => setRankData(res.data.rankings))
      .catch(err => console.log(err))
  }, [])

  const onMoveNickPage = nickname => {
    navigate(`/${nickname}`)
    nickname = ''
  }
  return (
    <div className="PageBase">
      <Nav />
      <div className="ProfileBox">
        <h2 className="UserNickName">유튜브친구들 안녕</h2>
        <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
      </div>
      <div className="MainBox TotalRankingBox">
        <table>
          <th>ranking</th>
          <th> Player</th>
          <th>Point</th>
          <th>Rate</th>
          <th>Wins</th>
          <th>Losses</th>

          {rankData.map((info, i) => {
            return (
              <tr key={i} onClick={onMoveNickPage}>
                <td>{info.ranking} </td>
                <td>{info.nickname}</td>
                <td>{info.point} </td>
                <td>{info.totalGameNumber} </td>
                <td>{info.winGameNumber} </td>
                <td>{info.lossesGameNumber} </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Rankingpage