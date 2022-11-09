const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate : true
};

const setBg = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" +randomColor;
}


const sketch = ({ context, width, height }) => {
  const agents = [];
  const agentAmount = 100;

  for (let i=0; i < agentAmount; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    for(let i=0; i < agents.length; i++){
      const agent = agents[i];

      for (let j= i+ 1; j < agents.length; j++){
        const other = agents[j];


        const distance = agent.pos.getDistance(other.pos);

        if (distance > 300) continue;

        context.save();
        context.strokeStyle = 'white';
        context.lineWidth = math.mapRange(distance,0,200,5,1);
     
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
        context.restore();
      }
    }

    agents.forEach(agent => {
    agent.update();
    agent.draw(context);
    agent.bounce(width,height);
   })

   
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x,y) {
    this.x = x; 
    this.y = y;
  }

  getDistance(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;

    return Math.sqrt(dx * dx + dy * dy);

  }
}

class Agent {
  constructor (x,y) {
    this.pos = new Vector(x,y);
    this.velocity = new Vector(random.range(-1,1), random.range(-1,1));
    this.radius = random.range(4,12);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.velocity.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.velocity.y *= -1;
  }

  update(){
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(context) {
    context.save();
    context.strokeStyle = 'white';

    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 5;

    context.beginPath();
    context.arc(0,0, this.radius, 0, Math.PI *2);
    context.stroke();

    context.restore();
  }
}