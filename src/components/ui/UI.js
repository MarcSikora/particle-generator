import React, { Component } from 'react'
import GithubLink from './GithubLink'
import MainButtons from './MainButtons'

export class UI extends Component {
    constructor(props)
    {
        super(props);
        this.togglePlay = this.props.togglePlay;
    }

    render() {
        return (
            <div>
                <MainButtons togglePlay={this.togglePlay}></MainButtons>
                <GithubLink></GithubLink>
            </div>
        )
    }
}

export default UI
