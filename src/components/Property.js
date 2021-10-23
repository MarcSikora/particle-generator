import React, { Component } from 'react'
import './Property.css'
export class Property extends Component {
    // constructor(props)
    // {
    //     super(props);
    // }
    
    render() {
        return (
            <div className="Property">
                <div className="Property--label">{this.props.label}</div>
                <div className="Property--content">{this.props.children}</div>
            </div>
        )
    }
}

export default Property
