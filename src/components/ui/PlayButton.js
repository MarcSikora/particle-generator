import React, { Component } from 'react'
import './PlayButton.css'
import PlayImg from '../../assets/play.png'
import PauseImg from '../../assets/pause.png'

export class PlayButton extends Component {
    constructor(props)
    {
        super(props);
        this.state = {running: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.setState((state) => {
            return {running: !state.running}
        });

        this.props.togglePlay();
    }

    render() {
        return (
            <div className="PlayButton" onClick={this.handleClick}>
                <img 
                    className="PlayButton--img"
                    src={(this.state.running) ? PauseImg : PlayImg}
                    alt="Play button"
                ></img>
            </div>
        )
    }
}

export default PlayButton
