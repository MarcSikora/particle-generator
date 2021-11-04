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
        this.addObject2D = this.props.addObject2D;
        this.toggleUI = this.toggleUI.bind(this);
    }

    toggleUI()
    {
        this.setState(state => {
            return {isVisible: !state.isVisible}
        });
    }

    render() {
        let visibility = (this.state.isVisible) ? "visible" : "hidden";

        return (
            <div>
                <HideButton
                    onChange={this.toggleUI}
                ></HideButton>
                <div style={{visibility: visibility}}>
                    <MainButtons 
                        addParticleSystem={this.addParticleSystem}
                        addObject2D={this.addObject2D}
                        toggleValue={this.toggleValue}
                    ></MainButtons>
                    <Info
                        particleSystemsCount={this.props.particleSystemsCount}
                        objectsCount={this.props.objectsCount}
                    ></Info>
                    <GithubLink></GithubLink>
                </div>
            </div>
        )
    }
}

export default UI
