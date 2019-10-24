
var contextMenuItem = {
    "id":"Search API",
    "title":"Search API",
    "contexts":["selection"]
};
var selectedData = "";
var tags = ["html","java"]
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.selectionText){
        for(let i=0;i<tags.length;i++){
            chrome.storage.local.get(tags[i],function(data){
                if(data[tags[i]][clickData.selectionText]){
                    alert("In "+tags[i]+": "+data[tags[i]][clickData.selectionText]);
                    i = tags.length;
                }
                else if(i==(tags.length-1))
                    alert("Keyword Match Not Found");

            });
        }
   //       chrome.runtime.sendMessage({
			// msg:"Selection",
			// data:{
			// 	"content":clickData.selectionText
			// }
	  //  }) 	
    }
})


//Sending selected Data to popup.js for searching
// chrome.extension.onConnect.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//          port.postMessage(selectedData);
//     });
// })





// chrome.browserAction.onClicked.addListener(function(tab) {

//     var port = chrome.extension.connect({
//         name: "Sample Communication"
//     });
//     port.postMessage(clickData.selectionText);
//     port.onMessage.addListener(function(msg) {
//         console.log("message recieved" + msg);
//     });

// });







///Getting data in JSON format example
// var products;           
//         $(document).ready(function(){       
//             $.ajax({
//                 type: 'GET',
//                 url: 'test.json',
//                 data: { get_param: 'value'},
//                 dataType: 'json',
//                 complete: function(data){
//                     products = data; //Store JSON data
//                     alert(products.responseText);
//                 }
//             });
//         });