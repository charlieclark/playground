<?php
$theMessage = $_GET["message"];
$theWord = $_GET["word"];

?>

<html>
<head>
	<title> </title>

	<!-- facebook -->
	<meta property="og:title" content="Photo Message Generator"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="http://www.charlieclarkdesign.com/alphabet/index.php"/>
    <meta property="og:image" content="http://www.charlieclarkdesign.com/alphabet/assets/elements/fbook.jpg"/>
    
    <meta property="og:description" content="Use the Photo Message Generator to create a visual message powered by the flickr image database. Designed and developed by Charlie Clark."/>

     <meta property="fb:admins" content="clark.charlie"/>


  

	<link rel="shortcut icon" href="assets/elements/fav.png" />

	<!-- libraries -->
	<script src="assets/libs/jquery.js"></script>
	<script src="assets/libs/raphael.js"></script>

	<!--widgets-->
	<script src="assets/scripts/alphabet-widget.js"></script>

	<!-- scripts -->
	<script src="assets/scripts/main.js"></script>




	<!-- actions -->
	<script type="text/javascript">




	$(document).ready(function(){

	
		// if is share
		var inMessage = "<?= $theMessage ?>" ;
		var inWord = "<?= $theWord ?>" ;
		
		if( !inMessage == "" && !inWord == ""){

			theMessage = unescape(inMessage);
			theWord = unescape(inWord);
			init("share");
		}
		else
		{	
			init("normal");
		}


		

	});

	</script>

	<!-- css -->
	<!-- fonts -->
	<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="assets/css/main.css"/>

	<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35438776-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>

<body>
<div id='fb-root'></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '234033363391139', // App ID
      channelUrl : 'http://www.charlieclarkdesign/alphabet/index.php', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>

	<section id="header">
		<div id="menu">
			<span id="compose"> compose new message </span>
			<span id="share"> share this message </span>
			<span id="ccd" class="right"> designed &amp developed by charlie clark </span>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.charlieclarkdesign.com/alphabet">Tweet</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			<iframe id="facebook-iframe" src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fcharlieclarkdesign.com%2Falphabet&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=352219424843872" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>
		

		</div>
	</section>

	<section id="share-section">
		<div id="close"> </div>
		<h2> share this link </h2> </br>
		<textarea rows="5" cols="30" id="link-holder" type="text" value="Some Text" readonly="readonly"></textarea>
		<span> share this message on: </span> </br>
		<span id="fbook-share"> Facebook </span>
	</section>

	<section id="landing">

		<div id="userInput">
		
			<div id="userMessage">
				<span class="primary">Write a Message</span> </br>
				<input placeholder="write something!"> </input>
			</div>

			<div id="userWords">
				<span class="primary">Choose a Word</span> </br>
				<input placeholder="eg. fire"> </input>
			</div>

			<button id="button">generate</button>

		</div>

	</section>

	<section id="message">

		<div id="loader"> </div>

			<div id="alphabetContainer">
		<div id="alphabetTest"></div>

	</section>


		


	</div>

</body>
</html>