import React, { Component } from 'react'
import Property from '../Property'
import Checkbox from '../basic/Checkbox'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import ImageManager from '../../graphics/ImageManager'


export class Source extends Component {
    constructor(props)
    {
        super(props)
        this.im = new ImageManager();
        this.sourceShapes = this.im.getSourceShapesData();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(inputName, value)
    {
        this.props.onChange("source", inputName, value);
    }

    render()
    {
        return (
            <Property label="Source">
                <Checkbox 
                    label="Transparent: "
                    value={this.props.values.isTransparent}
                    inputName="isTransparent" 
                    onChange={this.handleChange}>
                </Checkbox>
                <ImageList 
                    label="Shape:"
                    value={this.props.values.shape}
                    inputName="shape" 
                    onChange={this.handleChange} 
                    items={this.sourceShapes}>
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
            </Property>
        )
    }
}

export default Source
