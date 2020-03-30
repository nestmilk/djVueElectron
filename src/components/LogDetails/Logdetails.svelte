<div class="floatLayer"></div>

<div class="contentWrapper">
    <div class="upsideWrapper">
        <div class="leftWrapper">
            <div bind:this={topScroll} class="titleTableWrapper" on:scroll={()=>handleScroll('topScroll')}>
                <table>
                    <tr class="show">
                        {#if cancelSubmit}
                            <th class="select"></th>
                        {/if}
                        <th class="small">日志ID</th>
                        <th class="small">数据ID</th>
                        <th class="small">完成</th>
                        <th class="small">删除</th>
                        {#each fieldList as field}
                            <th>{title_translates[field]}</th>
                        {/each}
                        <th class="long">提交类型</th>
                        <th>操作人员</th>
                        <th class="long">操作时间</th>
                    </tr>
                </table>
            </div>
            <div bind:this={bottomScroll} class="dataTableWrapper" on:scroll={()=>handleScroll('bottomScroll')}>
                <table>
                    {#each idLogIds as {logId, ids}}
                        {#each ids as id, index}
                            <tr on:click={()=>changeCurrentLogId(logId)}
                                class="{current_logId===logId ?'current':''}
                                    {index===0?'show first':''}"
                            >
                                {#if cancelSubmit}
                                    <td class="select">
                                        <button class="{selected_ids.indexOf(id)!==-1?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                                on:click={(e)=>handleSelect(e, id)}
                                        ></button>
                                    </td>
                                {/if}
                                <td class="small">{logId}</td>
                                <td class="small">{id}</td>
                                <td class="small" title="{logs[id][logId].log_details.done?'修改前：'+logs[id][logId].log_details.done.old_value:''}">
                                    {logs[id][logId].log_details.done?logs[id][logId].log_details.done.new_value:''}
                                </td>
                                <td class="small"title="{logs[id][logId].log_details.delete?'修改前：'+logs[id][logId].log_details.delete.old_value:''}">
                                    {logs[id][logId].log_details.delete?logs[id][logId].log_details.delete.new_value:''}
                                </td>
                                {#each fieldList as field}
                                    <td title="{logs[id][logId].log_details[field]?'修改前：'+logs[id][logId].log_details[field].old_value:''}">
                                        {logs[id][logId].log_details[field]?logs[id][logId].log_details[field].new_value:''}
                                    </td>
                                {/each}
                                <td class="long" title="原因描述：{logs[id][logId].desc}">{logs[id][logId].type}
                                </td>
                                <td>{logs[id][logId].editor.username}</td>
                                <td class="long">{logs[id][logId].add_time}</td>
                            </tr>
                        {/each}
                    {/each}
                </table>
            </div>
        </div>

        <button class="icon-cancel-circle" on:click={handleClose}></button>
    </div>

    {#if cancelSubmit}
        <div class="cancelWrapper">
            <button class="cancelBn"
                on:click={handleCancelSelectedIds}
            >
                撤销{selected_ids.length>1?selected_ids.length:'此'}条提交
            </button>
        </div>
    {/if}

</div>

<script>
    import {createEventDispatcher} from 'svelte'
    import {removeFromUniqueArray}  from '../../utils/arrays'

    let topScroll
    let bottomScroll
    function handleScroll(item){
        if (item === 'topScroll') {
            bottomScroll.scrollTo(topScroll.scrollLeft, 0)
        }else if (item === 'bottomScroll') {
            topScroll.scrollTo(bottomScroll.scrollLeft, 0)
        }
    }

    let current_logId = null
    function changeCurrentLogId(logId){
        console.log('SingleDataLogdetails changeCurrentLogId', logId)
        current_logId = current_logId===logId?null:logId
    }

    const dispatch = createEventDispatcher()
    export let idLogIds
    export let logs
    export let fieldList
    export let titleDict
    export let cancelSubmit
    // console.log('SingleDataLogdetails', idLogIds, logs)

    let selected_ids = [idLogIds[0].ids[0]]

    let title_translates = Object.keys(titleDict).reduce((result, title)=>{
        result[title] = titleDict[title]['translate']
        return result
    }, {})

    function handleSelect(e, id){
        e.stopPropagation()
        if(id!==idLogIds[0].ids[0]){
            if(selected_ids.indexOf(id)===-1){
                selected_ids.push(id)
            }else{
                selected_ids = removeFromUniqueArray(selected_ids, id)
            }
        }
        selected_ids = selected_ids
    }
    function handleClose(){
        dispatch("close")
    }

    function handleCancelSelectedIds(){
        dispatch("cancel", {ids: selected_ids})
    }

</script>

<style>
    .floatLayer{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000000;
        z-index: 999;
        filter: alpha(Opacity=10);
        -moz-opacity: 0.1;
        opacity: 0.1;
    }
    .contentWrapper{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
        width: 900px;
        min-height: 450px;
        font-size: 14px;
        background: white;
        border: 1px solid #666666;
    }
    .contentWrapper .upsideWrapper{
        width: 100%;
        height: 450px;
    }
    .contentWrapper .leftWrapper{
        float: left;
        box-sizing: border-box;
        width: 874px;
        height: 100%;
        padding: 20px 0 0 26px;
    }
    .contentWrapper .leftWrapper .titleTableWrapper{
        overflow: scroll;
        width: 100%;
    }
    .contentWrapper .leftWrapper .dataTableWrapper{
        overflow: scroll;
        width: 100%;
        height: 380px;
    }
    .contentWrapper table{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 14px;
        table-layout: fixed;
    }
    .contentWrapper table tr>th, .contentWrapper table tr>td{
        /*控制每个单元格最小宽度*/
        min-width: 90px;
        max-width: 90px;
        height: 25px;
        margin: 0;
        padding: 0 5px;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .contentWrapper table .long{
        min-width: 130px!important;
        max-width: 130px!important;
    }
    .contentWrapper table .small{
        min-width: 70px!important;
        max-width: 70px!important;
    }
    .contentWrapper table .select{
        min-width: 25px!important;
        max-width: 25px!important;
        padding: 0!important;
    }
    .contentWrapper table .select button{
        display: table-cell;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        vertical-align: middle;
        width: 100%;
        height: 100%;
        font-size: 16px;
        background: none;
        border: none;
    }

    .contentWrapper table tr{
        display: none;
    }
    .contentWrapper table .show{
        display: block;
    }
    .contentWrapper table .first{
        font-weight: bold;
        font-style: normal!important;
    }
    .contentWrapper table .first:hover{
        background: #69ca60!important;
        color: white!important;
    }

    .contentWrapper table .current{
        background: #eaffad;
        display: block;
        font-style: italic;
    }

    .contentWrapper .cancelWrapper{
        width: 100%;
        height: 40px;
        background: #eaffad;
    }
    .contentWrapper .cancelWrapper .cancelBn{
        padding: 0 10px;
        /*不知道为啥不能用auto*/
        margin: 4px 390px;
        width: 120px;
        line-height: 30px;
        background: white;
        border: 1px solid black;
    }
    .contentWrapper .cancelWrapper .cancelBn:hover{
        background: #69ca60;
        color: white;
    }

    .icon-cancel-circle{
        float: right;
        margin: 3px;
        padding: 0;
        width: 20px;
        line-height: 20px;
        font-size: 20px;
        font-weight: bold;
        background: white;
        border: none;
    }
</style>