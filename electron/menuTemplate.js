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
                label: '页面显示',
                submenu: [
                    {
                        label: '显示行号',
                        type: 'checkbox',
                        checked: settingsStore.get('ifShowLineNum'),
                        click: () => {
                            settingsStore.set('ifShowLineNum', !settingsStore.get('ifShowLineNum'))
                            ipcMain.emit('set-ifShowLineNum-toggle')
                        }
                    }, {
                        label: '显示样本信息',
                        type: 'checkbox',
                        checked: settingsStore.get('ifShowSampleInfo'),
                        click: () => {
                            settingsStore.set('ifShowSampleInfo', !settingsStore.get('ifShowSampleInfo'))
                            ipcMain.emit('set-ifShowSampleInfo-toggle')
                        }
                    }, {
                        label: '显示历史假阳性突变提示',
                        type: 'checkbox',
                        checked: settingsStore.get('ifShowHistoryFalsePositiveMutant'),
                        click: () => {
                            settingsStore.set('ifShowHistoryFalsePositiveMutant', !settingsStore.get('ifShowHistoryFalsePositiveMutant'))
                            ipcMain.emit('set-ifShowHistoryFalsePositiveMutant-toggle')
                        }
                    }
                ]
            }, {
                label: '审核功能',
                submenu: [
                    {
                        label: '靶向、遗传表-hgvs修改关联填充',
                        type: 'checkbox',
                        checked: settingsStore.get('ifHgvsAutoFillOthers'),
                        click: ()=>{
                            settingsStore.set('ifHgvsAutoFillOthers', !settingsStore.get('ifHgvsAutoFillOthers'))
                        }
                    }, {
                        label: '同批审核-多项数据同批修改',
                        type: 'checkbox',
                        checked: settingsStore.get('ifMultipleModify'),
                        click: ()=>{
                            settingsStore.set('ifMultipleModify', !settingsStore.get('ifMultipleModify'))
                        }
                    },
                ]
            }, {
                label: '相关网站',
                submenu: [
                    {
                        label: 'Ensembl/GRCH37',
                        click: () => {
                            shell.openExternal('http://grch37.ensembl.org/Homo_sapiens/Info/Index')
                        }
                    }, {
                        label: '鼎晶后端数据',
                        click: () => {
                            shell.openExternal('http://172.16.10.32:9733')
                        }
                    }
                ]
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
                        label: '勾选base排序',
                        type: 'checkbox',
                        checked: settingsStore.get('ifSortBase'),
                        click: () => {
                            settingsStore.set('ifSortBase', !settingsStore.get('ifSortBase'))
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
            }, {
                label: '注册',
                click: ()=>{
                    // 这里无法在module外使用svelte-route的push
                    ipcMain.emit('login-caution')
                }
            }
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
                    label: '参数设置',
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
