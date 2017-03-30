$(document).ready(function() {
	/*-- Reused objects --*/
	var body = $("body");
	var parallaxContainer = $(".parallax-container");




	/*-- Title Description Changer --*/
	//Recurring function for updating title paragraph text
	var titleDynamicParagraph = $('#title-changing-text');
	var listOfTitles = [
		"",
		"\"He achieved his dream of becoming a developer\"",
		"\"She achieves more with patience and practice\"",
		"\"They achieve their goals with planning and hard work\""
	];
	//Used to cycle through listOfTitles
	var titleSelected = 0;

	//Runs while the following variable is true
	var titleChangeActivated = true;

	//Declare Function
	var titleDescriptionChange = function() {
		//Change Text if activated, cycling through listOfTitles
		if (titleChangeActivated) {
			titleDynamicParagraph.fadeOut(1000,function() {
				titleDynamicParagraph.text(listOfTitles[titleSelected]);
			}).fadeIn(1000);
			if (titleSelected < listOfTitles.length) {
				titleSelected++;
			} else {
				titleSelected = 0;
			}
		}
		//Call again every 7 seconds
		setTimeout(titleDescriptionChange, 7000);
	};

	//Call function
	titleDescriptionChange();





	/*-- Parallax Event Listeners --*/
	//Uses parallaxContainer variable from "Reused Objects"
	parallaxContainer.on("scroll", function () {
		if(parallaxContainer.scrollTop() > 260) {
			var fadeOutStart = 260;
			var fadeOutFinish = 540;
			var percentFade = 1 - (parallaxContainer.scrollTop() - fadeOutStart) / (fadeOutFinish - fadeOutStart);

			$(".scroll-fade-out").css("opacity", percentFade);
			//console.log(percentFade);
		}

		if(parallaxContainer.scrollTop() > 540) {
			console.log("Screen Fixed");
			//Remove Parallax
			$("#title-container").removeClass("parallax-container");
			$("#title-description-container").removeClass("parallax-mid parallax-layer");
			$("#title-header-container").removeClass("parallax-min parallax-layer");
			//Add new states for positioning and styling
			$("#title-secondary-container").addClass("scroll-invisible");
			$("#landing-scroll-down-arrow").addClass("scroll-invisible");
			$("#title-description-container").addClass("scroll-fix");
			$("#title-header-container").addClass("scroll-fix");
			//Turn off and fade out changing text, fade in input text
			titleChangeActivated = false;
			titleDynamicParagraph.fadeOut(1000,function() {
				$("#title-input-text").addClass("scroll-fade-in");
			});


		}
	});


	/*-- Scroll Down Arrow Event Listener --*/
	//Uses parallaxContainer variable from "Reused Objects"
	$("#landing-scroll-down-arrow").click(function() {
		parallaxContainer.animate({ scrollTop:541}, 1000);
	});


	/*-- Input Key Down Event Listener --*/
	$("#first-goal").keydown(function(event) {
		$("#landing-goal-scroll-right-arrow").addClass("keydown-visible");

		if($("#first-goal").val().length > 1 && event.which == 13) {
			//If goal is longer than one character and enter key is pressed,
			//Click the next page button
			$("#landing-goal-scroll-right-arrow").click();
		}
	});


	/*-- Goal input next step Event Listener --*/
	var goalInputNextStep = $("#landing-goal-scroll-right-arrow");

	goalInputNextStep.click(function() {
		//Hide elements from current page
		goalInputNextStep.addClass("exit-right");
		$("#title-input-text").addClass("exit-left");
		//Show elements from next page
		$("#landing-task-list").addClass("enter-left");

	});


	/*-- Task Input Keydown Event Listener --*/
	//Event listener for dynamically generated remove option buttons
	$(document).on('keydown', '.task-input', function(event) {
		if($(this).val().length > 1) {
			//If the current task is longer than one character
			//Show button to move to next page
			$("#landing-task-scroll-right-arrow").addClass("keydown-visible");
			if(event.which == 13) {
				//If the current task is longer than one character 
				//and enter key is pressed, click the new task button
				$("#landing-task-list .add-button").click();
				//TODO Tab over to the newly added input
			}
		}
	});


	/*-- Add new Task Button Event Listener --*/
	$("#landing-task-list .add-button").click(function() {
		//Scroll down the view a little to accomodate for the longer list
		var currentScrollTop = body.scrollTop();
		body.animate({ scrollTop:currentScrollTop + 54}, 1000);
	});


	/*-- Task Input next step Event Listener --*/
	$("#landing-task-scroll-right-arrow").click(function() {
		//Hide elements from current page
		$("#landing-task-scroll-right-arrow").addClass("exit-right");
		$("#landing-task-list").addClass("exit-left");
		//Show elements from next page
		$("#landing-sign-up").addClass("enter-left");
	});

	/*-- User Info Focus--*/
	$(".user-info-input input").focusin(function() {
		//Using parent saves lines of code, but requires context
		//(which can be dangerous)
		$(this).parent().addClass("input-active");
		$(this).parent().removeClass("form-field-error");
	});

	$(".user-info-input input").focusout(function() {
		//Using parent saves lines of code, but requires context
		//(which can be dangerous)
		$(this).parent().removeClass("input-active");
	});

	/*-- Open Sign In Button--*/
	//Opens Sign In Screen
	$("#landing-sign-in-link").click(function() {
		body.addClass("sign-in-overlay-open");
	});

	/*-- Close Sign In Button--*/
	//Closes Sign In Screen
	$("#landing-sign-in-close").click(function() {
		body.removeClass("sign-in-overlay-open");
	});

	/*-- Sign In Button--*/
	$("#landing-sign-in-button").click(function() {
		$.ajax({
        	type : "POST",
			url : "./login",
			data : { 
				username: $('#sign-in-email').val(),
				password: $('#sign-in-password').val()
			},
			success : function(data) {
				console.log(data);
				$("#landing-sign-in-error").html(data.message);	
				if (data.success) {
					window.location.href = "./dashboard";
				} else {
					if (data.message == "No account exists for this email") {
						body.addClass('expanded-sign-in-form');
						appearAnimate($('.appear.create-acct'));
					}
				}
			},
			error: function (xhRequest, ErrorText, thrownError) {
				console.log(xhRequest);
				console.log('ErrorText: ' + ErrorText);
				console.log('thrownError: ' + thrownError);
			}
		});
	});

	/*-- Sign Up Button--*/
	$("#landing-sign-up-button").click(function() {
		//Password Check
		if($('#sign-in-password').val() == $('#sign-in-confirm-password').val()) {
			$.ajax({
	        	type : "POST",
				url : "./register",
				data : { 
					email: $('#sign-in-email').val(),
					username: $('#sign-in-email').val(),
					password: $('#sign-in-password').val()
				},
				success : function(data) {
					console.log(data);
					if (data.success) {
						window.location.href = "." + data.nextUrl;
					} else {
						$("#landing-sign-in-error").html("Network error! Please try again");	
					}
				},
				error: function (xhRequest, ErrorText, thrownError) {
					console.log(xhRequest);
					console.log('ErrorText: ' + ErrorText);
					console.log('thrownError: ' + thrownError);
				}
			});
		} else {
			$("#landing-sign-in-error").html("Passwords don't match!");
		}
	});



	/*-- Appear --*/
	var appearAnimate = function(_this) {
		_this.addClass('transition');
		_this.removeClass('appear');
		_this.addClass('ease');

		setTimeout(function() {
			_this.removeClass('transition');
		}, 0);
	}

	/*-- User Info Form Control--*/
	//On button press check email field for formatting.
	//On return of a promise check a variable for 

	

});


//Extra Space for better scrolling






