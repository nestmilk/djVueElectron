<div>
    <div class="footer">
        <div class="footerK">
<!--            这个number必须加，不然就是各种传值跳跃错误！！！！ TODO-->
            <select class="select" bind:value={pageSize} on:change="{changePageSize}">
                <option value="10">10/页</option>
                <option value="15">15/页</option>
                <option value="20">20/页</option>
                <option value="50">50/页</option>
                <option value="500">500/页</option>
                <option value="10000">10000/页</option>
            </select>

            <span class="unpage">前往<input class="set" type="number" bind:value={setPage} on:keydown={handleKeydown} />页</span>
            {#each pageList as {page, text, active} }
                {#if page == -1}
                    <span class="unpage">{text}</span>
                {:else}
                    <span class="page" on:click={()=>handleClick(page)} class:active={active} >{text}</span>
                {/if}
            {/each}
        </div>
    </div>

<!--        <span> [{page.text},{page.page},{page.active}] </span>-->
</div>

<script>
    import {onMount} from 'svelte'
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    export let preText = '上一页'
    export let nextText = '下一页'
    export let endShow = true
    export let page = -1
    export let totalPage = -1
    export let currentPageSize
    // let pageList = []
    let setPage
    // todo 初始化设置这个没有用，还是显示第一位的值, 仍需要手工onMount设置
    let pageSize = 20
    $: if(currentPageSize!==pageSize){
        console.log('page3', currentPageSize, pageSize)
        pageSize = currentPageSize
        document.querySelector('.select').value = pageSize
    }

    function nav (nav_page, nav_totalPage, nav_preText, nav_nextText, nav_endShow) {
        let pageList = []
        if (nav_totalPage<=1) {
            pageList.push({page:1, text: '1', active: true})
            return pageList
        }

        if (nav_totalPage<nav_page) nav_totalPage=nav_page
        if (nav_page<1) nav_page = 1

        if (nav_page>=2) pageList.push({page:nav_page-1, text:nav_preText})

        if (nav_page==1) {
            pageList.push({page:1, text:'1', active: true})
        }else{
            pageList.push({page:1, text:'1'})
        }

        let start = 2
        let end = nav_totalPage<9 ? nav_totalPage : 9

        if (nav_page >= 7) {
            pageList.push({page: -1, text:'...'})
            start = nav_page -4
            end = nav_page + 4
            end = (end>nav_totalPage ? nav_totalPage : end)
        }

        let i = start
        for (;i<=end;i++) {
            if (i== nav_page) {
                pageList.push({page: i, text: i, active: true})
            }else{
                pageList.push({page: i, text: i})
            }
        }

        if (end<nav_totalPage-1) {
            pageList.push({page: -1, text: '...'})
        }

        if (nav_endShow && end < nav_totalPage) {
            pageList.push({page: nav_totalPage, text: nav_totalPage})
        }

        if (page<totalPage) pageList.push({page: page+1, text: nav_nextText})

        return pageList
    }

    function handleClick(page){
        if (page==-1) return
        dispatch('changePage',{
            page: page
        })
    }

    function changePageSize () {
        dispatch('changePageSize', {
            pageSize: pageSize
        })
    }

    function handleKeydown(event) {
        if (event.which !== 13) return
        if (setPage > totalPage) setPage=totalPage
        dispatch('changePage',{
            page: setPage
        })
    }
    $: pageList = nav(page, totalPage, preText, nextText, endShow) //each无法resolve是个假象

    onMount(()=>{
        document.querySelector('.select').value = pageSize
    })


</script>

<style>
    .footer {
        width: 100%;
        height: 40px;
    }

    .footerK{
        height: 100%;
        margin: 0 auto;
        line-height: 40px;
        text-align: right;
        padding-right: 5px;
    }

    .unpage, .page{
        /*border: 1px solid #ddd;*/
        padding: 8px 12px;
        margin-left: 10px;
        text-align: center;
        cursor:pointer;
        line-height: 40px;
        font-size: 12px;
        color: #939393;
    }

    .unpage{
        cursor: default;
    }

    .page:hover{
         color:#09c762;
         border-color:#09c762;
    }

    .select{
        line-height: 40px;
        font-size: 12px;
        text-align: center;
    }

    /*.PageNum {*/
    /*    line-height: 35px;*/
    /*    font-size: 12px;*/
    /*    color: #939393;*/
    /*    border: none;*/
    /*    tencursor: pointer;*/
    /*}*/

    .page.active {
        color: #333333;
        font-size: 12px;
        font-weight: bold;
        border: 1px solid #333333;
    }
    .set{
        outline: none;
        width: 60px;
        text-align: center;
    }
</style>
