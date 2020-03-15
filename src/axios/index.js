import axios from 'axios';
import {userInfo} from '../store/store'

//全局状态控制引入
// import store from '../store/store';

// http request 拦截器

axios.interceptors.request.use(
    config => {
        // console.log('axios.interceptors.request.use!')
        if (userInfo.getToken()) {
            // console.log('axios.interceptors.request.use: ' + userInfo.getToken())
            config.headers['Authorization'] = `JWT ${userInfo.getToken()}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器
axios.interceptors.response.use(
    undefined,
    error => {
        let res = error.response?error.response:error.message;
        // switch (res.status) {
        //     case 401:
        //         console.error('axios拦截 401', res);
        //         break
        //     case 403:
        //         console.log('axios拦截 403');
        //         break
        //     // alert('您没有该操作权限');
        //     case 500:
        //         console.log('axios拦截 500');
        //         break
        //     // alert('服务器错误');
        //     default:
        console.error('axios拦截已打开, 包装为error.response或error.message', error, res)

        // res = error.response 包装过了，和正确时候可以同样处理了！
        return Promise.reject(res)   // 返回接口返回的错误信息
    });

