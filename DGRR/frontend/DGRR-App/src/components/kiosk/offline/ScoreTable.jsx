import React from 'react'
import '../../../scss/ScoreTable.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import KioskLoginPlayer from './KioskLoginPlayer'
import { addPlayer } from '../../../store/OfflineLoginUsers'
// import axios from 'axios'
import { apis } from '../../../API/api'
import ScoreTableBlock from './ScoreTableBlock'

const ScoreTable = props => {
  const NumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { playerNum, isInput, scoreSumArray, scoreArray } = props

  return (
    <div className="ScoreTable">
      {NumArray.map((num, index) => {
        const scoreBoard = [scoreArray[2 * index], scoreArray[2 * index + 1]]
        if (index === 9) scoreBoard.push(scoreArray[2 * (index + 1)])

        return (
          <ScoreTableBlock
            frameNum={num}
            key={`ScoreTableBlock-${index}`}
            playerNum={playerNum}
            scoreSum={scoreSumArray[index]}
            scoreBoard={scoreBoard}
            isInput={isInput}
          />
        )
      })}
    </div>
  )
}

export default ScoreTable
