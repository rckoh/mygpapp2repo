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
}

function loadContent(){
    var nid=getUrlParameter("nid");
    getCompanyDetails(nid);
}

var currentpage=1;
function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        
        $(".companyDetailsDescriptionOne").show();
        $(".companyDetailsDescriptionTwo").hide();

        $(".requirementBtn").css("color", "#565656");
        $(".awardsBtn").css("color", "#BDBDBD");
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {});
        
        currentpage=1;
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
       $(".companyDetailsDescriptionOne").hide();
        $(".companyDetailsDescriptionTwo").show();

        $(".requirementBtn").css("color", "#BDBDBD");
        $(".awardsBtn").css("color", "#565656");
        
        $(".selectedItem").animate({
                marginLeft: "50%",}, 300, function() {});
        
        currentpage=2;
    }
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
            postNewMessageToUSer(token, uid, "4", selectedId, encode4HTML(message), subject);
        }
    });
}

function checkFav(nid){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            
            PostFavCheck(token, uid, nid, "1");
        }
    });
}

function clickFav(nid){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            
            PostFavCheck(token, uid, nid, "0");
        }
    });
}

function sharetoFV()
{
                window.plugins.socialsharing.shareViaFacebook("Test from MMMDDEECC via Facebook", null /* img */, "http://www.joshmorony.com/add-social-sharing-to-a-phonegap-application-facebook-twitter-and-more/" /* url */, function() {alert("share success")}, function(errormsg){alert("error to share"+errormsg)});
}
            
function sharetoFVnormal(){
    var imageUrl=document.getElementById("productImg").src;
    var newurl = imageUrl.split("?");
    var title=$("#companyName").text();
    var productDetails=$('#productdetails').text();
    var websiteLink="";

    window.plugins.socialsharing.share(productDetails, title, newurl[0], websiteLink);    
}
            
function sharetoFVios(){
                window.plugins.socialsharing.shareVia('com.apple.social.facebook', 'Message via FB', null, null, null, function(){alert('share ok')}, function(msg) {alert('error: ' + msg)});
}
            
function showDialogFB() { 
                alert("sharedialog");
                facebookConnectPlugin.showDialog( {
                            method: "share",
                            href: 'https://developers.facebook.com/docs/',
                        }, 
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
}

