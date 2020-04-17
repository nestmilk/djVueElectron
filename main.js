const {app, ipcMain, Menu, dialog} = require("electron")
const {autoUpdater} = require('electron-updater')
const isDev = require('electron-is-dev')
const path = require('path')
const Store = require('electron-store')
const settingsStore = new Store({name: 'Settings'})

const AppWindow = require('./electron/AppWindow')
const menuTemplate = require('./electron/menuTemplate')
const {igvExec} = require('./electron/utils/igvTool')
const {igvSocketTemplate, igvLoadTrack, igvGotoLocus} = require('./electron/utils/templates')

app.on('ready', ()=>{
    // if (isDev) {
    //     autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    // }
    // autoUpdater.autoDownload = false
    // autoUpdater.checkForUpdates().then(res=>{
    //     console.log('res', res)
    // }).catch(err=>{
    //     console.log('err', err)
    // })
    // autoUpdater.on('error', (error) => {
    //     dialog.showErrorBox('自动更新错误', error == null ? "unknown" : (error.stack || error).toString())
    // })
    // autoUpdater.on('checking-for-update', () => {
    //     console.log('Checking for update...');
    // })
    // autoUpdater.on('update-available', () => {
    //     dialog.showMessageBox({
    //         type: 'info',
    //         title: '应用有新的版本',
    //         message: '发现新版本，是否现在更新?',
    //         buttons: ['是', '否']
    //     }, (buttonIndex) => {
    //         if (buttonIndex === 0) {
    //             autoUpdater.downloadUpdate()
    //         }
    //     })
    // })
    // autoUpdater.on('update-not-available', () => {
    //     dialog.showMessageBox({
    //         title: '没有新版本',
    //         message: '当前已经是最新版本'
    //     })
    // })
    // autoUpdater.on('download-progress', (progressObj) => {
    //     let log_message = "Download speed: " + progressObj.bytesPerSecond;
    //     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    //     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    //     console.log(log_message)
    // })
    //
    // autoUpdater.on('update-downloaded', () => {
    //     dialog.showMessageBox({
    //         title: '安装更新',
    //         message: '更新下载完毕，应用将重启并进行安装'
    //     }, () => {
    //         setImmediate(() => autoUpdater.quitAndInstall())
    //     })
    // })



    const mainWindowConfig = {
        width: 1366,
        height: 768
    }

    const urlLocation = isDev? 'http://localhost:8080': `file://${path.join(__dirname, './index.html')}`
    let mainWindow = new AppWindow(mainWindowConfig, urlLocation)
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })

    // 设置主菜单
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    let configWindowOpened = false
    ipcMain.on('open-settings-window', ()=>{
        if (configWindowOpened) return
        // 第一次如果没有则创建location
        if (!settingsStore.get('savedFileLocation')){
            settingsStore.set('savedFileLocation', app.getPath('userData'))
        }

        const settingWindowConfig = {
            width: 500,
            height: 600,
            parent: mainWindow
        }
        const settingsFileLocation = isDev? `file://${path.join(__dirname, './settings/settings.html')}` : `file://${path.join(__dirname, '../settings/settings.html')}`
        let settingsWindow = new AppWindow(settingWindowConfig, settingsFileLocation)

        configWindowOpened = true

        // todo 去除settingsWindow和mainWindow一样的菜单,调试时候打开，不然开发者调试界面打不开
        // settingsWindow.removeMenu()

        settingsWindow.on('closed', ()=>{
            settingsWindow = null
            configWindowOpened = false
        })
    })

    ipcMain.on("load-tracks", (event, bamAndBaiPathsList)=>{
            const timestamp = new Date().getTime()
            //Create a new session.  Unloads all tracks except the default genome annotations.

            if (!igvExec('new', timestamp).success) return

            for (let bamAndBaiPaths of bamAndBaiPathsList){
                if(!igvExec(igvLoadTrack(bamAndBaiPaths[0], bamAndBaiPaths[1]), timestamp).success) return
            }

        }
    )

    ipcMain.on("remove-tracks", ()=>{
            const timestamp = new Date().getTime()
            if (!igvExec('new', timestamp).success) return
        }
    )

    ipcMain.on('search-locus', (event, query)=>{
        const timestamp = new Date().getTime()
        if (!igvExec(igvGotoLocus(query), timestamp).success) return
        if(settingsStore.get('ifSortBase')){
            if (!igvExec("sort base", timestamp).success) return
        }
    })

    ipcMain.on('connect-igv-error', (message)=>{
        mainWindow.webContents.send('connect-igv-error-caution', message)
    })

    ipcMain.on('set-ipc-connect-status', (obj)=>{
        let status = JSON.parse(JSON.stringify(obj))
        let toolMenu = process.platform === 'darwin'? menu.items[4] : menu.items[3]
        toolMenu.submenu.items[2].submenu.items[0].checked = status.toggle
        switch (status.type) {
            case "error":
                break
            default:
                mainWindow.webContents.send('reset-errors')
        }
    })

    // ipcMain.on('igv-toggle-emit-caution', (status)=>{
    //     // 无奈转义，不然不让checked赋值！！
    //     let toggle = JSON.parse(JSON.stringify(status))
    //     let toolMenu = process.platform === 'darwin'? menu.items[4] : menu.items[3]
    //     toolMenu.submenu.items[2].submenu.items[0].checked = toggle
    //     mainWindow.webContents.send('reset-errors')
    // })

    ipcMain.on('set-ifIgvConnect-true-done',()=>{
        mainWindow.webContents.send('reset-errors')
    })

    ipcMain.on('login-caution', ()=>{
        mainWindow.webContents.send('login-activate')
    })

    ipcMain.on('set-ifShowLineNum-toggle',()=>{
        mainWindow.webContents.send('toggle-line-num')
    })
    
})