import React, { Component } from 'react'
import './ImageList.css';
import ImageListItem from './ImageListItem';

export class ImageList extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id)
    {
        this.props.onChange(this.props.inputName, id);
    }

    render() {
        return (
            <div className="ImageList">
                <label>{this.props.label}</label>
                <div className="ImageList--content">
                    {
                        this.props.items.map((item, i) => {
                            let isSelected = (i === this.props.value);
                            return (
                                <ImageListItem 
                                    key={item.id} 
                                    id={item.id} 
                                    src={item.src} 
                                    alt={item.caption} 
                                    selected={isSelected} 
                                    onClick={this.handleChange}
                                ></ImageListItem>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ImageList
