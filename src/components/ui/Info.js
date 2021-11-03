import React, { Component } from 'react'
import './Info.css'

export class Info extends Component {
    render() {
        return (
            <div className="Info">
                Particle Systems: {this.props.particleSystemsCount} | 
                Objects: {this.props.objectsCount} 
            </div>
        )
    }
}

export default Info
