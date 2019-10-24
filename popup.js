// window.onload = function(){
//   chrome.storage.local.set({"download":"True"},function(){
//     // alert("success");
//   })
// }

$(function(){

  function test(text=""){
    alert("I am here "+text);
  }

  var htmlData = "";
  var htmlText = "";
  var htmljson = "";
  tags = ["html","java"]
  urls = ['https://raw.githubusercontent.com/Prajwal7842/DocumentationsJSON/master/html.json',
          'https://raw.githubusercontent.com/Prajwal7842/DocumentationsJSON/master/Java.json']
           
            for(let i=0;i<tags.length;i++){
             chrome.storage.local.get(tags[i],function(data){
               console.log(data);
               if (typeof data[tags[i]] == 'undefined'){
                  alert(tags[i] + " Data Not Found");
                  if(navigator.onLine){
                      alert("Downloading Data from External Source... May take a while");
                      $.ajax({
                          type: 'GET',
                          url: urls[i],
                          data: { get_param: 'value'},
                          dataType: 'json',
                          complete: function(data){
                              alert("Download Complete");
                              htmljson = data.responseJSON;
                              var len = Object.keys(htmljson).length;
                              let key = tags[i];
                              chrome.storage.local.set({key:htmljson},function(){
                            });
                          }
                        });
                      }
                  else{
                    alert("Connection Could not Established. Check your Internet Connection!");
                  }
               }
               else{
                console.log("Data Not Found");
               }
              });
           }
              
              let button = $("#search")[0];
              button.addEventListener('click',func);
              

              function func(){
                  let searched = $("#inputText")[0].value;
                  let searchedResult = "";
                  for(let i=0;i<tags.length;i++){
                    chrome.storage.local.get(tags[i],function(data){
                      var storagedata = data[tags[i]];
                      
                      if(storagedata[searched]){
                        searchedResult += "In " + tags[i] + ": " + storagedata[searched] + "\n";
                        i = tags.length-1;
                      }
                      if(i==(tags.length-1)){
                        if(searchedResult.length>0){
                          $("#details")[0].innerHTML = searchedResult;
                        }
                        else
                          $("#details")[0].innerHTML = "Keyboard Not Found";
                      }
                    });
                  }
                };
              
    })
    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
        alert("Got message");
        if(request.msg == "Selection"){
          $("#selected")[0].innerHTML = request.data.content;
          alert(request.data.content)
        }
    })
  
// $(function(){
//   $('search').click(function(){pasteSelection();});
// });

// function pasteSelection() {
//   chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
//   function(tab) {
//     chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
//     function(response){
//       var text = document.getElementById('selected'); 
//       text.innerHTML = response.data;
//     });
//   });
// }
