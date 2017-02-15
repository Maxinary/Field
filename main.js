const canvas = document.getElementById("draw");
canvas.width = 500;
canvas.height = 500;
const context = canvas.getContext("2d");

function square(v){
  return v*v;
}

function sigmoid(x){
  return 1/(1+Math.pow(Math.E, -x));
}

function fromHSL(hsl){
  var C = (1 - Math.abs(2*hsl[2] - 1)) * hsl[1];
  var X = C * (1 - Math.abs((hsl[0] / 60) % 2 - 1));
  var m = hsl[2] - C/2;
  
  var rgbP = [0,0,0];
  switch(Math.floor(hsl[0]/60)){
    case 0:
      rgbP = [C, X, 0];
      break;
    case 1:
      rgbP = [X, C, 0];
      break;
    case 2:
      rgbP = [0, C, X];
      break;
    case 3:
      rgbP = [0, X, C];
      break;
    case 4:
      rgbP = [X, 0, C];
      break;
    case 5:
      rgbP = [C, 0, X];
      break;
  }
  
  var rgb = [0,0,0];
  for(var i in rgbP){
    rgb[i] = Math.floor((rgbP[i]+m)*255);
  }
  
  return rgb;
}

class Tuple{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  add(tuple){
    this.x += tuple.x;
    this.y += tuple.y;
  }
  
  multiply(tup){
    this.x *= tup.x;
    this.y *= tup.y;
  }
  
  scale(num){
    this.x *= num;
    this.y *= num;
  }
  
  dist(tup){
    return Math.sqrt(square(this.x - tup.x) + square(this.y - tup.y));
  }
  
  theta(){
    return Math.atan2(this.y, this.x);
  }
  
  length(){
    return Math.sqrt(square(this.x) + square(this.y));
  }
}

class PointCharge{
  constructor(pos, charge){
    this.pos = pos;
    this.charge = charge;
  }
}

charges = [new PointCharge(new Tuple(200, 250), 1), new PointCharge(new Tuple(300, 250), -1)];

function chargeAtPoint(point, charges){
  var chargeTup = new Tuple(0, 0);
  for(var k in charges){
    var strength = charges[k].charge/square(charges[k].pos.dist(point));
    chargeTup.add(new Tuple((point.x - charges[k].pos.x)*strength, (point.y - charges[k].pos.y)*strength));
  }
  return chargeTup;
}

const size = 1;
for(var i=0; i<canvas.width; i+=size){
  for(var j=0; j<canvas.height; j+=size){
    var chargeHere = chargeAtPoint(new Tuple(i, j), charges);
    var strr = sigmoid(500*Math.log(chargeHere.length()+1)-4);
    var clr = fromHSL([(360-chargeHere.theta()/(Math.PI)*180)%360, strr, strr/2]);
    context.fillStyle = "rgb("+clr+")";
    context.fillRect(i, j, size, size);
  } 
}

context.fillStyle = "#000000";
for(var k in charges){
  context.fillRect(charges[k].pos.x-3, charges[k].pos.y-3, 7, 7);
}