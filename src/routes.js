import Router, {wrap} from 'svelte-spa-router'

import Login from './routes/Login/Login.svelte'
import Register from './routes/Register/Register.svelte'
import Panal from './routes/Panal/Panal.svelte'
import Sample from './routes/Sample/Sample.svelte'
import Mutant from './routes/Mutant/Mutant.svelte'

import {userInfo} from './store/store'


let routes={
    '/': Panal,
    '/login': Login,
    '/register': Register,
    '/sample': Sample,
    '/panal': Panal,
    '/:type/:panalId': Mutant,
    // '/:type/:panalId': wrap(
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

}

export  default  routes
