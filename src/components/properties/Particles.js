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
                    min="1"
                    step="1"
                    max="100"
                    inputName="amount" 
                    onChange={this.handleChange}>
                </Range>
            </Property>
        )
    }
}

export default Particles
