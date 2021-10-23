import React, { Component } from 'react'
import './PropertiesList.css'
import Property from './Property'
import ColorPicker from './ColorPicker'

export class PropertiesList extends Component {
    constructor(props)
    {
        super(props);
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
            </div>
        )
    }
}

export default PropertiesList
