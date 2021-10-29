class Particle
{
    constructor(x, y, scale, generationTime)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = 1;
        this.generationTime = generationTime;
        this.lifeSpan = 1
        this.size = 8;
        this.imageData = null;
    }

}

export default Particle