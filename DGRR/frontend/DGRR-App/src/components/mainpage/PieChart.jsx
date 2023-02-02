import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const PieGraph = ({ title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    { name: "Group A", value: 150, fill:"#8884d8" },
    { name: "Group B", value: 150 },
    // { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 }
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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {/* {payload.name} */}
          <tspan x={cx} dy="0" alignmentBaseline="middle" fontSize="120%">
            {title}
          </tspan>
          <tspan x={cx} dy="-10" fontSize="14">
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
    <PieChart width={200} height={200}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={"50%"}
        cy={"50%"}
        innerRadius={"70%"}
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