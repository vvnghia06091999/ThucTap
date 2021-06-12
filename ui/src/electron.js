require('dotenv').config();
const url = require('url');
const path = require('path');
const electron = require('electron');
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const { dialog } = require('electron');



autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    // const startUrl = process.env.ELECTRON_URL ||  url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // UsemainWindow.loadURL('http://localhost:3035/');
  //'../public/index.html'
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../bundles/bundle.js'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.webContents.openDevTools();
  //mainWindow.webContents.send('message',"hihi");

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  autoUpdater.checkForUpdates();
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
const sendStatusToWindow = (text) => {
  mainWindow.webContents.send('message', text);
};

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.');
  const options = {
    type: 'info',
    title: 'Thông Báo',
    message: 'Đã phát hiện bản cập nhật , vui lòng không tắt ứng dụng !',
  };
  dialog.showMessageBox(null,options);
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', err => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on('download-progress', progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded; will install now');
  const options = {
    type: 'info',
    title: 'Thông Báo',
    message: 'Đã tải xong bản cập nhật , ứng dụng sẽ tự động cài đặt sau 5s !',
  };
  dialog.showMessageBox(null,options);
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  },5000)
});