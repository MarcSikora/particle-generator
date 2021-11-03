import squareImg from '../assets/square.png'
import circleImg from '../assets/circle.png'
import triangleImg from '../assets/triangle.png'

import snowflake_01 from '../assets/snowflake_01.png';
import snowflake_02 from '../assets/snowflake_02.png';
import smoke_01 from '../assets/smoke_01.png';

class ImageManager
{
    constructor()
    {
        this.sourceShapes = [
            squareImg,
            circleImg,
            triangleImg
        ];

        this.particleImages = [
            snowflake_01,
            snowflake_02,
            smoke_01
        ];
    }

    getParticleImagesData()
    {
        return this.getData(this.particleImages, "particle image");
    }

    getSourceShapesData()
    {
        return this.getData(this.sourceShapes, "source shape");
    }
    
    getData(sources, caption)
    {
        let data = [];
        
        sources.forEach((img, i) => {
            data.push({
                id: i,
                src: img,
                caption: caption
            })
        });
        return data;
    }
}

export default ImageManager;