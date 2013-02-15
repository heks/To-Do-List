	
	var currDataIterator = 0;
	var currData = [];
	var lists = ["listName0"];
	var remlists = ["remName0"];
	var currList = 0;
	var remlist = [];
$(document).ready(function() {

	//localStorage.clear()

	$("#new_item").attr("value", "Add item...");
	text = "Add item...";

	var i=0;

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
		console.log(remlist_temp)
		$.each(listValues,function(key,val){
			currData.push(val);
			if($.inArray(key,remlist_temp) != -1) {
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		}
    		currDataIterator=key+1;
   		 })
		$.each(remlist_temp,function(key,val){
			remlist[key] = parseInt(val);
		})
	}

    if(currList == 0) {
		$("#left_list").attr('disabled', 'disabled');
		$("#left_list").hide();
	}

    $("#left_list").live('click',function() {
      	localStorage.setItem(remlists[currList], JSON.stringify(remlist));

    	localStorage.setItem(lists[currList], JSON.stringify(currData));

    	currList--;
    	if(currList == 0) {
			$("#left_list").attr('disabled', 'disabled');
			$("#left_list").hide();
		}

		console.log(currList)
		if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			remlist = [];
			remlist_temp = JSON.parse(localStorage.getItem(remlists[currList]));
			$.each(remlist_temp,function(key,val){
				remlist[key] = parseInt(val);
			})
			currDataIterator=currData.length;
		} else {
			currData = [];
			remlist = [];
			currDataIterator=0;
		}
		console.log(remlist)
		$("#mylist li").remove()
		$.each(currData,function(key,val){
			if($.inArray(key,remlist) != -1) {
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").fadeIn('slow').appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").fadeIn('slow').appendTo("#mylist")
    		}    	
    	})
	});


	$("#right_list").live('click',function() { 
		$("#left_list").show();
		$("#left_list").removeAttr("disabled");

		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
		localStorage.setItem(lists[currList], JSON.stringify(currData));

		// make a new list element and store into array
		currList++;
		console.log(Object.size(lists))
		if(currList == Object.size(lists)) {
			remlists.push("remName"+currList);
			lists.push("listName"+currList);
		}
		console.log(currList);
		console.log(lists);


    	if(localStorage.getItem(lists[currList]) != null) {
			currData = JSON.parse(localStorage.getItem(lists[currList]));
			remlist = [];
			remlist_temp = JSON.parse(localStorage.getItem(remlists[currList]));
			$.each(remlist_temp,function(key,val){
				remlist[key] = parseInt(val);
			})			
			currDataIterator=currData.length;
		} else {
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

	Object.size = function(obj) {
    	var size = 0, key;
    	for (key in obj) {
        	if (obj.hasOwnProperty(key)) size++;
    	}
    	return size;
	};


})

