import React, { Component } from 'react'
import './Range.css'

export class Range extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        const value = parseFloat(e.target.value);
        this.props.onChange(this.props.inputName, value);
    }

    render() {
        return (
            <div className="Range">
                <label> {this.props.label} </label>
                <div className="Range--inputContainer">
                    <input 
                        className="Range--input" 
                        type="range" 
                        min={this.props.min}
                        step={this.props.step}
                        max={this.props.max}
                        value={this.props.value}
                        onChange={this.handleChange}>
                    </input>
                    <div className="Range--value">{this.props.value}</div>
                </div>
            </div>
        )
    }
}

export default Range
