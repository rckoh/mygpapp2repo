//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init slide menu
var slideMenu = {
    
    initSlideMenu: function(){
        dbmanager.getProfile(function(returnData){
            if(returnData.rows.length==0){
                $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
                $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching-2.png' class='menuitemimg' />Business Matching</label></li>");
                $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing-2.png' class='menuitemimg' />Listings</label></li>");
//                $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
                $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
            }
            else{
                var roles=returnData.rows.item(0).role;
                var rolearr=roles.split(",");
                if(jQuery.inArray("7",rolearr)==1 || jQuery.inArray("6",rolearr)==1){    
                    $("#slidemenu").append("<li onclick='goProfile();'><label class='itemlabel'><img src='img/user-3.png' class='menuitemimg' />My Profile</label></li>");
                }
                $("#slidemenu").append("<li onclick='goFavourite();'><label class='itemlabel'><img src='img/fav.png' class='menuitemimg' />Favourites</label></li>");
                $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
                $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching-2.png' class='menuitemimg' />Business Matching</label></li>");
                $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing-2.png' class='menuitemimg' />Listings</label></li>");
                $("#slidemenu").append("<li onClick='initchangePwd();'><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
                $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
                $("#slidemenu").append("<li><label class='itemlabel' onclick='logoutOnclick();'><img src='img/logout.png' class='menuitemimg' />Logout</label></li>");
            }
        });
    },    
}




//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add slide menu event to control

$(function(){
	
	$("button.buttonbg").click(function(){
        
//        $(".filterFrame").animate({
//                marginLeft: "100%",
//              }, 300, function(){$(".filterFrame").css("margin-left", "-100%");
//        });
        
		if(menuStatus != true){	
            closefilter();
			$(".menubg").animate({
                marginLeft: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
			$(".menubg").animate({
			marginLeft: "-70%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
        }
});
    
function closefilter(){

    if (filtermenustatus==1) {
        $(".filterFrame").animate({
        marginLeft: "100%",
        }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
        filtermenustatus=0; 
        return false;
    }
            
}
    
//	$("body").on("swipeleft", function(){
//		if (menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "-70%",
//		  }, 300, function(){menuStatus = false});
//		  }
//	});
//	
//	$("body").on("swiperight", function(){
//		if (!menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "0%",
//		  }, 300, function(){menuStatus = true});
//		  }
//	});
//	
//	$("#menu li a").click(function(){
//		var p = $(this).parent();
//		if($(p).hasClass('active')){
//			$("#menu li").removeClass('active');
//		} else {
//			$("#menu li").removeClass('active');
//			$(p).addClass('active');
//		}
//	});
});

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//slide menu item onclick

function goBusinessMatching(){
	window.location = "businessMatchingPage.html";
}

function goTrending(){
	window.location = "index.html";
}

function goFavourite(){
	window.location = "favouritePage.html";
}

function goAbout(){
	window.location = "aboutPage.html";
}

function goListing(){
    window.localStorage.setItem("listingpagenumber", '1');
	window.location = "listingPage.html";
}

function goProfile(){
	window.location = "profilePage.html";
}

function logoutOnclick(){
    loading.startLoading();
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postLogout(token);
        }
        else{
            loading.endLoading();
        }
    });
}


//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//change password onclick
//var changepasswordOpened=0;

function initchangePwd(){
    $(".menubg").animate({
			marginLeft: "-70%",
		  }, 300, function(){menuStatus = false;});
    
    $(".app").prepend("<div class='changePwdFrame'></div>");
    $(".changePwdFrame").prepend("<div class='changePwdDiv'></div>");
//    $(".changePwdDiv").prepend("<div class='pwdActionFrame'></div>");
    $(".changePwdDiv").prepend("<div class='btnPwdTopSeperator'>&nbsp;</div>");
    $(".changePwdDiv").append("<label class='changePwdLbl'>Change Password</label>");
    $(".changePwdDiv").append("<input class='newPwd' placeholder='New password' type='password'></input>");
    $(".changePwdDiv").append("<input class='confirmPwd' placeholder='Confirm password' type='password'></input>");
    $(".changePwdDiv").append("<button class='btnChangePwdClose' onclick='closeChangePwd()'>Close</button>");
    $(".changePwdDiv").append("<button class='btnPwdSeperator'>|</button>");
    $(".changePwdDiv").append("<button class='btnChangePwd' onclick='changePwd()'>Submit</button>");
//    changepasswordOpened=1;
//    
//    if(keyevenadded==0){
//        $(document).keypress(function(e) {
//            var code = (e.keyCode ? e.keyCode : e.which);
//            if ( (code==13) || (code==10))
//            {
//                if(changepasswordOpened==1){
//                    $(".newPwd").blur();
//                    $(".confirmPwd").blur();
//                    changePwd();
//                }
//            }
//        });
//        keyevenadded=1;
//    }
    $(".confirmPwd").keypress(function(e) {
        
        var code = (e.keyCode ? e.keyCode : e.which);
            if ( (code==13) || (code==10))
            {
                $(".newPwd").blur();
                $(".confirmPwd").blur();
                changePwd();
            }
    });
    
    $(".newPwd").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if ( (code==13) || (code==10))
            {
                $(".newPwd").blur();
                $(".confirmPwd").blur();
                changePwd();
            }
    });
    
//    $(".pwdActionFrame").append("<table style='width:100%'><tr style='width:100%'><td style='width:45%;'><button class='btnChangePwdClose' onclick='closeChangePwd();'>Close</button></td><td style='width:10%; text-align:center;' class='buttonSeperator'>|</td><td style='width:45%'><button class='btnChangePwd' onclick='changePwd();'>Submit</button></td></tr></table>");
}

function closeChangePwd(){
    $(".app .changePwdFrame").remove();
    //changepasswordOpened=0;
}

function changePwd(){
    navigator.notification.confirm("Are you sure you want to change password?", onConfirmChangePwd, "Confirmation", "Yes,No");     
}

function onConfirmChangePwd(button){
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        dbmanager.getProfile(function(returnData){
            if(returnData.rows.length>0){
                var token=returnData.rows.item(0).token;
                var uid=returnData.rows.item(0).uid;
                var newPwd=$(".newPwd").val();
                var confirmPwd=$(".confirmPwd").val();
                var pattern = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(){}\\[\\]]).*$');


                if(newPwd==""){
                    navigator.notification.alert("Invalid password.", function(){}, "MDeC eSolution", "Ok");
                    $(".newPwd").focus();
                }
                else if(confirmPwd==""){
                    navigator.notification.alert("Invalid confirm password", function(){}, "MDeC eSolution", "Ok");
                    $(".confirmPwd").focus();
                }
                else if(!pattern.test(newPwd)){
                    navigator.notification.alert("password should contain at least one number, one alphabet and one special character.", function(){}, "MDeC eSolution", "Ok");
                }
                else if(newPwd.length<8){
                    navigator.notification.alert("Password must at least 8 characters.", function(){}, "MDeC eSolution", "Ok");
                    $(".newPwd").focus();
                }
                else if(confirmPwd!=newPwd){
                    navigator.notification.alert("Password not matching", function(){}, "MDeC eSolution", "Ok");
                    $(".confirmPwd").focus();
                }
                else{
                    loading.startLoading();
                    postChangePwd(token, uid, newPwd);
                }

            }
        });
    }
}





