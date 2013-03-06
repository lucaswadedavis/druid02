    //plants
  var stalk=function(x){
	var chroma=_.random(200);
	chroma='rgb('+chroma+','+chroma+','+chroma+')';
	var s=new Crafty.e("Stalk, 2D, DOM, Color, Tween").color("#555555").attr({
		w:1,
		h:0,
		x:x,
		y:bounds.bottom-100
		}).color(chroma);
	return s;
	};

  var plantFactory=function(genome){
	var mutation=0.2;
	var mutationLower=1-mutation;
	var mutationUpper=1+mutation;
	var y=bounds.bottom-100;
	var x=_.random((mutationLower*genome.x),(mutationUpper*genome.x));
	var grow=_.random((mutationLower*genome.grow),(mutationUpper*genome.grow));
	var seed=_.random((mutationLower*genome.seed),(mutationUpper*genome.seed));
	var wait=_.random((mutationLower*genome.wait),(mutationUpper*genome.wait));
	var growStalkWidth=_.random((mutationLower*genome.growStalkWidth),(mutationUpper*genome.growStalkWidth));
	var growStalkHeight=_.random((mutationLower*genome.growStalkHeight),(mutationUpper*genome.growStalkHeight));
	var growFoliageWidth=_.random((mutationLower*genome.growFoliageWidth),(mutationUpper*genome.growFoliageWidth));
	var growFoliageHeight=_.random((mutationLower*genome.growFoliageHeight),(mutationUpper*genome.growFoliageHeight));
	var seedEnergy=_.random((mutationLower*genome.seedEnergy),(mutationUpper*genome.seedEnergy));
	
	var chroma='rgb('+_.random(80,140)+','+_.random(160,220)+','+_.random(20,40)+')';
    var plant=Crafty.e("Plant, 2D, DOM, Color, Collision, Tween").color(chroma).attr({
	alpha:0.9,
        w: 10,
        h: 10,
        x:x,
        y:y-10,
	energy:seedEnergy,
	water:0,
	age:0,
	stalk:stalk(x),
	root:x,
	grow: grow,
	seed:seed,
	wait:wait,
	growStalkWidth:growStalkWidth,
	growStalkHeight:growStalkHeight,
	growFoliageWidth:growFoliageWidth,
	growFoliageHeight:growFoliageHeight,
	seedEnergy:seedEnergy
    }).bind('EnterFrame', function() {

	///////////////////////
	//////////////////////	Killswitch
	///////////////////////
		
		if (this.energy<0 || this.x<bounds.left || this.x>bounds.right || this.y>bounds.bottom || this.y<bounds.top){ecosystem.plants--;this.destroy();this.stalk.destroy()};

	/////////////////////




	///////////////////////
	//////////////////////	Grow/Seed/Wait
	///////////////////////
	var sum=this.grow+this.seed+this.wait;
	var selector=_.random(sum);
	if (selector<this.grow){
	//grow 
	var growSum=this.growStalkWidth+this.growStalkHeight+this.growFoliageWidth+this.growFoliageHeight;
	var growSelector=_.random(growSum);
	if (growSelector<this.growStalkWidth){
		//grow stalk Width
		this.stalk.w++;
		this.stalk.x=this.root-(this.stalk.w/2);
		}
	else if (growSelector>this.growStalkWidth && growSelector<=(this.growStalkWidth+this.growStalkHeight)){
		//grow stalk height
		this.stalk.h++;
		this.stalk.y--;
		this.y--;
		}

	else if (growSelector>(this.growStalkWidth+this.growStalkHeight) && growSelector<=(this.growStalkWidth+this.growStalkHeight+this.growFoliageWidth))
		{
		//grow foliage width
		this.w=this.w+2;
		this.x=this.root-(this.w/2);
		}

	else {
		//grow foliage height
		this.y--;
		this.h++;
		}
	this.energy--;
	}
	else if (selector>=this.grow && selector<(this.grow+this.seed) && this.energy>this.seedEnergy ){
	//seed
	var seedLanding=_.random(this.x,(this.x+this.w));
	var genome={
		x:seedLanding,
		grow:this.grow,
		seed:this.seed,
		wait:this.wait,
		growStalkWidth:this.growStalkWidth,
		growStalkHeight:this.growStalkHeight,
		growFoliageWidth:this.growFoliageWidth,
		growFoliageHeight:this.growFoliageHeight,
		seedEnergy:this.seedEnergy
		};	
		plantFactory(genome);
		this.energy=this.energy-seedEnergy;
		
	}
	else {
	//wait
	if (_.random(10)<9){this.energy++;}
	
	};
	


	//energy burn
	var burn=Math.max(1,((0.0002*(this.w*this.h))+(0.0005*(this.stalk.h*this.stalk.w))));
	this.energy=this.energy-burn;
	console.log("burn: "+burn);
	
////////////

	console.log("energy: "+this.energy+" || seedEnergy; "+this.seedEnergy+" || grow: "+this.grow+" || seed: "+this.seed+" || wait: "+this.wait+" || fw: "+this.growFoliageWidth+" || fH: "+this.growFoliageHeight+" || sH: "+this.growStalkHeight+" || sW: "+this.growStalkWidth+".");

    	}).onHit('Light',function(){
		console.log("hit by light");
		this.energy+=20;
	}).onHit('Rain',function(){
		this.water+=5;
	});
	ecosystem.plants++;
	return plant;
	};

