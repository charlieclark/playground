//global vars

var templateNames = ["basic"];
var mainPath = document.URL;
var assetPath = document.URL + "assets";

var templates = {};
var numTemplatesLoaded = 0;


$(document).ready(function(){

	preInit();

});


function preInit(){

	//initializing classes
	BASIC.init();

	//loading templates
	loadTemplates();

	//mouseEvents
	mouseEvents();

	//resize
	$(window).resize(function(){
		resize();
	});
}

function init(){
	numTemplatesLoaded ++;
	if(numTemplatesLoaded > templateNames.length-1)
	{
		console.log("templatesLoaded");
	}
	resize();

	//init render loop
	animate();

}

function animate(){
	requestAnimFrame(animate);
	// setTimeout(function(){ animate();} , 30);
	render();
}

function render(){
	BASIC.render();
}

function mouseEvents(){

	$("#container").mousemove(function(e){
		CONFIG.mouseX = e.pageX;
		CONFIG.mouseY = e.pageY;
	});

}

//resize logic
function resize(){

	//main width and height
	CONFIG.windowHeight = $(window).height();
	CONFIG.windowWidth = $(window).width();


	//resizing classes

}

function loadTemplates(){

	for( var i = 0 ; i < templateNames.length ; i++)
	{
		var templateURL = mainPath + "assets/templates/" + templateNames[i] + ".html";

		$.ajax({
			url: templateURL,
			context: {id:templateNames[i]},
			success: function( data ) {
		  		templates[this.id] = data;
		  		init();
		  	}
		});
	}
}

