var BASIC = new basicClass(); 


function basicClass(){
	//public vars

	//private vars

	var stripCanvas;
	var mainCanvas;
	var imageData;
	var stripData;

	var mousePosArray = [];
	var smoothPosArray = [];
	var lastIndex = 0;

	var changeTimer = 0;
	var changeMax = 10;

	var stripMove = 0;
	var stripRight = true;

	var readyToRender = false;
	var stripArray = [];

	var stripRatio;

	//public methods
	this.init = function(){
		
		init();
	}

	this.render = function(){
		if(readyToRender)
		{
			render();
		}
		
	}

	//private methods

	function init(){
		
		loadImage();
		
	}

	function loadImage(){
		var url = assetPath + "/images/default.jpg";
		var img = new Image();
		img.onload = function(){

			initCanvas(this);
			getStrip(0.2 , 0 , stripRatio , 1);
			initMainCanvas();
		}
		img.src = url;
	}

	function initCanvas(img){

		var c=document.getElementById("canvas-image");
		var ctx=c.getContext("2d");

		var height = img.height;
		var width = img.width;

		c.width = width;
		c.height = height;
		stripCanvas = c;
		ctx.drawImage(img,0,0);

		pixelData = ctx.getImageData(0,0,width,height);

		imageData = pixelData;

		storeStrips();

		//setting strip width
		var stripWidth = 100;
		stripRatio = stripWidth / width;

	
	}

	function storeStrips(){
		var numInc = stripCanvas.width;
		var ctx = stripCanvas.getContext('2d');

		for( var i = 0 ; i < numInc ; i++)
		{
			var tempPixelData = ctx.getImageData(i , 0 , 1 , stripCanvas.height );
			stripArray.push(tempPixelData);

		}

		console.log(stripArray);
	}

	function getStrip(x,y,w,h)
	{
		var width = imageData.width;
		var height = imageData.height;
		var data = imageData.data;

		var stripDim = {};

		stripDim.x = Math.floor(x*width);
		stripDim.y = Math.floor(y*height);
		stripDim.w = Math.floor(w*width);
		stripDim.h = Math.floor(h*height);


		stripData = stripCanvas.getContext("2d").getImageData(stripDim.x , stripDim.y , stripDim.w , stripDim.h);

		var c = document.getElementById('canvas-strip');
		var ctx = c.getContext("2d");

		c.width = stripDim.w;
		c.height = stripDim.h;

		var newData = ctx.putImageData(stripData,0,0);
	}

	function scaleStripHeight(newRatio){

	}

	function initMainCanvas(){
		var c = document.getElementById('canvas-main');
		var ctx = c.getContext('2d');

		c.width = 800;
		c.height = 400;

		mainCanvas = c;

		readyToRender = true;

	}

	//rendering stuff

	function render(){
		
		var isMousedOver = UTILS.mouseOverObject( "mainCanvas" ,  mainCanvas);

		if(isMousedOver)
		{
			drawStrip();
		}

		if(changeTimer > changeMax)
		{
			moveStrip();
			changeTimer = 0;
		}

	}

	function moveStrip(){

		var inc = 0.02;
		var stripMax = 1 - stripRatio;

		if(stripRight)
		{
			stripMove += inc;
		}
		else
		{
			stripMove -= inc;
		}

		if( stripMove > stripMax || stripMove < 0)
		{
			stripRight = !stripRight;
		}

		console.log(stripMove);

		stripMove = Math.min( Math.max( stripMove , 0 ) , stripMax);
	}

	//custom render

	function drawStrip(){



		var drawObj = UTILS.mousePosOnObject("mainCanvas");
		var drawX = drawObj.x;
		var drawY = drawObj.y;

		mousePosArray.push(drawObj);

		if(mousePosArray.length > 1)
		{
			smoothArray();
		}
		

		var ctx = mainCanvas.getContext('2d');

		ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);

		// console.log(mousePosArray.length +"   " + smoothPosArray.length);

		var maxLength = 400;
		var startingPoint = 0;

		if( smoothPosArray.length >  maxLength)
		{
			startingPoint = smoothPosArray.length - maxLength;
		}

		for(var i = 0 ; i < maxLength ; i++)
		{
			getStrip(stripMove , 0 , stripRatio, 1);

			var num = startingPoint + i;
			// ctx.fillRect( smoothPosArray[i].x , smoothPosArray[i].y , 2 , 2);
			ctx.putImageData(stripData , smoothPosArray[num].x  , smoothPosArray[num].y );
		}
		

	}

	function smoothArray(){


			for( var i = 0 ; i < 1 ; i++ )
			{
				var index = mousePosArray.length-1;
				var startObj = mousePosArray[index-1];

				var difX = mousePosArray[index].x - mousePosArray[index-1].x ;
				var difY = mousePosArray[index].y - mousePosArray[index-1].y ;



				var offsetX = Math.abs(difX);
				var offsetY = Math.abs(difY);

				var numInc = Math.ceil( Math.sqrt(offsetX * offsetX + offsetY * offsetY) );

				// var greatestDif = Math.max(offsetX , offsetY);

				if(difX < 0 ) offsetX *= -1;
				if(difY < 0 ) offsetY *= -1;

				// console.log(offsetX +"     "+numInc);

				var offsetXSize = offsetX / numInc;
				var offsetYSize = offsetY / numInc;

				if(numInc > 1)
				{
					for( var j = 0 ; j <  numInc ; j+=1)
					{
						var smoothObj = {};
						smoothObj.x = startObj.x + (offsetXSize*j) ;
						smoothObj.y = startObj.y + (offsetYSize*j);

						changeTimer++;

						smoothPosArray.push(smoothObj);
					}
				}
				else
				{
						smoothPosArray.push(startObj);
						changeTimer++;
				}

				
			}

			lastIndex = mousePosArray.length;
	

	}

}

