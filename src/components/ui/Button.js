import React, { Component } from 'react'
import './Button.css'

export class Button extends Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        console.log(this.props.text)
    }

    render() {
        return (
            <div className="Button"
                onClick={this.handleClick}
            >
                {this.props.text}
            </div>
        )
    }
}

export default Button
