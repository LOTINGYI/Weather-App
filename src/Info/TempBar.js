import React, { useContext, useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { WeatherContext } from "../WeatherContext";

export default function TempBar() {
    const { max_temp, min_temp } = useContext(WeatherContext)
    const [options, setOptions] = useState()
    const [series, setSeries] = useState()
    useEffect(() => {

        const o = {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        }

        const s = [
            {
                name: "max temp",
                data: max_temp
            },
            {
                name: "min temp",
                data: min_temp
            }
        ]
        console.log(o,s)
        setOptions(o)
        setSeries(s)
    }, [max_temp, min_temp])
    return (
        <div>
            {options && series && <Chart
                options={options}
                series={series}
                type="bar"
                width="500"
            />}
        </div>
    )
}
