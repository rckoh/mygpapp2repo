/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
                    marginLeft: "0%",}, 300, function() {currentpage=2;
                                                        window.localStorage.setItem("listingpagenumber", '2');
                                                        });

            $(".selectedItem").animate({
                    marginLeft: "33%",}, 300, function() {});
            
            initListingServList();
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
                marginLeft: "0%",}, 300, function() {currentpage=1;
                                                    window.localStorage.setItem("listingpagenumber", '1');});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {});
        
        initListingProdList();
        
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
                marginLeft: "0%",}, 300, function() {currentpage=2;
                                                    window.localStorage.setItem("listingpagenumber", '2');});
        
        $(".selectedItem").animate({
                marginLeft: "33.67%",}, 300, function() {});
        
        initListingServList();
        
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
                    marginLeft: "0%",}, 300, function() {currentpage=1;
                                                        window.localStorage.setItem("listingpagenumber", '1');});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {});
        
            initListingProdList();
        }
}

function initListingProdList(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postListingProductList(token);
        }
        else{
            var token="";
            postListingProductList(token, "0");
        }
    });
}

function initListingServList(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postListingServiceList(token);
        }
        else{
            var token="";
            postListingServiceList(token, "0");
        }
    });
}

function initSearchCriteria(searchType){
    loading.startLoading();
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            if(searchType=="product")
                postProductSearchCriteria(token);
            else
                postServiceSearchCriteria(token);
        }
        else{
             var token="";
            if(searchType=="product")
                postProductSearchCriteria(token, "0");
            else
                postServiceSearchCriteria(token, "0");
        }
    });
}

