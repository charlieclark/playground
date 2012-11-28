var widgets = window.widgets || {};

(function(){

	var el = "alphabet-container";
	var apiKey = "478b81836e73973919508a2579212211";

	//storing
	var photoArray = new Array();
	var alphabetArray = new Array();
	var imagesLoaded = 0;
	var numImages ;

	//alphabet stuff
	var numLetters = 1;
	var letterWidth = 177;

	
	var theTimer;

	

	widgets.alphabet = function(){

		
		loadAlphabet();

	};

	widgets.alphabet.prototype = {

		generateAlphabet : function(){

			$("#alphabetTest").empty();

			getImages();
				
			

		},

		 reset : function()
		{
			finishedLoading = true;
			 photoArray.length = 0;
			 imagesLoaded = 0;
			clearTimeout(theTimer);
		},

		finishedLoading : false

	}

	//prepping alphabet

	var loadAlphabet = function(){

		$.get("assets/scripts/alphabet-paths.json" , function(data){
			alphabetArray = data.data;

		});	
	};

	var createMessage = function(){

		var theWordLetters = theMessage.split('');
		numLetters = theWordLetters.length;

		var wordTracker = 0;

		//getting all html and inserting in element
		for(var i = 0 ; i < theWordLetters.length; i++)
		{	

			if( theWordLetters[i] == " " )
			{
				wordTracker++;
			}
			else
			{
				var tempID = i;
				var tempHTML = "<div class='letter' id=" + tempID + " tag=" + wordTracker+"></div>";
				$("#alphabetTest").append(tempHTML);
				createLetter(theWordLetters[i] , tempID);
			}
			
		}
		
		sortWords();

	
		

	}

	var sortWords = function(){

			//sorting into words
			var wordTracker = 0;
			$("#alphabetTest").append("<div class='word'></div>");

		$("#alphabetTest .letter").each(function(){

			var tracker = $(this).attr("tag");

			if(tracker != wordTracker)
			{
				$("#alphabetTest").append("<div class='word'></div>");
				wordTracker = tracker;
			}
			$(this).appendTo($(".word").last());

		});

		$("#alphabetTest .word").each(function(){

			$(this).hide();
			$(this).delay(500 * $(this).index()).fadeIn();
			console.log($(this).index());

		});

		$("#alphabetTest .letter").mouseenter(function(){
				var index = Number( $(this).attr("id") );
				changeBackground(index);
		});
			
		
	}

	var createLetter = function(letter , div){

		var theContainer = $("#"+div);
		var thePath;

		for( var i = 0 ; i < alphabetArray.length ; i++)
		{
			if(alphabetArray[i].letter == letter)
			{
				thePath = alphabetArray[i].path;
				var theWidth = alphabetArray[i].width;

				theContainer.css("width" , theWidth);
				break;
			}
		}

		//putting together the SVG
		var paper = Raphael(div , 320, 200);
		var circle = paper.path(thePath);
		// Sets the fill attribute of the circle to red (#f00)
		circle.attr("fill", "#fff");

		// Sets the stroke attribute of the circle to white
		circle.attr("stroke", "#fff");

	};


	//loading photos

	var getImages = function(  ){

		var wordArray = theWord.split(",");
		var wordString = wordArray[0];
		// console.log(word);

		// for(var i = 0 ; i < wordArray.length ; i++ )
		// {
		// 	wordString += wordArray[i];
		// 	if(i != wordArray.length-1) wordString += ",";
		// }

		var theURL =  "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="  + apiKey + "&tags=" + wordString + "&sort=relevance&per_page=20&format=json&nojsoncallback=1";
		
		console.log(theURL);
		
		$.get(theURL , function(data){
			getImageData(data);
		});

	}

	var getImageData = function( data ){


		console.log(data);
		var thePhotos = data.photos.photo;
		numImages = thePhotos.length ;

		for( var i = 0 ; i < numImages; i++)
		{
			var tempPhoto = thePhotos[i];
			var tempURL = "http://farm"+ tempPhoto.farm +".staticflickr.com/"+ tempPhoto.server +"/"+tempPhoto.id+"_"+tempPhoto.secret+".jpg";
			console.log(tempURL);	
			var tempObject = {
				"theURL" : tempURL
			};

			photoArray.push(tempObject);

		}

		loadImages();

	}

	var loadImages = function(){
		var img = new Image;
		var url = photoArray[imagesLoaded].theURL;
		img.src = url;
		img.onload= function(){ imageLoaded(img);};
	}

	var imageLoaded = function(e){
		photoArray[imagesLoaded].image = e;
		imagesLoaded ++;
		if(imagesLoaded == 6){
			createMessage(theMessage);
			generateBackgrounds();
			$("#loader").hide();
			alphabet.finishedLoading = true;
		}
		if(imagesLoaded < numImages)loadImages();
	}

	var generateBackgrounds = function(){
	
		for(var i = 0 ; i < numLetters ; i++)
		{
			changeBackground(i);	
			
		}
	
		updateBackgrounds();
		
	}

	var updateBackgrounds = function()
	{
		changeBackground(Math.floor(Math.random() * numLetters));
		
		var randomDelay = 100 + Math.floor(Math.random() * 1000);
		theTimer = setTimeout(updateBackgrounds, randomDelay);
		
	}

	var changeBackground = function(bg)
	{
		var randomNum = Math.floor(Math.random() * imagesLoaded);
		var img = photoArray[randomNum].image;
		var imgURL = img.src;
		var xMin = img.width - letterWidth;
		var yMin = img.height - letterWidth;
		var xOffset = -(Math.random() * xMin);
		var yOffset = -(Math.random() * yMin);

		var tempElement = $("#alphabetContainer").find(".letter").eq(bg);		
		tempElement.css('background-image' , "url(" + imgURL + ")");
		tempElement.css('background-position' , xOffset+"px " + yOffset +"px");
		
	}


	





})();