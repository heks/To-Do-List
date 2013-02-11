
function sortmyway(data_A, data_B)
{
    return (data_B - data_A);
}
	
	var currDataIterator = 0;
	var currData = [];

$(document).ready(function() {
	var i=0;
	var lists = ["listName1", "listName2", "listName3"];
	var currList = 0;
	var remlist = [];
//	localStorage.clear();

	if(localStorage.getItem(lists[currList]) != null) {
		var listValues = JSON.parse(localStorage.getItem(lists[currList]));
		$.each(listValues,function(key,val){
			currData.push(val);
    		$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").fadeIn("fast").appendTo("#mylist")
    		currDataIterator=key+1;
   		 })
	}

	//for( i = 0; i < listValues.size(); i++) {
    //	$("#mylist").append("<li>" + listValues[i] + "<button id=\"delete\">x</button></li>");
    //}

	$("#add_new_item").click(function() {

		if( $(":input").val() == "" ) {
    		return false;
    	}
    	currData.push($("#new_item").val())
    	localStorage.setItem(lists[currList], JSON.stringify(currData));
    	$("<li id='"+currDataIterator+"'>" + currData[currDataIterator] + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    	currDataIterator++;

	});

	$('#delete').live('click',function() {
		if ($("li").is(':animated')) return false;
		
		$(this).parent().fadeTo(1000,0.1).animate({height:'toggle'},"fast",function(){
			var j = $(this).attr('id')
			console.log(currData.splice(j,1))
    		localStorage.setItem(lists[currList], JSON.stringify(currData));
    		$("#mylist li").remove()
    		$.each(currData,function(key,val){
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		})
		});
    		//setTimeout(function() {$(this).remove()}, 800);

	});

	$('#new_item').bind('keypress', function(e) {
		if(e.keyCode==13){
    		currData.push($("#new_item").val())
    		localStorage.setItem(lists[currList], JSON.stringify(currData));
    		$("<li id='"+currDataIterator+"'>" + currData[currDataIterator] + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    		currDataIterator++;
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


	$('li').live('click',function() {
		if ($("li").is(':animated')) return false;
		if( $(this).hasClass('remove_me') ) {
			var g = $(this).attr('id');
			remlist = jQuery.grep(remlist, function(value) {
 				return value != g;
			});
			console.log(remlist)
			$(this).css("text-decoration","none");
			$(this).removeClass("remove_me")
		}
		else {
			remlist.push(parseInt($(this).attr('id')))
			console.log(remlist)
			$(this).css("text-decoration","line-through")
			$(this).attr('class',"remove_me")
		}
	});


	$("#remove_all_items").bind('click',function() {
		if ($(".remove_me").is(':animated')) return false;
		$(".remove_me").fadeTo(1000,0.1).animate({height:'toggle'},"slow",function(){
			currData = jQuery.grep(currData, function(n, z) {
    			return jQuery.inArray(z, remlist) == -1;	
			});
    		localStorage.setItem(lists[currList], JSON.stringify(currData));
			$("#mylist li").remove()
    		$.each(currData,function(key,val){
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		})
    		currDataIterator = currData.length;
    		remlist = [];
		});
		//alert(localStorage.getItem("task-"+3))
	});

})

