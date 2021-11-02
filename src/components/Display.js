import React, { Component } from 'react';
import './Display.css'

export class Display extends Component {
    constructor(props)
    {
        super(props);

        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        this.time = 0;
        this.grabbed = -1;
        this.grabbedOffset = {
            x: 20,
            y: 30
        }

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.time = Date.now();
        this.resize();

        this.props.particleSystems.forEach(ps => {
            ps.generateShape(this.ctx);
            ps.prepareParticleImage();
        });
        
        this.draw();
        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.props.particleSystems.forEach(ps => {
            ps.generateShape(this.ctx);
            ps.prepareParticleImage();
        });
        this.draw();
    }

    animate()
    {
        if(this.props.isRunning)
        {
            let now = Date.now();
            let elapsed = now - this.time;
            let particlesCount = 0;

            this.props.particleSystems.forEach(ps => {

                if(elapsed > 1000/ps.sett.particles.amount)
                {
                    ps.particles.push(ps.generateParticle());
                    this.time = now;
                }
                particlesCount += ps.particles.length;

                let toRemove = [];

                for(let i = 0; i < ps.particles.length; i++)
                {                    
                    ps.particles[i].y += ps.particles[i].speed;
                    // ps.particles[i].x += ps.particles[i].speed;
                    if(this.isPointOut(ps.particles[i].x, ps.particles[i].y))
                        toRemove.push(i);
                }

                toRemove.forEach(i => ps.particles.splice(i, 1));        
            });
            
            this.draw();
            this.props.onUpdateParticlesCount(particlesCount);
        }
        window.requestAnimationFrame(() => this.animate());
    }

    isPointOut(x, y)
    {
        return (
            y < 0 || 
            y > this.canvas.current.height || 
            x < 0 || 
            x > this.canvas.current.width
        );
    }

    draw()
    {
        this.ctx.fillStyle = this.props.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);

        this.props.particleSystems.forEach(ps => {
            ps.drawParticles();

            if(!ps.sett.source.isHidden)
                ps.drawSource();
            if(this.props.isNameVisible)
                ps.drawName();
        });
    }

    handleMouseMove(e)
    {
        if(this.grabbed > -1)
            this.move(e.clientX, e.clientY);
        else
        {
            for(let i = 0; i < this.props.particleSystems.length; i++)
                if(this.ctx.isPointInPath(this.props.particleSystems[i].shape, e.clientX, e.clientY))
                {
                    this.hover(i, e.clientX, e.clientY);
                    break;
                }    
                else
                    this.display.current.style.cursor = "default"
        }
            
    }

    handleMouseDown(e)
    {
        for(let i = 0; i < this.props.particleSystems.length; i++)
        {
            let ps = this.props.particleSystems[i];

            if(this.ctx.isPointInPath(ps.shape, e.clientX, e.clientY))
            {
                this.select("particleSystems", i);
                this.grab(ps.sett.source.x, ps.sett.source.y, i, e.clientX, e.clientY);
            }
        }
    }

    handleMouseUp(e)
    {
        if(this.grabbed > -1)
            this.ungrab();
    }

    select(type, index)
    {
        this.props.onChangeSelected(type, index);
    }

    hover(index, x, y)
    {
        this.props.onChangePsProperty(index, "isHovered", true);
        let ps = this.props.particleSystems[index];
        this.display.current.style.cursor = (ps.isGrabbed) ? "grabbing" : "grab"
    }

    move(x, y)
    {
        this.props.onChangeSourcePosition(this.grabbed, x + this.grabbedOffset.x, y + this.grabbedOffset.y);
    }

    grab(objectX, objectY, index, mouseX, mouseY)
    {
        this.props.onChangePsProperty(index, "isGrabbed", true);
        this.grabbed = index;
        this.display.current.style.cursor = "grabbing";

        this.grabbedOffset = {
            x: objectX - mouseX,
            y: objectY - mouseY,
        }
    }

    ungrab()
    {
        this.props.onChangePsProperty(this.grabbed, "isGrabbed", false);
        this.display.current.style.cursor = "grab";
        this.grabbed = -1;
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
            <div className="Display" ref={this.display} 
                onMouseMove={this.handleMouseMove}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                >
                <canvas className="Display--canvas" ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Display
