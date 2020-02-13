import axios from 'axios'

const Store = window.require('electron-store')
const settingsStore = new Store({name: 'Settings'})
export const host = ()=> `http://${settingsStore.get('host')}:${settingsStore.get('port')}`


// 登陆获取token
export const login = params => { return axios.post(`${host()}/login/`, params)}
// 获取用户信息
export const userDetail = () => {return axios.get(`${host()}/users/123/`)}
// 注册新用户
export const register = params => {return axios.post(`${host()}/users/`, params)}
// 获取panal列表
export const panallist = params => {return axios.get(`${host()}/panals/`,{params: params})}
// 上传panal的excel表
let config ={headers: {'Content-type': 'multipart/form-data'}}
// let config = {headers: {'Content-type': '*/*'}}
export const excelUpload = form => {return axios.post(`${host()}/panals/`, form, config)}
// 修改panal
export const updatePanal = (id, params) => {return axios.patch(`${host()}/panals/${id}/`, params)}
// 根据panal_id获取单张panal的samples信息
export const retrievePanal = (id) => {return axios.get(`${host()}/panals/${id}/`)}
// 获取sample的所有mutant信息
export const retrieveSample = (id)=>{ return axios.get(`${host()}/samples/${id}/`)}
// 获取mutant列表
export const mutantList = params => {return axios.get(`${host()}/mutants/`, {params: params})}
// 修改mutant的值
export const updateMutant = (id, params) => {return axios.patch(`${host()}/mutants/${id}/`, params)}
// 生成结果excel
export const createExcel = (id, type) => {return axios.get(`${host()}/excel/${type}/${id}/`)}
// 复制一条mutant
export const copyMutant = (id) => {return axios.get(`${host()}/copy/${id}/`)}
