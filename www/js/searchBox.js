function goSearchResult(key){
    window.location = "searchResultPage.html?key="+document.getElementById('searchTextBox').value;
}

$(".searchbox").append("<input type='text' class='searchbox' placeholder='search products and services' id='searchTextBox'><button class='searchBoxBtn' onclick='goSearchResult()'><img src='img/search.png' class='searchBoxBtnImg'/></button></input>");

$(".searchbox").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
            if ( (code==13) || (code==10))
            {
                $(".searchbox").blur();
                goSearchResult();
            }
});
    

                        
                        
                        
                        
                        
                        