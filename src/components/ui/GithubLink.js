import React, { Component } from 'react'
import '../../components/ui/GithubLink.css'
import github_icon from '../../assets/github.png';

export class GithubLink extends Component {
    render() {
        return (
            <div className="GithubLink">
                <a href="https://github.com/MarcSikora/particle-generator">
                    <img src={github_icon} alt="Github link"></img>
                </a>
            </div>
        )
    }
}

export default GithubLink
