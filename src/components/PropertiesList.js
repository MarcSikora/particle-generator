import React, { Component } from 'react'
import './PropertiesList.css'
import Property from './Property'
import ColorPicker from './ColorPicker'
import Checkbox from './Checkbox'
import ImageList from './ImageList'

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
                    <ColorPicker inputName="backgroundColor" onChange={this.handleChange}></ColorPicker>
                </Property>
                <Property label="Source">
                    <Checkbox inputName="sourceIsTransparent" onChange={this.handleChange}></Checkbox>
                    <ImageList inputName="sourceShape" onChange={this.handleChange} items={this.sourceShapes}></ImageList>
                </Property>
            </div>
        )
    }
}

export default PropertiesList
