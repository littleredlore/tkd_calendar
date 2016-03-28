$(document).ready(function(){
   


	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var today = new Date();
	var testDate = new Date(2015,4,14);
	var weekDay = new Date().getDay() ; // get day of week currently
	var testCountdown = Math.round(Math.abs((today.getTime() - testDate.getTime())/(oneDay))) + 2 + weekDay;

	var month = today.getMonth() + 1;  
	var day = today.getDate() - weekDay;

	//counts amount of weeks until test week
	var weeks = Math.round(testCountdown / 7 );

	var planDate = new Array ();
	var planType = new Array ();
	var planCat = new Array ();
	var planNotes = new Array ();

	var type = "";

	planDate.push("4/12") ;
	planType.push("practice");
	planCat.push("Forms");
	planNotes.push("Hwarang and Koryo");

	var enterInfo = "<div class='submitInfo'><select><option value='Forms'>Forms</option><option value='Sparring'>Sparring</option><option value='Breaking'>Breaking</option><option value='Knowledge'>Knowledge</option><option value='Other'>Other</option></select><p>Notes:</p><input class='calNotes' type='text' maxlength='100'><p class='submit'>ADD</p></div>";

	calendarDays = weeks * 7;

	//add weeks/divs
	for (i=1; i<= weeks; i++){

		$('div.weeks').append("<div class='hoverBox'><div id='week" + i + "'class='hoverExpand'><img src='hover.png'></div><ul id='week' class='week" + i + "'></ul><div id='week" + i + "' class='weekExpand'></div></div>");
	}

	
	//add days to weeks
	var ulweek = 1;
	var ulday = 1;

	for (i=1; i<= calendarDays; i++){

		//kicks to next month
		if(month == 3 && day > 31){
			month++;
			day = 1;
		} else if(month == 4 && day > 30){
			month++;
			day = 1;
		} else if (month==12 && day > 31){
			month = 1;
			day = 1;
		}

		//adds lis to uls and assigns test/class/free ids

		if (month == testDate.getMonth() + 1 && day == testDate.getDate()){
			// make test day different color
			$('ul.week' + ulweek).append('<li class="test" id="test" >' + month + "/" + day + '</li>');

		} else if (ulday == 3 || ulday == 5) {
			//make class day different color
			$('ul.week' + ulweek).append('<li class="class" id="class" >' + month + "/" + day + '</li>');

		} else{			
			if ($.inArray(month + '/' + day, planDate) != -1){
				$('ul.week' + ulweek).append('<li class="practice" id="free">' + month + "/" + day + "</li>");
			} else{
			$('ul.week' + ulweek).append('<li class="calendarDate" id="free">' + month + "/" + day + "</li>");
			}
		}

		//week day and day counter
		ulday++;
		day++;
	
		//kicks to next week on saturday
		if (ulday >= 8){
			ulweek++;
			ulday = 1;
		}

	
	}

	//greys out previous days in current week
	for (i=0; i< weekDay; i++){
		$('ul.week1 li').eq(i).css("opacity", 0.2);
	}

	//fill all weekly divs with information from days
	for (i=1; i<= weeks; i++){
		//div for this week's class
		$('div.weekExpand#week' + i).append('<div class="weekClass"><p class="weekClass">In Class This Week:</p></div>');
		//div for this week's practice
		$('div.weekExpand#week' + i).append('<div class="weekPractice"><p class="weekPractice">Practice This Week:</p></div>');
	}





	//on hover for expand arrow
	$("div.hoverBox").hover(function(){
	  $(this).find('div.hoverExpand').css("opacity","1");
	  },function(){
	  $(this).find('div.hoverExpand').css("opacity","0.01");
	});

	//click for div weekly expansion
	$(".hoverExpand").toggle(function(){
		var clickWeek = $(this).attr('id');

		$('ul#week.' + clickWeek + ' li').css({"margin-bottom": 10 + "px"});
		$('div.hoverExpand#' + clickWeek).css("padding-bottom", 10 + "px");

		$('ul#week.' + (clickWeek + 1)+ ' li').css({"margin-top": 20 + "px"});
		$('div.hoverExpand#' + (clickWeek + 1)).css("padding-top", 20 + "px");

		//append information in days to weekly overview
		for (i=0; i< 7; i++){
			//search for day in array
			var viewDay = $('ul#week.'+ clickWeek + ' li').eq(i).text();
			var cat = "";

			for (r=0; r< planDate.length; r++){
				if (planDate[r] == viewDay){
					cat =  planCat[r]; 	
				} else {

				}
			}

			
			if (i == 2){
				if (cat == ""){

					$('div.weekExpand#' + clickWeek +' div.weekClass').append('<p>Tuesday: No plans, requests welcome!</p>');
				}else if (cat != ""){
					$('div.weekExpand#' + clickWeek +' div.weekClass').append('<p>Tuesday: ' + cat + '.</p>');
				}

			} else if (i == 4){
				if (cat == ""){
					$('div.weekExpand#' + clickWeek +' div.weekClass').append('<p>Thursday: No plans, requests welcome!</p>');
				}else if (cat != ""){
					$('div.weekExpand#' + clickWeek +' div.weekClass').append('<p>Thursday: ' + cat + '.</p>');
				}
			} else {
				if (cat == ""){
				
				}else {
					if (i==0){
						$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p>Sunday: ' + cat + '.</p>');
					} else if (i==1){
						$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p>Monday: ' + cat + '.</p>');
					} else if (i==3){
						$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p>Wednesday: ' + cat + '.</p>');
					} else if (i==5){
						$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p>Friday: ' + cat + '.</p>');
					} else if (i==6){
						$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p>Saturday: ' + cat + '.</p>');
					}
				}
			}
		}

	  	$('div.weekExpand#' + clickWeek).slideDown(400, "swing", 0);
	},function(){
		var clickWeek = $(this).attr('id');
	  	$('ul#week.' + clickWeek + ' li').css({"margin-bottom": 30 + "px"});
		$('div.hoverExpand#' + clickWeek).css("padding-bottom", 30 + "px");
		$('ul#week.' + (clickWeek + 1)+ ' li').css({"margin-top": 0 + "px"});
		$('div.hoverExpand#' + (clickWeek + 1)).css("padding-top", 0 + "px");

		$('div.weekExpand#' + clickWeek +' div.weekPractice').empty();
		$('div.weekExpand#' + clickWeek +' div.weekPractice').append('<p class="weekPractice">Practice This Week:</p>');
		$('div.weekExpand#' + clickWeek +' div.weekClass').empty();
		$('div.weekExpand#' + clickWeek +' div.weekClass').append('<p class="weekClass">In Class This Week:</p>');
		
	  	$('div.weekExpand#' + clickWeek).slideUp(400, "swing", 0).delay(400);

	});


	//on click for adding information to date
	$('ul#week li').toggle(function(){
		//clear existing plans
		$('div.existingPlans').empty();
		$('div.addStuff').empty();

		//set header to selected date
		clickDate = $(this).text();


		$('h2#controlDate').text(clickDate);

		//make unselected dates transparent
		$('ul#week li').css("opacity", 0.1);
		$(this).css({"opacity": 1});
		$('p.dismissDate').css("opacity", 1);



		// search for existing plans on date selected
		for (i=0; i<= planDate.length; i++){
			if (planDate[i] == clickDate){
				$('div.existingPlans').append('<div class="editHover"><h4 class="' + planType[i] + '">' + planCat[i] + ':</h4><p class="plans">' + planNotes[i] + '</p><p class="edit">Edit</p></div>');
				
			}
		}
		//if there are no plans on a day, say so
		if ($('.existingPlans').contents().length == '' && clickDate == "1/16"){
			$('div.existingPlans').append('<p class="noPlans">No test requirements have been added.</p>');
		} else if ($('.existingPlans').contents().length == ''){
			$('div.existingPlans').append('<p class="noPlans">No plans.</p>');
		}

		// render practice button
		if ($(this).attr("id") == 'free' || $(this).attr("id") == 'practice' ) {
			$('div.addStuff').append('<p class="addPractice">ADD PRACTICE</p>');
		}

		// render request button
		if ($(this).attr("id") == 'class'){
			$('div.addStuff').append('<p class="submitRequest">SUBMIT REQUEST</p>');
		}

		// render requirements button
		if ($(this).attr("id") == 'test'){
			$('div.addStuff').append('<p class="testReq">ADD TEST REQUIREMENTS</p>');
		}


	},function(){
		//reset opacity
		$('ul#week li').css("opacity", 1);
		for (i=0; i< weekDay; i++){
		$('ul.week1 li').eq(i).css("opacity", 0.2);
		}

		
		
		//reset header and instructions
		$('h2#controlDate').text("SELECT DATE");
		$('p.dismissDate').css("opacity", 0);

		//clear existing plans
		$('div.existingPlans').empty();
		$('div.addStuff').empty();

	});


	// on click add practice
	$('p.addPractice').live('click', function(){
		$('div.addStuff').append(enterInfo);
		type = "practice";
	});

	
	// on click submit request
	$("p.submitRequest").live('click', function(){
		$('div.addStuff').append(enterInfo);
		type = "class";
	});

	
	// on click add requirements
	$("p.testReq").live('click', function(){
		$('div.addStuff').append(enterInfo);
		type = "test";
	});

	//submit information
	$('p.submit').live('click', function(){
		planDate.push(clickDate);
		planType.push(type);
		planCat.push($('select option:selected').val());
		planNotes.push($('input.calNotes').val());

		if ($('ul#week li:contains(' + clickDate + ')').attr("class") == "calendarDate"){
		$('ul#week li:contains(' + clickDate + ')').attr("class", "practice");
	}
		
		$('div.addStuff').empty();
		//reset opacity
		$('ul#week li').css("opacity", 1);
		for (i=0; i< weekDay; i++){
		$('ul.week1 li').eq(i).css("opacity", 0.2);
		}

		
		
		//reset header and instructions
		$('h2#controlDate').text("SELECT DATE");
		$('p.dismissDate').css("opacity", 0);

		//clear existing plans
		$('div.existingPlans').empty();
		$('div.addStuff').empty();


	});



});