import React, { Component } from 'react';
import './Display.css'
import Particle from '../Particle'

export class Display extends Component {
    constructor(props)
    {
        super(props)
        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        
        this.sett = this.props.properties;
        this.defaultSize = 32;
        this.particles = [];
        this.shapeAreaPoints = [];
    }

    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.resize();
        this.particles = this.generateParticles();
        this.draw();
    }

    componentDidUpdate()
    {
        this.particles = this.generateParticles();
        this.draw();
    }
    
    draw()
    {
        this.ctx.fillStyle = this.sett.background.color;
        this.ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);

        if(!this.sett.source.isHidden)
            this.drawSource();

        this.drawParticles();
    }

    generateParticles()
    {
        let arr = [];

        for(let i = 0; i < this.sett.particles.amount; i++)
        {
            let particle = new Particle(100, 100, this.sett.particle.scale);
            arr.push(particle);
        }

        return arr;
    }

    drawSource()
    {
        const x = this.sett.source.x;
        const y = this.sett.source.y;
        const size = this.defaultSize * this.sett.source.scale;
        const isTransparent = this.sett.source.isTransparent;

        this.ctx.fillStyle = "#675bc7";
        this.ctx.strokeStyle = "cyan";
        this.ctx.beginPath();

        switch(this.sett.source.shape)
        {
            case 0:
                this.ctx.rect(x-size*0.5, y-size*0.5, size, size);
                break;
            case 1:
                this.ctx.arc(x, y, size/2, 0, Math.PI*2);
                break;
            case 2:
                const h = size * Math.cos(Math.PI / 6);
                this.ctx.moveTo(x - size*0.5, y + h/3);
                this.ctx.lineTo(x + size*0.5, y + h/3);
                this.ctx.lineTo(x, y - 2*h/3);
                this.ctx.closePath();
                break;
            default: 
                console.log("Undefined shape")
                break;
        }

        if(!isTransparent)
            this.ctx.fill();
        this.ctx.stroke();

        this.drawOrigin();
    }

    drawOrigin()
    {
        const x = this.sett.source.x;
        const y = this.sett.source.y;

        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "cyan";

        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawParticles()
    {
        this.ctx.fillStyle = this.sett.particle.color;
        this.particles.forEach(p => {
            const size = p.size * p.scale;

            this.ctx.beginPath();
            this.ctx.rect(p.x - size*0.5, p.y - size*0.5, size, size);
            this.ctx.fill();
        });
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.heigh);
    }

    resize()
    {
        const style = getComputedStyle(this.display.current);
        this.canvas.current.width = parseInt(style.width);
        this.canvas.current.height = parseInt(style.height);
    }

    getCanvasCenter()
    {
        return {
            x:  this.canvas.current.width * 0.5,
            y: this.canvas.current.height * 0.5
        }
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
