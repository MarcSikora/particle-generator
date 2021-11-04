import React, { Component } from 'react'
import './PropertiesList.css'
import General from './properties/General';
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

    getProperties()
    {

        if(this.props.selected)
        {
            if(this.props.selected.type === "particleSystems")
                return (
                    <div>
                        <Source
                            values={this.props.selectedObject.sett.source}
                            onChange={this.handleChange}
                        ></Source>
                        <Particles
                            values={this.props.selectedObject.sett.particles}
                            onChange={this.handleChange}
                        ></Particles>
                        <Particle
                            values={this.props.selectedObject.sett.particle}
                            onChange={this.handleChange}
                        ></Particle>
                    </div>
                );
            else
                return (
                    <div>
                        <General
                            values={this.props.selectedObject.sett.general}
                            onChange={this.handleChange}
                        ></General>
                    </div>
                )
        }

        return "";
    }

    render() {
        return (
            <div className="PropertiesList">
                <Background
                    value={this.props.backgroundColor}
                    onChange={this.handleChangeBackground}
                ></Background>
                {this.getProperties()}
            </div>
        )
    }
}

export default PropertiesList
