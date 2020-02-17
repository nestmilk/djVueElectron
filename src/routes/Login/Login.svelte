<div class="wrapper">
    <div class="login">
        <img src="./logo.png" style="width:190px;" alt="logo">
        <div>
            <label>用户名</label>
            <input type="text" bind:value={username}/>
        </div>
        <div>
            <label>密码</label>
            <input type="password" bind:value={password} on:keydown={handleKeydown}/>
        </div>
        <div class="error">{error}</div>
        <input type='button' value='登录'  on:click={login}>
        <input type="button" value="注册" on:click={register}>
        <div>
            <label><input type="checkbox" bind:checked={keep} />是否需要7天保持登录</label>
        </div>
    </div>
</div>

{#if loadingShow}
    <Loading></Loading>
{/if}


<script>
    import {onMount} from 'svelte'
    import {push} from 'svelte-spa-router'
    import {userInfo, previousUrl} from '../../store/store'

    import Loading from '../../components/Loading/Loading.svelte'

    import cookie from '../../utils/cookie'
    import api from '../../api'
    import {setUserInfoInStoreByToken} from "../../utils/common";


    let username = ''
    let password = ''
    let error=''
    let loadingShow = false
    let keep = false

    async function login() {
        loadingShow = true

        await api.login({
            username: username,
            password: password
        }).then((response)=>{
            let token = response.data.token
            userInfo.updateToken(token)
            console.log('token', token)
        }).catch((response)=>{
            console.error('login api 出错', error)
            if (error.data) {
                error = response.data.non_field_errors[0]
            }
        })

        // 同步可以获取到了
        console.log('login ' + userInfo.getToken())

        if(!userInfo.getToken()) {
            loadingShow = false
            return
        }

        await setUserInfoInStoreByToken(userInfo.getToken(), keep)

        loadingShow = false

        // 同步可以获取到了
        console.log('login ' + userInfo.getName())

        let previous_url = previousUrl.get()? previousUrl.get():'/'

        push(previous_url)
    }

    function register () {
        push('/register')
    }

    function handleKeydown (event) {
        // tab键就是9，回车是13
        if (event.which !== 13) return;
        event.preventDefault();
        login()
    }

    onMount(()=>{
        console.log('login onMount!')
    })
</script>

<style>
    .wrapper{
        position: fixed;
        width: 100%;
        height: 100%;
        background: url('../background.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        color: white;
    }
    .login{
        width: 200px;
        margin: 10% auto;
    }
    .error {
        color: orangered;
        font-size: 14px;
    }
</style>
