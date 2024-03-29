process.env.GOOGLE_API_KEY = "AIzaSyBJ8GDjbmxUnwrWtPG8K7--gKS-hKGav18";

const { app, BrowserWindow, ipcMain, shell, Tray } = require("electron");

global.sharedObject = { prop1: process.argv };

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
const path = require("path");
const url = require("url");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
console.log("hiiiiiiiii", process.versions);
function createWindow() {
  // Create the browser window.
  // resizable property is false;
  console.log("qqqqqqqqqqqqqqqq");
  //  let mainWindow = new BrowserWindow({width: 420, height: 660, icon : path.join(__dirname, 'assets/icons/humonics_logo_icon.png')})
  let mainWindow = new BrowserWindow({
    show: false,
    width: 400,
    height: 650,
    titleBarStyle: "hidden",
    frame: false,
    icon: path.join(__dirname, "assets/icons/tigerbotIcon.ico"),
  });

  //let mainWindow = new BrowserWindow({width: 400, height: 800, resizable: false, transparent: true,show: false, alwaysOnTop:false, icon : path.join(__dirname, 'assets/icons/humonics_logo_icon.png')});
  //  let firstWindow = new BrowserWindow({x: 300, y:120, width: 230, height: 620, resizable: false, parent:mainWindow,show: false, transparent: true, frame: false,icon : path.join(__dirname, 'assets/icons/humonics_logo_icon.png')});
  //  firstWindow.loadURL(url.format ({
  //    pathname: path.join(__dirname, 'index2.html'),
  //    protocol: 'file:',
  //    slashes: true
  //  }));
  //    firstWindow.show();
  //    setTimeout(function(){
  //      firstWindow.close()
  //    }, 14000);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.once("ready-to-show", () => {
    // const tray = new Tray(path.join(__dirname, "assets/icons/BotIcon.png"));
    // tray.setToolTip("HSI BOT");
    // tray.on("click", () => {
    //   mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    // });
    mainWindow.show();
  });
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  // this will hide the menue
  // mainWindow.setMenu(null);
  //mainWindow.setResizable(false);
  // Emitted when the window is closed.
  mainWindow.on('close',function(event){
    if (app.quitting) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  })
  ipcMain.on("close", () => {

    app.quit()
    // mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    // app.hide();
  });
  mainWindow.on("closed", function (event) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // app.exit();

    if (app.quitting) {
      win = null;
    } else {
      event.preventDefault();
      win.hide();
    }

    // mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require("child_process");
  const path = require("path");

  const appFolder = path.resolve(process.execPath, "..");
  const rootAtomFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true,
      });
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(["--createShortcut", exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      application.quit();
      return true;
  }
}

ipcMain.on("loadGH", (event, arg) => {
  console.log("loadGH ========== ");
  //shell.openExternal(arg);
});

ipcMain.on("online-status-changed", (event, status) => {
  console.log("online-status-changed ++++++++++ ", status);
  if (status === "offline") {
    var child = require("child_process").execFile;
    var executablePath = "E:\\Debug\\WifiConnect.exe";

    child(executablePath, function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(data.toString());
    });
  } else {
    //mainWindow.rel
  }
});
