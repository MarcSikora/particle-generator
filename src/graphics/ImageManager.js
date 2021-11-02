import snowflake_01 from '../assets/snowflake_01.png';
import snowflake_02 from '../assets/snowflake_02.png';
import smoke_01 from '../assets/smoke_01.png';

class ImageManager
{
    constructor()
    {
        this.particleImages = [
            snowflake_01,
            snowflake_02,
            smoke_01
        ]
    }

    generateSourceShapes()
    {
        let shapes = [];
        
        this.particleImages.forEach((img, i) => {
            shapes.push({
                id: i,
                src: img,
                caption: "particle image"
            })
        });
        return shapes;
    }
}

export default ImageManager;