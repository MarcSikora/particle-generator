import React, { Component } from 'react'
import GithubLink from './GithubLink'
import HideButton from './HideButton';
import Info from './Info'
import MainButtons from './MainButtons'

export class UI extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isVisible: true
        }
        this.toggleValue = this.props.toggleValue;
        this.addParticleSystem = this.props.addParticleSystem;
        this.toggleUI = this.toggleUI.bind(this);
    }

    toggleUI()
    {
        this.setState(state => {
            return {isVisible: !state.isVisible}
        });
    }

    render() {
        if(this.state.isVisible)
            return (
                <div>
                    <HideButton
                        onChange={this.toggleUI}
                    ></HideButton>
                    <MainButtons 
                        toggleValue={this.toggleValue}
                        addParticleSystem={this.addParticleSystem}
                    ></MainButtons>
                    <Info
                        particleSystemsCount={this.props.particleSystemsCount}
                        objectsCount={this.props.objectsCount}
                    ></Info>
                    <GithubLink></GithubLink>
                </div>
            )
        return (
            <div>
                <HideButton
                    onChange={this.toggleUI}
                ></HideButton>
            </div>
        )
    }
}

export default UI
