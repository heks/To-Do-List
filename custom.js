$(document).ready(function() {




	$("#add_new_item").click(function() {

    	var x = $("#new_item").val() 

    	var test = $('<button/>',
    	{
        	text: 'Remove',
        	click: function () { alert('hi'); }
    	});

    	//var y = $("<input type="button" id="remove_item" value="Remove" </button>").val(); 
    	$("<li>" + x + "</li>").fadeIn("slow").appendTo("#mylist")


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
		//var x = $('#mylist').filter('text-decoration','line-through')
		//setTimeout(function () {
			$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
				$('.remove_me').remove()});
				//},500)

		//setTimeout(function() {
		//	$('.remove_me').remove(); }, 3000)
		
	});

})

