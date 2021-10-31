import React, { Component } from 'react';
import './Display.css'
import Particle from '../Particle'

export class Display extends Component {
    constructor(props)
    {
        super(props);

        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        
        this.sett = this.props.properties;
        this.defaultSize = 32;
        this.particles = [];
        this.bounds ={
            min: { x: 0, y: 0},
            max: { x: 0, y: 0}
        }
        this.time = 0;
        this.shape = new Path2D();
    }

    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.resize();
        this.draw();

        this.time = Date.now();

        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.draw();
    }

    animate()
    {
        let now = Date.now();
        let elapsed = now - this.time;

        if(elapsed > this.sett.particles.amount*0.001)
        {
            this.particles.push(this.generateParticle());
            this.time = now;
        }


        for(let i = 0; i < this.particles.length; i++)
        {
            this.particles[i].y++;
        }

        this.draw();
        window.requestAnimationFrame(() => this.animate());
    }

    draw()
    {
        this.ctx.fillStyle = this.sett.background.color;
        this.ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);

        if(!this.sett.source.isHidden)
            this.drawSource();

        // this.drawParticles();
    }

    generateParticle()
    {
        let point = this.getRandomPointInBounds();        
        console.log(point)
        return new Particle(point.x, point.y, this.sett.particle.scale);
    }

    drawSource()
    {
        let x = this.sett.source.x;
        let y = this.sett.source.y;
        let size = this.defaultSize * this.sett.source.scale;
        let isTransparent = this.sett.source.isTransparent;

        this.ctx.fillStyle = "#675bc7";
        this.ctx.strokeStyle = "cyan";
        // this.ctx.beginPath();

        switch(this.sett.source.shape)
        {
            case 0:
                this.drawSquare(x, y, size);
                break;
            case 1:
                this.drawCircle(x, y, size);
                break;
            case 2:
                this.drawTriangle(x, y, size);
                break;
            default:
                console.log("Undefined shape")
                break;
        }

        if(!isTransparent)
            this.ctx.fill(this.shape);
        this.ctx.stroke(this.shape);

        this.drawOrigin();
    }

    drawSquare(x, y, size)
    {
        this.shape.rect(x-size*0.5, y-size*0.5, size, size);
        this.setBounds(x-size*0.5, y-size*0.5, x + size*0.5, y + size*0.5);
    }

    drawCircle(x, y, size)
    {
        this.shape.arc(x, y, size*0.5, 0, Math.PI*2);
        this.setBounds(x-size*0.5, y-size*0.5, size, size);
    }

    drawTriangle(x, y, size)
    {
        let h = size * Math.cos(Math.PI / 6);
        let p1 = {
            x: x - size*0.5, 
            y: y + h/3
        }
        let p2 = {
            x: x + size*0.5, 
            y: y + h/3
        }
        let p3 = {
            x: x, 
            y: y - 2*h/3
        }

        this.shape.moveTo(p1.x, p1.y);
        this.shape.lineTo(p2.x, p2.y);
        this.shape.lineTo(p3.x, p3.y);
        this.shape.closePath();

        this.setBounds(x - size*0.5, x + size*0.5, Math.floor(p3.y), Math.floor(p1.y));
    }

    setBounds(minX, maxX, minY, maxY)
    {
        this.bounds = {
            min: { x: minX, y: minY},
            max: { x: maxX, y: maxY}
        }
    }

    getRandomPointInBounds()
    {
        let rp = null;

        do
        {
            rp = this.getRandomPoint(
                this.bounds.min.x, 
                this.bounds.max.x - this.bounds.min.x, 
                this.bounds.min.y, 
                this.bounds.max.y - this.bounds.min.y
            );
            console.log(rp)
    
        } while(this.ctx.isPointInPath(rp.x, rp.y))

        return rp;
    }

    getRandomPoint(minX, countX, minY, countY)
    {
        let x = Math.floor(Math.random() * countX) + minX;
        let y = Math.floor(Math.random() * countY) + minY;
        return {x: x, y: y}
    }

    drawOrigin()
    {
        let x = this.sett.source.x;
        let y = this.sett.source.y;

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

        for(let i = 0; i < this.particles.length; i++)
        {
            let p = this.particles[i];
            let size = p.size * p.scale;
            this.ctx.beginPath();
            this.ctx.rect(p.x - size*0.5, p.y - size*0.5, size, size);
            this.ctx.fill();;
        }
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.heigh);
    }

    resize()
    {
        let style = getComputedStyle(this.display.current);
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
