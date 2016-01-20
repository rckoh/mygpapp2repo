function startLoading(){
    $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
}

function endLoading(){
    $(".loadingPage").remove();
}