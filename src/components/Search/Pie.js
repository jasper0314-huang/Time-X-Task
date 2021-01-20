import React, { useEffect, useCallback, useRef, useState, Component } from 'react'
import { PieChart } from "react-minimal-pie-chart";

export function Pie() {
    const lineWidth = 60;

    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    const data = [
        {
        color: "#E38627",
        title: "One",
        value: 10,
        },
        {
        color: "#C13C37",
        title: "Two",
        value: 15,
        },
        {
        color: "#6A2135",
        title: "Three",
        value: 20,
        }
    ]

    return (
    <div>
        <PieChart
            style={{
                fontFamily:
                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '8px',
            }}
            data={data}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={60}
            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
            segmentsShift={(index) => (index === selected ? 6 : 1)}
            animate
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            labelPosition={100 - lineWidth / 2}
            labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
            }}
            onClick={(_, index) => {
                setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
                setHovered(index);
            }}
            onMouseOut={() => {
                setHovered(undefined);
            }}
            />	
        </div>
    );
}

export default Pie;
