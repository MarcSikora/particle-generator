import React, { Component } from 'react';
import ParticleSystem from '../graphics/ParticleSystem';
import './Display.css'

export class Display extends Component {
    constructor(props)
    {
        super(props);

        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
    componentDidMount()
    {
        this.ctx = this.canvas.current.getContext("2d");
        this.time = Date.now();
        this.resize();
        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.props.objects.forEach(obj => {
            obj.prepare(this.ctx);
        });
    }

    animate()
    {
        let particleSystems = this.props.objects.filter(o => o instanceof ParticleSystem);

        if(this.props.isRunning)
        {
            particleSystems.forEach((ps) => {
                let now = Date.now();
                let elapsed = now - ps.time;

                if(elapsed > 1000/ps.sett.particles.amount)
                {
                    ps.particles.push(ps.generateParticle());
                    ps.time = now;
                }

                let toRemove = [];

                for(let i = 0; i < ps.particles.length; i++)
                {                    
                    // ps.particles[i].scale += ps.particles[i].life * 0.1;
                    ps.particles[i].y += ps.particles[i].speed;
                    ps.particles[i].life += 0.001;
                    
                    if(this.isPointOut(ps.particles[i].x, ps.particles[i].y))
                        toRemove.push(i);
                }

                ps.particles = ps.particles.filter((v, i) => {
                    return toRemove.indexOf(i) === -1
                });
            });
        }
        this.draw();
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

        this.props.objects.forEach(obj => {
            obj.draw(this.props.isNameVisible, this.props.isGizmoVisible);
        });
    }

    handleMouseMove(e)
    {
        if(this.props.grabbed.index > -1)
            this.move(e.clientX, e.clientY);
        else
        {
            let index = this.getObjectIndexUnderMouse(e.clientX, e.clientY);
            if(index > -1)
                this.hover(index);
            else
                this.display.current.style.cursor = "default";
        }
    }

    getObjectIndexUnderMouse(x, y)
    {
        for(let i = 0; i < this.props.objects.length; i++)
            if(this.ctx.isPointInPath(this.props.objects[i].shape, x, y))
                return i;
        return -1;
    }

    handleMouseDown(e)
    {
        this.props.objects.forEach((obj, i) => {
            if(this.ctx.isPointInPath(obj.shape, e.clientX, e.clientY))
            {
                this.select(i);
                this.grab(i, obj.sett.x, obj.sett.y, e.clientX, e.clientY);
            }
        });
    }

    handleMouseUp()
    {
        if(this.props.grabbed.index > -1)
            this.ungrab();
    }

    select(index)
    {
        this.props.onChangeSelected(index);
    }

    hover(index)
    {
        this.props.onChangeProperty(index, "isHovered", true);
        let obj = this.props.objects[index];
        this.display.current.style.cursor = (obj.isGrabbed) ? "grabbing" : "grab"
    }

    move(x, y)
    {
        this.props.onChangePosition(this.props.grabbed.index, x + this.props.grabbed.offsetX, y + this.props.grabbed.offsetY);
    }

    grab(index, objectX, objectY, mouseX, mouseY)
    {
        this.props.onChangeProperty(index, "isGrabbed", true);
        this.display.current.style.cursor = "grabbing";

        this.props.onChangeGrabbed(index, objectX - mouseX, objectY - mouseY);
    }

    ungrab()
    {
        this.props.onChangeProperty(this.props.grabbed.index, "isGrabbed", false);
        this.display.current.style.cursor = "grab";
        this.props.onChangeGrabbed(-1, 0, 0);
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
            <div 
                className="Display" 
                ref={this.display} 
                onMouseMove={this.handleMouseMove}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onKeyDown={this.handleKeyDown}
                >
                <canvas className="Display--canvas" ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Display
