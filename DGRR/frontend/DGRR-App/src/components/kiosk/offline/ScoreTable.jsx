import React from 'react'
import '../../../scss/ScoreTable.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import ScoreTableBlock from './ScoreTableBlock'

const ScoreTable = (props) => {
  const NumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { isInput} = props

  return (
    <div className="ScoreTable">
      {NumArray.map((num, index) => (
        <ScoreTableBlock frameNum={num} key={index} isInput={isInput} />
      ))}
    </div>
  )
}

export default ScoreTable
