import React, { Component } from 'react'
import './Info.css'
import Manual from './Manual'

export class Info extends Component {
    render() {
        return (
            <div className="Info">
                <Manual></Manual>
                <div className="Info--counters">
                    Particle Systems: {this.props.particleSystemsCount} | 
                    Objects: {this.props.objectsCount} 
                </div>
            </div>
        )
    }
}

export default Info
