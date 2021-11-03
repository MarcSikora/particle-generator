import React, { Component } from 'react'
import './HideButton.css'
import visibleImg from '../../assets/visible.png'
import invisibleImg from '../../assets/invisible.png'

export class HideButton extends Component {
    constructor(props)
    {
        super(props);
        this.state = { checked: true }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.props.onChange();

        this.setState(state => {
            return {checked: !state.checked}
        });
    }

    render() {
        let img = (this.state.checked) ? visibleImg : invisibleImg;
        return (
            <div className="HideButton" onClick={this.handleClick}>
                <img src={img} alt="hide UI"></img>
            </div>
        )
    }
}

export default HideButton
