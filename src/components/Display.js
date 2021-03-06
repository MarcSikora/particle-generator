import React, { Component } from 'react';
import ImageManager from '../graphics/ImageManager';
import ParticleSystem from '../graphics/ParticleSystem';
import './Display.css'

export class Display extends Component {
    constructor(props)
    {
        super(props);

        this.canvas = React.createRef();
        this.display = React.createRef();
        this.ctx = null;
        this.im = new ImageManager();

        this.backgroundImage = new Image();
        this.previousImg = null;

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
    componentDidMount()
    {
        window.addEventListener("resize", () => {
            this.resize();
        });
        
        this.ctx = this.canvas.current.getContext("2d");
        this.time = Date.now();
        this.resize();
        
        window.requestAnimationFrame(() => this.animate());
    }

    componentDidUpdate()
    {
        this.updateBackgroundImage();

        this.props.objects.forEach(obj => {
            obj.prepare(this.ctx);
        });
    }

    updateBackgroundImage()
    {
        if(this.previousImg !== this.props.background.image)
        {
            this.backgroundImage.src = this.im.backgroundImages[this.props.background.image];
            this.previousImg = this.props.background.image;
        }
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
                    
                    let z = (ps.sett.particles.direction * Math.PI/180)
                    ps.particles[i].y += Math.sin(z) * ps.particles[i].speed;
                    ps.particles[i].x += Math.cos(z) * ps.particles[i].speed;

                    let life = Date.now() - ps.particles[i].born;
                    if(ps.sett.particles.scaleOverTime > 0)
                    {
                        ps.particles[i].scale = life * ps.sett.particles.scaleOverTime * 0.0001;

                    }

                    if(life > ps.particles[i].lifespan*1000)
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

    draw()
    {
        this.clear();

        this.props.objects.forEach(obj => {
            obj.draw(this.props.isNameVisible, this.props.isGizmoVisible);
        });
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
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
        this.props.onResize(this.getCanvasCenter());
        this.draw();
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
                <canvas 
                    className="Display--canvas" 
                    ref={this.canvas} 
                    style={{
                        backgroundColor:this.props.background.color,
                        backgroundImage: `url(${this.im.backgroundImages[this.props.background.image]})`,
                        backgroundSize: "cover"
                    }}
                >
                </canvas>
            </div>
        )
    }
}

export default Display
