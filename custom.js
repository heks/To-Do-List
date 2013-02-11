	
	var currDataIterator = 0;
	var currData = [];
	var lists = ["listName1", "listName2", "listName3"];
	var currList = 0;
	var remlist = [];
$(document).ready(function() {
	var i=0;

//	localStorage.clear();

	if(localStorage.getItem(lists[currList]) != null) {
		$("#mylist li").remove()
		var listValues = JSON.parse(localStorage.getItem(lists[currList]));
		console.log(listValues)
		$.each(listValues,function(key,val){
			currData.push(val);
    		$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").fadeIn("fast").appendTo("#mylist")
    		currDataIterator=key+1;
   		 })
	}

	//for( i = 0; i < listValues.size(); i++) {
    //	$("#mylist").append("<li>" + listValues[i] + "<button id=\"delete\">x</button></li>");
    //}

    $("#left_list").live('click',function() {

    	localStorage.setItem(lists[currList], JSON.stringify(currData));
    	if(currList == 0) {
			currList = 1;
			$("#left_list").off()
			$("#right_list").on()
    	} else if(currList == 2) {
    		currList = 0;
    		$("#left_list").on()
    		$("#right_list").on()
    	}
    	else {
			$("#left_list").off()
    		$("#right_list").on()
    		return;
    	}
		if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			currDataIterator=currData.length;
		} else {
			currData = [];
			currDataIterator=0;
		}
		console.log(currData)
		$("#mylist li").remove()

			$.each(currData,function(key,val){
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		})
	});


	$("#right_list").live('click',function() {    		
		localStorage.setItem(lists[currList], JSON.stringify(currData));
		if(currList == 0) {
			currList = 2;
			$("#right_list").off()
			$("#left_list").on()
    	} else if (currList == 1) {
    		currList = 0;
    		$("#right_list").on()
    		$("#left_list").on()
    	} else {
    		$("#right_list").off()
    		$("#left_list").on()
    		return;
    	}

    	if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			currDataIterator=currData.length;
		} else {
			currData = [];
			currDataIterator=0;
		}
		console.log(currData)
		$("#mylist li").remove()
		$.each(currData,function(key,val){
    		$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    	})

	});

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

