<div class="floatLayer"></div>

<div class="contentWrapper">
    <div class="leftWrapper">
        <div bind:this={topScroll} class="titleTableWrapper" on:scroll={()=>handleScroll('topScroll')}>
            <table>
                <tr>
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
                {#each logs[id] as log}
                    <tr on:click={()=>changeCurrentLogId(log.id)}
                        class="hoverGreen {current_logId===log.id?'now':''}"
                    >
                        <td class="small">{log.id}</td>
                        <td class="small">{id}</td>
                        <td class="small" title="{log.log_details.done?'修改前：'+log.log_details.done.old_value:''}">
                            {log.log_details.done?log.log_details.done.new_value:''}
                        </td>
                        <td class="small"title="{log.log_details.delete?'修改前：'+log.log_details.delete.old_value:''}">
                            {log.log_details.delete?log.log_details.delete.new_value:''}
                        </td>
                        {#each fieldList as field}
                            <td title="{log.log_details[field]?'修改前：'+log.log_details[field].old_value:''}">
                                {log.log_details[field]?log.log_details[field].new_value:''}
                            </td>
                        {/each}
                        <td class="long" title="原因描述：{log.desc}">{log.type}
                        </td>
                        <td>{log.editor.username}</td>
                        <td class="long">{log.add_time}</td>
                    </tr>

                    {#if current_logId===log.id}
                        {#each log.ids as other_id}
                            <tr class="group">
                                <td class="small">{log.id}</td>
                                <td class="small">{other_id}</td>
                                <td class="small" title="{logs[other_id][log.id].log_details.done?'修改前：'+logs[other_id][log.id].log_details.done.old_value:''}">
                                    {logs[other_id][log.id].log_details.done?logs[other_id][log.id].log_details.done.new_value:''}
                                </td>
                                <td class="small" title="{logs[other_id][log.id].log_details.delete?'修改前：'+logs[other_id][log.id].log_details.delete.old_value:''}">
                                    {logs[other_id][log.id].log_details.delete?logs[other_id][log.id].log_details.delete.new_value:''}
                                </td>
                                {#each fieldList as field}
                                    <td title="{logs[other_id][log.id].log_details[field]?'修改前：'+logs[other_id][log.id].log_details[field].old_value:''}">
                                        {logs[other_id][log.id].log_details[field]?logs[other_id][log.id].log_details[field].new_value:''}
                                    </td>
                                {/each}
                                <td class="long" title="原因描述：{logs[other_id][log.id].desc}">{logs[other_id][log.id].type}</td>
                                <td>{logs[other_id][log.id].editor.username}</td>
                                <td class="long">{logs[other_id][log.id].add_time}</td>
                            </tr>
                        {/each}
                    {/if}
                {/each}
            </table>
        </div>
    </div>
    <button class="icon-cancel-circle"
            on:click={handleClose}
    ></button>
</div>

<script>
    import {onMount, createEventDispatcher, beforeUpdate, afterUpdate} from 'svelte'

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
        // console.log('SingleDataLogdetails changeCurrentLogId', current_logId, logId)
        current_logId = current_logId===logId?null:logId
    }

    const dispatch = createEventDispatcher()
    export let id
    export let logs
    export let fieldList
    export let titleDict
    // console.log('SingleDataLogdetails', id, logs, fieldList, titleDict)

    let title_translates = Object.keys(titleDict).reduce((result, title)=>{
        result[title] = titleDict[title]['translate']
        return result
    }, {})

    function handleClose(){
        dispatch("close")
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
        height: 450px;
        font-size: 14px;
        background: white;
        border: 1px solid #666666;
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
    .contentWrapper table .hoverGreen:hover{
        background: #69ca60!important;
    }
    .contentWrapper table .group{
        background: #eaffad;
        font-style: italic;
    }
    .contentWrapper table .now{
        background: #eaffad;
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