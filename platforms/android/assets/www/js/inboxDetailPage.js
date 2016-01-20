
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
    }
};


function pageSwipeLeft(){
    if(menuStatus){
        $("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-70%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}


function clearSearch(){
    $("#searchTextBox").val("");
}dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            postInboxMessageContent(token, uid, "3");
//            $(".profileImg").attr("src", profileImg);
//            $("#lblUSername").text(returnData.rows.item(0).name);
            
//            postCompanyProfile(companyid, token);
//            postInboxMessageList(token, uid, "2");
        }
    });

function back(){
    window.history.back();
}

function initMessageContent(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var mid=getUrlParameter("mid");
            
            postInboxMessageContent(token, uid, "3", mid);
        }
    });
}

function deleteMsg(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var mid=getUrlParameter("mid");
            loading.startLoading();
            postInboxMessageDelete(token, uid, "6", mid);
        }
    });
}

var textboxDisplay=0;

function replyOnClick(){
    if(textboxDisplay==0){
        $(".messageDiv").show();
        textboxDisplay=1;
    }
    else if(textboxDisplay==1)
    {
        $(".messageDiv").hide();
        textboxDisplay=0;
    }
    else{
        $(".messageDiv").show();
        textboxDisplay=1;
    }
}

function submitReplyMessage(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var mid=getUrlParameter("mid");
            var message=$(".replyMessageInput").val();
            
            loading.startLoading();
            postInboxMessageReply(token, uid, "5", mid, encode4HTML(message));
        }
    });
}
                         
var maxpage;
var currentpage;
var page;

function initpaging(){
    var paging=getUrlParameter("paging");
    var mid=getUrlParameter("mid");
    page=paging.split(",");
    
    maxpage=page.length-1;
    
    for(var x=0; x<=maxpage ; x++){
        if(page[x]==mid)
            currentpage=x;
    }
    
    
    if(currentpage==maxpage){
            $(".previousBtn").hide();
    }
    
    if(currentpage==0){
            $(".nextBtn").hide();
    }
}

function nextpage(){
    if(currentpage!=0){
        $(".scrollul li").remove();  
        var mid=page[currentpage-1];
        currentpage=currentpage-1;
        reloadContent(mid);
        
        if(currentpage==0){
            $(".nextBtn").hide();
            $(".previousBtn").show();
        }
        else{
            $(".nextBtn").show();
            $(".previousBtn").show();
        }
    }
    
}

function previouspage(){
    if(currentpage!=maxpage){
        $(".scrollul li").remove();  
        var mid=page[currentpage+1];
        currentpage=currentpage+1;
        reloadContent(mid);
        
        if(currentpage==maxpage){
            $(".previousBtn").hide();
            $(".nextBtn").show();
        }
        else{
            $(".nextBtn").show();
            $(".previousBtn").show();
        }
    }
    
}

function reloadContent(mid){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            postInboxMessageContent(token, uid, "3", mid);
        }
    });
}