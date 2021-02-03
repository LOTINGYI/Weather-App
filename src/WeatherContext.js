import React, { Component } from 'react'
const WeatherContext = React.createContext(null)


class WeatherProvider extends Component {

    componentDidMount() {
        console.log("hello component did mount")
        this.setState({
            country: '',
            changed: true
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState && this.state.changed) {
            // console.log("hello component did update: ", prevState, " curState: ", this.state)
            if (this.state.country) {
                let c_response = await fetch(`https://www.metaweather.com/api/location/search/?query=${this.state.country}`)
                let c_data = await c_response.json()
                let woeid = c_data[0].woeid
                let t_response = await fetch(`https://www.metaweather.com/api/location/${woeid}/`)
                let t_data = await t_response.json()

                let max_temp = []
                let min_temp = []
                t_data.consolidated_weather.map(forecast => {
                    max_temp.push(forecast.max_temp.toFixed(2))
                    min_temp.push(forecast.min_temp.toFixed(2))
                    return t_data
                })

                this.setState({
                    max_temp: max_temp,
                    min_temp: min_temp,
                    changed: false,
                })
            }
        }
    }

    handleCountry = (country) => {
        this.setState({
            country,
            changed: true
        })
    }
    render() {
        return (
            <>
                <WeatherContext.Provider value={{
                    ...this.state,
                    handleCountry: this.handleCountry
                }}>
                    {this.props.children}
                </WeatherContext.Provider>
            </>
        )
    }
}


export { WeatherContext, WeatherProvider }