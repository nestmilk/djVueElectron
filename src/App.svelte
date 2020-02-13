<Router {routes} on:conditionsFailed={conditionsFailed}></Router>

<script>
    import Router from 'svelte-spa-router'
    import {push, replace, pop} from 'svelte-spa-router'
    import {userInfo} from './store/store'
    // 只需要此处注入一次即可全局使用，其它地方只要引入push方法
    import routes from './routes'

    let target_reg = /\/target\/\d*$/

    function conditionsFailed(event) {
        // 打包build的时候只有location: '/secret', name: '', userData: {token: 'nestmilk'}
        // 所以按通用性来说还是使用event.detail.location
        //针对Secret路径
        console.log('conditionFailed begin: ' + event.detail.location)
        if (event.detail.location === '/secret') {
            replace('/login')
            return
        }
        if (target_reg.test(event.detail.location)) {
            pop()
            return
        }
    }

</script>

<style>
</style>

