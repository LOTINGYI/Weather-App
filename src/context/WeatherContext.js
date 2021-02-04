import React, { Component } from 'react'
const WeatherContext = React.createContext(null)


class WeatherProvider extends Component {

    componentDidMount() {
        console.log("hello component did mount")
        this.setState({
            country: '',
            changed: true,
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState && this.state.changed) {
            // console.log("hello component did update: ", prevState, " curState: ", this.state)
            if (this.state.country) {
                try {
                    let c_response = await fetch(`https://www.metaweather.com/api/location/search/?query=${this.state.country}`)
                    let c_data = await c_response.json()
                    let woeid = c_data[0].woeid
                    let t_response = await fetch(`https://www.metaweather.com/api/location/${woeid}/`)
                    let t_data = await t_response.json()
                    console.log(t_data)
                    let max_temp = []
                    let min_temp = []
                    let fc_date = []
                    let humidity = []
                    t_data.consolidated_weather.map(forecast => {
                        max_temp.push(forecast.max_temp.toFixed(2))
                        min_temp.push(forecast.min_temp.toFixed(2))
                        humidity.push(forecast.humidity)
                        let date = new Date(forecast.applicable_date.split('-').join('/'))
                        fc_date.push((date.getMonth() + 1) + '/' + date.getDate())
                        return t_data
                    })

                    this.setState({
                        b_options: {
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                type: "date",
                                categories: fc_date
                            }
                        },
                        b_series: [
                            {
                                name: "max temp",
                                data: max_temp
                            },
                            {
                                name: "min temp",
                                data: min_temp
                            }
                        ],
                        p_options: {
                            chart: {
                                width: 380,
                                type: 'pie',
                            },
                            labels: fc_date
                        },
                        p_series: humidity,
                        changed: false,
                    })
                } catch (err) {
                    console.log("Something went wrong~")
                    this.setState({
                        err,
                        changed: false,
                    })
                }

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