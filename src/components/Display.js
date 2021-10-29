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
        this.points = [];
        this.time = 0;
    }

    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.resize();
        this.time = Date.now();
        console.log(this.time)
        this.draw();
        this.particles = this.generateParticles();
        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.draw();
    }

    animate()
    {
        let now = Date.now();

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

        this.drawParticles();
    }

    generateParticles()
    {
        let arr = [];

        for(let i = 0; i < this.sett.particles.amount; i++)
        {
            let particle = new Particle(this.points[i].x, this.points[i].y, this.sett.particle.scale, Math.random());
            arr.push(particle);
        }

        return arr;
    }

    drawSource()
    {
        let x = this.sett.source.x;
        let y = this.sett.source.y;
        let size = this.defaultSize * this.sett.source.scale;
        let isTransparent = this.sett.source.isTransparent;

        this.ctx.fillStyle = "#675bc7";
        this.ctx.strokeStyle = "cyan";
        this.ctx.beginPath();

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
            this.ctx.fill();
        this.ctx.stroke();

        this.drawOrigin();
    }

    drawSquare(x, y, size)
    {
        this.ctx.rect(x-size*0.5, y-size*0.5, size, size);
        this.getSquarePoints(x, y, size);
    }

    getSquarePoints(x, y, size)
    {
        this.points = [];

        for(let i = 0; i < this.sett.particles.amount; i++)
            this.points.push({
                x: Math.floor(Math.random() * size + x - size*0.5),
                y: Math.floor(Math.random() * size + y - size*0.5)
            });
    }

    drawCircle(x, y, size)
    {
        this.ctx.arc(x, y, size*0.5, 0, Math.PI*2);
        this.getCirclePoints(x, y, size);
    }

    getCirclePoints(x, y, size)
    {
        let a = size / 1.4142;
        this.points = [];

        for(let i = 0; i < this.sett.particles.amount; i++)
        {
            let rp = this.getRandomPoint(x - size*0.5, size, y - size*0.5, size);
            let d2 = Math.pow(rp.x - x, 2) + Math.pow(rp.y - y, 2);

            if(d2 > Math.pow(size*0.5, 2))
                rp = this.getRandomPoint(x - a*0.5, a, y - a*0.5, a);
            this.points.push(rp);
        }
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

        //drawing part
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.closePath();

        this.getTrianglePoints(x - size*0.5, x + size*0.5, Math.floor(p3.y), Math.floor(p1.y));
    }

    getTrianglePoints(minX, maxX, minY, maxY)
    {
        this.points = [];

        while(this.points.length < this.sett.particles.amount)
        {
            let rp = this.getRandomPoint(minX, maxX - minX, minY, maxY - minY);
            if(this.ctx.isPointInPath(rp.x, rp.y))
                this.points.push(rp);
        }
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
        // console.log("drawParticles")

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
