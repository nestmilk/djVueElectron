<div class="floatLayer"></div>

<div class="contentWrapper">
    <div class="upWrapper">
        <div class="titleTableWrapper">
            <table>
                <tr>
                    <th class="medium">sheet页名</th>
                    <th class="medium">数据行数</th>
                    <th class="small" title="选取sheet数据追加">数据选择</th>
                    <th class="small" title="使用sheet中标题作为输出excel的标题模板">模板选择</th>
                </tr>
            </table>
        </div>
        <div class="dataTableWrapper">
            <table>
                {#each sheet_data_copy as sheet}
                    <tr>
                        <td class="medium">{sheet.name}</td>
                        <td class="medium">{sheet.pure_data_length}</td>
                        <td class="small">
                            {#if sheet.pure_data_length}
                                <button class="{sheet.status_for_data_update?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                    on:click={()=>handleSelectData(sheet.name)}
                                />
                            {/if}
                        </td>
                        <td class="small">
                            {#if sheet.hasTitles_inSheet}
                                <button class="{sheet.status_for_template_update?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                    on:click={()=>handleSelectTemplate(sheet.name)}
                                />
                            {/if}
                        </td>
                    </tr>
                {/each}
            </table>
        </div>
    </div>
    <div class="bnWrapper">
        <button on:click={handleSubmit}>提交</button>
        <button on:click={handleCancel}>取消</button>
    </div>
</div>

<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let sheet_data
    console.log('AddData', sheet_data)
    let sheet_data_copy = JSON.parse(JSON.stringify(sheet_data))

    function handleSubmit(){
        dispatch('submit', {data: sheet_data_copy})
    }

    function handleCancel(){
        dispatch('cancel')
    }

    function handleSelectData(sheet_name){
        let sheet = sheet_data_copy.find(sheet=>sheet.name===sheet_name)
        sheet.status_for_data_update = !sheet.status_for_data_update
        // 如果是要更新data，数据库中又没有对应模板，则联动勾选更新template
        if(sheet.status_for_data_update && !sheet.hasTemplate_inDatabase){
            sheet.status_for_template_update = true
        }
        sheet_data_copy = sheet_data_copy
    }

    function handleSelectTemplate(sheet_name){
        let sheet = sheet_data_copy.find(sheet=>sheet.name===sheet_name)
        // console.log('AddData handleSelectTemplate', sheet)
        // if(sheet.pure_data_length===0 || sheet.hasTemplate_inDatabase)  // 如果’没有数据‘，或者’数据库有模板‘，可以选择
        sheet.status_for_template_update = !sheet.status_for_template_update
        // 如果是取消模板，并且此时需要更新data，而且data库中没有模板, 则联动取消更新data
        if(!sheet.status_for_template_update && sheet.status_for_data_update
            && !sheet.hasTemplate_inDatabase){
            sheet.status_for_data_update = false
        }
        sheet_data_copy = sheet_data_copy
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
        padding: 8px;
        width: 304px;
        height: 250px;
        font-size: 14px;
        line-height: 14px;
        background: white;
        border: 1px solid #666666;
    }
    .contentWrapper .upWrapper{
        border-bottom: 1px solid #cccccc;
    }
    .contentWrapper .upWrapper .titleTableWrapper{
        overflow-y: scroll;
    }
    .contentWrapper .upWrapper .dataTableWrapper{
        overflow-y: scroll;
        height: 183px;
    }

    .contentWrapper table{
        border: 1px solid #cccccc;
        text-align: center;
    }
    .contentWrapper table tr>th, .contentWrapper table tr>td{
        height: 35px;
        margin: 0;
        padding: 0;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    .contentWrapper table .medium{
        padding: 0 3px!important;
        min-width: 100px!important;
        max-width: 100px!important;
    }
    .contentWrapper table .small{
        min-width: 35px!important;
        max-width: 35px!important;
    }
    .contentWrapper table button{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        width: 35px;
        height: 35px;
    }

    .contentWrapper .bnWrapper{
        margin: 5px;
    }
    .contentWrapper .bnWrapper button{
        padding: 0;
        margin: 0 48px;
        height: 25px;
        width: 45px;
    }


</style>
