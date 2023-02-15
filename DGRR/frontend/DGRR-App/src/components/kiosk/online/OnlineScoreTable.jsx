import React from 'react'
import '../../../scss/OnlineScoreTable.scss'
import OnlineScoreTableBlock from './OnlineScoreTableBlock'

const OnlineScoreTable = props => {
  const { scoreSumArray, scoreArray, oppositeScoreArray, oppositeSumArray } = props
  const NumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="OnlineScoreTable">
      {NumArray.map((num, index) => {
        const scoreBoard = [scoreArray[2 * index], scoreArray[2 * index + 1]]
        const oppositeScoreBoard = [oppositeScoreArray[2 * index], oppositeScoreArray[2 * index + 1]]
        if (index === 9) {
          scoreBoard.push(scoreArray[2 * (index + 1)])
          oppositeScoreBoard.push(oppositeScoreArray[2 * (index + 1)])
        }

        return (
          <OnlineScoreTableBlock
            frameNum={num}
            key={index}
            scoreBoard={scoreBoard}
            scoreSum={scoreSumArray[index]}
            oppositeScoreBoard={oppositeScoreBoard}
            oppositeScoreSum={oppositeSumArray[index]}
          />
        )
      })}
    </div>
  )
}

export default OnlineScoreTable
