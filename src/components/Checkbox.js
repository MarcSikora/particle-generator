import React, { Component } from 'react'
import './Checkbox.css'

export class Checkbox extends Component {
    constructor(props)
    {
        super(props);
        this.state = {value: false}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        const value = e.target.checked;
        this.props.onChange(this.props.inputName, value);
        this.setState({ value: value });
    }
    
    render() {
        return (
            <div className="Checkbox">
                <label>{this.props.label}</label>
                <input className="Checkbox--input" type="checkbox" onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default Checkbox
