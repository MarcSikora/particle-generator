import React, { Component } from 'react'
import Property from '../Property'
import ColorPicker from '../basic/ColorPicker'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import snowflake_01 from '../../assets/snowflake_01.png'
import snowflake_02 from '../../assets/snowflake_02.png'

export class Particle extends Component {
    constructor(props)
    {
        super(props)
        this.sourceShapes = [
            {
                id: 0,
                src: snowflake_01,
                caption: "snowflake_01"
            },
            {
                id: 1,
                src: snowflake_02,
                caption: "snowflake_02"
            }
        ];

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(inputName, value)
    {
        this.props.onChange("particle", inputName, value);
    }

    render() 
    {
        return (
            <Property label="Particle">
                <ImageList 
                    label="Image:"
                    inputName="image" 
                    onChange={this.handleChange} 
                    items={this.sourceShapes}>
                </ImageList>
                <ColorPicker 
                    label="Color:"
                    inputName="color" 
                    onChange={this.handleChange}>
                </ColorPicker>
                <Range 
                    label="Scale:"
                    min="1"
                    step="1"
                    max="16"
                    inputName="scale" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Speed:"
                    min="1"
                    step="0.5"
                    max="8"
                    inputName="speed" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Life span:"
                    min="0.1"
                    step="0.1"
                    max="1"
                    inputName="lifeSpan" 
                    onChange={this.handleChange}>
                </Range>
                <ColorPicker 
                    label="Emission color:"
                    inputName="emissionColor" 
                    onChange={this.handleChange}>
                </ColorPicker>
                <Range 
                    label="Emission radius:"
                    min="0"
                    step="1"
                    max="30"
                    inputName="emissionRadius" 
                    onChange={this.handleChange}>
                </Range>
            </Property>
        )
    }
}

export default Particle
