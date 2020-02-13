import Router, {wrap} from 'svelte-spa-router'

import Login from './routes/Login/Login.svelte'
import Register from './routes/Register/Register.svelte'
import Panal from './routes/Panal/Panal.svelte'
import Sample from './routes/Sample/Sample.svelte'
import TargetMutant from './routes/TargetMutant/TargetMutant.svelte'

import {userInfo} from './store/store'


let routes={
    '/': Panal,
    '/login': Login,
    '/register': Register,
    '/sample': Sample,
    '/panal': Panal,
    '/:type/:panalId': TargetMutant,
    // '/target/:panalId': wrap(
    //     TargetMutant,
    //     (detail) => {
    //
    //         if (userInfo.getLevel()>=1 && userInfo.getGroup()==='鼎晶报告组') {
    //             return true
    //         }else{
    //             return false
    //         }
    //     }
    // ),

    // '/secret': wrap(
    //     Secret,
    //     {
    //         token: 'set inside routes.js'
    //     },
    //     (detail) => {
    //         // 如果在这个页面使用浏览器刷新，这里的token就会消失了token：''
    //         // 进入App.svelte中的conditionFailed
    //         // 所以这里只能采用cookie保存token
    //         console.log('wrap: here token: '+ userInfo.token)
    //         return userInfo.getToken()
    //     }
    // )
}

export  default  routes
