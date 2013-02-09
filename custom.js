$(document).ready(function() {




	$("#add_new_item").click(function() {

    	var x = $("#new_item").val() 

    	var test = $('<button/>',
    	{
        	text: 'Remove',
        	click: function () { alert('hi'); }
    	});

    	//var y = $("<input type="button" id="remove_item" value="Remove" </button>").val(); 
    	$("<li>" + x + "</li>").appendTo("#mylist").fadeIn("slow")


	});
 
	$('li').live('click',function() {
		if( $(this).hasClass('remove_me') ) {
			$(this).css("text-decoration","none");
			$(this).removeClass("remove_me")
		}
		else {
			$(this).css("text-decoration","line-through")
			$(this).attr('class',"remove_me")
		}
	});


	$("#remove_all_items").click(function() {
		//var x = $('#mylist').filter('text-decoration','line-through')
		$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow")

		setTimeout(function() {
			$('.remove_me').remove(); }, 4000);
	});

})

