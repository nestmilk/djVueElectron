<div class="wrapper">
    <div class="register">
        <img src="/logo.png" style="width:190px;" alt="logo">
        <div>
            <label>用户名</label>
            <input type="text" bind:value={username} on:change={change}/>
        </div>
        <div class="error">{errors.username}</div>
        <div>
            <label>设置密码</label>
            <input type="password" bind:value={password} on:change={change}/>
        </div>
        <div>
            <label>确认密码</label>
            <input type="password" bind:value={password1} on:change={change} on:keydown={handleKeydown}/>
        </div>
        <div class="error">
            {errors.repeat}<br>
            {errors.password}
        </div>
        <input type="button" value="注册并登陆" on:click={register} disabled={uploadBtnDisabled} />

        <div>
            已有账号？[<a href="/login" use:link>立即登陆</a>]
        </div>


        <div class="message">{message}</div>

    </div>
</div>

{#if loadingShow}
    <Loading></Loading>
{/if}


<script>
    import api from '../../api'
    import {onMount} from 'svelte'
    import {push, link} from 'svelte-spa-router'
    import {userInfo} from '../../store/store'

    import Loading from '../../components/Loading/Loading.svelte'

    import cookie from '../../utils/cookie'
    import {setUserInfoInStoreByToken} from "../../utils/common";

    let username
    let password
    let password1

    let errors = {
        repeat: '',
        username: '',
        password: ''
    }
    let errors_ori = JSON.parse(JSON.stringify(errors))

    let uploadBtnDisabled = false

    let message = ''

    let countdown = 5

    let loadingShow = false

    function settime() {
        console.log('settime countdown ' + countdown)
        if (countdown==0){
            push('/')
            // 一定return，不然就是死循环
            return
        } else {
            message = countdown + '秒后跳转首页，您目前为访客身份！'
            countdown--
        }
        setTimeout(()=>{
            settime()
        }, 1000)
    }

    async function register () {
        uploadBtnDisabled = true
        errors = JSON.parse(JSON.stringify(errors_ori))

        if (password !== password1) {
            errors.repeat = '密码不一致'
            return
        }

        let gong = 'gong'

        await api.register({
            username: username,
            password: password
        }).then((response)=>{
            userInfo.updateToken(response.data.token)
            gong = 'liu'
        }).catch((error)=>{
            console.log(error.data)
            uploadBtnDisabled = false
            errors.username = error.data.username ? error.data.username: ""
            errors.password = error.data.password ? error.data.password: ""
        })

        // 可以同步修改
        // console.log('register ' + gong)

        if (userInfo.getToken()) {
            await setUserInfoInStoreByToken(userInfo.getToken())
            settime()
        }
    }

    function change() {
        errors.repeat = ''
        uploadBtnDisabled = false
    }

    function handleKeydown (event) {
        // tab键就是9，回车是13
        if (event.which !== 13) return;
        event.preventDefault();
        register()
    }

    onMount(()=>{
        console.log('Register onMount!')
    })

</script>


<style>
    .wrapper{
        position: fixed;
        width: 100%;
        height: 100%;
        background: url('/background.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        color: white;
    }
    .register{
        width: 200px;
        margin: 10% auto;
    }
    .error {
        color: orangered;
        font-size: 14px;
    }
    .message {
        color: #09c762;
        font-size: 14px;
    }
</style>
