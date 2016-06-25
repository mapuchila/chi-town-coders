
// Replace the <textarea id="post"> with a CKEditor
// instance, using default configuration.
	$(document).ready(function() {

		if(document.getElementById('title').value === 'undefined') {
			document.getElementById('title').value = '';
		}

		CKEDITOR.replace( 'post' );
	});

/*
Getting CKEDITOR instance

CKEDITOR.instances is an object as declared in core/ckeditor.js line 22, so I run a foreach loop to determine it's methods and properties:

var myinstances = [];

//this is the foreach loop
for(var i in CKEDITOR.instances) {

   // this  returns each instance as object try it with alert(CKEDITOR.instances[i]) 
    CKEDITOR.instances[i]; 
   
    // this returns the names of the textareas/id of the instances. 
    CKEDITOR.instances[i].name;

    // returns the initial value of the textarea 
    CKEDITOR.instances[i].value;  
 
   // this updates the value of the textarea from the CK instances.. 
   CKEDITOR.instances[i].updateElement();

   	// this retrieve the data of each instances and store it into an associative array with
    //   the names of the textareas as keys... 
   myinstances[CKEDITOR.instances[i].name] = CKEDITOR.instances[i].getData(); 

} */