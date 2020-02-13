<Header></Header>

<div class="middle">
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <button class="selectedSubMenu">靶向用药</button>
            <button>融合基因</button>
            <button>肿瘤负荷</button>
            <button on:click={test}>test</button>
        </div>
        <div class="middleContent">
            <div class="navLeft">
                <div class="leftMessage">
                    提示：{errors.detail}
                </div>
                <div class="leftTopWrapper">
                    <table class="sampleTable">
                        <tr>
                            <th class="sampleSn">样本名称</th>
                            <th class="mutantNum">突变总数</th>
                            <th class="undoneNum">未提交数</th>
                            <th class="tick">
                                <button class="selectALL" on:click={handleSelectAllSample}>
                                    {selected_sample_ids.length === sample_list.length? '取消':'全选'}
                                </button>
                            </th>
                        </tr>
                    </table>
                    <div class="tableContent">
                        <table class="sampleTable ">
                            {#each sample_list as sample}
                                <tr on:click={()=>handleSelectSample(sample.id)}>
                                    <td class="sampleSn">{sample.sampleSn}</td>
                                    <td class="mutantNum">{sample.sample_mutant_num}</td>
                                    <td class="undoneNum">{sample.sample_mutant_audited_num}</td>
                                    <td class="tick">
                                        <span class="{selected_sample_ids.indexOf(sample.id)>-1?'icon-checkbox-checked':
                                        'icon-checkbox-unchecked'}"></span>
                                    </td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </div>
                <div class="leftMidWrapper">
                    <div class="selectFile">
                        <input class="fileInput" id="fileWidget" type="file"
                               multiple="true" accept=".bam,.bai" on:change={load}/>
                        共4对Bam/Bai文件
                        <button>取消</button>
                    </div>
                    <div class="fileList"></div>
                </div>
                <div class="leftButtomWrapper">

                </div>
            </div>
            <div class="contentRight">
                <div class="mutantList">
                    <div class="topInsideWrapper" bind:this={topScroll} on:scroll={()=>handleScroll(dict.TOPSCROLL)}>
                        <table class="rightMutantTable">
                            <tr>
                                <th class="done" on:click={()=>handleSubmenuFilter(mutant_status_dict.DONE)}>
                                    {done_status_list[done_status_selected_index].content}
                                </th>
                                <th class="audited">审核状态</th>
                                <th class="delete">删除</th>
                                <th class="sampleSn">样本编号
                                    <div class="icon-sort-amount-asc active"></div>
                                </th>
                                <th class="projectAbbreviation">项目简称</th>
                                <th class="chr" on:click={()=>handleOrderQuery(mutant_param)}>染色体
                                    <div class="icon-sort-amount-asc active"></div>
                                </th>
                                <th class="posStart">起始位置
                                    <div class="icon-sort-amount-asc active"></div>
                                </th>
                                <th class="posEnd">终止位置
                                    <div class="icon-sort-amount-asc active"></div>
                                </th>
                                <th class="ref">参考序列</th>
                                <th class="alt">突变序列</th>
                                <th class="freq">频率</th>
                                <th class="hgvs">hgvs命名</th>
                                <th class="geneVar">位点解析</th>
                                <th class="exonicfuncRefgene">突变方式</th>
                                <th class="clinsig">突变分类</th>
                                <th class="intervarAutomated">突变分类2</th>

                            </tr>
                        </table>
                    </div>
                    <div class="insideWrapper" bind:this={insideScroll} on:scroll={()=>handleScroll(dict.INSIDESCROLL)}>
                        <table class="rightMutantTable">
                            {#each mutant_list as mutant}
                                <tr class="{mutant.done?'done':''} ">
                                    <td class="done {mutant.done?'icon-lock':'icon-unlocked'}"
                                    on:click={()=>handleEventForSure(model_dict.MUTANT,mutant_status_dict.DONE, mutant.id, mutant.done)}></td>
                                    <td class="audited
                                        {getItemByIdandOperateAttr(mutant_submit_list, mutant.id, [dict.CONTENT], dict.GET)
                                        in [mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED]
                                        ?'icon-checkbox-checked':'icon-checkbox-unchecked'}"></td>
                                    <td class="delete">{mutant.delete}</td>
                                    <td class="sampleSn">{mutant.sample.sampleSn}</td>
                                    <td class="projectAbbreviation">{mutant.projectAbbreviation}</td>
                                    <td class="chr">{mutant.chr}</td>
                                    <td class="posStart">
                                        <input class="mutantInput" type="number" bind:value="{mutant.posStart}" />
                                        <span></span>
                                    </td>
                                    <td class="posEnd">{mutant.posEnd}</td>
                                    <td class="ref">{mutant.ref}</td>
                                    <td class="alt">{mutant.alt}</td>
                                    <td class="freq">{mutant.freq.toFixed(3)}</td>
                                    <td class="hgvs">
                                        <div class="inside" title="{mutant.hgvs}">{mutant.hgvs}</div>
                                    </td>
                                    <td class="geneVar">
                                        <div class="inside" title="{mutant.geneVar}">{mutant.geneVar}</div>
                                    </td>
                                    <th class="exonicfuncRefgene">
                                        <div class="inside" title="{mutant.exonicfuncRefgene}">{mutant.exonicfuncRefgene}</div>
                                    </th>
                                    <th class="clinsig">
                                        <div class="inside" title="{mutant.clinsig}">{mutant.clinsig}</div>
                                    </th>
                                    <th class="intervarAutomated">
                                        <div class="inside" title="{mutant.intervarAutomated}">{mutant.intervarAutomated}</div>
                                    </th>

                                </tr>
                            {/each}
                        </table>
                    </div>
                    <Page page={mutant_param_page} totalPage={mutant_totalPage()}
                        on:changePageSize={handleChangePageSizeForMutant} on:changePage={handleChangePageForMutant}></Page>
                </div>
                <div class="igvWrapper">
                    <div class="igvBind" bind:this={igv_bind}></div>
                </div>
            </div>
        </div>
    </div>
</div>

<Footer></Footer>

{#if loadingShow}
    <Loading></Loading>
{/if}
{#if sureShow}
    <Sure message={sendSureMessage()} on:sureMessage={handleSureMessage}></Sure>
{/if}
<script>
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {
        getItemAttrV,
        getItemByIdandOperateAttr,
        removeFromUniqueArray
    } from '../../utils/arrays'
    import {userInfo} from '../../store/store'

    import {push} from 'svelte-spa-router'
    import igv from 'igv/dist/igv.min'

    import Header from '../../components/Header/Header.svelte'
    import Footer from '../../components/Footer/Footer.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    import Loading from '../../components/Loading/Loading.svelte'
    import Sure from '../../components/Sure/Sure.svelte'
    import Page from '../../components/Page/Page3.svelte'

    import {onMount, createEventDispatcher} from 'svelte'
    import {dict_translate} from "../../utils/dict";

    const dispatch = createEventDispatcher()

    let dict = {CONTENT: 'content', GET: 'get', ADD: 'add', MODIFY: 'modify', DELETE: 'delete',
        TOPSCROLL: 'topScroll', INSIDESCROLL: 'insideScroll',
        SAMPLEID: 'sample__id', DONE: 'done', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd',
        SAMMUTNUM: 'sample_mutant_num', SAMMUTAUDITEDNUM: 'sample_mutant_audited_num'}

    // 数据下载后，创建mutant_submit_dict, 只有done和free状态
    // 修改数据后，状态改为checked， deleted，edited
    let mutant_status_dict = {'FREE': 'free', 'DONE':'done', 'CHECKED': 'checked', 'DELETED': 'deleted', 'EDITED': 'edited'}
    let mutant_editable_field_dict = {'POSSTART': 'posStart', 'POSEND': 'posEnd', 'REF': 'ref', 'ALT': 'alt'}
    let model_dict = {PANAL: 'panal', MUTANT: 'mutant'}


    // 控制右侧的标题和下面mutant内容的联动
    let topScroll
    let insideScroll


    let errors = {
        data: '',
        detail: ''
    }
    let errors_ori = JSON.parse(JSON.stringify(errors))

    let loadingShow = false
    let sureShow = false

    //igv控制参数
    let igv_bind
    let igvBrower

    // sample列表相关参数
    let sample_list = []
    let selected_sample_ids = []

    // mutant列表相关
    let mutant_list = []
    // 用作校验和计算每个sample的突变总数
    let mutant_list_whole_panal = []

    let mutant_submit_list = []

    // mutant的Page翻页参数
    let mutant_num
    $: mutant_totalPage = ()=>{
        return Math.ceil(mutant_num/mutant_param_page_size)
    }


    // 目前的mutant的id，sample的id
    let now_mutant_id = -1
    let now_sample_id = -1
    // 动态获取 mutant表中的非目前mutant所在sample的第一位mutant
    $: pre_sample_id = ()=>{
        return -1
    }


    // mutant导航栏的三元选择
    // 筛选mutant完成情况
    let done_status_list = [
        {status: false,
            content: '尚未提交'},
        {status: true,
            content: '已经提交'},
        {status: null,
            content: '全部'}
    ]
    let done_status_selected_index = 0


    // 其中sampleIds根据selected_sample_ids内容变动
    // order根据
    let mutant_param_page = 1
    let mutant_param_page_size = 10
    $: mutant_param_done = ()=> {return done_status_list[done_status_selected_index].status}

    $:mutant_param_sampleIds = ()=>{
        return selected_sample_ids.join(',')
    }
    let order_query_list = [
       dict.SAMPLEID, dict.CHR, dict.POSSTART, dict.POSEND]
    $: mutant_param_order = () =>{
        return order_query_list.join(',')
    }

    // 用于sure组件通信使用
    let sureModel
    let sureEvent
    let sureObjectId
    let sureObjectValue
    let sureObjectNewValue
    $: sendSureMessage = () => {
        return "是否对" + dict_translate[sureModel] + "进行" + dict_translate[sureEvent] + "相关操作"
    }


    // 获取路径中的：值
    export let params = {}


    function test() {
        // console.log(mutant_list)

        let list=[
            {id: 1,
            content: {
                a:{}
            }},
            {id: 2,
                content: {
                    a:{
                        b: 222
                    }
            }},
        ]
        // console.log(JSON.stringify(list))
        // getItemByIdandOperateAttr(list, 2, ['content'], 'delete')
        console.log(mutant_submit_list)
        // console.log(getItemByIdandOperateAttr(list, 2, ['content'], 'get'))
        // getItemByIdandOperateAttr(list, 2, ['content', 'a', 'b'], 'modify', 1234)
        // console.log(JSON.stringify(list))list
    }



    function handleChangePageSizeForMutant(event){
        mutant_param_page_size = event.detail.pageSize
        getMutantslist()
    }
    function handleChangePageForMutant(event){
        mutant_param_page = event.detail.page
        getMutantslist()
    }

    function handleScroll(object){
        // console.log(topScroll.scrollLeft)
        if (object === dict.TOPSCROLL) {
            insideScroll.scrollTo(topScroll.scrollLeft, 0)
        }else if (object === dict.INSIDESCROLL) {
            topScroll.scrollTo(insideScroll.scrollLeft, 0)
        }
    }


    async function handleSelectAllSample() {
        console.log('handleAll' + selected_sample_ids.length + " " + sample_list.length)
        if (selected_sample_ids.length !== sample_list.length) {
            selected_sample_ids =  sample_list.map((value, index, array) => {return value.id} )
        }else{
            selected_sample_ids = []
        }

        await getMutantslist()
    }

    async function handleSelectSample(sample_id) {
        console.log('handleSelectSample ' + sample_id)
        if (selected_sample_ids.indexOf(sample_id)===-1) {
            selected_sample_ids.push(sample_id)
            selected_sample_ids = selected_sample_ids.sort((a,b)=>{return(a-b)})
        }else{
            selected_sample_ids = removeFromUniqueArray(selected_sample_ids, sample_id)
        }

        await getMutantslist()
    }


    function load() {

    }

    function setMutListAndMutantNum(list, count) {
        // TODO 需要重新定位目前的page页数，。。。。
        mutant_list = list
        mutant_num = count
    }


    // 仅在mounted一次执行
    async function getMutantListWholePanal() {
        loadingShow = true
        await api.mutantList({
            page_size: mutant_num,
            panalId: params.panalId
        }).then((response)=>{
            // console.log(response.data)
            mutant_list_whole_panal = response.data.results
        }).catch((error)=>{
            console.error('getMutantListwholePanal', error)
        })
        loadingShow = false
    }


    async function getMutantslist(){
        // 获取mutant列表
        loadingShow = true

        // 如果没有选中任何sample，将mutant_list置空
        console.log('getMutantList begin')
        if (selected_sample_ids.length===0) {
            setMutListAndMutantNum([], 0)
            return
        }

        await api.mutantList({
            page: mutant_param_page,
            page_size: mutant_param_page_size,
            done: mutant_param_done(),
            ordering: mutant_param_order(),
            sampleIds: mutant_param_sampleIds(),
            panalId: params.panalId
        }).then((response)=>{
            // console.log(response.data)
            setMutListAndMutantNum(response.data.results, response.data.count)
        }).catch((error)=>{
            console.error('getMutantList', error)
            if(error.data){
                errors.detail = error.data.detail?error.data.detail: ''
            }
        })

        loadingShow = false
    }


    // 仅用于初始化页面时
    async function getSamplesList(panal_id) {
        loadingShow = true

        await api.retrievePanal(panal_id).then((response) => {
            sample_list = response.data.samples
            // 遍历获取新数组
            selected_sample_ids = sample_list.map((value, index, array)=>{return value.id})
        }).catch((error) => {
            console.log("getSamplesList", error)
            if (error.data) {
                errors.detail = error.data.detail ? error.data.detail : ''
            }
        })

        loadingShow = false
    }


    function buildMutantSubmitDictandTotalMutantsOfSample(){
        for (let sample of sample_list) {
            sample[dict.SAMMUTNUM] = 0
            sample[dict.SAMMUTAUDITEDNUM] = 0
        }
        for (let mutant of mutant_list_whole_panal) {
            // 制作mutant提交字典
            mutant_submit_list.push({
                id: mutant.id,
                status: mutant.done ? mutant_status_dict.DONE : mutant_status_dict.FREE,
                content: {}
            })

            // 给sample添加突变总数
            let value  = getItemByIdandOperateAttr(sample_list, mutant.sample.id, [dict.SAMMUTNUM], 'get')
            getItemByIdandOperateAttr(sample_list, mutant.sample.id, [dict.SAMMUTNUM], 'modify', value+1)
        }
        sample_list = sample_list
    }

    async function changeMutantDone(mutant_id, mutant_done_status) {
        loadingShow = true

        await api.updateMutant(mutant_id, {
            done: mutant_done_status
        }).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.error('changeMutantDone', error)
            if (error.data) errors.data = error.data?error.data:''
        })

        loadingShow = false
    }


    // TODO 此处确定对象类型，事件类型，对象id，对象目的值
    function handleEventForSure(model, event, object_id, object_value=null, object_new_value=null) {
        sureModel = model
        sureEvent = event
        sureObjectId = object_id
        sureObjectValue = object_value
        sureObjectNewValue = object_new_value

        //针对不同模型处理
        switch (sureModel) {
            case model_dict.MUTANT:
                // 针对不同的事项处理
                switch (sureEvent) {
                    case mutant_status_dict.DONE:
                        // 如状态是未完成，则返回
                        if (!sureObjectValue) return
                        sureShow = true
                }
                break
        }

    }


    // TODO 此处接受Sure组件的信息，然后对应不同实践进行分类处理
    async function handleSureMessage(e) {
        sureShow = false

        if (e.detail.status) {
            //针对不同模型处理
            switch (sureModel) {
                case model_dict.MUTANT:
                    // 针对不同的事项处理
                    switch (sureEvent) {
                        case mutant_status_dict.DONE:
                            await changeMutantDone(sureObjectId, false)
                            await getMutantslist()
                            break
                    }
                    break
            }
        }else{
            loadingShow = false
        }
    }


    async function handleSubmenuFilter(object_event) {
        if (object_event===mutant_status_dict.DONE) {
            done_status_selected_index = (done_status_selected_index+1)%(done_status_list.length)
            await getMutantslist()
        }
    }



    onMount(async ()=>{
        //开启loading层
        loadingShow = true

        let options =
                {
                    reference:
                            {
                                id: "hg19",
                                fastaURL: "/database/ucsc.hg19.fasta",
                                indexURL: "/database/ucsc.hg19.fasta.fai"
                            },
                    locus: 'chr1:1983-2020'
                };

        await igv.createBrowser(igv_bind, options).then((browser)=>{
            igvBrower = browser
        })

        await getSamplesList(params.panalId)

        await getMutantslist()

        await  getMutantListWholePanal()

        buildMutantSubmitDictandTotalMutantsOfSample()

        loadingShow = false
    })

</script>







<style>

    /*TODO 高度需要好LeftMenus中高度一致 */
    .middle{
        width: 100%;
        min-height: 900px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        display: flex;
    }

    .midRight{
        flex: 1;
        flex-flow: column;
        display: flex;
    }
    .subMenu{
        flex: 0 0 38px;
        border-bottom: 1px solid black;
    }
    .subMenu .selectedSubMenu{
        box-shadow: 3px 3px 3px black;
    }
    .subMenu button{
        margin: 5px 3px;
        padding: 0;
        width: 80px;
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        color: white;
        text-align: center;
        background: orange;
        border: 1px solid black;
    }
    .subMenu button:hover{
        color: black;
    }
    .subMenu .selectedSubMenu:hover{
        color: white;
    }

    .middleContent{
        flex: 1;
        display: flex;
    }
    .navLeft{
        flex: 0 0 240px;
        display: flex;
        flex-flow: column;
        border-right: 1px solid black;
    }
    .navLeft .leftMessage{
        flex: 0 0 20px;
        line-height: 20px;
        padding: 5px;
        text-align: left;
        font-size: 12px;
        color: orangered;
        border-bottom: 1px solid black;
    }
    .navLeft .leftTopWrapper{
        flex: 0 0 200px;
        padding: 3px;
        border-bottom: 1px solid black;
    }

    .sampleTable{
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
    .sampleTable th{
        height: 32px;
        border-left: 1px solid #cccccc;
        border-bottom: 3px solid #cccccc;
    }
    .sampleTable td{
        height: 30px;
        border-bottom: 1px solid #cccccc;
    }
    .sampleTable .sampleSn{
        width: 105px;
    }
    .sampleTable .mutantNum, .undoneNum, .tick{
        width: 35px;
    }
    .sampleTable .selectALL{
        margin: 0;
        padding: 0;
        width: 35px;
        height: 32px;
        line-height: 32px;
        border: none;
        background: white;
        font-weight: bold;
    }
    .sampleTable .selectALL:hover{
        background: #09c762;
        color: white;
    }

    .tableContent{
        height: 165px;
        overflow-y: scroll;
    }
    .tableContent .tick{
        width: 38px;
    }
    .tableContent tr:hover{
        background: #09c762;
    }

    .leftMidWrapper{
        flex: 0 0 150px;
        border-bottom: 1px solid black;
    }
    .leftMidWrapper .selectFile{
        padding: 3px;
        width: 234px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        border-bottom: 1px solid #cccccc;
    }
    .leftMidWrapper input{
        padding: 0;
        width: 72px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: none;
    }
    .leftMidWrapper .selectFile button{
        padding: 0;
        margin: 3px;
        width: 40px;
        height: 24px;
        line-height: 24px;
        float: right;
    }
    .leftMidWrapper .fileList{
        height: 107px;
        margin: 3px;
        overflow-y: scroll;
    }

    .leftButtomWrapper{
        flex: 1;
    }

    .contentRight{
        /*此处必须要加这个0，不然table无法滚动 TODO*/
        width: 0;
        flex: 1;
        display: flex;
        flex-flow: column;
    }
    .contentRight .mutantList{
        flex: 0 0 460px;
        padding: 3px;
        border-bottom: 1px solid #cccccc;
    }


    .contentRight .rightMutantTable{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        /*固定td宽度*/
        table-layout: fixed;
        /*word-break: break-all;*/
    }
    .contentRight .rightMutantTable .icon-sort-amount-asc{
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 22px;
    }
    .contentRight .rightMutantTable .icon-sort-amount-asc:hover{
        color: #09c762;
    }
    .contentRight .topInsideWrapper{
        overflow: scroll;
    }
    .contentRight .insideWrapper{
        height: 370px;
        overflow: scroll;
    }

    .contentRight .rightMutantTable tr.done{
        background: #aaaaaa;
    }
    .contentRight .rightMutantTable th.done:hover{
        background: #09c762;
    }

    .contentRight th, .contentRight td{
        height: 32px;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    .contentRight td{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
    }

    .contentRight .inside{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .contentRight .mutantInput{
        margin: 0 5px 0 3px;
        border: none;
        font-weight: bold;
    }
    /*此处必须用min-width，不然table会在div宽度内自己调整，无法溢出实现scroll TODO*/
    .contentRight .done{
        min-width: 35px;
    }
    .contentRight .done .icon-lock{
        color: black;
    }
    .contentRight .done .icon-unlocked{
        color: #999999;
    }
    .contentRight .audited{
        min-width: 35px;
    }
    .contentRight .sampleSn{
        position: relative;
        min-width: 110px;
    }
    .contentRight .projectAbbreviation{
        min-width: 35px;
    }
    .contentRight .chr{
        position: relative;
        min-width: 92px;
    }
    .contentRight .posStart{
        position: relative;
        min-width: 120px;
    }
    .contentRight .posStart .mutantInput{
        float: left;
        width: 90px;
    }
    .contentRight .posEnd{
        position: relative;
        min-width: 120px;
    }
    .contentRight .ref{
        min-width: 80px;
    }
    .contentRight .alt{
        min-width: 80px;
    }
    .contentRight .freq{
        min-width: 60px;
    }
    .contentRight .hgvs{
        min-width: 150px;
    }
    .contentRight .hgvs .inside{
        width: 150px;
    }
    .contentRight .geneVar{
        min-width: 150px;
    }
    .contentRight .geneVar .inside{
        width: 150px;
    }
    .contentRight .exonicfuncRefgene{
        min-width: 150px;
    }
    .contentRight .clinsig{
        min-width: 150px;
    }
    .contentRight .intervarAutomated{
        min-width: 150px;
    }
    .contentRight .delete{
        min-width: 35px;
    }








    .contentRight .igvWrapper{
        flex: 1;
    }
    .contentRight .igvBind{
        width: 95%;
        margin: 3px auto;
    }
</style>
