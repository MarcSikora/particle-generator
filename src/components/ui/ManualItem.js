import React, { Component } from 'react'
import './ManualItem.css'

export class ManualItem extends Component {
    render() {
        return (
            <div className="ManualItem">
                <span className="ManualItem--key">{this.props.keyName}</span>
                <span className="ManualItem--description">{this.props.description}</span>
            </div>
        )
    }
}

export default ManualItem
