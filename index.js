const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

function createWindow() {
    const {width, height} = require('electron').screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: width, height: height, fullscreen: true, autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true, contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    app.setLoginItemSettings({openAtLogin: true});
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});