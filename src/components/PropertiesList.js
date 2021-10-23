import React, { Component } from 'react'
import './PropertiesList.css'
import Property from './Property'
import ColorPicker from './ColorPicker'
import Checkbox from './Checkbox'
import ImageList from './ImageList'
import Range from './Range'

import squareImg from '../assets/square.png'

export class PropertiesList extends Component {
    constructor(props)
    {
        super(props);

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
        ]

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, value)
    {
        this.props.onChange(name, value);
    }

    render() {
        return (
            <div className="PropertiesList">
                <Property label="Background">
                    <ColorPicker 
                        label="Color: "
                        inputName="backgroundColor" 
                        onChange={this.handleChange}>
                    </ColorPicker>
                </Property>
                <Property label="Source">
                    <Checkbox 
                        label="Transparent: "
                        inputName="sourceIsTransparent" 
                        onChange={this.handleChange}>
                    </Checkbox>
                    <ImageList 
                        label="Shape:"
                        inputName="sourceShape" 
                        onChange={this.handleChange} 
                        items={this.sourceShapes}>
                    </ImageList>
                    <Range 
                        label="Scale:"
                        min="1"
                        step="1"
                        max="16"
                        inputName="sourceScale" 
                        onChange={this.handleChange}>
                    </Range>
                </Property>
                <Property label="Particles">
                    <Range 
                        label="Amount/s:"
                        min="1"
                        step="1"
                        max="100"
                        inputName="particlesCount" 
                        onChange={this.handleChange}>
                    </Range>
                </Property>
                <Property label="Particle">
                    <ImageList 
                        label="Shape:"
                        inputName="particleShape" 
                        onChange={this.handleChange} 
                        items={this.sourceShapes}>
                    </ImageList>
                    <ColorPicker 
                        label="Color:"
                        inputName="particleColor" 
                        onChange={this.handleChange}>
                    </ColorPicker>
                    <Range 
                        label="Scale:"
                        min="1"
                        step="1"
                        max="16"
                        inputName="particleSize" 
                        onChange={this.handleChange}>
                    </Range>
                    <Range 
                        label="Life span:"
                        min="0.1"
                        step="0.1"
                        max="1"
                        inputName="particleSize" 
                        onChange={this.handleChange}>
                    </Range>
                    <ColorPicker 
                        label="Emission color:"
                        inputName="particleEmissionColor" 
                        onChange={this.handleChange}>
                    </ColorPicker>
                    <Range 
                        label="Emission radius:"
                        min="1"
                        step="1"
                        max="30"
                        inputName="particleEmissionRadius" 
                        onChange={this.handleChange}>
                    </Range>
                </Property>
            </div>
        )
    }
}

export default PropertiesList
