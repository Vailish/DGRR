import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KioskNavBlock from '../KioskNavBlock'
import '../../../scss/KioskOnlineFind.scss'
import { SyncLoader } from 'react-spinners'

const KioskTimeCount = props => {
  const { CountingTimeNow } = props
  return <div>{CountingTimeNow}</div>
}

const KioskOnlineFind = () => {
  let waitingSec = 0
  let waitingMin = 0
  const TimeCountingRef = useRef()
  const navigate = useNavigate()
  const timerCount = setInterval(() => {
    waitingSec++
    console.log(waitingSec)
    console.log(TimeCountingRef.current.innerText)
    if (waitingSec < 60) {
      TimeCountingRef.current.innerText =
        String(waitingMin).padStart(2, '0') + ':' + String(waitingSec).padStart(2, '0')
    } else {
      waitingSec = 0
      waitingMin++
      TimeCountingRef.current.innerText =
        String(waitingMin).padStart(2, '0') + ':' + String(waitingSec).padStart(2, '0')
    }
  }, 1000)
  setTimeout(() => {
    navigate('/KioskOnlineMatching')
    clearInterval(timerCount)
  }, 5000)
  return (
    <div className="KioskBackground">
      <KioskNavBlock goBackTo="/KioskOnlineProfile" />
      <div className="OnlineFindContentBlock">
        <div className="OnlineFindCenterAlign">
          {/* <SyncLoader className="OnlineFindLoading" color="#36d7b7" size={80} margin={40} /> */}
          <div className="LoadingBounceBallBlock">
            <div className="LoadingBounceBall Bouncing"></div>
            <div className="LoadingBounceBall Bouncing2"></div>
            <div className="LoadingBounceBall Bouncing3"></div>
          </div>

          <div className="OnlineFindTextBlock">게임 찾는중</div>
          <div className="OnlineFindTimeBlock" ref={TimeCountingRef}>
            00:00
          </div>
          {/* {setInterval(() => {
            waitingSec++
            console.log(waitingSec)
            KioskTimeCount(waitingSec)
          }, 1000)} */}
          <div className="OnlineFindCancelBlock">취소</div>
        </div>
      </div>
    </div>
  )
}

export default KioskOnlineFind
