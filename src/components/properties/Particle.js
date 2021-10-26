import React, { Component } from 'react'
import Property from '../Property'
import ColorPicker from '../basic/ColorPicker'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import squareImg from '../../assets/square.png'

export class Particle extends Component {
    constructor(props)
    {
        super(props)
        this.sourceShapes = [
            {
                id: 0,
                src: squareImg,
                caption: "square"
            },
            {
                id: 1,
                src: squareImg,
                caption: "square"
            },
            {
                id: 2,
                src: squareImg,
                caption: "square"
            },
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
                    label="Shape:"
                    inputName="shape" 
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
                    min="1"
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
