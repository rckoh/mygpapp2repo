var currentpage=1;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },
    
    initPushNotificationRegister: function(){
        var pushNotification = window.plugins.pushNotification;
        
        
        if ( device.platform == 'android' || device.platform == 'Android'){
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"227139393233","ecb":"app.onNotificationGCM"});
        } 
        else {
            pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }

    },
    
    // result contains any message sent from the plugin call
    successHandler: function(result) {
//        alert('Callback Success! Result = '+result);
    },
    
    errorHandler:function(error) {
//        alert(error);
    },
    
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
//                $("#redidtxtareas").val(e.regid);
                if ( e.regid.length > 0 )
                {
//                    console.log("Regid " + e.regid);
//                    alert('registration id = '+e.regid);
                    dbmanager.getProfile(function(returnData){
                        if(returnData.rows.length>0){
                            var uid=returnData.rows.item(0).uid;
                            var token=returnData.rows.item(0).token;
                            var regid=e.regid;
                            
                            postRegistrationId(uid, token, regid, "android"); 
                        }    
                    });
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
//              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
//              alert('GCM error = '+e.msg);
            break;
 
            default:
//              alert('An unknown GCM event has occurred');
              break;
        }
    },
    
    tokenHandler: function(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
//        alert('device token = ' + result);
//        $("#redidtxtareas").val(result);
        dbmanager.getProfile(function(returnData){
            if(returnData.rows.length>0){
                var uid=returnData.rows.item(0).uid;
                var token=returnData.rows.item(0).token;
                var regid=result;
                            
                postRegistrationId(uid, token, regid, "ios"); 
            }    
        });
    },
    
    onNotificationAPN: function(event) {
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
};

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//slide show
function slideshow(data){
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
    
    var imgname=document.getElementById("slideshowimage").src;
    
    if(imgname==imga){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgb);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgc);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[2].node.description+"</p>");
        });
    }
    
    if(imgname==imgc){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgd);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[3].node.description+"</p>");
        });
    }
    
    if(imgname==imgd){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imge);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[4].node.description+"</p>");
        });
    }
    
    if(imgname==imge){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imga);
        $(".slideshowimage").fadeIn(500);
        $(".slideshowimagenamediv h1").remove();
        $(".slideshowimagenamediv p").remove();
        $(".slideshowimagenamediv").append("<h1 class='slideshowitemtitle'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperator'>&nbsp;</p><p class='slideshowitemdetails'>"+data.nodes[0].node.description+"</p>");
        });
    }
}

function slideshowpagetwo(data){
    
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
//    if($(".slideshowimage").attr("src")=="img/loading.gif");
    
    var imgname=document.getElementById("slideshowimagepage2").src;

    if(imgname==imga){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgb);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgc);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[2].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgc){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imgd);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[3].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgd){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imge);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[4].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imge){
        $(".slideshowimagepage2").fadeOut(500, function() {
        $(".slideshowimagepage2").attr("src",imga);
        $(".slideshowimagepage2").fadeIn(500);
        $(".slideshowimagenamedivpage2 h1").remove();
        $(".slideshowimagenamedivpage2 p").remove();
        $(".slideshowimagenamedivpage2").append("<h1 class='slideshowitemtitlepage2'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage2'>&nbsp;</p><p class='slideshowitemdetailspage2'>"+data.nodes[0].node.description+"</p>");
        });
    }
}


function slideshowpagethree(data){
    
    var imga=data.nodes[0].node.background .src;
    var imgb=data.nodes[1].node.background .src;
    var imgc=data.nodes[2].node.background .src;
    var imgd=data.nodes[3].node.background .src;
    var imge=data.nodes[4].node.background .src;
//    if($(".slideshowimage").attr("src")=="img/loading.gif");
    
    var imgname=document.getElementById("slideshowimagepage3").src;

    if(imgname==imga){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgb);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[1].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[1].node.description+"</p>");});
    }
    
    if(imgname==imgb){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgc);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[2].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[2].node.description+"</p>");
        });
        
        
    }
    
    if(imgname==imgc){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imgd);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[3].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[3].node.description+"</p>");
        }); 
    }
    
    if(imgname==imgd){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imge);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[4].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[4].node.description+"</p>");
        });  
    }
    
    if(imgname==imge){
        $(".slideshowimagepage3").fadeOut(500, function() {
        $(".slideshowimagepage3").attr("src",imga);
        $(".slideshowimagepage3").fadeIn(500);
        $(".slideshowimagenamedivpage3 h1").remove();
        $(".slideshowimagenamedivpage3 p").remove();
        $(".slideshowimagenamedivpage3").append("<h1 class='slideshowitemtitlepage3'>"+data.nodes[0].node.title+"</h1><p class='slideshowitemseperatorpage3'>&nbsp;</p><p class='slideshowitemdetailspage3'>"+data.nodes[0].node.description+"</p>");
        });
    }
}

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//submenu
function initsubmenustyle(){
    currentpage=1;
    $("#btnFeatured").css("color", "#FFFFFF");
}

function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        $(".pageone").show();
        $(".pagetwo").hide();
        $(".pagethree").hide();
        $("#btnFeatured").css("color", "#FFFFFF");
        $("#btnLatestPost").css("color", "#BDBDBD");
        $("#btnAnnouncement").css("color", "#BDBDBD");
        
        if(currentpage>pagenumber){
            $(".pageone").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pageone").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "0%",}, 300, function() {currentpage=1;});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "200%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        getFeaturedList();
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
        $(".pageone").hide();
        $(".pagetwo").show();
        $(".pagethree").hide();
        $("#btnFeatured").css("color", "#BDBDBD");
        $("#btnLatestPost").css("color", "#FFFFFF");
        $("#btnAnnouncement").css("color", "#BDBDBD");
        
        if(currentpage>pagenumber){
            $(".pagetwo").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagetwo").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "-100%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "0%",}, 300, function() {currentpage=2;});
        $(".pagethree").animate({
                marginLeft: "100%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        getLatestPostList();
    }
    
    if(pagenumber==3 && currentpage!=pagenumber){
        $(".pageone").hide();
        $(".pagetwo").hide();
        $(".pagethree").show();
        $("#btnFeatured").css("color", "#BDBDBD");
        $("#btnLatestPost").css("color", "#BDBDBD");
        $("#btnAnnouncement").css("color", "#FFFFFF");
        
        
        if(currentpage>pagenumber){
            $(".pagethree").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagethree").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "200%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "0%",}, 300, function() {currentpage=3;});
        
        $(".selectedItem").animate({
                marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        getAnnouncementList();
    }
}

function pageSwipeLeft(){
    if(!menuStatus){
        if(currentpage==1){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#BDBDBD");
            $("#btnLatestPost").css("color", "#FFFFFF");
            $("#btnAnnouncement").css("color", "#BDBDBD");

            $(".pagetwo").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
            getLatestPostList();
        }
        else if(currentpage==2){
             $(".pageone").hide();
            $(".pagetwo").hide();
            $(".pagethree").show();
            $("#btnFeatured").css("color", "#BDBDBD");
            $("#btnLatestPost").css("color", "#BDBDBD");
            $("#btnAnnouncement").css("color", "#FFFFFF");

            $(".pagethree").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "200%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=3;});

            $(".selectedItem").animate({
                    marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
            
            getAnnouncementList();
        }    
    }
    else{
    	$("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-70%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}

function pageSwipeRight(){
    
    if(!menuStatus){
        if(currentpage==3){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#BDBDBD");
            $("#btnLatestPost").css("color", "#FFFFFF");
            $("#btnAnnouncement").css("color", "#BDBDBD");

            $(".pagetwo").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
            getLatestPostList();
        }
        else if(currentpage==2){
            $(".pageone").show();
            $(".pagetwo").hide();
            $(".pagethree").hide();
            $("#btnFeatured").css("color", "#FFFFFF");
            $("#btnLatestPost").css("color", "#BDBDBD");
            $("#btnAnnouncement").css("color", "#BDBDBD");

            $(".pageone").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "200%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
            
            getFeaturedList();
        }
    }
}


//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//login button 
function initLoginButton(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length==0)
            $(".app").prepend("<div class='pagefooter' onclick='goLogin();'>Login</div>");
    });
}




