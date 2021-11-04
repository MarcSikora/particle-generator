import Particle from '../graphics/Particle'
import ImageManager from './ImageManager';

import ParticleSystemProperties from './ParticleSystemProperties'

class ParticleSystem
{
    constructor(last)
    {
        this.name = "ParticleSystem_" + last;
        this.ctx = null;
        this.sett = new ParticleSystemProperties();
        this.defaultSize = 32;
        this.particles = [];
        this.time = 0;

        this.shape = null;
        this.isHovered = false;
        this.isSelected = false;
        this.isGrabbed = false;

        this.particleImg = new Image();
        this.bounds ={
            min: { x: 0, y: 0},
            max: { x: 0, y: 0}
        }
        this.im = new ImageManager();
    }

    prepare(ctx)
    {
        this.ctx = ctx;
        this.generateShape();
        this.prepareParticleImage();
    }
    
    generateShape() 
    {
        let x = this.sett.x;
        let y = this.sett.y;
        let size = this.defaultSize * this.sett.source.scale;
        this.shape = new Path2D();

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
    }

    generateParticle()
    {
        let point = this.getRandomPointInBounds();        
        return new Particle(point.x, point.y, this.sett.particle.scale, this.sett.particle.speed);
    }

    draw(isNameVisible)
    {
        this.drawParticles();

        if(!this.sett.source.isHidden)
            this.drawSource();
        if(isNameVisible)
            this.drawName();
    }

    drawSource()
    {
        let isTransparent = this.sett.source.isTransparent;

        this.ctx.fillStyle = "#675bc7";
        this.ctx.strokeStyle = (this.isSelected) ? "yellow": "cyan";

        if(!isTransparent)
            this.ctx.fill(this.shape);
        this.ctx.stroke(this.shape);

        this.drawOrigin();
    }

    drawSquare(x, y, size)
    {
        this.shape.rect(x-size*0.5, y-size*0.5, size, size);
        this.setBounds(x-size*0.5, x+size*0.5, y-size*0.5, y+size*0.5);
    }

    drawCircle(x, y, size)
    {
        this.shape.arc(x, y, size*0.5, 0, Math.PI*2);
        this.setBounds(x-size*0.5, x+size*0.5, y-size*0.5, y+size*0.5);
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
        } while(!this.ctx.isPointInPath(this.shape, rp.x, rp.y))
        

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
        let x = this.sett.x;
        let y = this.sett.y;

        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "cyan";

        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawName()
    {
        let x = this.sett.x;
        let y = this.sett.y;
        this.ctx.fillStyle = "cyan"
        this.ctx.fillText(this.name, x + 5, y - 2)
    }

    drawParticles()
    {

        for(let i = 0; i < this.particles.length; i++)
        {
            let p = this.particles[i];
            let size = p.size * p.scale;

            this.drawEmission(p.x, p.y);

            this.ctx.fillStyle = this.sett.particle.color;
            this.ctx.drawImage(this.particleImg, p.x - size*0.5, p.y - size*0.5, size, size)
        }
    }

    drawEmission(x, y)
    {
        let r = this.sett.particle.emissionRadius*4;
        let gradient = this.ctx.createRadialGradient(x,y,0.5, x,y,r);

        gradient.addColorStop(0.5, this.sett.particle.emissionColor);
        gradient.addColorStop(1, this.hex2rgba(this.sett.particle.emissionColor, 0));

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x-r, y-r, r*2, r*2);
    }

    prepareParticleImage()
    {
        let imgs = this.im.particleImages;
        this.particleImg.src = imgs[this.sett.particle.image];
    }

    hex2rgba(hex,alpha)
    {
        let rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

        return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
    }
}

export default ParticleSystem