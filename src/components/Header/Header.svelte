<div class="header">
    <div class="left">上海鼎晶生物</div>
    <div class="right">
        {#if username}
            <span>{username}</span>您好，
            <button on:click={loginOut}>退出</button>
        {:else}
            <button on:click={login}>登录</button>
            <button><a href="/register" use:link>注册</a></button>
        {/if}
    </div>
</div>

<script>
    import {userInfo, previousUrl} from '../../store/store'
    import cookie from '../../utils/cookie'
    import {push, link, location} from 'svelte-spa-router'

    let username = userInfo.getName()


    function loginOut () {
        userInfo.reset()
        cookie.delCookie('name')
        cookie.delCookie('token')
        cookie.delCookie('level')
        cookie.delCookie('group')
        push('/login')
    }

    function login() {
        // console.log($location)
        previousUrl.update($location)
        console.log(previousUrl.get())
        push('/login')
    }

</script>

<style>
    .header{
        width: 100%;
        height: 50px;
        background-color: orange;
        border: 1px solid black;
        font-size: 20px;
        color: #ffffff;
    }
    .left{
        height: 50px;
        line-height: 50px;
        margin: 0 10px;
        float: left;
    }
    .right{
        line-height: 50px;
        font-size: 14px;
        float: right;
    }
    .right button{
        margin: 0 10px;
        padding: 0;
        width: 50px;
        border-radius: 2px;
    }
</style>
