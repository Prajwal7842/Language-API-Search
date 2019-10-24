chrome.contextMenus.create({
    title:"Search API",
    contexts:["selection"],
    onclick: myfunction
});
function myfunction(e){
    alert("I am clicked");
    alert(e);
    // if(data.menuItemId=="selection"){
    //     alert(data.selectionText);
    // }
}
chrome.contextMenus.onClicked.addListener(function(clickData){
    alert(clickData.selectionText,"LOL");
});