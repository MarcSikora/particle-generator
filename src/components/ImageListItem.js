import React, { Component } from 'react'
import './ImageListItem.css'

export class ImageListItem extends Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="ImageListItem">
                <img className={(this.props.selected) ? "ImageListItem--img-selected" :  "ImageListItem--img"} src={this.props.src} alt={this.props.alt} onClick={this.handleClick}></img>
            </div>
        )
    }
}

export default ImageListItem
