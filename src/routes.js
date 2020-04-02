import Router, {wrap} from 'svelte-spa-router'

import Login from './routes/Login/Login.svelte'
import Register from './routes/Register/Register.svelte'
import Panal from './routes/Panal/Panal.svelte'
import Sample from './routes/Sample/Sample.svelte'
import Data1 from './routes/Data/Data1.svelte'

import {userInfo} from './store/store'
const Store = window.require('electron-store')
const settingsStore = new Store({name: 'Settings'})
let username = settingsStore.get('username')
let password = settingsStore.get('password')


let routes={
    // '/': Panal,
    '/': wrap(
        Panal,
        (detail)=>{
            console.log('wrap Panal', userInfo.getLevel(), userInfo.getGroup())
            if (userInfo.getLevel()>=1 && userInfo.getGroup()==='鼎晶报告组') {
                return true
            }else{
                return false
            }
        }
    ),
    '/login': Login,
    '/register': Register,
    '/sample': Sample,
    '/panal': Panal,
    '/:type/:panalId': Data1,

}

export  default  routes
