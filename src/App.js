import { useState, useContext } from "react";
import HumPie from "./component/Info/HumPie";
import TempBar from "./component/Info/TempBar";
import { WeatherContext } from "./context/WeatherContext";



function App() {
  const [location, setLocation] = useState("")
  const { handleCountry } = useContext(WeatherContext)

  const handleChange = (event) => {
    event.preventDefault();
    setLocation(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCountry(location)
  }
  return (
    <div className="App">
      {/* Search Bar */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={handleChange} />
        <input type="submit" />
      </form>

      {/* Weather Card */}
      <TempBar />
      <HumPie />
    </div>
  );
}

export default App;
