import React, { Component } from 'react'
import './ColorPicker.css'

export class ColorPicker extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        const value = e.target.value;
        this.props.onChange(this.props.inputName, value);
    }

    render() {
        return (
            <div className="ColorPicker">
                <label>{this.props.label}</label>
                <input className="ColorPicker--input" type="color" value={this.props.value} onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default ColorPicker
