const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  const { width, height } =
    require("electron").screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: true,
    autoHideMenuBar: true,
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
          click: () => win.loadURL("https://nitx.io/ns"),
        },
        { label: "Quit", click: () => app.quit() },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
