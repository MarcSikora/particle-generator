import ImageManager from './ImageManager';
import Object2DProperties from './Object2DProperties';

class Object2D
{
    constructor(last)
    {
        this.name = "Object2D_" + last;
        this.ctx = null;
        this.sett = new Object2DProperties();
        this.defaultSize = 32;
        this.size = 32;
        this.shape = null;
        this.isHovered = false;
        this.isSelected = false;
        this.isGrabbed = false;

        this.im = new ImageManager();
        this.image = new Image();
        this.previousType = -1;
    }

    prepare(ctx)
    {
        this.ctx = ctx;
        this.size = this.defaultSize * this.sett.general.scale;
        if(this.previous !== this.sett.general.type)
        {
            this.image.src = this.im.objectImages[this.sett.general.type];
            this.previous = this.sett.general.type;
        }
    }

    draw()
    {
        this.ctx.strokeStyle = (this.isSelected) ? "yellow": "cyan";
        this.ctx.lineWidth = 1;

        this.shape = new Path2D();
        this.shape.rect(this.sett.x, this.sett.y, this.size, this.size);

        

            
        let x = this.sett.x + this.size*0.5;
        let y = this.sett.y + this.size*0.5;

        this.ctx.drawImage(this.image, this.sett.x, this.sett.y, this.size, this.size);
        if(this.sett.general.isFrameVisible)
            this.ctx.stroke(this.shape);

    }

    drawName()
    {
        let x = this.sett.x;
        let y = this.sett.y;
        this.ctx.fillStyle = "cyan";
        this.ctx.fillText(this.name, x + this.size*0.5 + 5, y + this.size*0.5 - 2);
    }
}

export default Object2D