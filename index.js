const electron = require('electron');
const ChronoTray = require('./app/chronotray');
const { app, Menu, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 150,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
        skipTaskbar: true
    });
    const tray = new ChronoTray(`${__dirname}/robot.png`, mainWindow);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('blur', () => {
        setTimeout(() => mainWindow.hide(), 200);
    });
});

