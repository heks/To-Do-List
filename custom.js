



$(document).ready(function() {

	var i=0;

	for( i = 0; i < localStorage.length; i++) {
		if(localStorage.getItem("task-"+i))
    		$("#mylist").append("<li id='task-"+i+"'>" + localStorage.getItem("task-"+i) + "<button id=\"delete\">x</button></li>");
    }

	$("#add_new_item").click(function() {

		if( $(":input").val() == "" ) {
    		return false;
    	}
    	localStorage.setItem( "task-"+i, $("#new_item").val() );
    	$("<li id='task-"+i+"'>" + localStorage.getItem("task-"+i) + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    	 i++;

	});

	$('#new_item').bind('keypress', function(e) {
		if(e.keyCode==13){
    		localStorage.setItem( "task-"+i, $("#new_item").val() );
    		$("<li id='task-"+i+"'>" + localStorage.getItem("task-"+i) + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    		i++;
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
		if ($("li").is(':animated')) return false;
		
		$(this).parent().fadeTo(1000,0.1).animate({height:'toggle'},"fast",function(){
			localStorage.removeItem($(this).attr("id"))
    		for(i=0; i<localStorage.length; i++) {
      			if( !localStorage.getItem("task-"+i)) {
        		localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1) ) );
        		localStorage.removeItem('task-'+ (i+1) );
      			}
      		}	
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
		for(i=0;i < localStorage.length; i++) {
			if($(".remove_me").attr("id"));
				alert($(".remove_me").attr("id"))
				localStorage.removeItem($(".remove_me").attr("id"))

		}
		//alert(x);
		//for(i=0; i<localStorage.length; i++) {
      	//		if( !localStorage.getItem("task-"+i)) {
        //		localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1) ) );
        //		localStorage.removeItem('task-'+ (i+1) );
      	//		}
      	//	}	

		$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
			$('.remove_me').remove()
		});
		//alert(localStorage.getItem("task-"+3))
	});

})

