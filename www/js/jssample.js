var variableone="somthing";
alert(variableone);

function getname(){
    var name="name one";
    alert(name);
}


var profile={
    getname: function(){
        var nametwo="name two";
        alert(nametwo);
    },
    
    getage: function(){
        var agetwo="12";
        alert(nametwo);
    }

}


$(function(){
    var namethree="name 3";
    alert(namethree);
    
    
    $("#testBtn").click(function(){
        var namefour="name 4"; 
        alert(namefour);
    });
    
    $("#stage").append("<button>test 2</button>");

});

$(document).ready(function(){
    alert($("#valueone").val());      
});
}


function webservices(){
    var webApiClass=webApiUrl+"api/profile/phonelogin";
    var loginType, imeiNo, loginId, loginPwd;
    
    loginType="phone";
    imeiNo=device.uuid;
    loginId=username;
    loginPwd=pwd;

    var valueStr=loginType+imeiNo+loginId+loginPwd+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: "http://google.com",
      type: "POST",
      data:"loginID=username&password=123456",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: 60000,//milisecond  
      success: function(data, status, xhr) {
        debugger;        
        //do something when web service response status 200 ok.
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //do something when web service response error.
        }
    })
}
