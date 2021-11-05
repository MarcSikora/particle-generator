import React, { Component } from 'react'
import Property from '../Property'
import ColorPicker from '../basic/ColorPicker'
import ImageList from '../basic/ImageList';
import ImageManager from '../../graphics/ImageManager';

export class Background extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.im = new ImageManager();
        this.images = this.im.getBackgroundImagesData();
    }

    handleChange(inputName, value)
    {
        this.props.onChange(inputName, value);
    }

    render() 
    {
        return (
            <Property label="Background">
                <ColorPicker 
                    label="Color: "
                    value={this.props.values.color}
                    inputName="color" 
                    onChange={this.handleChange}>
                </ColorPicker>
                <ImageList
                    label="Image:"
                    value={this.props.values.image}
                    inputName="image" 
                    onChange={this.handleChange} 
                    items={this.images}>
                </ImageList>
            </Property>
        )
    }
}

export default Background
