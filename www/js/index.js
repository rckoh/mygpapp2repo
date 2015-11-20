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
		//alert("device is ready");
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

function getIndustryList(){
    var webApiUrl="http://cloud.projeksistematik.com.my/ted_api/api/profile/phonelogin";
	
     $.ajax({
      url: webApiUrl,
      type: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
	  data: "loginType=phone&imeiNo=&loginId=0177028082&loginPwd=123456&checksum=",
      timeout: 20000,     
      success: function(data, status, xhr) {
        debugger;
	//do something if web api return data
		alert(JSON.stringify(data));
		alert(status);
     },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
	//do something if calling web api return an error
		alert("fail connect to server: "+xhr.responseText);
     }
    })
}

function fbLogin(){
    var permission=["public_profile", "email"];
    
	var fbLoginSuccess = function (userData) {
       alert("UserInfo: " + JSON.stringify(userData));
		//do something when login success
	}
	
    facebookConnectPlugin.login(permission, 
                                fbLoginSuccess, 
                                function (error) { alert("fail login with fb " + error)}
                               );
}


