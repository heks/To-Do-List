	
	var currDataIterator = 0;
	var currData = [];
	var lists = ["listName0","listName1", "listName2", "listName3", "listName4", "listName5", "listName6", "listName7", "listName8", "listName9", "listName10"];
	var remlists = ["remName0","remName1", "remName2", "remName3", "remName4", "remName5", "remName6", "remName7", "remName8", "remName9", "remName10"];
	var currList = 5;
	var remlist = [];
$(document).ready(function() {
	var i=0;

	//localStorage.clear();

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
		console.log(remlist)
	}

	//for( i = 0; i < listValues.size(); i++) {
    //	$("#mylist").append("<li>" + listValues[i] + "<button id=\"delete\">x</button></li>");
    //}

    $("#left_list").live('click',function() {
      	localStorage.setItem(remlists[currList], JSON.stringify(remlist));

    	localStorage.setItem(lists[currList], JSON.stringify(currData));
    	if(currList == 0) {
			currList = 10;
    	} else {
    		currList = currList-1;
    	}
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
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		}    	
    	})
	});


	$("#right_list").live('click',function() { 
		localStorage.setItem(remlists[currList], JSON.stringify(remlist));
		localStorage.setItem(lists[currList], JSON.stringify(currData));
		if(currList == 10) {
			currList = 0;
    	} else {
    		currList = currList+1;
    	}

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
				$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").attr('class',"remove_me").css("text-decoration","line-through").appendTo("#mylist")
			} else {
    			$("<li id='"+key+"'>" + val + "<button id=\"delete\" value=\"x\">x</button>" + "</li>").appendTo("#mylist")
    		}    	
    	})

	});

	$("#add_new_item").click(function() {

		if( $("#new_item").val() == "" ) {
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

})

