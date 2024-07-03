import React, {useEffect} from 'react';

const GridPage= (props) => {
    useEffect(() => {
        if (props.kmeans && props.width && props.height) {
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            var img = new Image();
            img.src = props.kmeans;

            img.onload = function () {
                ctx.drawImage(img, 0, 0, c.width, c.height);
                for (let i = 0; i < c.width; i += 10) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, c.height);
                    ctx.stroke();
                }
                for (let i = 0; i < c.height; i += 10) {
                    ctx.moveTo(0, i);
                    ctx.lineTo(c.width, i);
                    ctx.stroke();
                }
            };
        }
    }, []); // Empty dependency array means this effect runs only once after the component mounts
    return (
        <div id='grid_container'>
            <h1> GRID PAGE </h1>
            {console.log(props.height)}
            <canvas id="myCanvas" width={props.width*10} height={props.height*10}></canvas>
        </div>
    );
}

export default GridPage;