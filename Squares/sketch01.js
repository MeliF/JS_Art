const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;
    const offset = width * 0.02;
    let x,y;

    for(let i =0; i <5;i++){
      for ( let j = 0; j<5 ; j++){
        x = ix + (w + gap) * i;
        y = iy + (h +gap) * j;

        const gradient = context.createLinearGradient(x, y, w+x, h+y);
        gradient.addColorStop(0, 'cyan');
        gradient.addColorStop(0.5, 'orange');
        gradient.addColorStop(1, 'magenta');

        context.strokeStyle = gradient;
        context.strokeRect(x, y, w , h);
       
        if(Math.random() > 0.5){
          context.beginPath();
          context.strokeStyle = "white";
          context.rect(x + offset / 2, y + offset / 2, w - offset, h - offset);
          context.stroke();     
        }

      }
    }
  };
};

canvasSketch(sketch, settings);
