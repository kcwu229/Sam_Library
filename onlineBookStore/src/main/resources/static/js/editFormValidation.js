// If date exised & date > 1 year, then book field cannot be changed
function dateValidate() {
  	  
  	var checkDate = document.getElementById("date").value;  // Date form
  	var disableTitle = document.getElementById("title");
  		
  	// Jpa Date function
  	var dateToNumberofDays = new Date(checkDate);  // String to date obj.
  	var currentDate = new Date();  // current date
  	
  	// GetTime() use millisecond -->  convert second first 
  	// Back Ground Color -- Grey if disable
  	var diff = (currentDate.getTime() - dateToNumberofDays.getTime())*0.001;
  		
  	// if > 1 year, disable title column
  	if (Number(diff) > 31536000) {  
	  	disableTitle.disabled = true;
	  	disableTitle.style.backgroundColor = "rgb(187, 221, 243)";
  	}
  		
  	else {
  		disableTitle.disabled = false;
  	}
  }

// Storing data into localStorage, if confirm change and save, then commit and edit.
// Otherwise, temporary store the changes 
function requestJson() {	
		
	// Setting variables
  	var id = document.getElementById("id").value;
  	var title = document.getElementById("title").value;
  	var author = document.getElementById("author").value;
  	var date = document.getElementById("date").value;
  	var publisher = document.getElementById("publisher").value;
  	var summary = document.getElementById("summary").value;
  	
  	
  	// Getting the value from the soldOut (radio button)
  	if (document.getElementById("soldOut1").checked) {
		var soldOut = document.getElementById("soldOut1").value;
		}
		
	else {
		var soldOut = document.getElementById("soldOut2").value;
	}
  	
  	var box = [];
  	var finalResult = [];

  	// If save => save in localStorage
  	// Check format
  	
  	var regEx = /^\d{4}-\d{2}-\d{2}$/;   // Date format rule: YYYY-MM-DD
	var dateCheck = document.getElementById('date').value; 
	var dateCheck_toDate = new Date(dateCheck);  // Date string to date object
	
	var currentDate = Date.now(); // current date
	
	// Check format
	if(!dateCheck.match(regEx) &&　dateCheck != "") {
		dateCheck = "";
		document.getElementById("dateMsg").innerHTML = "Invalid date. Please follow the format YYYY-MM-DD";
		document.getElementById("dateMsg").style.color = "red";
		return false;
	}

	// Check logic
	else if ((dateCheck_toDate > currentDate || dateCheck_toDate == "Invalid Date") && dateCheck != ""){
		document.getElementById("dateMsg").innerHTML = "Invalid date: Published day should be smaller than today. ";
		document.getElementById("dateMsg").style.color = "red";
		return false;
	} 

	if (confirm("Save your work ?") ) {	
		var bookInfo = `${id}, ${title}, ${author}, ${date}, ${publisher}, ${summary}, ${soldOut}`;
			
		localStorage.setItem(id, bookInfo);
	
		// If commit save => Post and clear localStorage
		if (confirm("Commit your save now ?")) {
	
			for (var i = 0; i < localStorage.length; i++) {
								
				let stringsArray = localStorage.getItem(localStorage.key(i)).split(",")

				finalResult[i] = `Item ${i}` +
								 `  \nid:  ${stringsArray[0]},\ntitle:  ${stringsArray[1]},\nauthor:  ${stringsArray[2]}` +
						         `  \ndate:  ${stringsArray[3]},\npublisher:  ${stringsArray[4]},\nsummary:  ${stringsArray[5]}` +
						         `  \nsoldOut:  ${stringsArray[6]}\n\n`;

				box[i] = localStorage.getItem(localStorage.key(i));
				
				}
					
			  alert(finalResult.length + "changes has(have) made:\n\n" + finalResult.toString() + "");
			  						
			  $.ajax({ 
				url:"localStorage_",    
				type:"POST", 
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
			    data: box.toString(),
					
				//Very important **************
		        async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
				cache: false,    //This will force requested pages not to be cached by the browser  
				processData:false,         
				// *************
				    
	        	success: function (resposeJsonObject) {
		            		//
					}
				}); 
				localStorage.clear();
			} 
		 	
			else {
				history.back();
			    return false;
				 }
			}
			
	else {	
			history.back();
			return false;
		}
	}



// If edited form has record in localStorage, retrieve that record
function checkLocalStorage() {
	if (localStorage.length > 0) {
		var bookID = document.getElementById("id").value;
		if (bookID in localStorage) {
			var result = localStorage.getItem(bookID);
				
			let strings = result.split(",");
			
			document.getElementById("title").value = strings[1].trim();
			document.getElementById("author").value = strings[2].trim();
			document.getElementById("date").value = strings[3].trim();
			document.getElementById("publisher").value = strings[4].trim();
			document.getElementById("summary").value = strings[5].trim();
			
			if (document.getElementById("soldOut1").value === strings[6].trim()) {
				document.getElementById("soldOut1").checked = true;
		}
		
			else {
					document.getElementById("soldOut2").checked = true;
				}
		}
	}
}

