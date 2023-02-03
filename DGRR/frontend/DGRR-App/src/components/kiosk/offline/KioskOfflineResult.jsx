import React from 'react'
import '../../../scss/KioskOfflineResult.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { sendAllScore } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import KioskNavBlock from './KioskNavBlock'
import ResultChart from './ResultChart'
import OfflineResultChart from './OfflineResultChart'

const ShowImage = props => {
  const { x, y, width, height, value } = props
  const radius = 10

  return (
    <g>
      <image href="../../../public/logo192.png" width="10%" height="10%" x="10vw" y="10vh" />
    </g>
  )
}

const data = [
  { name: '갓냥이', pv: 168 },
  //   { name: '김볼링', pv: 99 },
]

const KioskOfflineResult = () => {
  const dispatch = useDispatch()

  const onSendAllScore = () => dispatch(sendAllScore())

  return (
    <div className="KioskBackground">
      <KioskNavBlock goFrontTo="/KioskLogin" />
      <div className="ResultContentBlock">
        <div className="EachPlayerBlock">
          <div className="PlayerProfile"></div>
          <div className="PlayerScoreChart">
            <OfflineResultChart data={data} width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KioskOfflineResult
