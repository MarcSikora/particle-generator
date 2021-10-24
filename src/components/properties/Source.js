import React, { Component } from 'react'
import Property from '../Property'
import Checkbox from '../basic/Checkbox'
import ImageList from '../basic/ImageList'
import Range from '../basic/Range'
import squareImg from '../../assets/square.png'

export class Source extends Component {
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
        this.props.onChange("source", inputName, value);
    }

    render()
    {
        return (
            <Property label="Source">
                <Checkbox 
                    label="Transparent: "
                    inputName="isTransparent" 
                    onChange={this.handleChange}>
                </Checkbox>
                <ImageList 
                    label="Shape:"
                    inputName="shape" 
                    onChange={this.handleChange} 
                    items={this.sourceShapes}>
                </ImageList>
                <Range 
                    label="Scale:"
                    min="1"
                    step="1"
                    max="16"
                    inputName="scale" 
                    onChange={this.handleChange}>
                </Range>
            </Property>
        )
    }
}

export default Source
