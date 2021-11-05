class Particle
{
    constructor(x, y, scale, speed, direction)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = speed;
        this.direction = direction;
        this.lifeSpan = 1;
        this.life = 0;
        this.size = 8;
    }

}

export default Particle