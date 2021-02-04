import React, { useContext, useEffect } from 'react'
import Chart from "react-apexcharts";
import { WeatherContext } from "../../context/WeatherContext";

export default function TempBar() {
    const { b_options,b_series } = useContext(WeatherContext)

    useEffect(() => {

    }, [b_options,b_series])

    return (
        <div>
            {b_options && b_series && <Chart
                options={b_options}
                series={b_series}
                type="bar"
                width="800"
            />}
        </div>
    )
}
