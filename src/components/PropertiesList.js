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
        this.handleChangeBackground = this.handleChangeBackground.bind(this);
    }

    handleChange(propertyName, inputName, value)
    {
        this.props.onChange(propertyName, inputName, value);
    }

    handleChangeBackground(value)
    {
        this.props.onChangeBackground(value);
    }

    render() {
        if(!this.props.selected)
            return (
                <div className="PropertiesList">
                    <Background
                        onChange={this.handleChangeBackground}
                    ></Background>
                </div>
            )
        else
        {
            if(this.props.selected.isObject)
                return (
                    <div className="PropertiesList">
                        <Background
                            onChange={this.handleChangeBackground}
                        ></Background>
                    </div>
                )
            else
                return (
                    <div className="PropertiesList">
                        <Background
                            onChange={this.handleChangeBackground}
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
}

export default PropertiesList
