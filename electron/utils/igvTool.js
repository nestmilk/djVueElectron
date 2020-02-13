const iconv = require('iconv-lite');
const {execSync} = require('child_process')
const fs = require('fs')
const path = require('path')
const Store = require('electron-store')
const {app, dialog} = require('electron')

const settingsStore = new Store({name: 'Settings'})

const {igvSocketTemplate} = require('./templates')


exports.igvExec = (msg, timestamp) => {
    // 第一次如果没有则创建location
    if (!settingsStore.get('savedFileLocation')){
        settingsStore.set('savedFileLocation', app.getPath('userData'))
    }
    // console.log('savedFileLocation', settingsStore.get('savedFileLocation'), 'userData', app.getPath('userData'))

    const temp_path = path.join(settingsStore.get('savedFileLocation'), '/temp')
    let ifExist = fs.existsSync(temp_path)
    if (!ifExist){
        fs.mkdirSync(temp_path)
    }

    const temp_file_path = path.join(temp_path, `igvSocket_${timestamp}.py`)
    let template = igvSocketTemplate.replace(/\${([A-Za-z0-9_]+)}/g, msg)

    fs.writeFileSync(temp_file_path, template)

    try{
        let out = execSync('python '+temp_file_path)
        return {success: true}
    } catch(error){
        if (error.message.includes("ConnectionRefusedError")){
            dialog.showErrorBox('执行igv命令出错', `${msg}\n执行上述命令时，与igv连接失败！`)
            return {
                success: false,
                error: "ConnectionRefusedError"
            }
        }
    }
}