import React, { Component } from 'react'
import Property from '../Property'
import Range from '../basic/Range'

export class Particles extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(inputName, value)
    {
        this.props.onChange("particles", inputName, value);
    }


    render() 
    {
        return (
            <Property label="Particles">
                <Range 
                    label="Amount/s:"
                    value={this.props.values.amount}
                    min="1"
                    step="1"
                    max="100"
                    inputName="amount" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Direction:"
                    value={this.props.values.direction}
                    min="0"
                    step="5"
                    max="360"
                    inputName="direction" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Scale over time:"
                    value={this.props.values.scaleOverTime}
                    min="0"
                    step="1"
                    max="10"
                    inputName="scaleOverTime" 
                    onChange={this.handleChange}>
                </Range>
            </Property>
        )
    }
}

export default Particles
