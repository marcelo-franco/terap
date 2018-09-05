const electron = require('electron');
const ChronoTray = require('./app/chronotray');
const ws = require('windows-shortcuts');
const { app, Menu, BrowserWindow, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 160,
        width: 351,
        frame: false,
        resizable: false,
        show: false,
        skipTaskbar: true
    });
    tray = new ChronoTray(`${__dirname}/robot.png`, mainWindow);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('blur', () => {
        setTimeout(() => mainWindow.hide(), 200);
    });
    if (process.env.NODE_ENV !== 'production' && process.platform === 'win32') {
        ws.create("%APPDATA%/Microsoft/Windows/Start Menu/Programs/Electron.lnk", process.execPath);
        app.setAppUserModelId(process.execPath);
    } 
});

ipcMain.on('timeUpdate', (event, timeUpdate) => {
    if (process.platform === 'darwin') {
        tray.setTitle(timeUpdate);
    } else {
        tray.setToolTip(timeUpdate);
    }
});

