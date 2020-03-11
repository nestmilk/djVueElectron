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
export const listPanal = params => {return axios.get(`${host()}/panals/`,{params: params})}
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
// 获取sample的列表
export const listSample = params => {return axios.get(`${host()}/samples/`, {params: params})}
// 获取mutant列表
export const mutantList = params => {return axios.get(`${host()}/mutants/`, {params: params})}
export const listTarget = params => {return axios.get(`${host()}/mutants/`, {params: params})}
export const listHereditary = params => {return axios.get(`${host()}/mutants/`, {params: params})}
export const listTMB = params => {return axios.get(`${host()}/mutants/`, {params: params})}


// 修改mutant的值
export const updateMutant = (id, params) => {return axios.patch(`${host()}/mutants/${id}/`, params)}
// 生成结果excel
export const createExcel = (id, type) => {return axios.get(`${host()}/excel/${type}/${id}/`)}
// 复制一条mutant
export const copyMutant = (mutant_id, user_id) => {return axios.get(`${host()}/copy/${mutant_id}/${user_id}/`)}

// 获取sampleInfoInPanal的列表
export const listSampleInfoInPanal = params => {return axios.get(`${host()}/sampleinfoinpanals/`, {params: params})}
// 获取qc的列表
export const listQC = params => {return axios.get(`${host()}/qcs/`, {params: params})}
// 获取immune列表
export const listImmune = params => {return axios.get(`${host()}/immunes/`, {params: params})}
// 获取TNB列表
export const listTNB = params => {return axios.get(`${host()}/tnbs/`, {params: params})}
// 获取fusion列表
export const listFusion = params => {return axios.get(`${host()}/fusions/`, {params: params})}
// 获取CNA列表
export const listCNA = params => {return axios.get(`${host()}/cnas/`, {params: params})}
// 获取chemical列表
export const listChemical = params => {return axios.get(`${host()}/chemicals/`, {params: params})}
// 获取MSI列表
export const listMSI = params => {return axios.get(`${host()}/msis/`, {params: params})}
// 获取HRR列表
export const listHRR = params => {return axios.get(`${host()}/hrrs/`, {params: params})}
// 获取clinicaltrial列表
export const listClinicaltrials = params => {return axios.get(`${host()}/clinicaltrials/`, {params: params})}
// 获取HLA列表
export const listHLA = params => {return axios.get(`${host()}/hlas/`, {params: params})}
//获取sampleInfo列表
export const listSampleInfo = params => {return axios.get(`${host()}/samples/`, {params: params})}