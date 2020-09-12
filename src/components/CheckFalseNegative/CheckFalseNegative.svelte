<div class="floatLayer"></div>

<div class="checkNegativeContentWrapper">
    <div class="rightBigWrapper">
        <div class="upWrapper">
            <div class="leftSampleTableWrapper">
                <table class="sampleTable sampleTitle">
                    <tr>
                        <th class="sampleSn">样本名称</th>
                        <th class="tick">
                            <button class="selectALL" on:click={(e)=>handleToggleAllSample(e)}>
                                {selected_sampleId_list.length === sample_list.length? '取消':'全选'}
                            </button>
                        </th>
                    </tr>
                </table>
                <div class="tableContentWrapper">
                    <table class="sampleTable sampleContent">
                        {#each sample_list as sample}
                            <tr>
                                <td class="sampleSn"
                                    title="{sample.id}"
                                >{sample.sampleSn}</td>
                                <td class="tick">
                                    <button class="selectOne
                                            {selected_sampleId_list.indexOf(sample.id)>-1?
                                                'icon-checkbox-checked':
                                                'icon-checkbox-unchecked'}">
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </table>
                </div>
            </div>
            <div class="rightPositionTableWrapper">
                <table>
                    <tr>
                        <th class="gene">基因</th>
                        <th class="chr">染色体</th>
                        <th class="posStart">起始位置</th>
                        <th class="posEnd">终止位置</th>
                        <th class="desc">描述</th>
                        <th class="tick">选择</th>
                    </tr>
                </table>
                <div class="tableContentWrapper">
                    <table>
                        {#each negativeCheckPositions as position, index}
                            <tr>
                                <td class="gene">{position.gene}</td>
                                <td class="chr">{position.chr}</td>
                                <td class="posStart">{position.posStart}</td>
                                <td class="posEnd">{position.posEnd}</td>
                                <td class="desc">{position.desc}</td>
                                <td class="tick">
                                    <button class="selectOne
                                        {selected_position_index===index?
                                                'icon-checkbox-checked':
                                                'icon-checkbox-unchecked'}">
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </table>
                </div>
            </div>
        </div>

        <div class="downWrapper">
            <table>
                <tr>
                    <th class="sampleSn">样本名称</th>
                    <th class="position">位点名称</th>
                    <th class="freq">频率</th>
                    <th class="chr">染色体</th>
                    <th class="posStart">起始位置</th>
                    <th class="posEnd">终止位置</th>
                    <th class="ref">参考序列</th>
                    <th class="alt">突变序列</th>
                </tr>
            </table>
            <div class="tableContent">
                <table>
                    {#each created_mutants as mutant}
                        <tr class="mutantTR">

                        </tr>
                    {/each}
                </table>
            </div>
        </div>
    </div>

    <button class="closeBn icon-cancel-circle" on:click={handleClose}></button>
</div>

<script>
    import {createEventDispatcher} from 'svelte'
    import {onMount, onDestroy} from 'svelte'

    import {negativeCheckPositions} from '../../configs/config'
    import {getParentNodeByParentClassName} from "../../utils/common";

    export let sample_list = []

    let selected_sampleId_list = sample_list.map(item => item.id)

    let selected_position_index = 0

    let created_mutants = []

    // console.log('checkFalseNegative selected_sampleId_list', selected_sampleId_list)

    const dispatch = createEventDispatcher()

    function handleClose(){
        dispatch("close")
    }

    function handleToggleAllSample(){

    }

    function __handleFalseNegativeContextMenu(e){
        if (document.querySelector('.tableContentWrapper') &&
            document.querySelector('.tableContentWrapper').contains(e.target)){
            let element =getParentNodeByParentClassName(e.target, 'mutantTR')
        }
    }

    onMount(async () =>{
        document.addEventListener('falseNegativeContextmenu', __handleFalseNegativeContextMenu)
    })

    onDestroy(()=>{
        document.removeEventListener('falseNegativeContextmenu', __handleFalseNegativeContextMenu)
    })
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

    .checkNegativeContentWrapper{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
        width: 710px;
        min-height: 450px;
        font-size: 14px;
        background: white;
        border: 1px solid #666666;
    }

    .checkNegativeContentWrapper table{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        /*固定td宽度*/
        table-layout:fixed;
        /*这个用于强制换行*/
        word-break: break-all;
    }

    .checkNegativeContentWrapper table th,
    .checkNegativeContentWrapper table td{
        width: 35px;
        height: 32px;
        padding: 0;
        margin: 0;
        border-left: 1px solid #cccccc;
        border-bottom: 3px solid #cccccc;
        box-sizing: border-box;
    }

    .checkNegativeContentWrapper table td{
        border-bottom: 1px solid #cccccc!important;
    }

    .checkNegativeContentWrapper table th.sampleSn,
    .checkNegativeContentWrapper table td.sampleSn{
        width: 105px!important;
    }

    .checkNegativeContentWrapper table th.gene,
    .checkNegativeContentWrapper table td.gene{
        width: 70px!important;
    }

    .checkNegativeContentWrapper table th.chr,
    .checkNegativeContentWrapper table td.chr{
        width: 70px!important;
    }

    .checkNegativeContentWrapper table th.posStart,
    .checkNegativeContentWrapper table td.posStart{
        width: 90px!important;
    }

    .checkNegativeContentWrapper table th.posEnd,
    .checkNegativeContentWrapper table td.posEnd{
        width: 90px!important;
    }

    .checkNegativeContentWrapper table th.ref,
    .checkNegativeContentWrapper table td.ref{
        width: 90px!important;
    }

    .checkNegativeContentWrapper table th.alt,
    .checkNegativeContentWrapper table td.alt{
        width: 90px!important;
    }

    .checkNegativeContentWrapper table th.desc,
    .checkNegativeContentWrapper table td.desc{
        width: 100px!important;
    }

    .checkNegativeContentWrapper table th.freq,
    .checkNegativeContentWrapper table td.freq{
        width: 50px!important;
    }

    .checkNegativeContentWrapper table th.position,
    .checkNegativeContentWrapper table td.position{
        width: 70px!important;
    }

    .checkNegativeContentWrapper table button{
        margin: 0;
        padding: 0;
        width: 34px;
        height: 100%;
        line-height: 32px;
        border: none;
        background: white;
        font-weight: bold;
        box-sizing: border-box;
    }
    .checkNegativeContentWrapper .rightBigWrapper{
        float: left;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper{
        width: 680px;
        height: 250px;
        padding: 5px;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper{
        width: 158px;
        height: 200px;
        margin-right: 42px;
        padding: 3px 0 3px 3px;
        border: 1px solid #939393;
        float: left;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper .tableContentWrapper{
        height: 170px;
        overflow-y: scroll;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper .sampleTable button.selectALL:hover{
        background: #09c762;
        color: white;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper{
        width: 473px;
        height: 200px;
        float: left;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper .tableContentWrapper{
        height: 170px;
        overflow-y: scroll;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper{
        width: 673px;
        height: 250px;
        padding: 5px;
    }
    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .tableContent{
        height: 200px;
        overflow-y: scroll;
    }

    .closeBn{
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
