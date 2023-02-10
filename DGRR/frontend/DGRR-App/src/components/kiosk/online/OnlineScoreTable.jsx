import React from 'react'
import '../../../scss/OnlineScoreTable.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import OnlineScoreTableBlock from './OnlineScoreTableBlock'

const OnlineScoreTable = props => {
  const { scoreSumArray, scoreArray } = props
  const NumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="OnlineScoreTable">
      {NumArray.map((num, index) => {
        const scoreBoard = [scoreArray[2 * index], scoreArray[2 * index + 1]]
        if (index === 9) scoreBoard.push(scoreArray[2 * (index + 1)])

        return (
          <OnlineScoreTableBlock frameNum={num} key={index} scoreBoard={scoreBoard} scoreSum={scoreSumArray[index]} />
        )
      })}
    </div>
  )
}

export default OnlineScoreTable
