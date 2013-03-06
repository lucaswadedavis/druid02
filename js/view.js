$(document).ready(function() {
    Crafty.init(window.innerWidth, window.innderHeight);

	times.push(new Date());

    var message=function(x){
	Crafty("Message").each(function(){this.destroy()});
	var f=Crafty.e("Message, 2D, DOM, Color, Text, Tween").attr({
	alpha:0,
        w:bounds.right,
        h: 100,
        x:0,
        y:150
    	}).text(x).textColor("#ffffff").bind('EnterFrame',function(){this.tween({alpha:1},100)});
	
	return f;
	};

	var pause=Crafty.e("Pause, 2D, DOM, Color, Text, Tween").attr({
	alpha:1,
        w:bounds.right,
        h: 100,
        x:0,
        y:150
    	}).text("Pause").textColor("#000000").bind("click", function() {
    		Crafty.pause();
		});
	
	var sky=function(){
		new Crafty.e("Sky, 2D, DOM, Color, Tween").attr({
				x:0,
				y:0,
				w:bounds.right,
				h:bounds.bottom-100
				}).color("#00ffff");	
		};	

	var ground=function(){
		new Crafty.e("Ground, 2D, DOM, Color, Tween, Collision").attr({
				x:0,
				y:bounds.bottom-100,
				w:bounds.right,
				h:bounds.bottom
				}).color("#999988");	
		};

	var light=function(x1,x2,y){

		new Crafty.e("Light, 2D, DOM, Color, Tween, Collision").attr({
				x:_.random(x1,(x2-5)),
				y:y,
				w:10,
				h:10,
				dx:_.random(-5,5),
				dy:_.random(-5,5)
				}).color("#ffff55").bind('EnterFrame',function(){
					if (this.dx<1 && this.dx>(-1)){this.destroy()};
					if (this.dy<1 && this.dy>(-1)){this.destroy()};
					this.y=this.y+this.dy;
					this.x=this.x+this.dx;
					
					if (this.y>bounds.bottom || this.x<bounds.left || this.x>bounds.right || this.y<bounds.top){
						this.destroy();	
						}
					}).onHit("Plant",function(){
						if (_.random(100)<5){
							this.destroy();
							}
					}).onHit("Ground",function(){
						if (_.random(10)<5){
							this.destroy();
							}
						else{
						this.dy*=-1;
						}
					});	
		};

	var sun=function(){
		new Crafty.e("Sun, 2D, DOM, Color, Tween").attr({
				x:(bounds.right/2),
				y:bounds.bottom/2,
				w:30,
				h:30
				}).color("#ffff00").bind('EnterFrame',function(){
					
					this.x++;
					this.y=(bounds.bottom/2)-((bounds.bottom/2)*Math.sin((Math.PI/bounds.right)*this.x));

					
					//this.tween({x:dx,y:dy},1000);
					if (this.x>bounds.right){
						this.x=bounds.left-this.w;	
						}
					
					if (_.random(10)<5){
						light(this.x,(this.x+this.w),(this.y+(this.h/2)));

						}
					
					});	
		};

	var rain=function(x1,x2,y){
		new Crafty.e("Rain, 2D, DOM, Color, Tween, Collision").attr({
				x:_.random(x1,(x2-5)),
				y:y,
				w:5,
				h:5
				}).color("#0000ff").bind('EnterFrame',function(){
					var dy=this.y++;
					this.tween({y:dy},100);
					if (this.y>bounds.bottom){
						this.destroy();	
						}
					});	
		};

	var clouds=function(){
		new Crafty.e("Clouds, 2D, DOM, Color, Tween").attr({
				x:0,
				y:_.random(100,200),
				w:_.random(100,200),
				h:_.random(100,200)
				}).color("#ffffff").bind('EnterFrame',function(){
					var dx=this.x++;
					if (_.random(100)<10){
						this.tween({x:dx},100);
						}
					if (this.x>bounds.right){
						this.x=bounds.left-this.w;	
						}
					if (this.alpha>0 && _.random(100)<10){
						rain(this.x,(this.x+this.w),(this.y+this.h));
						this.alpha=this.alpha-(0.01);
						}
					});	
		};

sky();
sun();
//clouds();
ground();

for (var i=0;i<50;i++){
var progenitor={
	x:_.random(bounds.right),
	grow:_.random(1,100),
	seed:1,
	wait:_.random(400,500),
	growStalkWidth:_.random(1,3),
	growStalkHeight:_.random(4,6),
	growFoliageWidth:_.random(5,15),
	growFoliageHeight:_.random(15,20),
	seedEnergy:_.random(10,200)
	};
	plantFactory(progenitor);
	};

	var pause=Crafty.e("Pause, 2D, DOM, Color, Text, Tween").attr({
	alpha:1,
        w:bounds.right,
        h: 100,
        x:0,
        y:150
    	}).text("").textColor("#000000").bind('KeyDown', function(e) {
    		if(e.key == Crafty.keys['LEFT_ARROW']) {
    		Crafty.pause();
    			} 
		});
	
//ftw();

});
