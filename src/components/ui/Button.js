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
        this.props.onClick();
    }

    render() {
        return (
            <button className="Button"
                onClick={this.handleClick}
            >
                {this.props.text}
            </button>
        )
    }
}

export default Button
