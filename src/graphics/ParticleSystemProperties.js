class ParticleSystemProperties
{
    constructor()
    {
        this.x = 800;
        this.y = 400;
        this.source = {
            
            isTransparent: true,
            isHidden: false,
            shape: 0,
            scale: 5
        }
        this.particles = {
            amount: 10
        }
        this.particle = {
            image: 0,
            color: "#ffffff",
            scale: 1,
            direction: 0,
            speed: 1,
            lifespan: 1,
            emissionColor: "#00e1ff",
            emissionRadius: 0
        }
    }
}

export default ParticleSystemProperties;