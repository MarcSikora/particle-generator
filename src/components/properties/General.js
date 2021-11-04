import React, { Component } from 'react'
import Property from '../Property'
import Checkbox from '../basic/Checkbox'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import ImageManager from '../../graphics/ImageManager'

export class General extends Component {
    constructor(props)
    {
        super(props)
        this.im = new ImageManager();
        this.objectImages = this.im.geObjectImagesData();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(inputName, value)
    {
        this.props.onChange("general", inputName, value);
    }

    render()
    {
        return (
            <Property label="General">
                <ImageList 
                    label="Type:"
                    value={this.props.values.type}
                    inputName="type" 
                    onChange={this.handleChange} 
                    items={this.objectImages}>
                </ImageList>
                <Range 
                    label="Scale:"
                    value={this.props.values.scale}
                    min="1"
                    step="0.5"
                    max="16"
                    inputName="scale" 
                    onChange={this.handleChange}>
                </Range> 
                {/* <Checkbox 
                    label="Hidden: "
                    value={this.props.values.isHidden}
                    inputName="isHidden" 
                    onChange={this.handleChange}>
                </Checkbox>
                <Checkbox 
                    label="Transparent: "
                    value={this.props.values.isTransparent}
                    inputName="isTransparent" 
                    onChange={this.handleChange}>
                </Checkbox>
                */}
            </Property>
        )
    }
}

export default General
