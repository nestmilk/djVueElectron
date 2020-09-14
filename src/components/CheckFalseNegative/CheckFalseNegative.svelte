<div class="floatLayer"></div>

<div class="checkNegativeContentWrapper">
    <div class="rightBigWrapper">
        <div class="upWrapper">
            <div class="leftSampleTableWrapper">
                <table class="sampleTable sampleTitle">
                    <tr>
                        <th class="sampleSn">样本名称</th>
                        <th class="tick">
                            <button class="selectALL" on:click={handleToggleAllSample}>
                                {selected_sampleId_list.length === sample_list.length? '取消':'全选'}
                            </button>
                        </th>
                    </tr>
                </table>
                <div class="tableContentWrapper">
                    <table class="sampleTable sampleContent">
                        {#each sample_list as sample}
                            <tr on:click={()=>handleSelectSample(sample.id)}>
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
                            <tr on:click={()=>handleSelectPosition(index)}
                                class="{selected_position_index===index? 'selected': ''}"
                            >
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
            <button class="closeBn icon-cancel-circle" on:click={handleClose}></button>
        </div>

        <div class="tipWrapper">
            <span>准备添加的假阴性突变：</span>
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

            {#if negativeAddShow}
                <div class="negativeAddWrapper">
                    <div>
                        <span class="addSpan">样本：</span>
                        <select bind:value={reserved_mutant.sample_id} class="addItem">
                            {#each sample_list as sample}
                                <option value={sample.id}>
                                    {sample.sampleSn}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <span class="addSpan">染色体：</span>
                        <select bind:value={reserved_mutant.chr} class="addItem">
                            {#each chr_list as chr}
                                <option value={chr}>
                                    {chr?chr:'请选择'}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <span class="addSpan">起始位置：</span>
                        <input class="addItem" type="number" step="1" />
                    </div>
                    <div>
                        <span class="addSpan">终止位置：</span>
                        <input class="addItem" type="number" step="1" />
                    </div>
                    <div>
                        <span class="addSpan">参考序列：</span>
                        <input class="addItem" type="text" />
                    </div>
                    <div>
                        <span class="addSpan">突变序列：</span>
                        <input class="addItem" type="text" />
                    </div>
                    <div>
                        <span class="addSpan">频率：</span>
                        <input class="addItem" type="number" step="0.001" min="0" max="1" />
                    </div>

                    <div class="negativeAddBnWrapper">
                        <button on:click={searchAdd_unsubmited_falseNegativeMutants}>搜索添加</button>
                        <button on:click={closeNegatvieAddShow}>关闭</button>
                    </div>

                    <div class="tipWrapper">{message}</div>
                </div>
            {/if}

        </div>
    </div>

</div>

<script>
    import {createEventDispatcher} from 'svelte'
    import {onMount, onDestroy} from 'svelte'

    const { remote } =window.require('electron')

    import {negativeCheckPositions, chr_list} from '../../configs/config'
    import {getParentNodeByParentClassName} from "../../utils/common";
    import {host} from "../../api/api";
    import {params} from "../../routes/Data/Data.svelte";
    import {ifContentEqualArrays, removeFromUniqueArray} from "../../utils/arrays";

    export let sample_list = []
    export let unsubmited_negativeFalseMutants = []

    // let selected_sampleId_list = sample_list.map(item => item.id)
    sample_list = [{id: null, sample_sn: '请选择'}, ...sample_list]
    let selected_sampleId_list = []
    let pre_selected_sampleId_list = []

    let selected_position_index

    let reserved_mutant = {
        sample_id: null,
        chr: null,
        posStart: null,
        posEnd: null,
        ref: null,
        alt: null,
        freq: null
    }

    let created_mutants = []

    let message = "后台无匹配数据，请先添加！"

    let negativeAddShow = false

    // console.log('checkFalseNegative selected_sampleId_list', selected_sampleId_list)

    const dispatch = createEventDispatcher()

    function handleClose(){
        dispatch("close")
    }

    function handleToggleAllSample(){
        if (selected_sampleId_list.length !== sample_list.length) {
            selected_sampleId_list =  sample_list.map(item => item.id)
        }else{
            selected_sampleId_list = []
        }
    }

    function handleSelectSample(sample_id){
        if (selected_sampleId_list.indexOf(sample_id)===-1) {
            selected_sampleId_list.push(sample_id)
            selected_sampleId_list = selected_sampleId_list.sort((a, b)=>{return(a-b)})
        }else{
            selected_sampleId_list = removeFromUniqueArray(selected_sampleId_list, sample_id)
        }
    }

    function handleSelectPosition(index){
        // console.log('handleSelectPosition begin selected_sampleId_list', JSON.parse(JSON.stringify(selected_sampleId_list)))
        let ifEqual = ifContentEqualArrays(selected_sampleId_list, pre_selected_sampleId_list)

        if (selected_position_index === index){
            selected_position_index = null
        }else{
            selected_position_index = index

            let samples = ifEqual?null:selected_sampleId_list
            dispatch('samples_position',{
                samples: samples,
                position: negativeCheckPositions[index]
            })

            if (!ifEqual){
                pre_selected_sampleId_list = JSON.parse(JSON.stringify(selected_sampleId_list))
            }
        }
    }

    function searchAdd_unsubmited_falseNegativeMutants(){

    }

    async function __handleFalseNegativeContextMenu(e){
        console.log('__handleFalseNegativeContextMenu begin')

        if (document.querySelector('.rightPositionTableWrapper') &&
            document.querySelector('.rightPositionTableWrapper').contains(e.target)){
            let menu = new remote.Menu()

            let addNegativeMenuItem = new remote.MenuItem({
                label: "添加突变",
                click: ()=>{
                    negativeAddShow = true
                }
            })
            menu.append(addNegativeMenuItem)
            menu.popup({window: remote.getCurrentWindow()})
        }

        if (document.querySelector('.tableContentWrapper') &&
            document.querySelector('.tableContentWrapper').contains(e.target)){
            let element =getParentNodeByParentClassName(e.target, 'mutantTR')
        }
    }

    function closeNegatvieAddShow(){
        negativeAddShow = false
    }

    onMount(async () =>{
        console.log('CheckFalseNegative onMount begin')
        window.addEventListener('contextmenu', __handleFalseNegativeContextMenu)
    })

    onDestroy(()=>{
        window.removeEventListener('contextmenu', __handleFalseNegativeContextMenu)
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
        width: 690px;
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
        height: 208px;
        padding: 5px;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper{
        width: 158px;
        height: 200px;
        margin-right: 10px;
        padding: 3px 0 3px 3px;
        border: 1px solid #939393;
        float: left;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper .tableContentWrapper{
        height: 167px;
        overflow-y: scroll;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .leftSampleTableWrapper .sampleTable button.selectALL:hover{
        background: #09c762;
        color: white;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper{
        width: 473px;
        height: 200px;
        padding: 3px 0 3px 3px;
        border: 1px solid #939393;
        float: left;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper table th{
        height: 34px!important;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper .tableContentWrapper{
        height: 167px;
        overflow-y: scroll;
    }

    .checkNegativeContentWrapper .rightBigWrapper .upWrapper .rightPositionTableWrapper .tableContentWrapper .selected{
        border: 3px solid #939393;
    }

    .closeBn{
        float: right;
        padding: 0;
        width: 20px;
        line-height: 20px;
        font-size: 20px;
        font-weight: bold;
        background: white;
        border: none;
    }

    .checkNegativeContentWrapper .rightBigWrapper .tipWrapper{
        width: 100%;
        margin: 5px;
        font-size: 20px;
        font-weight: bold;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper{
        position: relative;
        width: 673px;
        height: 250px;
        padding: 3px 0 3px 3px;
        border: 1px solid #939393;
        margin: 5px;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .tableContent{
        height: 218px;
        overflow-y: scroll;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper{
        position: absolute;
        left: 700px;
        bottom: 210px;
        width: 200px;
        height: 290px;
        padding: 5px;
        font-size: 12px;
        background: white;
        border: 1px solid #939393;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper .addSpan{
        display: inline-block;
        width: 70px;
        text-align: right;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper .addItem{
        width: 120px;
    }

    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper .negativeAddBnWrapper{
        margin-top: 10px;
    }
    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper .negativeAddBnWrapper button{
        width: 70px;
        line-height: 26px;
        padding: 0;
        margin-left: 20px;
        margin-bottom: 0;
    }
    .checkNegativeContentWrapper .rightBigWrapper .downWrapper .negativeAddWrapper .tipWrapper{
        font-size: 12px;
        color: red;
        margin: 0;
    }


</style>
