import React, {useEffect} from 'react';

const GridPage= (props) => {
    useEffect(() => {
        if (props.kmeans && props.width && props.height) {
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            var img = new Image();
            img.src = props.kmeans;
            img.onload = function () {
                let start = 30;
                ctx.drawImage(img, start, start, c.width-(start*2), c.height-(start*2));
                ctx.font = "10px Arial"
                for (let i = start; i < c.width-start; i += 20) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, c.height-start);
                    ctx.stroke();
                    ctx.fillText((parseInt((i-start)/20)+1).toString(), i+5, start-10);
                }
                for (let i = start; i < c.height-start; i += 20) {
                    ctx.moveTo(0, i);
                    ctx.lineTo(c.width-start, i);
                    ctx.stroke();
                    ctx.fillText((parseInt((i-start)/20)+1).toString(), start-20, i+10);
                }
            };
        }
    }, [props.kmeans,props.height,props.width]); // Empty dependency array means this effect runs only once after the component mounts
    return (
        <div id='grid_container'>
            <h1 style={{fontFamily: 'Dancing Script, cursive'}}> grid it! </h1>
            <div className="scrollable-container">
                <canvas id="myCanvas" className="canvas" width={props.width*20 + 60} height={props.height*20 + 60}></canvas>
            </div>
        </div>
    );
}

export default GridPage;