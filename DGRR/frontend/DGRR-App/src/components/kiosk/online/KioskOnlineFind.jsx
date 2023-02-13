import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KioskNavBlock from '../KioskNavBlock'
import { useSelector } from 'react-redux'
import '../../../scss/KioskOnlineFind.scss'
import { SyncLoader } from 'react-spinners'
import { api } from '../../../API/api'
import { useDispatch } from 'react-redux'
import { loadBothPlayers } from '../../../store/OnlineLoginUser'

const KioskOnlineFind = () => {
  const [flag, setflag] = useState(false)
  // useEffect(() => {
  //   if (flag) {
  //     // clearInterval(reqMatchingUser)
  //     clearInterval(timerCount)
  //   }
  // }, [flag])
  const nickname = useSelector(state => state.OnlineLoginUser.player.nickname)
  // const nickname = '김볼링'
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  // setTimeout(() => {
  //   navigate('/KioskOnlineMatching')
  //   clearInterval(timerCount)
  // }, 5000)

  // const reqMatchingUser = setInterval(() => {
  //   console.log(nickname)

  // }, 1000)

  const reqMatching = async nickname => {
    console.log(JSON.stringify({ nickname }))
    const url = '/v1/game/matching/result'
    const response = await api.post(url, JSON.stringify({ nickname }))
    if (response.data) {
      // clearInterval(reqMatchingUser)
      // clearInterval(timerCount)
      setflag(true)
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
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskOnlineLogin" />
      <div className="OnlineFindContentBlock">
        <div className="OnlineFindCenterAlign">
          {/* <SyncLoader className="OnlineFindLoading" color="#36d7b7" size={80} margin={40} /> */}
          <div className="LoadingBounceBallBlock">
            <div className="LoadingBounceBall Bouncing"></div>
            <div className="LoadingBounceBall Bouncing2"></div>
            <div className="LoadingBounceBall Bouncing3"></div>
          </div>

          <div className="OnlineFindTextBlock">게임 찾는중</div>
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
