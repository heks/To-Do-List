$(document).ready(function() {




	$("#add_new_item").click(function() {

    	var x = $("#new_item").val() 

    	var test = $('<button/>',
    	{
        	text: 'Remove',
        	click: function () { alert('hi'); }
    	});

    	//var y = $("<input type="button" id="remove_item" value="Remove" </button>").val(); 
    	$("<li>" + x + "</li>").appendTo("#mylist")


	});
 
	$('li').live('click',function() {
		$(this).css("text-decoration","line-through");
	});


	$("#remove_all_items").click(function() {
		$("#mylist").empty();
	});

})

