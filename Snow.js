class Snow 
{
constructor(x, y) {
var options = {
    friction: 0.001,
    restitution:0.1,
    
}

this.radius=5;
this.body = Bodies.circle(x,y,this.radius, options);
World.add(world, this.body);
}

updateY(){
    if(this.body.position.y>height){
        Matter.Body.setPosition(this.body, {x:random(0,900), y:random(0,900)})        
    }
}

display() {
    fill("white");
    ellipseMode(CENTER);
    ellipse(this.body.position.x,this.body.position.y, this.radius, this.radius);
}
}

