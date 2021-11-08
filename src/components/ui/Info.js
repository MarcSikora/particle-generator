import React, { Component } from 'react'
import './Info.css'

export class Info extends Component {
    render() {
        return (
            <div className="Info">
                <div className="Info--manual">
                    <div className="Info--manual-item">
                        <span className="Info--manual-key">LMB</span>
                        <span className="Info--manual-description"> - grab/move/select object</span>
                    </div>
                    <div className="Info--manual-item">
                        <span className="Info--manual-key">D</span>
                        <span className="Info--manual-description"> - duplicate object</span>
                    </div>
                    <div className="Info--manual-item">
                        <span className="Info--manual-key">X</span>
                        <span className="Info--manual-description"> - remove object</span>
                    </div>
                    <div className="Info--manual-item">
                        <span className="Info--manual-key">W</span>
                        <span className="Info--manual-description"> - move object layer up</span>
                    </div>
                    <div className="Info--manual-item">
                        <span className="Info--manual-key">S</span>
                        <span className="Info--manual-description"> - move object layer down</span>
                    </div>
                </div>
                <div className="Info--counters">
                    Particle Systems: {this.props.particleSystemsCount} | 
                    Objects: {this.props.objectsCount} 
                </div>
            </div>
        )
    }
}

export default Info
