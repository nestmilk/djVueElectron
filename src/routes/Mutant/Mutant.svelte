<!--<Header></Header>-->

<div class="middle"

>
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <div class="subMenuWrapper">
                {#each submenu_list as submenu}
                    <button class="submenuBtn {params.type===submenu?'selectedSubMenu':''}"
                            on:click={()=>handleSelectSubmenu(submenu)}>
                        {submenu_translate_dict[submenu]}
                    </button>
                {/each}
                <button class='test' on:click={test}>test</button>
            </div>
        </div>
        <div class="middleContent">
            {#if params.type !== dict.SAMPLEINFOINPANAL}
                <div class="navLeft">
                    <div class="divider"

                    ></div>
                    <div class="leftMessage">
                        提示：{errors}
                    </div>
                    <div class="leftSampleTableWrapper">
                        <table class="sampleTable">
                            <tr>
                                <th class="sampleSn">样本名称</th>
                                <th class="total">条目总数</th>
                                <th class="submitedAndAffirmed">已提已审</th>
                                <th class="unsubmitedAndAffirmed">未提已审</th>
                                <th class="unsubmitedAndUnaffirmed">未提未审</th>
                                <th class="tick">
                                    <button class="selectALL" on:click={handleToggleAllSample}>
                                        {selected_sampleId_list.length === sample_list.length? '取消':'全选'}
                                    </button>
                                </th>
                            </tr>
                        </table>
                        <div class="tableContent">
                            <table class="sampleTable ">
                                {#each sample_list as sample}
                                    <tr on:click={()=>handleSelectSample(sample[dict.ID])}>
                                        <td class="sampleSn">{sample.sampleSn}</td>
                                        <td class="total">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.ALLMUT]:''}</td>
                                        <td class="submitedAndAffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.S_AMUT]:''}</td>
                                        <td class="unsubmitedAndAffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.US_AMUT]:''}</td>
                                        <td class="unsubmitedAndUnaffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.US_UAMUT]:''}</td>
                                        <td class="tick">
                                            <button class="selectOne {selected_sampleId_list.indexOf(sample.id)>-1?'icon-checkbox-checked':
                                                'icon-checkbox-unchecked'}"></button>
                                        </td>
                                    </tr>
                                {/each}
                            </table>
                        </div>
                    </div><!--leftSampleTableWrapper-->
                    <div class="leftMessageWrapper">
                        <div class="messageWrapper">
                            <div class="title">
                            </div>
                            <div class="uploadButtomWrapper">

                            </div>

                        </div>
                    </div>
                    <div class="leftSelectFileWrapper">
                        <div class="selectFile">

                        </div>
                        <div class="fileList">

                        </div>
                    </div>

                    <div class="leftButtomWrapper">
                    </div>
                </div>
            {/if}

            <div class="contentRight">
                <div class="dataWrapper">
                    <div class="titleTableWrapper" bind:this={topScroll} on:scroll={()=>handleScroll(dict.TOPSCROLL)} >
                        <table class="rightDataTable">
                            <tr class="lineTitle">
                                <th class="logs">全部日志</th>
                                <th class="done">已经提交</th>
                                <th class="affirmed">确认审核</th>
                                <th class="delete">删除此行</th>
                                {#each all_allFieldDisplayList_dict[params.type] as field}
                                    <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                {/each}
                            </tr>
                        </table><!--rightDataTable-->
                    </div><!--titleTableWrapper-->
                    <div class="dataTableWrapper" bind:this={bottomScroll} on:scroll={()=>handleScroll(dict.BOTTOMSCROLL)} >
                        <table class="rightDataTable">
                            {#each now_page_data as line_data, index}
                                <tr class="lineData">
                                    <td class="logs">全部记录</td>
                                    <td class="done">已经提交</td>
                                    <td class="affirmed">确认审核</td>
                                    <td class="delete">删除此行</td>
                                    {#each all_allFieldDisplayList_dict[params.type] as field}
                                        <td class="{field[dict.TITLE]}"
                                            title="实时数据：{line_data[field[dict.TITLE]]}{field[dict.TITLE]==='sampleSn'?' '+line_data[dict.ID]:''}"
                                        >
                                            <div class="inside">{line_data[field[dict.TITLE]]}</div>
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        </table><!--rightDataTable-->
                    </div><!--dataTableWrapper-->
                    <div class="dataPagerWrapper">
                        <Page page={all_query_params_dict[params.type][dict.PAGE]}
                              totalPage={total_page_nums}
                              currentPageSize={all_query_params_dict[params.type][dict.PAGE_SIZE]}
                              on:changePageSize={handleChangePageSize}
                              on:changePage={handleChangePage}></Page>
                    </div><!--dataPagerWrapper-->
                </div><!--dataWrapper-->

            </div><!--contentRight-->
        </div> <!--middleContent-->
    </div> <!--midRight-->
</div> <!--middle-->

{#if loadingShow}
    <Loading></Loading>
{/if}

<script>
    //引入svelte相关包
    import {onMount, onDestroy, createEventDispatcher, beforeUpdate, afterUpdate} from 'svelte'
    const dispatch = createEventDispatcher()
    import {push} from 'svelte-spa-router'

    //引入svelte的store
    import {userInfo} from '../../store/store'

    // 引入组件
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    import Loading from '../../components/Loading/Loading.svelte'
    import Page from '../../components/Page/Page3.svelte'


    // 引入本地脚本
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {
        removeFromUniqueArray,
        ifContentEqualArrays,
        arrayToDict
    } from '../../utils/arrays'
    import {getTime, getParentNodeByParentClassName} from "../../utils/common";
    import {sheetDisplayConfigList, filterSelectionsConfig} from './config'
    const sheetDisplayConfigDict = JSON.parse(JSON.stringify(arrayToDict(sheetDisplayConfigList, 'sheet')))

    // 引入electron相关包
    // const { ipcRenderer, remote } =window.require('electron')
    // const {exec, execSync} = window.require('child_process')
    // const iconv = window.require('iconv-lite');
    // const Store = window.require('electron-store')
    // const settingsStore = new Store({name: 'Settings'})

    let dict = {
        SAMPLEINFOINPANAL: "sampleInfoInPanal",
        SHEET: 'sheet', SUBMENU_TRANSLATE: "submenu_translate", QUERY_PARAMS: "query_params",
        PARAM: 'param', SEARCH: 'search',
        ID: 'id', SAMPLE: 'sample', SAMPLESN: 'sampleSn',  TITLE_LIST: 'title_list',
        PAGE: 'page', PAGE_SIZE: 'page_size', SAMPLEID: 'sampleID', SAMPLEIDS: 'sampleIds', PANALID: 'panalId',
        TITLE: 'title', TRANSLATE: 'translate',
        TYPE: 'type',
        TOPSCROLL: 'topScroll', BOTTOMSCROLL: 'bottomScroll',
        ALLMUT: 'allMut', S_AMUT: "subAndAffMut", US_AMUT: 'unsubAndAffMut', US_UAMUT: 'unsubAndUnaffMut',
        DONE: 'done', LOGSEDIT: 'logsEdit', ORDERING: 'ordering', EXONICFUNCREFGENE: 'exonicfuncRefgene',
        SAMPLEID2UNDERLINE: 'sample__id', DONE: 'done', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
        TARGET: "target", HEREDITARY: "hereditary", TMB: "TMB",
    }
    // 获取路径中的：值
    export let params = {}

    // 控制loading页面的显示
    let loadingShow = false

    // 提示错误信息
    let errors = ''

    // 控制右侧的标题和下面mutant内容的联动
    let topScroll
    let bottomScroll
    function handleScroll(item){
        // console.log(topScroll.scrollLeft)
        if (item === dict.TOPSCROLL) {
            bottomScroll.scrollTo(topScroll.scrollLeft, 0)
        }else if (item === dict.BOTTOMSCROLL) {
            topScroll.scrollTo(bottomScroll.scrollLeft, 0)
        }
    }

    // 当前页面信息
    let now_page_data = []


    // 先前的页面type
    let pre_params_type
    // 判断参数表中是否有panalId的信息，如果没有为第一次加载，手工添加
    function __addPanalIDIfFirstLoad(){
        if (!all_query_params_dict[params.type][dict.PANALID]){
            // console.log("__getPageData empty")
            all_query_params_dict[params.type][dict.PANALID] = params[dict.PANALID]
        }
    }
    function __updateTotalPageNums(){
        // console.log("__updateTotalPageNums", data_count, all_query_params_dict[params.type][dict.PAGE_SIZE])
        total_page_nums = Math.ceil(data_count/all_query_params_dict[params.type][dict.PAGE_SIZE])
    }
    // 根据all_query_params_dict[params.type]， 当前页名，获取当前页所有信息
    async function getPageData () {
        loadingShow = true

        // 第一次切换到mutant上加载，还没有更新获得panalId和sampleIds参数
        __addPanalIDIfFirstLoad()

        let success = false

        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        // console.log("__getPageData upperQueryName params", name, all_query_params_dict[params.type])

        await api[`list${name}`](all_query_params_dict[params.type]).then(response=>{
            // console.log("__getPageData", response.data)
            now_page_data = response.data.results
            // console.log("__getPageData now_page_data", now_page_data)

            // 更新当前页data_num
            data_count = response.data.count

            success = true

        }).catch(error=>{
            console.log("__getPageData", error)
        })

        if(success){
            // 更新totalPageNums
            __updateTotalPageNums()
        }
        loadingShow = false
    }
    // 动态更新当前页面信息
    $: if (pre_params_type !== params.type) {
        // console.log('listem params.type 先前params.type 现在params.tpe', pre_params_type, params.type)
        getPageData()
    }

    // submenu列表(即sheet页，含附加的汇总表）
    let submenu_list = JSON.parse(JSON.stringify(sheetDisplayConfigList.map(item=>item.sheet)))
    let submenu_translate_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.SUBMENU_TRANSLATE]
        return result
    }, {})))
    // submenu选择
    function handleSelectSubmenu(type){
        if (type===params.type) return
        // 只切换路由，数据没有自动刷新啊！！
        pre_params_type = params.type
        push(`/${type}/${params.panalId}`)
    }

    // 每张表，除开通用的page，page_size, sampleIds，panalId, search，构建每个筛选的实例
    let all_specific_filters = {}

    // 获取sheet页的页面参数字典
    let all_query_params_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let params = item[dict.QUERY_PARAMS].reduce((param_dict, param)=>{
            switch (param) {
                case dict.PAGE:
                    param_dict[param] = 1
                    break
                case dict.PAGE_SIZE:
                    param_dict[param] = 20
                    break
                case dict.SEARCH:
                    param_dict[param] = item[dict.SHEET]
                    break
                default:
                    param_dict[param] = null
            }

            return param_dict
        }, {})
        result[item[dict.SHEET]] = params
        return result
    }, {})))

    // 当前页面数据的总条数 todo 需要手动更新
    let data_count
    // 当前总页数
    let total_page_nums

    function handleChangePageSize(event){
        // console.log("handleChangePageSize", event.detail.pageSize)
        all_query_params_dict[params.type][dict.PAGE_SIZE] = event.detail.pageSize

        // 当前sheet的totalPageNums更新，data_num固定，但是当前页page_size生了变化！
        __updateTotalPageNums()
        // 当前sheet的nowPageNum设置为1，返回第一页
        all_query_params_dict[params.type][dict.PAGE] = 1
        getPageData()
    }
    function handleChangePage(event){
        // console.log("handleChangePage", event.detail.page)

        all_query_params_dict[params.type][dict.PAGE] = event.detail.page
        getPageData()
    }

    // 整个表的sampleId的列表
    let sample_list = []
    // sampleSn对应sampleId
    let sampleSn_dict = {}
    // 选中的样本id列表
    let selected_sampleId_list = []

    let sheets_needSamplRecordDict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        if (!item.ifNotNeedSampleRecordDict) result.push(item[dict.SHEET])
        return result
    },[])))
    // 统计每页sampleId为key，包含sampleSn，总数，未审核，未提交等的每个sample的总数
    let all_sample_record_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        if (!item.ifNotNeedSampleRecordDict) {
            result[item[dict.SHEET]] = {}
        }
        return result
    }, {})))
    // 加载初始化
    function __setSampleIdList_and_AllSampleRecordDict__allSpecificFilters(data){
        //1） 更新sample_list
        let sampleInfoInPanals = data.sampleInfoInPanals
        sample_list = JSON.parse(JSON.stringify(sampleInfoInPanals.map(sampleInfoInPanal=>{
            return {
                id: sampleInfoInPanal[dict.SAMPLE][dict.ID],
                sampleSn: sampleInfoInPanal[dict.SAMPLE][dict.SAMPLESN]
            }
        })))

        // 顺便
        selected_sampleId_list = JSON.parse(JSON.stringify(sample_list.map(sample=>sample[dict.ID])))

        // 顺便
        sampleSn_dict = JSON.parse(JSON.stringify(sampleInfoInPanals.reduce((result, sampleInfoInPanal)=>{
            result[sampleInfoInPanal[dict.SAMPLE][dict.SAMPLESN]] = sampleInfoInPanal[dict.SAMPLE][dict.ID]
            return result
        }, {})))

        // 更新all_sample_record_dict
        for (let sheet in all_sample_record_dict) {
            all_sample_record_dict[sheet] = JSON.parse(JSON.stringify(sampleInfoInPanals.reduce((result, sampleInfoInPanal)=>{
                result[sampleInfoInPanal[dict.SAMPLE][dict.ID]] = {
                    allMut: parseInt(sampleInfoInPanal[`${sheet}Count`]),
                    subAndAffMut: parseInt(sampleInfoInPanal[`${sheet}SubmitCount`]),
                    unsubAndAffMut: 0,
                    unsubAndUnaffMut: parseInt(sampleInfoInPanal[`${sheet}Count`]) - parseInt(sampleInfoInPanal[`${sheet}SubmitCount`])
                }
                return result
            }, {})))
        }

        // 3) 更新all_specific_filters
        // 先更新all_exonicfuncRefgenes中三张表
        for (let type of [dict.TARGET, dict.HEREDITARY, dict.TMB]) {
            let values = data[`${type.toLowerCase()}_exonicfuncRefgenes`]
            // 如果没有，就不麻烦添加表了
            if (values) {
                let value_list = values.split(';')
                let new_params = value_list.map(value=>({
                    value: value,
                    content: value
                }))
                all_exonicfuncRefgenes[type] = [all_exonicfuncRefgenes[type][0], ...new_params]
            }
        }

        all_specific_filters = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result,item)=>{
            let sheet = item[dict.SHEET]
            let specific_found = false
            let specific_params = []
            for (let param of item[dict.QUERY_PARAMS]) {
                if ([dict.PAGE, dict.PAGE_SIZE, dict.SAMPLEIDS, dict.PANALID, dict.SEARCH].indexOf(param)===-1) {
                    specific_found = true
                    specific_params.push(param)
                }
            }
            if (specific_found) {
                result[sheet] = {}
                for (let param of specific_params) {
                    switch (param) {
                        case dict.DONE:
                            result[sheet][param] = new DoneFilter()
                            break
                        case dict.LOGSEDIT:
                            result[sheet][param] = new LogsEditFilter()
                            break
                        case dict.ORDERING:
                            result[sheet][param] = new OrderingFilter()
                            break
                        case dict.EXONICFUNCREFGENE:
                            result[sheet][param] = all_exonicfuncRefgenes[sheet]?
                                    new ExonicfuncRefgeneFilter(all_exonicfuncRefgenes[sheet]) : null
                            break
                        default:
                            break
                    }
                }
            }
            return result
        }, {})))



    }


    // 处理sample样品全选、取消全选的切换
    async function handleToggleAllSample(){
        loadingShow = true

        if (selected_sampleId_list.length !== sample_list.length) {
            selected_sampleId_list =  sample_list.map(item => item[dict.ID])

            //更新当前sampleIds查询参数
            all_query_params_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }else{
            selected_sampleId_list = []

            //更新当前sampleIds查询参数, 如果不设置就是&sampleIds=&, 返回的还是全部数据
            all_query_params_dict[params.type][dict.SAMPLEIDS] = 0
        }

        // 切换回第一页
        all_query_params_dict[params.type][dict.PAGE] = 1

        await getPageData()

        loadingShow = false
    }
    // 处理sample样品单独选择
    async function handleSelectSample(sample_id) {
        // console.log('handleSelectSample ' + sample_id)
        loadingShow = true

        if (selected_sampleId_list.indexOf(sample_id)===-1) {
            selected_sampleId_list.push(sample_id)
            selected_sampleId_list = selected_sampleId_list.sort((a, b)=>{return(a-b)})
        }else{
            selected_sampleId_list = removeFromUniqueArray(selected_sampleId_list, sample_id)
        }

        //更新当前sampleIds查询参数
        if (selected_sampleId_list.length === 0){
            all_query_params_dict[params.type][dict.SAMPLEIDS] = 0
        }else{
            all_query_params_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }

        // 切换回第一页
        all_query_params_dict[params.type][dict.PAGE] = 1

        await getPageData()

        loadingShow = false
    }

    // 三张表筛选用的selections
    let all_exonicfuncRefgenes = {
        target: [{value: null, content: "突变方式(全选)"}],
        hereditary: [{value: null, content: "突变方式(全选)"}],
        TMB: [{value: null, content: "突变方式(全选)"}]
    }
    // 页面筛选相关done，logsEdit， ordering， exonicfuncRefGene的类函数
    // svelte不支持es7语法，貌似无static
    class DoneFilter {
        constructor() {
            this.selections = JSON.parse(JSON.stringify(filterSelectionsConfig[dict.DONE]))
            this.selections_len = filterSelectionsConfig[dict.DONE].length
            this.now_id = 0
        }
        toggleNowId (){
            this.now_id = (this.now_id + 1)%this.selections_len
        }
        getValue () {
            return this.selections[this.now_id].value
        }
        getContent () {
            return this.selections[this.now_id].content
        }
    }
    class LogsEditFilter {
        constructor() {
            this.selections = JSON.parse(JSON.stringify(filterSelectionsConfig[dict.LOGSEDIT]))
            this.selections_len = filterSelectionsConfig[dict.LOGSEDIT].length
            this.now_id = 0
        }
        toggleNowId (){
            this.now_id = (this.now_id + 1)%this.selections_len
        }
        getValue () {
            return this.selections[this.now_id].value
        }
        getContent () {
            return this.selections[this.now_id].content
        }
    }
    class OrderingFilter {
        constructor() {
            this.selections_dict = JSON.parse(JSON.stringify(filterSelectionsConfig[dict.ORDERING]))
            this.selections_lens = Object.keys(filterSelectionsConfig[dict.ORDERING]).reduce((result, key)=>{
                result[key] = filterSelectionsConfig[dict.ORDERING][key].length
                return result
            }, {})
            this.now_ids = Object.keys(filterSelectionsConfig[dict.ORDERING]).reduce((result, key)=>{
                result[key] = 0
                return result
            }, {})
        }
        toggleNowId (type) {
            this.now_ids[type] = (this.now_ids[type] + 1)%this.selections_lens[type]
        }
        getValue (type) {
            return this.selections_dict[type][this.now_ids[type]].value
        }
        getContent (type) {
            return this.selections_dict[type][this.now_ids[type]].content
        }
        getALLValues(){
            let values = []
            for (let key in this.selections_dict) {
                values.push(this.selections_dict[key][this.now_ids[key]].value)
            }
            return values.join(',')
        }
    }
    class ExonicfuncRefgeneFilter {
        constructor(selections) {
            this.selections = selections
            this.selections_len = selections.length
            this.now_id = 0
        }
        toggleNowId (){
            this.now_id = (this.now_id + 1)%this.selections_len
        }
        getValue () {
            return this.selections[this.now_id].value
        }
        getContent () {
            return this.selections[this.now_id].content
        }
    }


    //标题相关参数
    let all_allFieldDisplayList_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].map(title_list_item=>(
                {
                    title: title_list_item[dict.TITLE],
                    translate: title_list_item[dict.TRANSLATE]
                }
        ))
        return result
    }, {})))




    // 获取所有样本的id和sampleSn信息
    async function getSampleList(){
        loadingShow = true

        await api.retrievePanal(params.panalId).then(response=>{
            // console.log("getPanalSummary", response.data)

            // 初始化sampleId_list, 利用sampleInfoInPanals中样本信息，对手工表All_sample_record_dict初始化
            __setSampleIdList_and_AllSampleRecordDict__allSpecificFilters(response.data)

        }).catch(error=>{
            console.log("getPanalSummary", error)
        })

        loadingShow = false
    }

    // 更新所有页面查询的panalId, sampleIds参数
    function updatePanalIdAndSampleIdsParams() {
        for (let sheet_name in all_query_params_dict ){
            all_query_params_dict[sheet_name][dict.PANALID] = parseInt(params[dict.PANALID])
            all_query_params_dict[sheet_name][dict.SAMPLEIDS] = sample_list.map(item=>item[dict.ID]).join(',')
        }
    }


    onMount(async () => {
        pre_params_type = params.type

        // 获取样本列表
        await getSampleList()
        // 更新所有页面查询的panalId, sampleIds参数
        updatePanalIdAndSampleIdsParams()
    })


    // 测试使用
    function test() {
        // console.log(whole_panal_infoList_dict)
        // console.log(sample_list, sampleSn_dict)
        // console.log(all_query_params_dict)
        // console.log(now_page_data)
        // console.log(all_sample_record_dict)

        // let ordering =  new OrderingFilter()
        // console.log(ordering.getValue(dict.SAMPLEID2UNDERLINE), ordering.getContent(dict.SAMPLEID2UNDERLINE), ordering.getALLValues())
        // ordering.toggleNowId(dict.SAMPLEID2UNDERLINE)
        // console.log(ordering.getValue(dict.SAMPLEID2UNDERLINE), ordering.getContent(dict.SAMPLEID2UNDERLINE), ordering.getALLValues())

        // let exonic = new ExonicfuncRefgeneFilter(all_exonicfuncRefgenes.target)
        // console.log(exonic.getValue())
        // exonic.toggleNowId()
        // console.log(exonic.getValue())
        console.log(all_specific_filters)
    }
</script>

<style>

    /*TODO 高度需要好LeftMenus中高度一致 */
    .middle{
        width: 100%;
        min-height: 900px;
        border: 1px solid black;
        display: flex;
    }

    .midRight{
        /* todo 这里必须填写 width: 0;，不然下面submenu无法左右移动了 */
        width: 0;
        flex: 1;
        display: flex;
        flex-flow: column;
    }
    .subMenu{
        flex: 0 0 55px;
        border-bottom: 1px solid black;
        overflow-x: scroll;
        overflow-y: hidden;
    }
    .subMenu .subMenuWrapper{
        min-width: 1500px;
    }
    .subMenu .test{
        padding: 0;
        margin: 0;
        width: 60px;
        height: 30px;
        line-height: 30px;
    }
    .subMenu .selectedSubMenu{
        box-shadow: 3px 3px 3px black;
    }
    .subMenu .submenuBtn{
        margin: 5px 3px;
        padding: 0;
        width: 85px;
        height: 26px;
        line-height: 26px;
        font-size: 15px;
        color: white;
        text-align: center;
        background: #69ca60;
        border-left: 1px solid #555555;
        border-top: 1px solid #555555;
        border-right: 3px solid black;
        border-bottom: 3px solid black;
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
        position: relative;
        flex: 0 0 308px;
        display: flex;
        flex-flow: column;
        border-right: 1px solid black;
        overflow-x: hidden;
        overflow-y: hidden;
        /*box-shadow: -3px -3px 8px black inset;*/
    }
    .navLeft .divider{
        position: absolute;
        top: 0;
        right: 0px;
        width: 6px;
        height: 100%;
        background: #cccccc;
    }
    .navLeft .leftMessage{
        flex: 0 0 20px;
        width: 308px;
        line-height: 20px;
        padding: 5px;
        text-align: left;
        font-size: 12px;
        color: orangered;
        border-bottom: 1px solid black;
    }
    .navLeft .leftSampleTableWrapper{
        flex: 0 0 200px;
        width: 308px;
        padding: 3px;
        border-bottom: 1px solid black;
    }

    .navLeft .leftSampleTableWrapper .sampleTable{
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
    .navLeft .leftSampleTableWrapper .sampleTable th{
        width: 35px;
        height: 32px;
        padding: 0;
        margin: 0;
        border-left: 1px solid #cccccc;
        border-bottom: 3px solid #cccccc;
        box-sizing: border-box;
    }
    .navLeft .leftSampleTableWrapper .sampleTable td{
        width: 35px;
        height: 30px;
        padding: 0;
        margin: 0;
        border-left: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;
    }
    .navLeft .leftSampleTableWrapper .sampleTable .sampleSn{
        width: 105px!important;
    }
    .navLeft .leftSampleTableWrapper .sampleTable .selectALL, .navLeft .leftSampleTableWrapper .sampleTable .selectOne{
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
    .navLeft .leftSampleTableWrapper .sampleTable .selectALL:hover{
        background: #09c762;
        color: white;
    }

    .navLeft .leftSampleTableWrapper .tableContent{
        width: 298px;
        height: 165px;
        overflow-y: scroll;
    }
    .navLeft .leftSampleTableWrapper .tableContent tr:hover{
        background: #09c762;
    }
    .navLeft .leftSampleTableWrapper .tableContent .tick .selectOne{
        background: none!important;
        font-weight: normal!important;
    }

    .navLeft .leftMessageWrapper{
        flex: 0 0 228px;
        width: 308px;
        border-bottom: 1px solid black;
    }
    .navLeft .leftMessageWrapper .messageWrapper{
        margin: 3px;
    }
    .navLeft .leftMessageWrapper .messageWrapper .title{
        padding: 5px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        border-bottom: 1px solid #cccccc;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadButtomWrapper{
        height: 182px
    }

    .navLeft .leftMessageWrapper .messageWrapper .uploadMessage{
        height: 190px;
        width: 240px;
        font-size: 12px;
        overflow-y: scroll;
        float: left;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper{
        width: 62px;
        float: left;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper button{
        margin: 3px 3px 0 3px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 54px;
        font-size: 12px;
        font-weight: bold;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper button.disabled{
        color: #cccccc;
        font-weight: normal;
    }

    .leftSelectFileWrapper{
        flex: 0 0 150px;
        width: 308px;
        border-bottom: 1px solid black;
    }
    .leftSelectFileWrapper .selectFile{
        padding: 3px;
        height: 30px;
        width: 300px;
        line-height: 30px;
        font-size: 12px;
        border-bottom: 1px solid #cccccc;
    }
    .leftSelectFileWrapper input{
        padding: 0;
        width: 72px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: none;
    }
    .leftSelectFileWrapper .selectFile button{
          padding: 0;
          margin: 3px;
          width: 40px;
          height: 24px;
          line-height: 24px;
          float: right;
    }
    .leftSelectFileWrapper .selectFile button:hover{
        background: #09c762;
    }
    .leftSelectFileWrapper .fileList{
        height: 107px;
        width: 308px;
        margin: 3px;
        overflow-y: scroll;
    }
    .leftSelectFileWrapper .fileList .sampleSn{
        margin: 3px 4px;
        width: 130px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #cccccc;
        font-size: 12px;
        text-align: center;
        float: left;
    }

    .leftButtomWrapper{
        margin: 3px;
        width: 308px;
        flex: 1;
    }
    .leftButtomWrapper .copy{
        margin: 0;
        padding: 0;
        height: 30px;
        line-height: 30px;
        width: 60px;
        font-size: 12px;
    }


    .contentRight{
        /* TODO 此处必须要加这个0，不然table无法滚动 TODO */
        width: 0;
        flex: 1;
        display: flex;
        flex-flow: column;
    }

    .contentRight .dataWrapper{
        position: relative;
        flex: 1;
        height: 100%;
        padding: 3px;
        border-bottom: 1px solid #cccccc;
        display: flex;
        flex-flow: column;
        box-sizing: border-box;
    }

    .contentRight .titleTableWrapper{
        overflow: scroll;
        flex: 0 0 51px;
    }

    .contentRight .dataTableWrapper{
        overflow: scroll;
        flex: 0 0 718px;
    }

    .contentRight .rightDataTable{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        /*固定td宽度*/
        table-layout: fixed;
        /*word-break: break-all;*/
    }
    .contentRight .rightDataTable>tr>th, .contentRight .rightDataTable>tr>td{
        height: 36px;
        box-sizing: border-box;
        padding-top: 0;
        padding-bottom: 0;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        min-width: 120px;
    }
    .contentRight .rightDataTable .lineData td .inside{
        width: 119px;
        line-height: 35px;
        box-sizing: border-box;
        padding: 0 3px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .contentRight .rightDataTable .logs{
        min-width: 35px!important;
        max-width: 35px;
    }
    .contentRight .rightDataTable .done{
        min-width: 35px!important;
        max-width: 35px;
    }
    .contentRight .rightDataTable .affirmed{
        min-width: 35px!important;
        max-width: 35px;
    }
    .contentRight .rightDataTable .delete{
        min-width: 60px!important;
        max-width: 60px;
    }
    .contentRight .rightDataTable {

    }

    .contentRight .dataPagerWrapper{
        flex: 1;
    }
</style>
