



$(document).ready(function() {

	$("#add_new_item").click(function() {

		if( $(":input").val() == "" ) {
    		return false;
    	}

    	var x = "<li>";
    	x +=  $("#new_item").val();
    	x += "<button id=\"delete\">x</button>";
    	x += "<button id=\"add\">+</button>";
    	x += "</li>";	
    	$(x).fadeIn("slow").appendTo("#mylist")
	});

	$('#new_item').bind('keypress', function(e) {
		if(e.keyCode==13){
			var x = "<li>";
    		x +=  $("#new_item").val();
    		x += "<button id=\"delete\">x</button>";
    		x += "<button id=\"add\">+</button>";
    		x += "</li>";	
    		$(x).fadeIn("slow").appendTo("#mylist")
		}
});

/*
	$("#add").live('click',function() {
		var x = "<ul>";
		x += "<li>"
    	x +=  $("#new_item").val();
    	x += "<button id=\"delete\">x</button>";
    	x += "<button id=\"add\">+</button>";
    	x += "</li>"
    	x += "</ul>";	
    	$(x).fadeIn("slow").appendTo($(this).parent());
	});
*/
	$('#delete').live('click',function() {
		$(this).parent().fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
				$(this).remove()
			});
	});

	$('li').live('click',function() {
		if ($("li").is(':animated')) return false;

		if( $(this).hasClass('remove_me') ) {

			$(this).css("text-decoration","none");
			$(this).removeClass("remove_me")
		}
		else {
			$(this).css("text-decoration","line-through")
			$(this).attr('class',"remove_me")
		}
	});


	$("#remove_all_items").bind('click',function() {
		if ($(".remove_me").is(':animated')) return false;
			$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
				$('.remove_me').remove()
			});
	});

})

