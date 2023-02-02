import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'

const getIntroOfPage = label => {
  if (label === 'Page A') {
    return "Page A is about men's clothing"
  }
  if (label === 'Page B') {
    return "Page B is about women's dress"
  }
  if (label === 'Page C') {
    return "Page C is about women's bag"
  }
  if (label === 'Page D') {
    return 'Page D is about household goods'
  }
  if (label === 'Page E') {
    return 'Page E is about food'
  }
  if (label === 'Page F') {
    return 'Page F is about baby food'
  }
  return ''
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    )
  }

  return null
}

const ShowImage = () => {
  return (
    <img
      src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
      style={{ width: '10vw', height: '10vh' }}
    />
  )
}

const OfflineResultChart = props => {
  const { data, width, height } = props

  const renderCustomizedLabel = props => {
    const { x, y, width, height, value } = props
    const radius = 10

    return (
      <g>
        <image
          href="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
          width="10%"
          height="10%"
          x="10vw"
          y="10vh"
        />
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value.split(' ')[1]}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        width={1000}
        height="100%"
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 60,
          left: 100,
          bottom: 5,
        }}
      >
        <XAxis type="number" hide={true} tickCount={0} />
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar dataKey="pv" barSize={200} fill="#8884d8">
          <LabelList dataKey="pv" position="right" />
          {/* <LabelList dataKey="name" position="right" content={renderCustomizedLabel} /> */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default OfflineResultChart
