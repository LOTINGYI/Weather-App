import React, { useState, useRef, useEffect } from 'react'
import * as d3 from "d3";

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(".2f");

const XAxis = ({ top, bottom, left, right, height, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisBottom(scale));
    });

    return (
        <g
            className="axis x"
            ref={axis}
            transform={`translate(${left}, ${height - bottom})`}
        />
    );
};

const YAxis = ({ top, bottom, left, right, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisLeft(scale));
    });

    return (
        <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
    );
};

const Rect = ({ data, x, y, height, top, bottom, index }) => {
    return (
        <g transform={`translate(${x(data.date)}, ${y(data.value)})`}>
            <rect
                width={x.bandwidth() - 10}
                height={height - bottom - top - y(data.value)}
                fill={colors(index)}
            />
            <text
                transform={`translate(${x.bandwidth() / 2 - 12}, ${-7})`}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fill="grey"
                fontSize="10"
            >
                {format(data.value)}
            </text>
        </g>
    );
};

export default function Bar({ datas, width, height, top, bottom, left, right }) {

    const [sort, setSort] = useState(false)

    const data = sort
        ? [...datas].sort((a, b) => b.value - a.value)
        : [...datas]
    let max = 0;
    let min = 0;
    data.map(d => {
        max = Math.max(d.value, max)
        return max
    })
    data.map(d => {
        min = Math.min(d.value, min)
        return min
    })
    const x = d3
        .scaleBand()
        .range([0, width - left - right])
        .domain(data.map(d => d.date))
        .padding(0.5);
    const y = d3
        .scaleLinear()
        .range([height - top - bottom, bottom])
        .domain([min - 1, max]);


    return (
        <>
            <button
                onClick={() => {
                    setSort(!sort);
                }}
            >
                Toggle sort
            </button>
            <svg width={width} height={height}>
                <XAxis
                    scale={x}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    height={height}
                />
                <YAxis
                    scale={y}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                />
                <g transform={`translate(${left}, ${top})`}>
                    {data.map((d, i) => (
                        <Rect
                            key={i}
                            data={d}
                            index={i}
                            x={x}
                            y={y}
                            top={top}
                            bottom={bottom}
                            height={height}
                        />
                    ))}
                </g>
            </svg>
        </>
    )
}
