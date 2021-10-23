import React, { Component } from 'react';
import './Display.css'

export class Display extends Component {
    constructor(props)
    {
        super(props)
        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
    }

    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.resize();
    }

    componentDidUpdate()
    {
        this.draw();
    }
    
    draw()
    {
        this.ctx.fillStyle = this.props.properties.backgroundColor;
        this.ctx.fillRect(10, 10, 200, 300)
    }

    resize()
    {
        const style = getComputedStyle(this.display.current);
        this.canvas.current.width = parseInt(style.width);
        this.canvas.current.height = parseInt(style.height);
    }

    render() {
        return (
            <div className="Display" ref={this.display}>
                <canvas className="Display--canvas" ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Display
