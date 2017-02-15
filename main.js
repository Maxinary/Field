const canvas = document.getElementById("draw");
const context = canvas.getElementById("2d");



class PointCharge{
  constructor(pos, charge){
    this.pos = pos;
    this.charge = charge;
  }
}

charges = [];

const size = 1;
for(var i=0; i<canvas.width; i+=size){
 for(var j=0; j<canvas.height; j+=size){
    context.fillRect();
  } 
}