import React, { Component } from 'react'
import './Manual.css'
import ManualItem from './ManualItem'

export class Manual extends Component {
    constructor(props)
    {
        super(props);
        this.data = [
            {
                key: "LMB",
                description: " - grab/move/select object"
            },
            {
                key: "D",
                description: " - duplicate object"
            },
            {
                key: "X",
                description: " - remove object"
            },
            {
                key: "W",
                description: " - move object layer up"
            },
            {
                key: "S",
                description: " - move object layer down"
            }
        ];

        this.items = this.data.map((item) =>
            <ManualItem
                key={item.key}
                keyName={item.key}
                description={item.description}
            ></ManualItem>
        )
    }

    render() {
        return (
            <div className="Manual">
                {this.items}
            </div>
        )
    }
}

export default Manual
