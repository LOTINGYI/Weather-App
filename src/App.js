import { useState, useContext } from "react";
import TempBar from "./Info/TempBar";
import { WeatherContext } from "./WeatherContext";



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
     { console.log("hello")}
      {/* Weather Card */}
      <TempBar/>
    </div>
  );
}

export default App;
