// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const {ipcRenderer} = require('electron');

// window.postMessage('hello hii');
// Do something according to a request of your mainview


window.onload=function(){
    // Your JavaScript code here
  
    const { remote } = require('electron');
    const { BrowserWindow } = remote;
  
    const minimizeButton = document.getElementById("minimize");
    const maximizeButton = document.getElementById("maximize");
    const closeButton = document.getElementById("close");
  
    // Minimize the window
    minimizeButton.addEventListener("click", () => {
      console.log("minimizeminimizeminimizeminimizeminimize")
      const currentWindow = remote.getCurrentWindow();
      currentWindow.minimize();
    });
  
    // // Maximize or restore the window
    // maximizeButton.addEventListener("click", () => {
    //   const currentWindow = remote.getCurrentWindow();
    //   if (currentWindow.isMaximized()) {
    //     currentWindow.unmaximize();
    //   } else {
    //     currentWindow.maximize();
    //   }
    // });
  
    // Close the window
    closeButton.addEventListener("click", () => {
      const currentWindow = remote.getCurrentWindow();
      currentWindow.close();
    });
  };
  
ipcRenderer.on('request', function(){
    // ipcRenderer.sendToHost(getScripts());
});

ipcRenderer.on("auth",function(event, data){
    console.log('ipc data', data);
    window.postMessage(data,
    document.URL);
});

ipcRenderer.on("change-text-element",function(event,data){
  
    // the document references to the document of the <webview>
    // document.getElementById(data.id).innerHTML = data.text;
});
window.addEventListener("bot_Evets", function(e) { 
    console.log('############ EVENT RECIVE FROM BOT ######################');
    ipcRenderer.sendToHost(e.detail);
   // process(e.detail) 
});

// close app
function closeApp(e) {
    e.preventDefault()
    
    ipcRenderer.send('close')
  }
  
  document.getElementById("close").addEventListener("click", closeApp);
// setTimeout(()=>{
//     let event  = new CustomEvent("bot_Evets", {
//         detail: {
//          type:'notifaction',
//          data: {
//              heading : '7 zip installed',
//              msg: 'your 7 zip is installed'
//          }
//         }
//       });
//     window.dispatchEvent(event);
// },3000)
