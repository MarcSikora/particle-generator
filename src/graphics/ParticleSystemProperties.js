class ParticleSystemProperties
{
    constructor()
    {
        this.background = {
            color: "#000"
        }
        this.source = {
            x: 800, 
            y: 400,
            isTransparent: true,
            isHidden: false,
            shape: 2,
            scale: 5
        }
        this.particles = {
            amount: 10
        }
        this.particle = {
            image: 0,
            color: "#fff",
            scale: 1,
            direction: 0,
            speed: 1,
            lifespan: 1,
            emissionColor: "#fff",
            emissionRadius: 1
        }
    }
}

export default ParticleSystemProperties;