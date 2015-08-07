$(function(){
	var menuStatus;
	
	$("a.showMenu").click(function(){
		if(menuStatus != true){				
			$(".ui-page-active").animate({
                marginLeft: "165px",}, 300, function() {
                    menuStatus = true; $("#menu").show();});
            
		  	return false;
		  } 
		  else {
              $("#menu").hide();
			$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false;});
              
			return false;
		  }
	});
 
	$('.pages').on("swipeleft",".ui-page-active", function(){
		if (menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
		  }
	});
	
	$('.pages').on("swiperight", ".ui-page-active", function(){
		if (!menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "165px",
		  }, 300, function(){menuStatus = true});
		  }
	});
	
	$("#menu li a").click(function(){
		var p = $(this).parent();
		if($(p).hasClass('active')){
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	});
		
});