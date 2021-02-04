import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    componentDidCatch(err, errinfo) {
        console.log(err, errinfo)
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
