import { useState, useContext, useEffect } from "react";
import HumPie from "./component/Info/HumPie";
import TempBar from "./component/Info/TempBar";
import { WeatherContext } from "./context/WeatherContext";
import "./App.css";


function App() {
  const [location, setLocation] = useState("")
  const { err, handleCountry, clearError, b_data } = useContext(WeatherContext)

  const handleChange = (event) => {
    event.preventDefault();
    setLocation(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCountry(location)
  }
  useEffect(() => {

    if (err) {
      alert("err: please enter the valid city not country")
      clearError()
    }
   
  }, [err])

  return (
    <div className="App">
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="user_input">
        {/* Search Bar */}
        <form onSubmit={handleSubmit}>
          <input type="text" value={location} onChange={handleChange} placeholder="london" />
          <input type="submit" />
        </form>
      </div>
      {/* Weather Card */}
     {b_data? <div className="weather_card">
        <div className="temp_bar">
          <h3 className="temp_bar_header">Temparature Bar</h3>
          <div className="max_temp">
            <span>Max Temparature</span>
            {b_data && <TempBar data={b_data.max_data} />}
          </div>
          <div className="min_temp"> 
            <span>Min Temparature</span>
            {b_data && <TempBar data={b_data.min_data} />}
          </div>
        </div>
        <div className="hum_pie">
          <h3 className="hum_pie_header">Humidity Pie</h3>
          <HumPie />
        </div>
      </div>: <h2 className="notification">Please input the location</h2>}

    </div>
  );
}

export default App;
