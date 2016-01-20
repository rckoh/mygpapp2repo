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


function initUserPoint(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var companyid=returnData.rows.item(0).companyid;
            var uid=returnData.rows.item(0).uid;
            var token=returnData.rows.item(0).token;
            var profileImg=returnData.rows.item(0).profileImg;
            $(".profileImg").attr("src", profileImg);
            $("#lblUSername").text(returnData.rows.item(0).name);
            
            postCompanyProfile(companyid, token);
            postInboxMessageList(token, uid, "2");
        }
    });
}

function goProfilePage(tabname){
    window.location = "profilePage.html?tab="+tabname;
}
