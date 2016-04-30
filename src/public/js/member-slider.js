// Must make this into a promise. 
function createSlider() {
	var sliderHTML = "";

	for(var m = 0; m < members.length; m++) {
	    sliderHTML += "<div class='col-lg-4 col-sm-6'><a class='portfolio-box' href='#'>";
	    sliderHTML += "<img class='img-responsive' src='/static/img/portfolio/" + (m + 1) + ".jpg' alt='Member'>";
	    sliderHTML += "<div class='portfolio-box-caption'>";
	    sliderHTML += "<div class='portfolio-box-caption-content'>";
	    sliderHTML += "<div class='project-category.text-faded'>";
	    sliderHTML += members[m].role + "<br />" + members[m].firstName + " " + members[m].lastName + "</div>";
	    sliderHTML += "<div class='project-name'>";
	    sliderHTML += members[m].username + "<br />" + members[m].primCode + "</div>";
		sliderHTML += "</div></div></a></div>";
	}
	return sliderHTML;
}

$(document).ready(function(){
	$(createSlider()).appendTo('#member-slider'); // this works
});
