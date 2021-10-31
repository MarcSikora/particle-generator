import React, { Component } from 'react'
import './MainButtons.css'
import Button from './Button'
import PlayButton from './PlayButton'

export class MainButtons extends Component {
    constructor(props)
    {
        super(props);
        this.togglePlay = this.props.togglePlay;
    }

    render() {
        return (
            <div className="MainButtons">
                <PlayButton togglePlay={this.togglePlay}></PlayButton>
                <Button text="Add source"></Button>
                <Button text="Add object"></Button>
                <Button text="Toggle names"></Button>
            </div>
        )
    }
}

export default MainButtons
