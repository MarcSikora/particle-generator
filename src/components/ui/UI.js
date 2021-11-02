import React, { Component } from 'react'
import GithubLink from './GithubLink'
import Info from './Info';
import MainButtons from './MainButtons'

export class UI extends Component {
    constructor(props)
    {
        super(props);

        this.toggleValue = this.props.toggleValue;
        this.addParticleSystem = this.props.addParticleSystem;
    }

    render() {
        return (
            <div>
                <MainButtons 
                    toggleValue={this.toggleValue}
                    addParticleSystem={this.addParticleSystem}
                ></MainButtons>
                <Info
                    particleSystemsCount={this.props.particleSystemsCount}
                    objectsCount={this.props.objectsCount}
                    particlesCount={this.props.particlesCount}
                ></Info>
                <GithubLink></GithubLink>
            </div>
        )
    }
}

export default UI
