const {app, ipcMain, Menu} = require("electron")
const isDev = require('electron-is-dev')
const path = require('path')

const AppWindow = require('./electron/AppWindow')
const menuTemplate = require('./electron/menuTemplate')
const {igvExec} = require('./electron/utils/igvTool')
const {igvSocketTemplate, igvLoadTrack, igvGotoLocus} = require('./electron/utils/templates')

app.on('ready', ()=>{
    const mainWindowConfig = {
        width: 1366,
        height: 768
    }

    const urlLocation = isDev? 'http://localhost:8080': 'fakeUrl'
    let mainWindow = new AppWindow(mainWindowConfig, urlLocation)
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })

    // 设置主菜单
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    ipcMain.on('open-settings-window', ()=>{
        const settingWindowConfig = {
            width: 500,
            height: 600,
            parent: mainWindow
        }
        const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`
        let settingsWindow = new AppWindow(settingWindowConfig, settingsFileLocation)

        // todo 去除settingsWindow和mainWindow一样的菜单,调试时候打开，不然调试界面打不开
        // settingsWindow.removeMenu()

        settingsWindow.on('closed', ()=>{
            settingsWindow = null
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
        if (!igvExec("sort base", timestamp).success) return
    })

    ipcMain.on('connect-igv-error', ()=>{
        mainWindow.webContents.send('connect-igv-error-caution')
    })

    ipcMain.on('set-ipc-connect-true', ()=>{
        let toolMenu = process.platform === 'darwin'? menu.items[] : menu.items[]
    })
})