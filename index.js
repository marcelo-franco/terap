const electron = require('electron');
const ChronoTray = require('./app/chronotray');
const { app, Tray, Menu, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    const tray = new ChronoTray(`${__dirname}/robot.png`);
    tray.setToolTip('Esta é uma aplicação Electron');
    tray.on('click', (event, bounds) => {
        //coordenadas do ícone da bandeja
        const { x, y } = bounds
        //dimensões da janela (largura e altura)
        const { width, height } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.setBounds({
                x: x >= 400 ? x - width / 2 : x,
                y: y >= 300 ? y - height : y,
                width,
                height 
            });
            mainWindow.show();
        }
    });
    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    tray.setContextMenu(contextMenu);

    mainWindow = new BrowserWindow({
        height: 150,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

const menuTemplate = [
    {
        label: 'Terap',
        click: () => {
            console.log('Você clicou na opção Terap');
        }
    },
    {
        label: 'Configuração'
    },
    {
        label: 'Ajuda'
    }
];