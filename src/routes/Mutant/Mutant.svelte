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

                    </div>
                    <div class="leftTopWrapper">
                        <table class="sampleTable">
                            <tr>
                                <th class="sampleSn">样本名称</th>
                                <th class="total">条目总数</th>
                                <th class="submitedAndAffirmed">已提已审</th>
                                <th class="unsubmitedAndAffirmed">未提已审</th>
                                <th class="unsubmitedAndUnaffirmed">未提未审</th>
                                <th class="tick">

                                </th>
                            </tr>
                        </table>
                        <div class="tableContent">

                        </div>
                    </div>
                    <div class="leftTopMidWrapper">
                        <div class="messageWrapper">
                            <div class="title">
                            </div>
                            <div class="uploadButtomWrapper">

                            </div>

                        </div>
                    </div>
                    <div class="leftMidWrapper">
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
                                <th class="logs">全部记录</th>
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
                        <Page page={all_nowPageNum_totalPageNums_dict[params.type][dict.NOWPAGENUM]}
                              totalPage={all_nowPageNum_totalPageNums_dict[params.type][dict.TOTALPAGENUMS]}
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
    import {sheetDisplayConfigList} from './config'

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
        ID: 'id', SAMPLESN: 'sampleSn', TITLE_LIST: 'title_list',
        PAGE: 'page', PAGE_SIZE: 'page_size', SAMPLEIDS: 'sampleIds', PANALID: 'panalId',
        TITLE: 'title', TRANSLATE: 'translate',
        NOWPAGENUM: "nowPageNum", TOTALPAGENUMS: 'totalPageNums', TYPE: 'type',
        TOPSCROLL: 'topScroll', BOTTOMSCROLL: 'bottomScroll',
    }
    // 获取路径中的：值
    export let params = {}

    // 控制loading页面的显示
    let loadingShow = false


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
        console.log("__updateTotalPageNums", data_num, all_query_params_dict[params.type][dict.PAGE_SIZE])
        all_nowPageNum_totalPageNums_dict[params.type][dict.TOTALPAGENUMS] =
                Math.ceil(data_num/all_query_params_dict[params.type][dict.PAGE_SIZE])

        all_nowPageNum_totalPageNums_dict = all_nowPageNum_totalPageNums_dict
    }
    // 根据all_query_params_dict[params.type]， 当前页名，获取当前页所有信息
    async function getPageData () {
        loadingShow = true

        // 第一次加载，还没有更新获得panalId和sampleIds参数
        __addPanalIDIfFirstLoad()

        let success = false

        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        // console.log("__getPageData upperQueryName params", name, all_query_params_dict[params.type])

        await api[`list${name}`](all_query_params_dict[params.type]).then(response=>{
            // console.log("__getPageData", response.data)
            now_page_data = response.data.results
            console.log("__getPageData now_page_data", now_page_data)

            // 更新当前页data_num
            data_num = response.data.count

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
        console.log('listem params.type 先前params.type 现在params.tpe', pre_params_type, params.type)
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


    // 整张panal的所有表信息
    let whole_panal_infoList_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = 'empty'
        return result
    }, {})))
    let sample_id_list = []
    let sample_id_dict = {}

    // 获取sheet页的页面参数字典
    let all_query_params_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let params = item[dict.QUERY_PARAMS].reduce((result_2, item_2)=>{
            switch (item_2[dict.PARAM]) {
                case dict.PAGE:
                    result_2[item_2[dict.PARAM]] = 1
                    break
                case dict.PAGE_SIZE:
                    result_2[item_2[dict.PARAM]] = 20
                    break
                case dict.SEARCH:
                    result_2[item_2[dict.PARAM]] = item[dict.SHEET]
                    break
                default:
                    result_2[item_2[dict.PARAM]] = null
            }

            return result_2
        }, {})
        result[item[dict.SHEET]] = params
        return result
    }, {})))

    // 当前页面数据的总条数 todo 需要手动更新
    let data_num
    // 整张panal的当前页和总页数
    let all_nowPageNum_totalPageNums_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = {
            nowPageNum: 1,
            totalPageNums: null
        }
        return result
    }, {})))
    function handleChangePageSize(event){
        // console.log("handleChangePageSize", event.detail.pageSize)
        all_query_params_dict[params.type][dict.PAGE_SIZE] = event.detail.pageSize
        all_query_params_dict = all_query_params_dict

        // 当前sheet的totalPageNums更新，data_num固定，但是当前页page_size生了变化！
        __updateTotalPageNums()
        // 当前sheet的nowPageNum设置为1，返回第一页
        all_nowPageNum_totalPageNums_dict[params.type][dict.NOWPAGENUM] = 1
        all_nowPageNum_totalPageNums_dict = all_nowPageNum_totalPageNums_dict
        getPageData()
    }
    function handleChangePage(event){
        // console.log("handleChangePage", event.detail.page)

        // 当前sheet的nowPageNum设置为1，返回第一页
        all_nowPageNum_totalPageNums_dict[params.type][dict.NOWPAGENUM] = event.detail.page
        all_nowPageNum_totalPageNums_dict = all_nowPageNum_totalPageNums_dict
        getPageData()
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
            sample_id_list = response.data.samples.map(sample=> {
                return {
                    id: sample[dict.ID],
                    sampleSn: sample[dict.SAMPLESN]
                }
            })
            sample_id_dict = arrayToDict(sample_id_list, dict.ID)
        }).catch(error=>{
            console.log("getPanalSummary", error)
        })

        loadingShow = false
    }

    // 更新所有页面查询的panalId, sampleIds参数
    function updatePanalIdAndSampleIdsParams() {
        for (let sheet_name in all_query_params_dict ){
            all_query_params_dict[sheet_name][dict.PANALID] = parseInt(params[dict.PANALID])
            all_query_params_dict[sheet_name][dict.SAMPLEIDS] = sample_id_list.map(item=>item[dict.ID]).join(',')
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
        // console.log(sample_id_list, sample_id_dict)
        // console.log(all_query_params_dict)
        // console.log(now_page_data)
        console.log(all_nowPageNum_totalPageNums_dict)
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
    .navLeft .leftTopWrapper{
        flex: 0 0 200px;
        width: 308px;
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
    .sampleTable .total{
        width: 35px;
    }
    .sampleTable .submitedAndAffirmed, .sampleTable .unsubmitedAndAffirmed, .sampleTable .unsubmitedAndUnaffirmed {
        width: 35px;
    }
    .sampleTable .tick{
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

    .leftTopMidWrapper{
        flex: 0 0 228px;
        width: 308px;
        border-bottom: 1px solid black;
    }
    .leftTopMidWrapper .messageWrapper{
        margin: 3px;
    }
    .leftTopMidWrapper .messageWrapper .title{
        padding: 5px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        border-bottom: 1px solid #cccccc;
    }
    .leftTopMidWrapper .messageWrapper .uploadButtomWrapper{
        height: 182px
    }

    .leftTopMidWrapper .messageWrapper .uploadMessage{
        height: 190px;
        width: 240px;
        font-size: 12px;
        overflow-y: scroll;
        float: left;
    }
    .leftTopMidWrapper .messageWrapper .uploadBnWrapper{
        width: 62px;
        float: left;
    }
    .leftTopMidWrapper .messageWrapper .uploadBnWrapper button{
        margin: 3px 3px 0 3px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 54px;
        font-size: 12px;
        font-weight: bold;
    }
    .leftTopMidWrapper .messageWrapper .uploadBnWrapper button.disabled{
        color: #cccccc;
        font-weight: normal;
    }

    .leftMidWrapper{
        flex: 0 0 150px;
        width: 308px;
        border-bottom: 1px solid black;
    }
    .leftMidWrapper .selectFile{
        padding: 3px;
        height: 30px;
        width: 300px;
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
    .leftMidWrapper .selectFile button:hover{
        background: #09c762;
    }
    .leftMidWrapper .fileList{
        height: 107px;
        width: 308px;
        margin: 3px;
        overflow-y: scroll;
    }
    .leftMidWrapper .fileList .sampleSn{
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
    }
    .contentRight .rightDataTable .done{
        min-width: 35px!important;
    }
    .contentRight .rightDataTable .affirmed{
        min-width: 35px!important;
    }
    .contentRight .rightDataTable .delete{
        min-width: 60px!important;
    }
    .contentRight .rightDataTable {

    }

    .contentRight .dataPagerWrapper{
        flex: 1;
    }
</style>
