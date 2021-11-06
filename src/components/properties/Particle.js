import React, { Component } from 'react'
import Property from '../Property'
import ColorPicker from '../basic/ColorPicker'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import ImageManager from '../../graphics/ImageManager'

export class Particle extends Component {
    constructor(props)
    {
        super(props)
        this.im = new ImageManager();
        this.images = this.im.getParticleImagesData();
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
                    value={this.props.values.image}
                    inputName="image" 
                    onChange={this.handleChange} 
                    items={this.images}>
                </ImageList>
                {/* <ColorPicker 
                    label="Color:"
                    value={this.props.values.color}
                    inputName="color" 
                    onChange={this.handleChange}>
                </ColorPicker> */}
                <Range 
                    label="Scale:"
                    value={this.props.values.scale}
                    min="1"
                    step="0.5"
                    max="16"
                    inputName="scale" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Speed:"
                    value={this.props.values.speed}
                    min="1"
                    step="0.5"
                    max="8"
                    inputName="speed" 
                    onChange={this.handleChange}>
                </Range>
                <Range 
                    label="Lifespan:"
                    value={this.props.values.lifespan}
                    min="0.1"
                    step="0.1"
                    max="20"
                    inputName="lifespan" 
                    onChange={this.handleChange}>
                </Range>
                <ColorPicker 
                    label="Emission color:"
                    value={this.props.values.emissionColor}
                    inputName="emissionColor" 
                    onChange={this.handleChange}>
                </ColorPicker>
                <Range 
                    label="Emission radius:"
                    value={this.props.values.emissionRadius}
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
