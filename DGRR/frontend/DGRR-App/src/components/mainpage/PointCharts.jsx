import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 3000,

    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 7000,

    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,

    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,

    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,

    amt: 2181,
  },
]
const PointCharts = () => {
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default PointCharts
