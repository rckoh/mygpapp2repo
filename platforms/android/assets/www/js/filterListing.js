//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init filter menu
var filterListing = {
    initListingFilter:function(){
        $("#filterItem").prepend("<div id='productfilter' class='productFilter'></div>");
        $("#productfilter").append("<h1>Product Name</h1>");
        $("#productfilter").append("<p><input type='text' id='productName'></input></p>");        
        $("#productfilter").append("<h1>Company</h1>");
        $("#productfilter").append("<p><input type='text' id='productCompany'></input></p>");
        $("#productfilter").append("<h1>Industry</h1>");
        $("#productfilter").append("<p><select id='filterProductIndustry'></select></p>");
        $("#productfilter").append("<h1>Technology Area</h1>");
        $("#productfilter").append("<p><select id='filterProductTechArea'></select></p>"); 
        $("#productfilter").append("<h1>&nbsp;</h1>");
        $("#productfilter").append("<button onclick='productSearchResult();'>SEARCH</button>");

        $("#filterItem").prepend("<div id='servicefilter' class='servicefilter'></div>");
        $("#servicefilter").append("<h1>Service Name</h1>");
        $("#servicefilter").append("<p><input type='text' id='serviceName'></input></select></p>");  
        $("#servicefilter").append("<h1>Company</h1>");
        $("#servicefilter").append("<p><input type='text' id='serviceCompany'></input></select></p>");
        $("#servicefilter").append("<h1>Service Category</h1>");
        $("#servicefilter").append("<p><select id='filterServiceCategory' onchange='getSubCategory();'><option value=''></option></select></p>");
        $("#servicefilter").append("<h1>Service Sub Category</h1>");
        $("#servicefilter").append("<p><select id='filterServiceSubCategory'><option value=''></option></select></p>");
        $("#servicefilter").append("<h1>&nbsp;</h1>");
        $("#servicefilter").append("<button onclick='serviceSearchResult();'>SEARCH</button>");
    },

}

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add filter menu event to control
$(function(){
    
	$("#filterBtn").click(function(){
        
        
        if(currentpage==1){
            $(".filterHeader").html("");
            $(".filterHeader").append("Search Product");
            $("#productfilter").show();
            $("#servicefilter").hide();
            initSearchCriteria("product");
        }
        else if(currentpage==2){
            $(".filterHeader").html("");
            $(".filterHeader").append("Search Services");
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
//add filter button action
function productSearchResult(){
    $(".filterFrame").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
    
    var productName=$("#productName").val();
    var company=$("#productCompany").val();
    var gst=$("#filterProductGST").val();
    var industry=$("#filterProductIndustry").val();
    var techArea=$("#filterProductTechArea").val();
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postSearchListingProductList(token, productName, company, "", industry, techArea);
        }
        else{
            var token="";
            postSearchListingProductList(token, productName, company, "", industry, techArea, "0");
        }
    });
}

function serviceSearchResult(){
    $(".filterFrame").animate({
			marginLeft: "100%",
		  }, 300, function(){$(".filterFrame").css("margin-left", "-100%");});
    
    var serviceName=$("#serviceName").val();
    var company=$("#serviceCompany").val();
    var category=$("#filterServiceCategory").val();
    var categoryArr=category.split("|");
    var subcategory=$("#filterServiceSubCategory").val();
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postSearchListingServiceList(token, serviceName, company, categoryArr[0], subcategory);
        }
        else{
            var token="";
            postSearchListingServiceList(token, serviceName, company, categoryArr[0], subcategory, "0");
        }
    });
}

                        
                        
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//get sub category when category on change
function getSubCategory(){
    loading.startLoading();
    var category=$("#filterServiceCategory").val();
    var categoryArr=category.split("|");
    
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0){
            var token=returnData.rows.item(0).token;
            postServiceSearchCriteriaSubCategory(token, categoryArr[1]);
        }
        else{
            var token="";
            postServiceSearchCriteriaSubCategory(token, categoryArr[1], "");
        }
    });
}