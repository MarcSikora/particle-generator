import squareImg from '../assets/square.png'
import circleImg from '../assets/circle.png'
import triangleImg from '../assets/triangle.png'

import snowflake_01 from '../assets/snowflake_01.png';
import snowflake_02 from '../assets/snowflake_02.png';
import snowflake_03 from '../assets/snowflake_03.png';
import smoke_01 from '../assets/smoke_01.png';
import smoke_02 from '../assets/smoke_02.png';
import smoke_03 from '../assets/smoke_03.png';
import drop_01 from '../assets/drop_01.png';
import drop_02 from '../assets/drop_02.png';
import drop_03 from '../assets/drop_03.png';

import cloud_01 from '../assets/cloud_01.png';
import cloud_02 from '../assets/cloud_02.png';
import tree_01 from '../assets/tree_01.png';
import house_01 from '../assets/house_01.png';
import chimney_01 from '../assets/chimney_01.png';

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
            snowflake_03,
            smoke_01,
            smoke_02,
            smoke_03,
            drop_01,
            drop_02,
            drop_03,
        ];

        this.objectImages = [
            cloud_01,
            cloud_02,
            tree_01,
            house_01,
            chimney_01
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

    geObjectImagesData()
    {
        return this.getData(this.objectImages, "object image");
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