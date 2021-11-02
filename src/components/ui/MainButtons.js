import React, { Component } from 'react'
import './MainButtons.css'
import Button from './Button'
import PlayButton from './PlayButton'

export class MainButtons extends Component {
    constructor(props)
    {
        super(props);
        this.toggleValue = this.props.toggleValue;
        this.addParticleSystem = this.props.addParticleSystem;
        this.toggleNames = this.toggleNames.bind(this);
    }

    toggleNames()
    {
        this.props.toggleValue("isNameVisible");
    }

    render() {
        return (
            <div className="MainButtons">
                <PlayButton onClick={this.toggleValue}></PlayButton>
                <Button text="Add particle system" onClick={this.addParticleSystem}></Button>
                <Button text="Add object"></Button>
                <Button text="Toggle names" onClick={this.toggleNames}></Button>
            </div>
        )
    }
}

export default MainButtons
