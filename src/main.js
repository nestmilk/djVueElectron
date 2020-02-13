// import App from './Tutorial/6. Bindings/d. Group inputs/App.svelte'

import App from './App.svelte'
//全局加载resource拦截器
import './axios/';

const app = new App({
	// target: document.body, //原来的，挺方便
	target: document.getElementById('app') //不能使用 '#app'形式
});

export default app;
