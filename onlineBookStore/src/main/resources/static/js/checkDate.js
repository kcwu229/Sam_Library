function validate() { 
	
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

}
