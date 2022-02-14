function validate() { 
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;   // Date format rule: YYYY-MM-DD
	var dateCheck = document.getElementById('birthYear').value; 
	var dateCheck_toDate = new Date(dateCheck);  // Date string to date object
	
	var currentDate = Date.now(); // current date
	
	
	// Check format
	if(!dateCheck.match(regEx) &&　dateCheck != "") {
		document.getElementById("birthYearMsg").innerHTML = "Invalid date. Please follow the format YYYY-MM-DD";
		document.getElementById("birthYearMsg").style.color = "red";
		return false;
	}

	// Check logic
	else if ((dateCheck_toDate > currentDate || dateCheck_toDate == "Invalid Date") && dateCheck != ""){
		document.getElementById("birthYearMsg").innerHTML = "Invalid date: Published day should be smaller than today. ";
		document.getElementById("birthYearMsg").style.color = "red";
		return false;
	} 
}
