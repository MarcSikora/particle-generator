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
        this.addObject2D = this.props.addObject2D;
        this.toggleNames = this.toggleNames.bind(this);
        this.toggleGizmos = this.toggleGizmos.bind(this);
    }

    toggleNames()
    {
        this.props.toggleValue("isNameVisible");
    }

    toggleGizmos()
    {
        this.props.toggleValue("isGizmoVisible");
    }

    render() {
        return (
            <div className="MainButtons">
                <PlayButton onClick={this.toggleValue}></PlayButton>
                <Button text="Add particle system" onClick={this.addParticleSystem}></Button>
                <Button text="Add object" onClick={this.addObject2D}></Button>
                <Button text="Toggle names" onClick={this.toggleNames}></Button>
                <Button text="Toggle gizmos" onClick={this.toggleGizmos}></Button>
            </div>
        )
    }
}

export default MainButtons
