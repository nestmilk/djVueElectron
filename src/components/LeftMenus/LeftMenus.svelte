<div class="leftMenu">
    <ul>
        {#each menus as menu}
            <li class="{active===menu.title?'active':''}">
                <a href={menu.url} use:link>{menu.title}</a>
            </li>
        {/each}
    </ul>
</div>

<script>
    import {link} from 'svelte-spa-router'
    import {onMount, createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    export let active

    let menus = [
        {title: '样本信息', url: '/sample'},
        {title: 'Panal信息', url: '/panal'}
    ]

    onMount(()=>{
        dispatch('message', {show: true})
    })
</script>

<style>
    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-block: 0;
        margin-inline: 0;
        padding-inline: 0;
    }
    a {
        text-display: none;
        color: #ffffff;
    }
    .leftMenu{
        width: 110px;
        /* TODO 左侧的高度需要和Panal的middle */
        min-height: 770px;
        font-size: 20px;
        padding: 5px;
        border-right: 1px solid black;
        flex: 0 0 110px;
    }
    .leftMenu li {
        height: 40px;
        line-height: 40px;
        margin: 5px;
        text-align: center;
        font-size: 15px;
        background-color: orange;
        border: 1px solid black;
    }
    .active{
        box-shadow: 3px 3px 3px black;
    }
    .leftMenu li:first-child{
        margin-top: 0;
    }
</style>
