import React, { Component } from 'react'
import './PropertiesList.css'
import Background from './properties/Background';
import Source from './properties/Source';
import Particles from './properties/Particles';
import Particle from './properties/Particle';


export class PropertiesList extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(propertyName, inputName, value)
    {
        this.props.onChange(propertyName, inputName, value);
    }

    render() {
        return (
            <div className="PropertiesList">
                <Background
                    onChange={this.handleChange}
                ></Background>
                <Source
                    onChange={this.handleChange}
                ></Source>
                <Particles
                    onChange={this.handleChange}
                ></Particles>
                <Particle
                    onChange={this.handleChange}
                ></Particle>
            </div>
        )
    }
}

export default PropertiesList
