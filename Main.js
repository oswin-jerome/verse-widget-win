const { app, BrowserWindow, Tray, Menu } = require('electron')
const Store = require('electron-store');
const { autoUpdater } = require("electron-updater")
const store = new Store();

let win = null;
const createWidget = () => {
    var d = store.get('wah');

    win = new BrowserWindow({
        width:600,
        height:400,
        skipTaskbar:true,
        x:d.x,
        y:d.y,
        frame: false,
        minimizable: false,
        transparent: true,
        icon: __dirname + '/app.ico',
        webPreferences:{

            preload: __dirname + '/preload.js',
            nodeIntegration:true
        }
    })
    win.setIgnoreMouseEvents(true)
    win.setFocusable(false)
    win.loadFile("./widget/index.html")
    
    if(store.get('wah')){
        console.log(store.get('wah'))
        var d = store.get('wah');
        win.x = d.x;
        win.y = d.y
    }


    // Auto update
    autoUpdater.autoDownload = true;
    
    autoUpdater.checkForUpdates().then((v)=>{
        autoUpdater.downloadUpdate()
    })
}


app.on('ready', createWidget)

let tray = null;
app.whenReady().then(() => {
    tray = new Tray(__dirname+'/app.ico')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Draggable', type: 'checkbox', click: () => {
                console.log(contextMenu.items[0].checked)
                if (contextMenu.items[0].checked) {
                    win.setIgnoreMouseEvents(false)
                    win.setFocusable(false)
                } else {

                    console.log(win.getPosition())
                    store.set('wah',{x:win.getPosition()[0],y:win.getPosition()[1]})

                    win.setIgnoreMouseEvents(true)
                    win.setFocusable(false)

                }
            }
        },{
            label:"exit",
            click:()=>{app.quit()}
        }
    ])
    tray.setContextMenu(contextMenu)
});

autoUpdater.on("update-downloaded",info=>{
    console.log("update downloaded")
    autoUpdater.quitAndInstall();
})