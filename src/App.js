import { useEffect, useState } from "react";
function App() {
  const [location, setLocation] = useState("")
  const [info, setInfo] = useState()
  const [weather, setWeather] = useState()

  const handleChange = (event) => {
    event.preventDefault();
    setLocation(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://www.metaweather.com/api/location/${info}/`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log("hello: ", data)
        setWeather(data)
      })
  }
  useEffect(() => {
    if (location) {
      fetch(`https://www.metaweather.com/api/location/search/?query=${location}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          data.map(d => {
            setInfo(d.woeid)
            return d
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [location])
  return (
    <div className="App">
      {/* Search Bar */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={handleChange} />
        <input type="submit" />
      </form>


      {/* Weather Card */}
      {weather ? console.log(weather.consolidated_weather) : <></>}
    </div>
  );
}

export default App;
