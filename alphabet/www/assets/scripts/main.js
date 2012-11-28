var alphabet;

//global vars
var theMessage;
var theWord;

function init(state){


	alphabet = new widgets.alphabet();


	//load background
	var numBackgrounds = 8;
	var random = Math.floor(Math.random()* numBackgrounds);
	var theURL = "assets/images/" + (1+random) +".jpeg";

	console.log(theURL);
	$("#landing").css("background-image" , "url(" + theURL + ")");

	

	//click handlers

	$("#button").click(function(){
		generateAlphabet();
	});

	//footer links

	$("#ccd").click(function(){
		window.open('http://www.charlieclarkdesign.com');
	});

	//share links
	$("#share").click(function(){
		$("#share-section").fadeIn();




		$("#fbook-share").unbind("click");
		var theLink = "http://www.charlieclarkdesign.com/alphabet/" + "index.php?message=" +  escape(theMessage) + "&word=" + escape(theWord);
		var unescapedLink = "http://www.charlieclarkdesign.com/alphabet/index.php?message=" +  theMessage + "&word=" + theWord;
		$("#link-holder").attr("value" , theLink);
		//share links
		$("#fbook-share").click(function(){

		var obj = {
          method: 'feed',
          link: theLink,
          picture: 'http://www.charlieclarkdesign.com/alphabet/assets/elements/fbook.jpg',
          name: 'Photo Message',
          caption: 'designed & developed by Charlie Clark',
          description: 'Use the Photo Message Generator to create a visual message powered by the flickr image database.'
        };

        FB.ui(obj);

		// var newfbShareLink = "http://www.facebook.com/sharer.php?s= 100&amp;p[title]=La Vita È Bella&amp;p[url]=" + theLink + "&amp;p[summary]=Drawing on Italy’s most famous export – great-tasting, healthy, colourful food – La Vita é Bella brings families together to experience mealtimes the Italian way";

		// var fbShareLink = "http://www.facebook.com/share.php?s=100&p[url]=" + encodeURIComponent(unescapedLink);
		// window.open(newfbShareLink);
		
		});

	});

	$("#close").click(function(){
		$("#share-section").fadeOut();
	});

	//new message

	$("#compose").click(function(){
		alphabet.reset();
		$("#landing").slideDown('slow' , function(){
			$("#userInput").slideDown();
			$("#message").hide();
		});
		$("#header").fadeOut();

	});

	

	//initial hide /show

		$("#loader").hide();
		$("#userInput").hide();
		$("#share-section").hide();

		console.log(state);

	if( state == "normal")
	{
		$("#userInput").delay(500).slideDown("slow");
		$("#message").hide();
		$("#header").hide();
	}
	else if( state == "share")
	{
		$("#landing").hide();
		$("#userMessage input").val(theMessage);
		$("#userWords input").val(theWord);
		generateAlphabet();

	}

	

}

function generateAlphabet(){

	//gettin input valls
	theMessage = ($("#userMessage input").val()).toLowerCase();
	theWord = $("#userWords input").val();

	//getting rid of white space
	theMessage = theMessage.replace(/[^(\w+)]/g, " ");
	theMessage = theMessage.replace(/\s{2,}/g, ' ');

	//making sure only one word is in flickr field

	var wordCopy = theWord;
	if((wordCopy.split(" ")).length > 1 ||(wordCopy.split(" ")).length == 0 || wordCopy.length == 0)
	{
		alert("the second input field must contain a single word");
	}
	else
	{
		alphabet.generateAlphabet();
		$("#button").fadeOut();
		$("#userInput").delay(500).slideUp("slow" , function(){ 
			$("#message").show();
			$("#landing").slideUp('slow' , function(){
				$("#button").show();
				$("#header").fadeIn();
				if( !alphabet.finishedLoading ) $("#loader").show();
			});
		});
	}

}