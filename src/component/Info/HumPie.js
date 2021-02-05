import React, { useContext, useEffect } from 'react'
import { WeatherContext } from "../../context/WeatherContext";
import PieSVG from "../Pie/PieSVG";
export default function HumPie() {
    const {  p_data } = useContext(WeatherContext)

    useEffect(() => {

    }, [p_data])
    return (
        <div>
            <div>
                 {p_data && <PieSVG
                    data={p_data}
                    width={500}
                    height={500}
                    innerRadius={40}
                    outerRadius={100}
                />}
            </div>
        </div>
    )
}
