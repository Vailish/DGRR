import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KioskNavBlock from '../KioskNavBlock'
import { useSelector } from 'react-redux'
import '../../../scss/KioskOnlineFind.scss'
import { api } from '../../../API/api'
import { useDispatch } from 'react-redux'
import { loadBothPlayers } from '../../../modules/OnlineLoginUser'
import { Link } from 'react-router-dom'

const MatchedWindow = React.memo(() => {
  const navigate = useNavigate()
  const [barLength, setbarLength] = useState(0)
  setTimeout(
    useEffect(() => {
      const loadingBar = setInterval(() => {
        setbarLength(barLength + 2)
      }, 100)
      if (barLength >= 100) {
        clearInterval(loadingBar)
        navigate('/KioskOnlineMatching')
      }
      return () => {
        clearInterval(loadingBar)
      }
    }),
    1000,
  )
  return (
    <div className="MatchedWindow">
      <div className="MatchedTitle">매칭 상대를 찾았습니다!</div>
      <div className="MatchedAppear">
        <div className="MatchedLoadingText"> LOADING... </div>
        <div className="MatchedLoading">
          <div className="MatchedLoadingBar" style={{ width: `${barLength}%` }}></div>
        </div>
      </div>
    </div>
  )
})

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

  const whenMatched = () => {
    console.log('잡힘')
    setisMatched(!isMatched)
    // goMatching()
  }

  // const goMatching = () => {
  //   setTimeout(() => {
  //     navigate('/KioskOnlineMatching')
  //   }, 2000)
  // }

  const reqMatching = async nickname => {
    console.log(JSON.stringify({ nickname }))
    const url = '/api/v1/game/matching/result'
    const response = await api.post(url, JSON.stringify({ nickname }))
    if (response.data) {
      const oppositePlayer = response.data
      const randomNumber = response.data.randomNumber
      const imgUrl = '/api/v1/request/userimg/' + oppositePlayer.nickname
      const requestImg = await api.get(imgUrl)
      oppositePlayer.profile = requestImg.data
      setflag(true)
      whenMatched()
      console.log('내응답이야' + response.data.randomNumber)
      dispatch(loadBothPlayers(oppositePlayer, randomNumber))
    }
  }

  return (
    <div className="KioskBackground">
      <KioskNavBlock />
      {isMatched ? <MatchedWindow /> : null}
      <div className="OnlineFindContentBlock">
        <div className="OnlineFindCenterAlign">
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
          <Link className="OnlineFindCancelBlock" to="/KioskOnlineLogin">
            취소
          </Link>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineFind
