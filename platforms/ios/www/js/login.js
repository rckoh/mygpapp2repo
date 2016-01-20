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

function slideshow(){
    var imga="http://cdn.playbuzz.com/cdn/fdbf1197-18af-43df-a5b1-76d180475700/49081b85-5614-4368-9103-71d9f0651322.jpg";
    var imgb="http://dreamatico.com/data_images/animals/animals-4.jpg";
    var imgc="http://thewowstyle.com/wp-content/uploads/2015/04/8589130571841-animal-wallpaper-hd.jpg";
    var imgd="http://i.telegraph.co.uk/multimedia/archive/02296/animal4c_2296997i.jpg";
    var imge="http://cdn.playbuzz.com/cdn/279428ca-ddfa-45ce-87b5-53b20c6f3b38/ac4084b3-f55b-4332-83c9-0d411095e812.jpg";
    var imgname=document.getElementById("slideshowimage").src;
    
    if(imgname==imga){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgb);
        $(".slideshowimage").fadeOut(500);});
    }
    
    if(imgname==imgb){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgc);
        $(".slideshowimage").fadeIn(500);});
    }
    
    if(imgname==imgc){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imgd);
        $(".slideshowimage").fadeIn(500);});
    }
    
    if(imgname==imgd){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imge);
        $(".slideshowimage").fadeIn(500);});
    }
    
    if(imgname==imge){
        $(".slideshowimage").fadeOut(500, function() {
        $(".slideshowimage").attr("src",imga);
        $(".slideshowimage").fadeIn(500);});
    }
}

function getPromoList(){ 
    $.ajax({
      url : "http://192.168.1.18/MRWebApi/api/activity/category",
      type: 'GET',
      dataType: 'json',            
      success: function (data) { 
        var returnstr=JSON.stringify(data);
         for (var x = 0; x < data.length; x++) {
             $("#scrollul").append("<li class='scrollli'><table style='height:100%; width:100%;'><tr><td style='width:20%'><img class='listviewimg' src='" + data[x].categoryPhoto +"'></td><td>"+ data[x].categoryName +"</td></tr></table></li>");
            }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
        }
    });    
  }

function changepage(pagenumber){
    if(pagenumber==1){
        $(".pageone").show();
        $(".pagetwo").hide();
        $(".pagethree").hide();
        
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
    }
    
    if(pagenumber==2){
        
        $(".pageone").hide();
        $(".pagetwo").show();
        $(".pagethree").hide();
        
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
    }
    
    if(pagenumber==3){
        $(".pageone").hide();
        $(".pagetwo").hide();
        $(".pagethree").show();
        
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
    }
}

function login(){
    loading.startLoading();
    
    var username=$("#username").val();
    var password=$("#password").val();
    requestLogin(username, password);
}


function forgetPwd(){
    var keyWord=$(".keyTxt").val();

    if(keyWord==""){
        alert("Please insert user id or email address");
        $(".keyTxt").focus();
    }
    else{
        loading.startLoading();
        postForgetPwd(keyWord);
    }
}

var textboxDisplay=0;
function forgetPwdOnClick(){
    
    $(".keyTxt").val("");
    
    if(textboxDisplay==0){
        $(".forgetPwdFrame").show();
        textboxDisplay=1;
        $(".keyTxt").focus();
    }
    else if(textboxDisplay==1)
    {
        $(".forgetPwdFrame").hide();
        textboxDisplay=0;
    }
    else{
        $(".forgetPwdFrame").show();
        textboxDisplay=1;
        $(".keyTxt").focus();
    }
}

function openRegisterPage(){
    cordovaOpenLink('https://esolutions.mdec.com.my/user/register');
}