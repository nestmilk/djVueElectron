const {app, shell, ipcMain, dialog} = require('electron')
const {execSync} = require('child_process')

const Store = require('electron-store')
const settingsStore = new Store({ name: 'Settings'})


let template = [
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            }, {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            }, {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            }, {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            }, {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll'
            }
        ]
    }, {
        label: '视图',
        submenu: [
            {
                label: '刷新当前页面',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            },
            {
                label: '切换全屏幕',
                accelerator: (() => {
                    if (process.platform === 'darwin')
                        return 'Ctrl+Command+F';
                    else
                        return 'F11';
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow){
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                }
            },
        ]
    }, {
        label: '窗口',
        role: 'window',
        submenu: [{
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }]
    }, {
        label: '工具',
        role: 'help',
        submenu: [
            {
                label: '打开Ensembl',
                click: () => {
                    shell.openExternal('http://asia.ensembl.org/index.html')
                }
            }, {
                label: 'IGV工具',
                submenu: [
                    {
                        label: '勾选连接igv',
                        type: 'checkbox',
                        checked: settingsStore.get('ifIgvConnect'),
                        click: () => {
                            settingsStore.set('ifIgvConnect', !settingsStore.get('ifIgvConnect'))
                            if(settingsStore.get('ifIgvConnect')){
                                ipcMain.emit('set-ifIgvConnect-true-done')
                            }

                        }
                    }, {
                        label: '当前突变置顶',
                        type: 'checkbox',
                        checked: settingsStore.get('ifNowMutantTop'),
                        click: () => {
                            settingsStore.set('ifNowMutantTop', !settingsStore.get('ifNowMutantTop'))
                        }
                    }, {
                        label: '打开igv',
                        accelerator: 'Ctrl+I',
                        click: ()=>{
                            let res = shell.openItem(settingsStore.get('igvLocation'))
                            // 成功打开返回true，无法打开返回false
                            if(res){
                                settingsStore.set('ifIgvConnect', true)
                                // todo 这个发出去的和ipcRenderer.send不一样，不会添加event， 第一个就是true
                                ipcMain.emit('set-ipc-connect-status', {toggle:true, type: 'open_igv'})
                            }else{
                                dialog.showErrorBox('无法打开igv', '请在"设置"中,选择正确的igv.bat路径。')
                            }
                        }
                    }, {
                        label: '关闭igv',
                        accelerator: 'Ctrl+O',
                        click: ()=>{
                            try{
                                execSync('taskkill /fi "imagename eq javaw.exe" /f')
                                settingsStore.set('ifIgvConnect', false)
                                ipcMain.emit('set-ipc-connect-status', {toggle:false, type: 'close_igv'})
                            } catch(error){
                                dialog.showErrorBox('cmd关闭igv失败','error')
                            }
                        }
                    }
                ]

            }, {
                label: '打开调试工具',
                accelerator: (function () {
                    if (process.platform === 'darwin')
                        return 'Alt+Command+I';
                    else
                        return 'Ctrl+Shift+I';
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow)
                        focusedWindow.toggleDevTools();
                }
            },
        ]
    }
]


if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift(
        {
            label: name,
            submenu: [
                {
                    label: `关于 ${name}`,
                    role: 'about'
                }, {
                    type: 'separator'
                }, {
                    label: '设置',
                    accelerator: 'Ctrl+S',
                    click: () => {
                        // todo 同一主进程内，发送消息出去
                        ipcMain.emit('open-settings-window')
                    }
                }, {
                    label: '服务',
                    role: 'services',
                    submenu: []
                }, {
                    type: 'separator'
                }, {
                    label: `隐藏 ${name}`,
                    accelerator: 'Command+H',
                    role: 'hide'
                }, {
                    label: '隐藏其它',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                }, {
                    label: '显示全部',
                    role: 'unhide'
                }, {
                    type: 'separator'
                }, {
                    label: '退出',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit()
                    }
                }]
        })
} else {
    template[3].submenu.unshift({
        label: '参数设置',
        accelerator: 'Ctrl+S',
        click: () => {
            // todo 同一主进程内，发送消息出去
            ipcMain.emit('open-settings-window')
        }
    })
}

module.exports = template
