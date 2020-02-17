import cookie from "./cookie";
import axios from "axios";
const Store = window.require('electron-store')
const settingsStore = new Store({name: 'Settings'})
export const host = ()=> `http://${settingsStore.get('host')}:${settingsStore.get('port')}`

import {userInfo} from "../store/store"

import {push} from 'svelte-spa-router'
import {draw} from "svelte/transition";


export const  setUserInfoInStoreByToken = async (token, keep) => {
    let name = null
    let level = null
    let group = null
    let config ={headers: {'Authorization': 'JWT ' + token}}

    // 此时还没获取到token,不能用api中userDetail, 只能手动获取
    await axios.get(`${host()}/users/123/`, config).then((response)=>{
        let data = response.data
        userInfo.updateName(data.username)
        userInfo.updateLevel(data.position.level)
        userInfo.updateGroup(data.group?data.group.name:'')
        if (keep) {
            cookie.setCookie('name', userInfo.getName(), 7)
            cookie.setCookie('token', userInfo.getToken(), 7)
            cookie.setCookie('level', userInfo.getLevel(), 7)
            cookie.setCookie('group', userInfo.getGroup(), 7)
        }
    }).catch((error)=>{
        console.log('common.js setuserinfoinstorebytoken ', error)
    })
}

export const getTime = ()=>{
    let today = new Date()
    let hour = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    if (hour>=0 && hour<=9) hour = "0" + hour
    if (minute>=0 && minute<=9) minute = "0" + minute
    if (second>=0 && second<=9) second = "0" + second
    return  hour + ":" + minute + ":" + second
}

export const getParentNodeByParentClassName = (node, parentClassName) => {
    let current = node
    while(current !== null){
        if (current.classList && current.classList.contains(parentClassName)){
            return current
        }
        current = current.parentNode
    }
    return false
}