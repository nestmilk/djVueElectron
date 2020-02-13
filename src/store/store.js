import {writable} from 'svelte/store'
import cookie from '../utils/cookie'
import axios from 'axios'
import api from '../api'

// 此处如何改为async 会报错

function setPreviousUrl() {
    const { subscribe, set, update } = writable(null)
    return {
        get: ()=>{
            let url
            subscribe(n=>{
                url = n
            })
            return url
        },
        update: (url)=>{update(n=>{return url})},
        reset: ()=>set(null)
    }
}


function setUserInfo() {

    // 第一次打开，或更新网页直接就从cookie获取name和token
    const { subscribe, set, update  } = writable({
        token: cookie.getCookie('token'),
        name: cookie.getCookie('name'),
        level: cookie.getCookie('level'),
        group: cookie.getCookie('group')
    })

    return {
        subscribe,
        // n就是原来的值
        getName: ()=>{
            let name = ''
            subscribe(n=>{
                name = n.name
            })
            return name
        },
        getToken: ()=>{
            let token=''
            subscribe(n=>{
                token = n.token
            })
            return token
        },
        getLevel: ()=>{
            let level
            subscribe(n=>{
                level = n.level
            })
            return level
        },
        getGroup: ()=>{
            let group
            subscribe(n=>{
                group = n.group
            })
            return group
        },
        updateName: (name) => update(n=>{
            return {
                name: name,
                token: n.token,
                level: n.level,
                group: n.group
            }
        }),
        updateToken: (token) => update(n=>{
            return {
                name: n.name,
                token: token,
                level: n.level,
                group: n.group
            }
        }),
        updateLevel: (level) => update(n=>{
            return {
                name: n.name,
                token: n.token,
                level: level,
                group: n.group
            }
        }),
        updateGroup: (group) => update(n=>{
            return {
                name: n.name,
                token: n.token,
                level: n.level,
                group: group
            }
        }),
        reset: ()=>set({
            name: null,
            token: null
        })
    }
}


export const userInfo = setUserInfo()
export const previousUrl = setPreviousUrl()

