const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  const { width, height } =
    require("electron").screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: true,
<<<<<<< HEAD
    autoHideMenuBar: false,
=======
    autoHideMenuBar: true, // Set autoHideMenuBar to true to hide the menu bar
>>>>>>> 8d1b0ffadcb75e86a43c02a5efb8359428e179ee
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      webSecurity: false, // Disable CORS
      allowRunningInsecureContent: true, // Allow insecure content
    },
  });

  win.loadFile("index.html");

  const template = [
    {
      label: "Menu",
      submenu: [
        { label: "Refresh", click: () => win.reload() },
        {
          label: "Link Screen",
          click: () => win.loadURL("https://nitx.io/"),
        },
        { label: "Quit", click: () => app.quit() },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  // Instead of setting the application menu, we'll use the context menu
  win.webContents.on('context-menu', (e, params) => {
    e.preventDefault();
    menu.popup({ window: win, x: params.x, y: params.y });
  });
}

app.whenReady().then(() => {
  app.setLoginItemSettings({ openAtLogin: true });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
