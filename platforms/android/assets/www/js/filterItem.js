//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init filter menu
var filterItem = {
    initItemFilter:function(){
        $("#filterItem").prepend("<div id='productfilter' class='productFilter'></div>");
        $("#productfilter").append("<h1>Looking for</h1>");
        $("#productfilter").append("<p><select id='filterProductLoookFor'></select></p>");        
        $("#productfilter").append("<h1>Keywords</h1>");
        $("#productfilter").append("<p><input type='text' id='filterProductKeyword'></input></p>");
        $("#productfilter").append("<h1>Interest</h1>");
        $("#productfilter").append("<p><select id='filterProductInterest' onchange='changeType(2);'></select></p>");        
        $("#productfilter").append("<h1>Technology Area</h1>");
        $("#productfilter").append("<p><select id='filterProductTechArea'></select></p>");
        $("#productfilter").append("<h1>Industry Area</h1>");
        $("#productfilter").append("<p><select id='filterProductIndustryArea'></select></p>");        
        $("#productfilter").append("<h1>&nbsp;</h1>");
        $("#productfilter").append("<button onclick='productFilterResult();'>MATCH ME</button>");


$("#filterItem").prepend("<div id='servicefilter' class='servicefilter'></div>");
$("#servicefilter").append("<h1>Looking for</h1>");
$("#servicefilter").append("<p><select id='filterServiceLookFor'></select></p>");        
        $("#servicefilter").append("<h1>Keywords</h1>");
$("#servicefilter").append("<p><input type='text' id='filterServiceKeyword'></input></select></p>");
$("#servicefilter").append("<h1>Interest</h1>");
$("#servicefilter").append("<p><select id='filterServiceInterest' onchange='changeType(1);'></select></p>");        
        $("#servicefilter").append("<h1>Service Category</h1>");
$("#servicefilter").append("<p><select id='filterServiceCategory' onchange='getServiceSubCat();'></select></p>");
$("#servicefilter").append("<h1>Service Subcategory</h1>");
$("#servicefilter").append("<div id='serviceSubCatDiv' class='serviceSubCatDiv'></div>");        
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Contact Centre/Call Centre</h1>");        $("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Transaction Processing</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Payroll Processing</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Customer Relations Management</h1>");        $("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Recruit Process</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Supply Chain Management</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Human Resource Functions</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Data Entry</h1>");
//$("#serviceSubCatDiv").append("<h1><img src='img/checkbox.png'/>&nbsp;&nbsp;&nbsp;Business Processes</h1>");
//$("#serviceSubCatDiv").append("<h1><input type='checkbox' name='vehicle' value='Bike' class='check_box' id='chb1'><label for='chB1'>This is the label</label><br></h1>");
$("#servicefilter").append("<h1>&nbsp;</h1>");
$("#servicefilter").append("<button onclick='serviceFilterResult()'>MATCH ME</button>");
        $("#servicefilter").append("<br><br><br>");

    }
}

                        
                        
$(function(){
    
	$("#filterBtn").click(function(){
        
        if(scinterest=='Service'){
            currentpage=2;
        }
        
        if(currentpage==1){
            $("#productfilter").show();
            $("#servicefilter").hide();
            initSearchCriteria("product");
        }
        else if(currentpage==2){
            $("#productfilter").hide();
            $("#servicefilter").show();
            initSearchCriteria("service");
        }
        
        $(".filterFrame").css("margin-left", "190%");
		$(".filterFrame").animate({
			marginLeft: "0%",
		  }, 300, function(){});
        filtermenustatus=1;  
        return false;
	});
    
    $("#closeBtn").click(function(){
		$(".filterFrame").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
        filtermenustatus=0;
        return false;
	});

});
                     

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add button event
function changeType(type){
    if(type=="2")
    {
        $("#productfilter").hide();
        $("#servicefilter").show();
        currentpage=2;
        initSearchCriteria("service");
        scinterest='Service';
    }
    else
    {
        $("#productfilter").show();
        $("#servicefilter").hide();
        currentpage=1;
        initSearchCriteria("product");
        scinterest='Product';
//        $("#filterProductInterest").val("Product");
    }
}


function productFilterResult(){
    $(".filterFrame").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
    
    loading.startLoading();
    
    var lookfor=$("#filterProductLoookFor").val();
    var keyword=$("#filterProductKeyword").val();
    var interest=$("#filterProductInterest").val();
    var industryArea=$("#filterProductIndustryArea").val();
    var techArea=$("#filterProductTechArea").val();
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            postFilterProductList(token, uid, "true", lookfor, keyword, interest, industryArea, techArea);
        }
        else{
            var token="";
            var uid="0";
            postFilterProductList(token, uid, "true", lookfor, keyword, interest, industryArea, techArea);
        }
    });
}

function serviceFilterResult(){
    $(".filterFrame").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
    
    loading.startLoading();
    
    var lookfor=$("#filterServiceLookFor").val();
    var keyword=$("#filterServiceKeyword").val();
    var interest=$("#filterServiceInterest").val();
    var category=$("#filterServiceCategory").val();
    var categoryArr=category.split("|");
    
    var subcat="";
     $('.check_box:checked').each(function() {
        if(subcat.length==0)
            subcat=$(this).val();
        else
            subcat=subcat+"|"+$(this).val();
     });
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            postFilterServiceList(token, uid, "true", lookfor, keyword, interest, categoryArr[0], subcat, category);
        }
        else{
            var token="";
            var uid="0";
            postFilterServiceList(token, uid, "true", lookfor, keyword, interest, categoryArr[0], subcat, category);
        }
    });
}

function productLoadLVMResult(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            
            postLVMProductList(token, uid);
        }
    });
}


//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//get sub category when category on change
function getServiceSubCat(){
    loading.startLoading();
    var category=$("#filterServiceCategory").val();
    
    if(category==""){
        $("#serviceSubCatDiv h1").remove();
        loading.endLoading();
    }else
    {
        var categoryArr=category.split("|");
    
        dbmanager.getProfile(function(returnData){
            if(returnData.rows.length>0){
                var token=returnData.rows.item(0).token;
                postBMServiceSubCategory(token, categoryArr[1]);
            }
            else{
                var token="";
                postBMServiceSubCategory(token, categoryArr[1], "");
            }
        });
    }
    
}

                        