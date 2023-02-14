import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KioskNavBlock from '../KioskNavBlock'
import { useSelector } from 'react-redux'
import '../../../scss/KioskOnlineFind.scss'
import { api } from '../../../API/api'
import { useDispatch } from 'react-redux'
import { loadBothPlayers } from '../../../modules/OnlineLoginUser'

const KioskOnlineFind = () => {
  const [flag, setflag] = useState(false)
  const nickname = useSelector(state => state.OnlineLoginUser.player.nickname)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMatched, setisMatched] = useState(false)
  const [timingSecond, settimingSecond] = useState(0)
  const [timingMinute, settimingMinute] = useState(0)

  useEffect(() => {
    const timerCount = setInterval(() => {
      settimingSecond(timingSecond + 1)
      if (timingSecond > 59) {
        settimingMinute(timingMinute + 1)
        settimingSecond(0)
      }
      reqMatching(nickname)
      if (flag) {
        clearInterval(timerCount)
      }
    }, 1000)
    return () => clearInterval(timerCount)
  }, [timingMinute, timingSecond, flag])

  const forTest = () => {
    setisMatched(!isMatched)
  }

  const goMatching = () => {
    setTimeout(() => {
      navigate('/KioskOnlineMatching')
    }, 2000)
  }

  const reqMatching = async nickname => {
    console.log(JSON.stringify({ nickname }))
    const url = '/v1/game/matching/result'
    const response = await api.post(url, JSON.stringify({ nickname }))
    if (response.data) {
      // clearInterval(reqMatchingUser)
      // clearInterval(timerCount)
      setflag(true)
      setisMatched(true)
      forTest()
      goMatching()
      console.log('내응답이야' + response.data.randomNumber)
      dispatch(loadBothPlayers(response.data, response.data.randomNumber))
      navigate('/KioskOnlineMatching')
    } else {
      // console.log('test1' + reqMatchingUser)
      // console.log('test2' + timerCount)
      //시간이 돌아야돼
    }
  }

  return (
    <div className="KioskBackground" onClick={forTest}>
      <KioskNavBlock goBackTo="/KioskOnlineLogin" />
      <div className="OnlineFindContentBlock">
        <div className="OnlineFindCenterAlign">
          <div className="LoadingBounceBallBlock">
            <div className="LoadingBounceBall Bouncing"></div>
            <div className="LoadingBounceBall Bouncing2"></div>
            <div className="LoadingBounceBall Bouncing3"></div>
          </div>

          <div className="OnlineFindTextBlock">게임 찾는중</div>
          {isMatched ? (
            <div className="MatchedModal" onClick={goMatching}>
              게임 매칭됨
            </div>
          ) : null}
          <div className="OnlineFindTimeBlock">
            {timingMinute < 10 ? '0' + timingMinute : timingMinute} :{' '}
            {timingSecond < 10 ? '0' + timingSecond : timingSecond}
          </div>
          <div className="OnlineFindCancelBlock">취소</div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineFind
