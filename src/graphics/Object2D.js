import ImageManager from './ImageManager';
import Object2DProperties from './Object2DProperties';

class Object2D
{
    constructor(last, x, y)
    {
        this.name = "Object2D_" + last;
        this.ctx = null;
        this.sett = new Object2DProperties(x, y);
        this.defaultSize = 32;
        this.size = 32;
        this.shape = null;
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

    draw(isNameVisible, isGizmoVisible)
    {
        let x = this.sett.x - this.size*0.5;
        let y = this.sett.y - this.size*0.5;
        this.ctx.strokeStyle = (this.isSelected) ? "yellow": "cyan";
        this.ctx.lineWidth = 1;

        this.shape = new Path2D();
        this.shape.rect(x, y, this.size, this.size);
        this.ctx.drawImage(this.image, x, y, this.size, this.size);
        
        if(isGizmoVisible)
            this.ctx.stroke(this.shape);

        if(isNameVisible)
            this.drawName();
    }

    drawName()
    {
        let x = this.sett.x + 5;
        let y = this.sett.y - 2;
        this.ctx.fillStyle = "cyan";
        this.ctx.fillText(this.name, x, y);
    }
}

export default Object2D