const iconv = require('iconv-lite');
const {execSync} = require('child_process')
const fs = require('fs')
const path = require('path')
const Store = require('electron-store')
const {app, dialog, ipcMain} = require('electron')

const settingsStore = new Store({name: 'Settings'})

const {igvSocketTemplate} = require('./templates')


exports.igvExec = (msg, timestamp) => {
    console.log(msg)

    // console.log('savedFileLocation', settingsStore.get('savedFileLocation'), 'userData', app.getPath('userData'))

    const temp_path = path.join(settingsStore.get('savedFileLocation'), '/temp')
    let ifExist = fs.existsSync(temp_path)
    if (!ifExist){
        fs.mkdirSync(temp_path)
    }

    const temp_file_path = path.join(temp_path, `igvSocket_${timestamp}.py`)
    let template = igvSocketTemplate.replace(/\${([A-Za-z0-9_]+)}/g, msg)
    // dialog.showErrorBox('template', template)

    fs.writeFileSync(temp_file_path, template)

    try{
        execSync('python '+temp_file_path)
        return {success: true}
    } catch(error){
        settingsStore.set('ifIgvConnect',false)
        // 连接都失败了，就顺带把ifIgvConnect设置为false，避免TargetMutant页面切换current_mutant_id过慢！！
        ipcMain.emit('set-ipc-connect-status',{toggle: false, type: "error"})
        // todo 尚未处理没有按装python的报错处理！！
        if (error.message.includes("ConnectionRefusedError")){
            // 传递到main.js，在那里才有mainWindow发送信号去视窗
            ipcMain.emit('connect-igv-error','与igv通信失败，请重新打开igv！')
        }else{
            ipcMain.emit('connect-igv-error','请确保环境变量中已添加Python3！')
        }

        return {success: false,}
    }
}