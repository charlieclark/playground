var UTILS = UTILS || {};

(function(){

	var self = UTILS;

	self.mouseOverObjectHash = {} ;
	self.mouseOverObjectArray = [] ;

	self.mouseOverObject = function(name , obj){

		var curObj = self.mouseOverObjectHash[name];

		if(!curObj)
		{
			console.log("doesnt exist");
			curObj = {};
			curObj.u = $(obj).position().top;
			curObj.l = $(obj).position().left;
			curObj.d = curObj.u + $(obj).height();
			curObj.r = curObj.l + $(obj).width();

			console.log($(obj).position());

			self.mouseOverObjectHash[name] = curObj;
			self.mouseOverObjectArray.push(name);

		}
	
		var u,r,d,l;

		

		u = curObj.u;
		r = curObj.r;
		d = curObj.d;
		l = curObj.l;

		var mouseX = CONFIG.mouseX;
		var mouseY = CONFIG.mouseY;

		if(mouseX > l && mouseX < r && mouseY > u && mouseY < d)
		{
			return true
		}
		else
		{
			return false
		}



	}

	self.mousePosOnObject = function(name){

		var mouseX = CONFIG.mouseX;
		var mouseY = CONFIG.mouseY;

		var objX = self.mouseOverObjectHash[name].l;
		var objY = self.mouseOverObjectHash[name].u;

		var drawX = mouseX - objX;
		var drawY = mouseY - objY;

		var drawObj = {"x": drawX , "y":drawY };
		return drawObj

	}

	//general utils

	 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


})(UTILS)