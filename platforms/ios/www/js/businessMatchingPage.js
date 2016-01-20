
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
    }
};


function initsubmenustyle(){
    currentpage=1;
    $("#btnProduct").css("color", "#ffffff");
}

function pageSwipeLeft(){
    if(!menuStatus){
        if(currentpage==1){
            $(".pageone").hide();
            $(".pagetwo").show();
            $("#btnProduct").css("color", "#bdbdbd");
            $("#btnServices").css("color", "#ffffff");

            $(".pagetwo").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});

            $(".selectedItem").animate({
                    marginLeft: "33%",}, 300, function() {});
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

function changepage(pagenumber){    
    if(pagenumber==1){
        $(".pageone").show();
        $(".pagetwo").hide();
        $("#btnProduct").css("color", "#ffffff");
        $("#btnServices").css("color", "#bdbdbd");
        
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
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {});
    }
    
    if(pagenumber==2){
        $(".pageone").hide();
        $(".pagetwo").show();
        $("#btnProduct").css("color", "#bdbdbd");
        $("#btnServices").css("color", "#ffffff");
        
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
        
        $(".selectedItem").animate({
                marginLeft: "33.67%",}, 300, function() {});
    }
}

function pageSwipeRight(){
    
    if(currentpage==2){
            $(".pageone").show();
            $(".pagetwo").hide();
            $("#btnProduct").css("color", "#ffffff");
            $("#btnServices").css("color", "#bdbdbd");

            $(".pageone").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {});
        }
}

function initSearchCriteria(searchType){
    loading.startLoading();
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            if(searchType=="product")
                postBMProductFilterCriteria(token);
            else
                postBMServiceFilterCriteria(token);
        }
        else{
            var token="";
            if(searchType=="product")
                postBMProductFilterCriteria(token, "0");
            else
                postBMServiceFilterCriteria(token, "0");
        }   
    });
}

function initLVMProduct(){
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            postLVMProductList(token, uid);   
            postBMInitProductList(token, uid);
            postBMInitCriteriaValue(token, uid);
        }
    });
        
   // productLoadLVMResult();
}


var selectedId;
var textboxDisplay=0;
function replyOnClick(sId){
    if(textboxDisplay==0){
        $(".messageDivFrame").show();
        textboxDisplay=1;
        selectedId=sId;
    }
    else if(textboxDisplay==1)
    {
        $(".messageDivFrame").hide();
        textboxDisplay=0;
    }
    else{
        $(".messageDivFrame").show();
        textboxDisplay=1;
        selectedId=sId;
    }
}

function submitReplyMessage(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var message=$(".replyMessageInput").val();
            var subject=$(".replyMessageSubject").val();
            
            loading.startLoading();
            postNewMessageToUSer(token, uid, "7", selectedId, encode4HTML(message), subject);
        }
    });
}
                         