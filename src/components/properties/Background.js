import React, { Component } from 'react'
import Property from '../Property'
import ColorPicker from '../basic/ColorPicker'

export class Background extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(inputName, value)
    {
        this.props.onChange("background", inputName, value);
    }

    render() 
    {
        return (
            <Property label="Background">
                <ColorPicker 
                    label="Color: "
                    inputName="color" 
                    onChange={this.handleChange}>
                </ColorPicker>
            </Property>
        )
    }
}

export default Background
