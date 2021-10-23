import React, { Component } from 'react'
import './ColorPicker.css'

export class ColorPicker extends Component {
    constructor(props)
    {
        super(props);
        this.state = {value: ""}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        const value = e.target.value;
        this.props.onChange(this.props.inputName, value);
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="ColorPicker">
                <label>Color: </label>
                <input className="ColorPicker--input" type="color" onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default ColorPicker
