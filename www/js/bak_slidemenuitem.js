//$("#slidemenu").append("<li><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />Login</label></li>");
//var sessiontoken;

function initSlideMenu(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length==0){
            $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
            $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
            $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
            $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
            $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
        }
        else{
            var roles=returnData.rows.item(0).role;
            var rolearr=roles.split(",");
            if(jQuery.inArray("7",rolearr)==1 || jQuery.inArray("6",rolearr)==1){    
                $("#slidemenu").append("<li onclick='goProfile();'><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />My Profile</label></li>");
            }
            $("#slidemenu").append("<li onclick='goFavourite();'><label class='itemlabel'><img src='img/fav.png' class='menuitemimg' />Favourites</label></li>");
            $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
            $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
            $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
            $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
            $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
            $("#slidemenu").append("<li><label class='itemlabel' onclick='initLogout();'><img src='img/logout.png' class='menuitemimg' />Logout</label></li>");
            }
    });
//    if(results.rows.length==0)
//    {
//        $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
//        $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
//        $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
//        $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
//        $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
//    }
//    else{
//        var roles=results.rows.item(0).role;
//        var rolearr=roles.split(",");
//        sessiontoken=results.rows.item(0).token;
//        if(jQuery.inArray("7",rolearr)==1 || jQuery.inArray("6",rolearr)==1){    
//            $("#slidemenu").append("<li onclick='goProfile();'><label class='itemlabel'><img src='img/user-2.png' class='menuitemimg' />My Profile</label></li>");
//        }
//        $("#slidemenu").append("<li onclick='goFavourite();'><label class='itemlabel'><img src='img/fav.png' class='menuitemimg' />Favourites</label></li>");
//        $("#slidemenu").append("<li onClick='goTrending();'><label class='itemlabel'><img src='img/trending.png' class='menuitemimg' />Trending</label></li>");
//        $("#slidemenu").append("<li onClick='goBusinessMatching();'><label class='itemlabel'><img src='img/business_matching.png' class='menuitemimg' />Business Matching</label></li>");
//        $("#slidemenu").append("<li onClick='goListing();'><label class='itemlabel'><img src='img/listing.png' class='menuitemimg' />Listings</label></li>");
//        $("#slidemenu").append("<li><label class='itemlabel'><img src='img/lock.png' class='menuitemimg' />Change Password</label></li>");
//        $("#slidemenu").append("<li onclick='goAbout();'><label class='itemlabel'><img src='img/about.png' class='menuitemimg' />About eSolutions</label></li>");
//        $("#slidemenu").append("<li><label class='itemlabel' onclick='initLogout();'><img src='img/logout.png' class='menuitemimg' />Logout</label></li>");
//    }
}
                       
                        
                        
                        
                        
                        