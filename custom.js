	
	var currDataIterator = 0;
	var currData = [];
	var lists = ["listName0"];
	var remlists = ["remName0"];
	var titlearray = ["Set List"];
	var currList = 0;
	var currTitle = ""
	var remlist = [];
$(document).ready(function() {

	localStorage.clear()

	$("#new_item").attr("value", "Add item...");
	text = "Add item...";

	var i=0;

    $("#input_title").live('click',function() {
    	$("#input_title").remove()
    	$("h1").append("<input type=\"text\" id=\"input_title\" />");
    	$("h1 #input_title").trigger('focus');


	});
/*
    $("#input_title").live('focus',function() {
		if(e.keyCode==13) {
			if( $("#input_title").val() == "") {
    			return false;
    		}
    	currData.push($("#input_title").val())
    	localStorage.setItem(lists[currList], JSON.stringify(currData));
    	$("<li id='"+currDataIterator+"'>" + currData[currDataIterator] + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    	currDataIterator++;
		$("#new_item").attr("value", text);	// reset the input field


		//	titlearray[currList] = ;
		}
    });
*/
	$("#input_title").live( 'focus', function() {
	//		alert("hello")
	
		$("#input_title").bind('keypress', function(e) {
			if(e.keyCode==13) {
				if( $("#input_title").val() == "") {
    				return false;
    			}
    			titlearray[currList] = $("#input_title").val();
    			currTitle = $("#input_title").val();
      			localStorage.setItem(titlearray[currList], JSON.stringify($("#input_title").val()));
    			$("#input_title").remove()
    			$("h1").append("<div id=\"input_title\">" + currTitle + "</div>" ).fadeIn('fast');
    		}
		})
	});

	$("#new_item").blur(function() {
		$(this).removeClass("active");
		if($(this).attr("value") == "") $(this).attr("value", text);
	});

	$("#new_item").focus(function() {
		$(this).addClass("active");
		if($(this).attr("value") == text) $(this).attr("value", "");
	});

	if(localStorage.getItem(lists[currList]) != null) {
		$("#mylist li").remove()
		var listValues = JSON.parse(localStorage.getItem(lists[currList]));
		var remlist_temp = JSON.parse(localStorage.getItem(remlists[currList]));
		var currTitle_temp = JSON.parse(localStorage.getItem(titlearray[currList]));
		console.log(currTitle_temp)
		$.each(listValues,function(key,val){
			currData.push(val);
			if($.inArray(key,remlist_temp) != -1) {
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		}
    		currDataIterator=key+1;
   		 }) 
		if(remlist_temp != null) {
			$.each(remlist_temp,function(key,val){
				remlist[key] = parseInt(val);
			})
		}
		$("#input_title").remove()
    	$("h1").append("<div id=\"input_title\">" + currTitle_temp + "</div>" ).fadeIn('fast');

	}

    if(currList == 0) {
		$("#left_list").attr('disabled', 'disabled');
		$("#left_list").hide();
	}

    $("#left_list").live('click',function() {
      	localStorage.setItem(remlists[currList], JSON.stringify(remlist));
      	localStorage.setItem(titlearray[currList], JSON.stringify(currTitle));
    	localStorage.setItem(lists[currList], JSON.stringify(currData));

    	currList--;
    	if(currList == 0) {
			$("#left_list").attr('disabled', 'disabled');
			$("#left_list").hide();
		}

		if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			currTitle = JSON.parse(localStorage.getItem(titlearray[currList]));
			remlist = [];
			remlist_temp = JSON.parse(localStorage.getItem(remlists[currList]));
			$.each(remlist_temp,function(key,val){
				remlist[key] = parseInt(val);
			})
			currDataIterator=currData.length;
		} else {
			currTitle = "Set Title";
			currData = [];
			remlist = [];
			currDataIterator=0;
		}
		console.log(currTitle)
		$("#mylist li").remove()
		$.each(currData,function(key,val){
			if($.inArray(key,remlist) != -1) {
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").fadeIn('slow').appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").fadeIn('slow').appendTo("#mylist")
    		}    	
    	})
    	$("#input_title").remove()
    	$("h1").append("<div id=\"input_title\">" + currTitle + "</div>" ).fadeIn('fast');

	});
	

	$("#right_list").live('click',function() { 
		$("#left_list").show();
		$("#left_list").removeAttr("disabled");

		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
		localStorage.setItem(lists[currList], JSON.stringify(currData));
      	localStorage.setItem(titlearray[currList], JSON.stringify(currTitle));

		// make a new list element and store into array
		currList++;
		console.log(Object.size(lists))
		if(currList == Object.size(lists)) {
			remlists.push("remName"+currList);
			lists.push("listName"+currList);
			titlearray.push("Set List")
		}


    	if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			remlist = [];
			remlist_temp = JSON.parse(localStorage.getItem(remlists[currList]));
			currTitle = JSON.parse(localStorage.getItem(titlearray[currList]));
			$.each(remlist_temp,function(key,val){
				remlist[key] = parseInt(val);
			})			
			currDataIterator=currData.length;
		} else {
			currTitle = "Set Title";
			currData = [];
			remlist = [];
			currDataIterator=0;
		}
		//console.log(remlist)
		$("#mylist li").remove()
		$.each(currData,function(key,val){
			if($.inArray(key,remlist) != -1) {
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").fadeIn('slow').appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").fadeIn('slow').appendTo("#mylist")
    		}    	
    	})
    	 $("#input_title").remove()
    	$("h1").append("<div id=\"input_title\">" + currTitle + "</div>" ).fadeIn('fast');
	});

	$("#add_new_item").click(function() {

		if( $("#new_item").val() == "" || $("#new_item").val() == text ) {
    		return false;
    	}
    	currData.push($("#new_item").val())
    	localStorage.setItem(lists[currList], JSON.stringify(currData));
    	$("<li id='"+currDataIterator+"'>" + currData[currDataIterator] + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    	currDataIterator++;
		$("#new_item").attr("value", text);	// reset the input field
	});

	$('#delete').live('click',function() {
		if ($("li").is(':animated')) return false;
		
		$(this).parent().fadeTo(1000,0.1).animate({height:'toggle'},"fast",function(){
			var j = parseInt($(this).attr('id'))

			currData.splice(j,1)

			if($.inArray(j,remlist) != -1) {
					remlist = $.grep(remlist, function(value) {
					return j != value;
				});
			}
			$.each(remlist,function(key,val) {
				if(val > j) {
					remlist[key] = val-1;
				} 
			})

    		localStorage.setItem(lists[currList], JSON.stringify(currData));
    		localStorage.setItem(remlists[currList], JSON.stringify(remlist));

    		$("#mylist li").remove()
    		$.each(currData,function(key,val){
    			if($.inArray(key,remlist) != -1) {
    				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").appendTo("#mylist")
    			} else {
    				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    			}
    		})
    		currDataIterator = currData.length;
		});
    		//setTimeout(function() {$(this).remove()}, 800);

	});

	$('#new_item').bind('keypress', function(e) {
		if(e.keyCode==13){
			if( $("#new_item").val() == "" ) {
    			return false;
    		}
    		currData.push($("#new_item").val())
    		localStorage.setItem(lists[currList], JSON.stringify(currData));
    		$("<li id='"+currDataIterator+"'>" + currData[currDataIterator] + "<button id=\"delete\">x</button></li>").fadeIn("fast").appendTo("#mylist")
    		currDataIterator++;
    		$("#new_item").attr("value", "");	// reset the input field
		}
	});

	$('li').live('click',function() {
		if ($("li").is(':animated')) return false;
		if( $(this).hasClass('remove_me') ) {
			var g = parseInt($(this).attr('id'));
			remlist = jQuery.grep(remlist, function(value) {
 				return value != g;
			});
			localStorage.setItem(remlists[currList], JSON.stringify(remlist));
			$(this).css("text-decoration","none");
			$(this).removeClass("remove_me")
		}
		else {
			remlist.push(parseInt($(this).attr('id')))
    		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
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
    		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
    //		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
		});
		//alert(localStorage.getItem("task-"+3))
	});

	/* helper function to find the size of an arraym */
	Object.size = function(obj) {
    	var size = 0, key;
    	for (key in obj) {
        	if (obj.hasOwnProperty(key)) size++;
    	}
    	return size;
	};


})

