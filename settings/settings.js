const {remote, ipcRenderer} = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({name: 'Settings'})

const userInfoConfigArr = ["#savedFileLocation", "#igvLocation", "#host", "#port", "#username", "#password"]

const $ = (selector)=>{
    const result = document.querySelectorAll(selector)
    return result.length > 1 ? result:result[0]
}

document.addEventListener('DOMContentLoaded', ()=>{
    userInfoConfigArr.forEach(selector=>{
        const savedValue = settingsStore.get(selector.substr(1))
        if(savedValue){
            $(selector).value = savedValue
        }
    })

    $('#select-new-location').addEventListener('click', ()=>{
        remote.dialog.showOpenDialog({
            title: '存储路径',
            properties: ['openDirectory'],
            message: '选择文件的存储路径'
        }).then(result=>{
            if(result.filePaths.length > 0){
                $("#savedFileLocation").value = result.filePaths[0]
            }
        })
    })

    $('#select-igv-location').addEventListener('click', ()=>{
        remote.dialog.showOpenDialog({
            title: 'igv路径',
            properties: ['openFile'],
            FILTERS: [{name: 'bat', extensions: ['bat']}],
            message: '选择igv.bat文件路径'
        }).then(result=>{
            if(result.filePaths.length > 0){
                $("#igvLocation").value = result.filePaths[0]
            }
        })
    })

    $('#settings-form').addEventListener('submit', (e)=>{
        e.preventDefault()

        userInfoConfigArr.forEach(selector=>{
            if($(selector)){
                const {id, value} = $(selector)
                settingsStore.set(id, value?value:'')
            }

        })
        // todo 发送更新消息，人工更新菜单
        // ipcRenderer.send('config-is-saved')
        remote.getCurrentWindow().close()

    })


    $('.nav-tabs').addEventListener('click', (e)=>{
        e.preventDefault()

        $('.nav-link').forEach(element=>{
            element.classList.remove('active')
        })
        e.target.classList.add('active')

        $('.config-area').forEach(element=>{
            element.style.display = 'none'
        })
        $(e.target.dataset.tab).style.display = 'block'

    })


})