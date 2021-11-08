class ParticleSystemProperties
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.source = {
            isTransparent: true,
            shape: 0,
            scale: 5
        }
        this.particles = {
            amount: 10,
            direction: 0,
            scaleOverTime: 0
        }
        this.particle = {
            image: 0,
            color: "#ffffff",
            scale: 1,
            direction: 0,
            speed: 1,
            lifespan: 10,
            emissionColor: "#00e1ff",
            emissionRadius: 0
        }
    }
}

export default ParticleSystemProperties;