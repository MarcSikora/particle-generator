class Particle
{
    constructor(x, y, scale, speed, lifespan)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = speed;
        this.born = Date.now();
        this.lifespan = lifespan;
        this.life = 0;
        this.size = 8;
    }

}

export default Particle