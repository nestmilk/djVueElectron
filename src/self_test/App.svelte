<script>
	import { onMount } from 'svelte'
	import api from '../api'

	let mobile = {
		mobile: '131222870'
	}
	let result = {
		mobile: ''
	}
	let error = false

	// let that = this
	onMount(() => {
		console.log("外部fn: " + api.add(1,4))

		api.getSmsCode(mobile).then(res=>{
			console.log("axios: " + res.data.mobile)
		}).catch(err=>{
			// 此处的main.js中引入的全局axios interceptor已经生效
			console.log("axios: " + err.mobile[0])
		})

	})


</script>


<button class="bn">点我</button>

{#if error}
	<div>error: {result.mobile}</div>
{:else}
	<div>result: {result.mobile[0]}</div>
	{#if result.mobile[0]==="手机号码少于11位"}
		<div>result.mobile[0]与"手机号码少于11位"相等</div>
	{/if}
	{#if result.mobile !== "手机号码少于11位"}
		<div>result.mobile与"手机号码少于11位"不相等</div>
	{/if}
{/if}



<style>
	.bn{
		width: 100px
	}
</style>
