import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const PieGraph = ({ title, startColor, endColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    { name: "Group A", value: 230, fill: startColor },
    { name: "Group B", value: 100, fill: endColor },
  ];
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    }
      = props;
    // const sin = Math.sin(-RADIAN * midAngle);
    // const cos = Math.cos(-RADIAN * midAngle);
    // const sx = cx + (outerRadius + 10) * cos;
    // const sy = cy + (outerRadius + 10) * sin;
    // const mx = cx + (outerRadius + 30) * cos;
    // const my = cy + (outerRadius + 30) * sin;
    // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    // const ey = my;
    // const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="black">
          {/* {payload.name} */}
          <tspan x={cx} dy="-32" alignmentBaseline="middle" fontSize="110%" fontWeight="100%">
            {title}
          </tspan>
          <tspan x={cx} dy="30%" fontSize="300%" fontWeight="100%">
            {123}
          </tspan>
        </text> 
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  return (
    <PieChart width={180} height={180}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={"50%"}
        cy={"47%"}
        innerRadius={"77%"}
        outerRadius={"100%"}
        // fill="#8884d8"
        dataKey="value"
        // onMouseEnter={onPieEnter}
        startAngle={90}
        endAngle={-270}
      />
    </PieChart>
  )
}

export default PieGraph