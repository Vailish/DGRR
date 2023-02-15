import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { request } from '../../API/request'

const PointCharts = ({ nickname }) => {
  const [pointGraph, setPointGraph] = useState([])
  const reqUserScore = async nickname => {
    try {
      const response = await request.get(`/api/v1/data/graphdata/${nickname}`)
      var newGameDate = response.data
      console.log(newGameDate)
      for (let i = 0; i < newGameDate.length; i++) {
        newGameDate[i].gameDate = newGameDate[i].gameDate.substr(0, 10)
      }
      setPointGraph(newGameDate)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    console.log(nickname)
    reqUserScore(nickname)
  }, [])
  return (
    <div>
      <LineChart
        width={600}
        height={200}
        data={pointGraph}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gameDate" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="totalScore" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default PointCharts