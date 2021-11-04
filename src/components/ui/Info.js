import React, { Component } from 'react'
import './Info.css'

export class Info extends Component {
    render() {
        return (
            <div className="Info">
                <div class="Info--manual">
                    <div class="Info--manual-item">
                        <span class="Info--manual-key">LMB</span>
                        <span class="Info--manual-description"> - grab/move/select object</span>
                    </div>
                    <div class="Info--manual-item">
                        <span class="Info--manual-key">X</span>
                        <span class="Info--manual-description"> - remove object</span>
                    </div>
                    <div class="Info--manual-item">
                        <span class="Info--manual-key">W/ArrowUp</span>
                        <span class="Info--manual-description"> - move object layer up</span>
                    </div>
                    <div class="Info--manual-item">
                        <span class="Info--manual-key">S/ArrowUp</span>
                        <span class="Info--manual-description"> - move object layer down</span>
                    </div>
                </div>
                <div class="Info--counters">
                    Particle Systems: {this.props.particleSystemsCount} | 
                    Objects: {this.props.objectsCount} 
                </div>
            </div>
        )
    }
}

export default Info
