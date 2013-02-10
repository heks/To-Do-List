function remove_list_item()
{
	if ($(".remove_me").is(':animated')) return false;
		//var x = $('#mylist').filter('text-decoration','line-through')
		//setTimeout(function () {
			$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
				$('.remove_me').remove()});
}

$(document).ready(function() {
	$("#add_new_item").click(function() {

		
    	var x = "<li>";
    	x +=  $("#new_item").val();
    	x += "<button id=\"delete\">X</button>";
    	x += "</li>";	
    	$(x).fadeIn("slow").appendTo("#mylist")

//.attr("id","list_item" + i++)

    	//var y = $('#new_item').append('<input type="button" id="remove_item" value="My button">').button() // Add a click handler
		//$('#selector') // Replace this selector with one suitable for you
		//.append('<input type="button" value="My button">') // Create the element
		//.button() // Ask jQuery UI to buttonize it
		//.click(function(){ alert('I was clicked!');}); // Add a click handler

    	//var y = $("<input type="button" id="remove_item" value="Remove" </button>").val(); 
    	//$(x).fadeIn("slow").appendTo("#mylist")
	});

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
		//var x = $('#mylist').filter('text-decoration','line-through')
		//setTimeout(function () {
			$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
				$('.remove_me').remove()
			});
				//},500)

		//setTimeout(function() {
		//	$('.remove_me').remove(); }, 3000)
		
	});

})

