<!--<Header></Header>-->

<div class="middle"

>
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <div class="subMenuWrapper">
                {#each submenu_list as submenu}
                    <button class="submenuBtn {params.type===submenu?'selectedSubMenu':''}"
                            on:click={()=>handleSelectSubmenu(submenu)}
                    >
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
                                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                                    <th class="logs hoverGreen"
                                        on:click={()=>handleToggleFilter(dict.LOGSEDIT)}
                                    >
                                        {subFilter_selections_dict[dict.LOGSEDIT][all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]][dict.CONTENT]}
                                    </th>
                                {/if}
                                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.DONE) !== -1}
                                    <th class="done hoverGreen"
                                        on:click={()=>handleToggleFilter(dict.DONE)}
                                    >
                                        {subFilter_selections_dict[dict.DONE][all_subFilter_indexes_dict[params.type][dict.DONE][0]][dict.CONTENT]}
                                    </th>
                                {/if}
                                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.DONE) !== -1}
                                    <th class="affirmed">确认审核</th>
                                {/if}
                                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                                    <th class="delete">删除此行</th>
                                {/if}

                                {#each all_allFieldDisplayList_dict[params.type] as field}
                                    {#if field[dict.TITLE]===dict.SAMPLESN}
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="sampleSn hoverGreen" on:click={()=>handleToggleFilter(dict.SAMPLEID2UNDERLINE)}>
                                                {@html subFilter_selections_dict[dict.SAMPLEID2UNDERLINE][all_subFilter_indexes_dict[params.type][dict.ORDERING][0]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field[dict.TITLE]===dict.CHR &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="chr hoverGreen" on:click={()=>handleToggleFilter(dict.CHR)}>
                                                {@html subFilter_selections_dict[dict.CHR][all_subFilter_indexes_dict[params.type][dict.ORDERING][1]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field[dict.TITLE]===dict.POSSTART &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="posStart hoverGreen" on:click={()=>handleToggleFilter(dict.POSSTART)}>
                                                {@html subFilter_selections_dict[dict.POSSTART][all_subFilter_indexes_dict[params.type][dict.ORDERING][2]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field[dict.TITLE]===dict.POSEND &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="posEnd hoverGreen" on:click={()=>handleToggleFilter(dict.POSEND)}>
                                                {@html subFilter_selections_dict[dict.POSEND][all_subFilter_indexes_dict[params.type][dict.ORDERING][3]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field[dict.TITLE]===dict.EXONICFUNCREFGENE &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.EXONICFUNCREFGENE) > -1
                                    }
                                        <th class="exonicfuncRefgene" >
                                            <select bind:this={exonicfuncRefgeneSelection}
                                                    on:change="{(e) => change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict(e.target.value)}"
                                                    class="inside"
                                            >
                                                {#each subFilter_selections_dict[`${params.type.toLowerCase()}_exonicfuncRefgene`] as selection, index}
                                                    <option value={index}>
                                                        {selection[dict.CONTENT]}
                                                    </option>
                                                {/each}
                                            </select>
                                        </th>
                                    {:else}
                                        <th class="{field[dict.TITLE]}">{field[dict.TRANSLATE]}</th>
                                    {/if}
                                {/each}
                            </tr>
                        </table><!--rightDataTable-->
                    </div><!--titleTableWrapper-->
                    <div class="dataTableWrapper" bind:this={bottomScroll} on:scroll={()=>handleScroll(dict.BOTTOMSCROLL)} >
                        <table class="rightDataTable">
                            {#each now_page_data as line_data, index}
                                <tr class="lineData">
                                    {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.DONE) !== -1}
                                        <td class="logs">全部记录</td>
                                        <td class="done">已经提交</td>
                                        <td class="affirmed">确认审核</td>
                                        <td class="delete">删除此行</td>
                                    {/if}

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
                        <Page page={all_searchParams_dict[params.type][dict.PAGE]}
                              totalPage={total_page_nums}
                              currentPageSize={all_searchParams_dict[params.type][dict.PAGE_SIZE]}
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
    import {common_filters, sheetDisplayConfigList, common_filter_subFilters_dict, common_subFilter_selections_dict} from './config'
    const sheetDisplayConfigDict = JSON.parse(JSON.stringify(arrayToDict(sheetDisplayConfigList, 'sheet')))

    // 引入electron相关包
    // const { ipcRenderer, remote } =window.require('electron')
    // const {exec, execSync} = window.require('child_process')
    // const iconv = window.require('iconv-lite');
    // const Store = window.require('electron-store')
    // const settingsStore = new Store({name: 'Settings'})

    let dict = {
        SAMPLEINFOINPANAL: "sampleInfoInPanal",
        SHEET: 'sheet', SUBMENU_TRANSLATE: "submenu_translate", FILTERS: "filters",
        PARAM: 'param', SEARCH: 'search',
        ID: 'id', SAMPLE: 'sample', SAMPLESN: 'sampleSn',  TITLE_LIST: 'title_list',
        PAGE: 'page', PAGE_SIZE: 'page_size', SAMPLEID: 'sampleID', SAMPLEIDS: 'sampleIds', PANALID: 'panalId',
        TITLE: 'title', TRANSLATE: 'translate',
        TYPE: 'type', CONTENT: 'content', VALUE: 'value',
        TOPSCROLL: 'topScroll', BOTTOMSCROLL: 'bottomScroll',
        ALLMUT: 'allMut', S_AMUT: "subAndAffMut", US_AMUT: 'unsubAndAffMut', US_UAMUT: 'unsubAndUnaffMut',
        DONE: 'done', LOGSEDIT: 'logsEdit', ORDERING: 'ordering', EXONICFUNCREFGENE: 'exonicfuncRefgene',
        SAMPLEID2UNDERLINE: 'sample__id', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
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
        if (!all_searchParams_dict[params.type][dict.PANALID]){
            // console.log("__getPageData empty")
            all_searchParams_dict[params.type][dict.PANALID] = params[dict.PANALID]
        }
    }
    function __updateTotalPageNums(){
        console.log("__updateTotalPageNums", data_count)
        total_page_nums = Math.ceil(data_count/all_searchParams_dict[params.type][dict.PAGE_SIZE])
        console.log("__updateTotalPageNums", total_page_nums)

    }
    // 根据all_query_params_dict[params.type]， 当前页名，获取当前页所有信息
    async function __getPageData () {
        console.log('__getPageData begin')
        loadingShow = true

        // 第一次切换到mutant上加载，还没有更新获得panalId和sampleIds参数
        __addPanalIDIfFirstLoad()

        let success = false

        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        console.log("__getPageData upperQueryName params", name)

        await api[`list${name}`](all_searchParams_dict[params.type]).then(response=>{
            console.log("__getPageData", response.data)
            now_page_data = response.data.results
            console.log("__getPageData now_page_data", now_page_data)

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
    // 1) 每页的filter的定制版subFilters的名字列表，因为三张mutant表的exonicfuncRefGene
    let all_subFilter_names_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        // result[sheet] = JSON.parse(JSON.stringify(sheetDisplayConfigDict[params.type][dict.FILTERS].reduce((filters_result, filter_name)=>{
        //     filters_result[filter_name] = common_filter_subFilters_dict[filter_name]
        //     return filters_result
        // }, {})))
        result[sheet] = JSON.parse(JSON.stringify(common_filter_subFilters_dict))
        // 若果此表是简化版本的ordering，就重置此表ordering
        if (item.ifSimpleOrdering) {
            result[sheet][dict.ORDERING] = [dict.SAMPLEID2UNDERLINE]
        }

        // console.log("all_subFilter_names_dict", result)
        // 此时target_exonicfuncRefgene的subFilter_selections还没有获得，不要在此处先创造了！
        return result
    }, {})))
    // 2) todo 必须先重置all_subFilters_dict, 因为ordering有些是简化的，只含sample__id
    //  然后每张表，除开通用的page，page_size, sampleIds，panalId, search，构建每个亚级筛选项的所选项目的index
    let all_subFilter_indexes_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        let specific_found = false
        let specific_filters = []
        for (let filter of item[dict.FILTERS]) {
            if (common_filters.indexOf(filter)===-1) {
                specific_found = true
                specific_filters.push(filter)
            }
        }
        if (specific_found) {
            result[sheet] = {}
            console.log('all_subFilter_indexes_dict', sheet, specific_filters, all_subFilter_names_dict[sheet])
            for (let filter of specific_filters) {
                console.log('all_subFilter_indexes_dict', filter)
                console.log('all_subFilter_indexes_dict', all_subFilter_names_dict[sheet][filter].length)
                result[sheet][filter] = Array(all_subFilter_names_dict[sheet][filter].length).fill(0)
            }
        }
        return result
    }, {})))
    // 获取sheet页的页面筛选参数字典，获取当前页内容时直接调取即可！！
    let all_searchParams_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let params = item[dict.FILTERS].reduce((param_dict, param)=>{
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

    // 每页的subFilters的定制版选项列表，再追加三张mutant的exonicfuncRefGene项目列表
    let subFilter_selections_dict = JSON.parse(JSON.stringify(common_subFilter_selections_dict))
    // 页面筛选相关done，logsEdit， ordering， exonicfuncRefGene的类函数
    // todo svelte不支持es7语法，貌似无static, svelte无法获取实例的方法，只有变量可以加载到
    // todo svelte不支持，感觉框架结构就不应该再使用类管理了！！
    // class LogsEditFilter {
    //     constructor() {
    //         this.selections = JSON.parse(JSON.stringify(filterSelectionsConfig[dict.LOGSEDIT]))
    //         this.selections_len = filterSelectionsConfig[dict.LOGSEDIT].length
    //         this.now_id = 0
    //     }
    //
    //     toggleNowId () {
    //         this.now_id = (this.now_id + 1)%this.selections_len
    //     }
    // }
    function __set_specfic_Params_in_AllSearchParamsDict() {
        // 因为都是筛选，页面先设置为1
        all_searchParams_dict[params.type][dict.PAGE] = 1

        // sheet为页面
        for(let sheet in all_subFilter_indexes_dict){
            let subFilter_indexes = all_subFilter_indexes_dict[sheet]
            // filter为筛选项的大名， ordering: [0, 0, 0, 0]
            for(let filter in subFilter_indexes) {
                let indexes = subFilter_indexes[filter]
                let value_list = []
                let i = 0
                for (let index of indexes) {
                    // all_subFilters_dict , 页下面，是ordering：['sample__id', 'chr', 'posStart', 'posEnd'],
                    // 通过位置i信息，获取此位置subFilter的名称
                    let subFilter_name = all_subFilter_names_dict[sheet][filter][i]
                    let value = subFilter_selections_dict[subFilter_name][index][dict.VALUE]
                    value_list.push(value)

                    i= i+1
                }
                // console.log("__set_Params_in_AllSearchParamsDict", sheet, filter, value_list)
                if (value_list.length === 1){
                    all_searchParams_dict[sheet][filter] = value_list[0]
                }else{
                    all_searchParams_dict[sheet][filter] = value_list.join(',')
                }
            }

        }
    }
    // 切换filter的项
    async function handleToggleFilter(subFilter){
        // console.log("handleToggleFilter", type)
        loadingShow = true
        let found_filter_name
        let found_subFilter_index
        for (let filter_name in all_subFilter_names_dict[params.type]){
            let subFilter_name_list = all_subFilter_names_dict[params.type][filter_name]
            if (subFilter_name_list.indexOf(subFilter) > -1) {
                found_filter_name = filter_name
                found_subFilter_index = subFilter_name_list.indexOf(subFilter)
                break
            }
        }
        // console.log('handleToggleFilter', found_filter_name, found_subFilter_index)

        let index = all_subFilter_indexes_dict[params.type][found_filter_name][found_subFilter_index]
        let new_index = (index+1)%subFilter_selections_dict[subFilter].length
        all_subFilter_indexes_dict[params.type][found_filter_name][found_subFilter_index] = new_index

        // 其中包含，页面切换回第一页
        __set_specfic_Params_in_AllSearchParamsDict()
        await __getPageData()

        loadingShow = false
    }
    // 用于绑定exonicfuncRefgene标题筛选框
    let exonicfuncRefgeneSelection
    function change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict(index){
        console.log("change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict", index)
        all_subFilter_indexes_dict[params.type][dict.EXONICFUNCREFGENE][0] = index

        // 其中包含，页面切换回第一页
        __set_specfic_Params_in_AllSearchParamsDict()
        __getPageData()
    }


    // 当前页面数据的总条数 todo 需要手动更新
    let data_count
    // 当前总页数
    let total_page_nums

    function handleChangePageSize(event){
        // console.log("handleChangePageSize", event.detail.pageSize)
        all_searchParams_dict[params.type][dict.PAGE_SIZE] = event.detail.pageSize

        // 当前sheet的totalPageNums更新，data_num固定，但是当前页page_size生了变化！
        __updateTotalPageNums()
        // 当前sheet的nowPageNum设置为1，返回第一页
        all_searchParams_dict[params.type][dict.PAGE] = 1
        __getPageData()
    }
    function handleChangePage(event){
        // console.log("handleChangePage", event.detail.page)

        all_searchParams_dict[params.type][dict.PAGE] = event.detail.page
        __getPageData()
    }

    // 整个表的sampleId的列表
    let sample_list = []
    // sampleSn对应sampleId
    let sampleSn_dict = {}
    // 选中的样本id列表
    let selected_sampleId_list = []

    let sheets_needSamplRecordDict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        // 筛选当中有 ‘logsEdit=’的需要，才说明有编辑的可能性
        if (sheetDisplayConfigDict[item[dict.SHEET]][dict.FILTERS].indexOf(dict.LOGSEDIT) > -1) result.push(item[dict.SHEET])
        return result
    },[])))
    // 统计每页sampleId为key，包含sampleSn，总数，未审核，未提交等的每个sample的总数
    let all_sample_record_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = {}
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
        // 先更新all_subFilters_dict中的三张表名, 再再all_exonicfuncRefgenes中添加这三张表
        for (let sheet of [dict.TARGET, dict.HEREDITARY, dict.TMB]) {
            //先更新all_subFilters_dict中的表名
            all_subFilter_names_dict[sheet][dict.EXONICFUNCREFGENE] = [`${sheet.toLowerCase()}_exonicfuncRefgene`]

            let values = data[`${sheet.toLowerCase()}_exonicfuncRefgenes`]
            // 如果没有，就不麻烦添加表了
            if (values) {
                let value_list = values.split(';')
                let new_selections = value_list.map(value=>({
                    value: value,
                    content: value
                }))
                subFilter_selections_dict[`${sheet.toLowerCase()}_exonicfuncRefgene`] = [{value: null, content: "突变方式(全选)"}, ...new_selections]
            }
        }
        // 顺便更新所有的页面搜索参数初始化
        __set_specfic_Params_in_AllSearchParamsDict()
    }


    // 处理sample样品全选、取消全选的切换
    async function handleToggleAllSample(){
        loadingShow = true

        if (selected_sampleId_list.length !== sample_list.length) {
            selected_sampleId_list =  sample_list.map(item => item[dict.ID])

            //更新当前sampleIds查询参数
            all_searchParams_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }else{
            selected_sampleId_list = []

            //更新当前sampleIds查询参数, 如果不设置就是&sampleIds=&, 返回的还是全部数据
            all_searchParams_dict[params.type][dict.SAMPLEIDS] = 0
        }

        // 切换回第一页
        all_searchParams_dict[params.type][dict.PAGE] = 1

        await __getPageData()

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
            all_searchParams_dict[params.type][dict.SAMPLEIDS] = 0
        }else{
            all_searchParams_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }

        // 切换回第一页
        all_searchParams_dict[params.type][dict.PAGE] = 1

        await __getPageData()

        loadingShow = false
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
    function __updatePanalId_and_sampleIdsParams() {
        for (let sheet_name in all_searchParams_dict ){
            all_searchParams_dict[sheet_name][dict.PANALID] = parseInt(params[dict.PANALID])
            all_searchParams_dict[sheet_name][dict.SAMPLEIDS] = sample_list.map(item=>item[dict.ID]).join(',')
        }
    }

    // 动态更新当前页面信息
    $: if (pre_params_type !== params.type) {
        // console.log('listem params.type 先前params.type 现在params.tpe', pre_params_type, params.type)
        // console.log(all_subFilter_names_dict.hasOwnProperty(params.type), all_subFilter_names_dict[params.type])

        //todo 筛选框值修改，不会触发onChange事件, 返回人工修改
        // if (all_subFilter_names_dict.hasOwnProperty(params.type) &&
        //         all_subFilter_names_dict[params.type].hasOwnProperty(dict.EXONICFUNCREFGENE)) {
        //     exonicfuncRefgeneSelection.value = all_subFilter_indexes_dict[params.type][dict.EXONICFUNCREFGENE][0]
        // }

        __getPageData()
    }

    onMount(async () => {
        pre_params_type = params.type

        // 获取样本列表
        await getSampleList()
        // 更新所有页面查询的panalId, sampleIds参数
        __updatePanalId_and_sampleIdsParams()
    })


    // 测试使用
    function test() {
        // console.log(whole_panal_infoList_dict)
        // console.log(sample_list, sampleSn_dict)
        // console.log(now_page_data)
        // console.log(all_sample_record_dict)

        // let ordering =  new OrderingFilter()
        // ordering.toggleNowId(dict.SAMPLEID2UNDERLINE)

        // console.log(exonic.getValue())
        // exonic.toggleNowId()
        // console.log(exonic.getValue())
        console.log(all_searchParams_dict, all_subFilter_indexes_dict, all_subFilter_names_dict, subFilter_selections_dict, all_sample_record_dict)

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
        flex: 0 0 54px;
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
    .contentRight .rightDataTable .lineTitle .hoverGreen:hover{
        background: #09c762;
        color: white;
    }
    .contentRight .rightDataTable .lineTitle .exonicfuncRefgene .inside{
        padding: 0;
        margin: 0;
        width: 119px;
        height: 100%;
        border: none;
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
    /*.contentRight .rightDataTable .hoverGreen:hover{*/
    /*    background: #09c762;*/
    /*    color: white;*/
    /*}*/

    .contentRight .dataPagerWrapper{
        flex: 1;
    }
</style>
