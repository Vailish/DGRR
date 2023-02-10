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
        <div className='ProfileLeftBox'>
          <div>
            <h2 className="UserNickName">beomi</h2>
            <p className="UserText">좋아요 댓글 구독 알람설정까지~!!</p>
          </div>
          <img src={require("../../img/profile.jpg")} alt="ProfileImage" className="ProfileImg" />
        </div>
        <div className='ProfileRightBox'>
          <h2 className='RankText'>랭크</h2>
          <div className='TierBox'>
            <img src={require('../../img/tierdia.png')} alt="tierImg"  className='TierImg'/>
            <div className='TierTextBox'>
              <span className='TierText'>Diamond</span>
              <div className='TierInfoText'>
                <span>랭킹 17위</span> <span>랭킹포인트 1231pt</span>
              </div>
            </div>
          </div>
          <span className='RecordText'>전체 전적</span>
          <div className='RecordInfoBox'>
            <span>37 전</span> <span>26 승</span> <span>11 패</span>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input className="search-input" type="text" placeholder="Search something.." />
        <button className="search-btn"><i className="fas fa-search"></i></button>
      </div>

      <table className='RankingTable'>
        <tbody>
          <tr className='RankHeaderTable'>
            <th>ranking</th>
            <th>Player</th>
            <th>Point</th>
            <th>Rate</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>

            {rankData.map((info, i) => {
              return (
                <tr className='Tr' key={i} onClick={() => { onMoveNickPage(info.nickname) }}>
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
    </div>
  )
}

export default Rankingpage