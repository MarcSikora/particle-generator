import React, { Component } from 'react';
import './Display.css'

export class Display extends Component {
    constructor(props)
    {
        super(props);

        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        this.grabbed = null;
        this.grabbedOffset = {
            x: 0,
            y: 0
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
        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.props.objects2D.forEach(obj => {
            obj.prepare(this.ctx);
        });

        this.props.particleSystems.forEach(ps => {
            ps.generateShape(this.ctx);
            ps.prepareParticleImage();
        });
    }

    animate()
    {
        if(this.props.isRunning)
        {
            this.props.particleSystems.forEach((ps, ind) => {
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
                    ps.particles[i].scale += ps.particles[i].life * 0.1;
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

        this.props.particleSystems.forEach(ps => {
            ps.drawParticles();

            if(!ps.sett.source.isHidden)
                ps.drawSource();
            if(this.props.isNameVisible)
                ps.drawName();
        });

        this.props.objects2D.forEach(obj => {
            obj.draw();

            if(this.props.isNameVisible)
                obj.drawName();
        });
    }

    handleMouseMove(e)
    {
        if(this.grabbed)
            this.move(e.clientX, e.clientY);
        else
        {
            if(!this.isMouseOver("particleSystems", e.clientX, e.clientY))
                if(!this.isMouseOver("objects2D", e.clientX, e.clientY))
                    this.display.current.style.cursor = "default";
        }
    }

    isMouseOver(type, x, y)
    {
        for(let i = 0; i < this.props[type].length; i++)
            if(this.ctx.isPointInPath(this.props[type][i].shape, x, y))
            {
                this.hover(type, i);
                return true;
            }
        return false;
    }

    handleMouseDown(e)
    {
        this.props.particleSystems.forEach((ps, i) => {
            if(this.ctx.isPointInPath(ps.shape, e.clientX, e.clientY))
            {
                this.select("particleSystems", i);
                this.grab("particleSystems", i, ps.sett.source.x, ps.sett.source.y, e.clientX, e.clientY);
            }
        });

        this.props.objects2D.forEach((obj, i) => {
            if(this.ctx.isPointInPath(obj.shape, e.clientX, e.clientY))
            {
                this.select("objects2D", i);
                this.grab("objects2D", i, obj.sett.x, obj.sett.y, e.clientX, e.clientY);
            }
        });
    }

    handleMouseUp(e)
    {
        if(this.grabbed)
            this.ungrab();
    }

    select(type, index)
    {
        this.props.onChangeSelected(type, index);
    }

    hover(type, index)
    {
        this.props.onChangeProperty(type, index, "isHovered", true);
        let ps = this.props[type][index];
        this.display.current.style.cursor = (ps.isGrabbed) ? "grabbing" : "grab"
    }

    move(x, y)
    {
        this.props.onChangePosition(this.grabbed, x + this.grabbedOffset.x, y + this.grabbedOffset.y);
    }

    grab(type, index, objectX, objectY, mouseX, mouseY)
    {
        this.props.onChangeProperty(type, index, "isGrabbed", true);
        this.display.current.style.cursor = "grabbing";

        this.grabbed = {
            type: type,
            index: index
        };

        this.grabbedOffset = {
            x: objectX - mouseX,
            y: objectY - mouseY,
        }
    }

    ungrab()
    {
        this.props.onChangeProperty(this.grabbed.type, this.grabbed.index, "isGrabbed", false);
        this.display.current.style.cursor = "grab";
        this.grabbed = null;
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
