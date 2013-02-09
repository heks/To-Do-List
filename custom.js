$(document).ready(function() {


	$("#add_new_item").click(function() {
    	var x = $("#new_item").val() 
    	$("<li>" + x + "</li>").appendTo("#mylist")
	});


	$("#remove_all_items").click(function() {
		$("#mylist").empty();
	});

})

