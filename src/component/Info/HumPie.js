import React, { useContext, useEffect } from 'react'
import Chart from "react-apexcharts";
import { WeatherContext } from "../../context/WeatherContext";

export default function HumPie() {
    const { p_options, p_series } = useContext(WeatherContext)

    useEffect(() => {

    }, [p_options, p_series])
    return (
        <div>
            {p_options && p_series && <Chart
                options={p_options}
                series={p_series}
                type="pie"
                width="380"
            />}
        </div>
    )
}
