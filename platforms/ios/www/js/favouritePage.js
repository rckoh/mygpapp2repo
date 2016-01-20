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

function initfavlist(){
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(rungetUserIdTrnasaction);
}

function rungetUserIdTrnasaction(t){
    t.executeSql('select uid from userprofile', [], successGetUSerId, errorGetUSerId);    
}

function successGetUSerId(t, results){
    if(results.rows.length>0)
    {
        getFavouriteList(results.rows.item(0).uid);
    }

}

function errorGetUSerId(err){
//    alert('There was an error processing the SQL: '+err.message);
} 