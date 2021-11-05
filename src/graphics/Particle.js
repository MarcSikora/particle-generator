class Particle
{
    constructor(x, y, scale, speed)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = speed;
        this.lifespan = 1;
        this.life = 0;
        this.size = 8;
    }

}

export default Particle