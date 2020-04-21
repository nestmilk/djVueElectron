<Header></Header>

<div class="middle">
    <LeftMenus active="Panal信息" on:message={handleMessage}></LeftMenus>
    <div class="midRight">
        <div class="midRightHead">
            <div class="headUp">

                <div class="uploadfile">
                    <input class="fileSelectInput" type="file" id="filewidget" accept=".xls,.xlsx"
                           multiple="true" on:change={load} />
                    <input class="nameInput" type="text" bind:value={file_name} disabled={uploadBtnDisabled} placeholder="请填写上传panal的名称"/>
                    <div class="excelShowWrapper">
                        {#if file_list.length!==0}
                            <button class="{excelsDivShow?'icon-menu4':'icon-menu3'}" on:click={changeExcelDivShow}></button>
                        {/if}
                    </div>
                    <button on:click={upload} disabled={uploadBtnDisabled}>上传</button>
                    {#if excelsDivShow}
                        <div class="excelDiv">
                            <span>目前sheet仅支持'靶向'、'遗传'、'TMB'、'QC'、'样本信息'</span>
                            <div class="excelTablesWrapper">
                                <table>
                                    <tr>
                                        <th class="excel">excel文件名</th>
                                        <th class="sheet">sheet页名</th>
                                        <th class="lines">行数</th>
                                        <th class="select">上传选择</th>
                                    </tr>
                                </table>
                                <div class="excelContetWrapper">
                                    <table>
                                        {#each selected_file_list as file, file_index}
                                            {#each file[dict.UPSHEETNAMELIST] as sheet, sheet_index}
                                                <tr>
                                                    {#if sheet_index===0}
                                                        <td class="excel" rowspan="{file[dict.UPSHEETNAMELIST].length}">{file[dict.NAME]}</td>
                                                    {/if}
                                                    <td class="sheet">{sheet.name}</td>
                                                    <td class="lines">{file[dict.SHEETDICT][sheet.name].length===0?
                                                        0:file[dict.SHEETDICT][sheet.name].length - up_sheet_name_dict[sheet.name][dict.SKIP]}</td>
                                                    <td class="select">
                                                        <button class="{sheet.status?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                                            on:click={()=>handleSelectSheet(file_index, sheet_index)}></button>
                                                    </td>
                                                </tr>
                                            {/each}
                                        {/each}
                                    </table>
                                </div>
                                <br>
                                <span>选择模板标题栏为输出excel样式</span>
                                <div class="templateTableWrapper">
                                    <table>
                                        <tr>
                                            <th class="templateName">模板名称</th>
                                            <th class="excel">excel文件名</th>
                                            <th class="sheet">sheet页名</th>
                                            <th class="select">选择</th>
                                        </tr>
                                        {#each Object.keys(up_sheet_title_template_dict) as sheet_value}
                                            {#each up_sheet_title_template_dict[sheet_value] as item, index}
                                                <tr>
                                                    {#if index === 0}
                                                        <td class="templateName" rowspan="{up_sheet_title_template_dict[sheet_value].length}">{sheet_value}</td>
                                                    {/if}
                                                    <td class="excel">{item.excel_name}</td>
                                                    <td class="sheet">{item.sheet_name}</td>
                                                    <td class="select">
                                                        <button class="{item.status?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                                                on:click={()=>handleSelectTemplate(sheet_value, index)}></button>
                                                    </td>
                                                </tr>
                                            {/each}
                                        {/each}
                                    </table>
                                </div>

                            </div>
                        </div>
                    {/if}
                </div>

                <div class="searchWrapper">
                    <input type="text"
                           placeholder="请填写样本编号、病人姓名、Panal名查询"
                           bind:value={search}
                           on:keydown={handleSearchKeydown}
                    />
                    <div class="searchSpanWrapper" on:click={handleSearch}>
                        <span class="icon-search "></span>
                    </div>
                </div>
                <div class="filterWrapper">
                    <label>已删除</label>
                    <span on:click={()=>handlePanalFilter(dict.DELETE, true)} class={panalsFilterParams.delete===true||panalsFilterParams.delete===null?'icon-checkbox-checked ':'icon-checkbox-unchecked'}></span>
                    <label>未删除</label>
                    <span on:click={()=>handlePanalFilter(dict.DELETE, false)} class="{panalsFilterParams.delete===false||panalsFilterParams.delete===null?'icon-checkbox-checked ':'icon-checkbox-unchecked'}"></span>
                    <label>已完成</label>
                    <span on:click={()=>handlePanalFilter(dict.DONE, true)} class="{panalsFilterParams.done===true||panalsFilterParams.done===null?'icon-checkbox-checked ':'icon-checkbox-unchecked'}"></span>
                    <label>未完成</label>
                    <span on:click={()=>handlePanalFilter(dict.DONE, false)} class="{panalsFilterParams.done===false||panalsFilterParams.done===null?'icon-checkbox-checked ':'icon-checkbox-unchecked'}"></span>
                </div>
                <button on:click={test}>test</button>
            </div>
            <div class="error leftError">提示：
                <span>{errors.panal}</span>
                {#if errors.unauthorized}
                    <span>请先登录吧！</span>
                {/if}
                <span>{errors.name}</span>
                <span>{errors.excel}</span>
                <span>{errors.detail}</span>
            </div>
        </div>
        <div class="midRightContent">
            <div class="midRightContentLeft">
                <table class="lefttable">
                    <tr>
                        <th class="name">Panal名称</th>
                        <th class="add_time">上传时间</th>
                        <th class="adder">添加人</th>
                        <th class="auditor">提交人</th>
                        <th class="delete_panal">删除</th>
                        <th class="done_cancel">撤销完成</th>
                        <th class="enter">审阅</th>
                    </tr>


                    {#each panal_list as panal}
                        <tr class="{panal.done?'done':''} {panal.id===current_panal_id?'now':''}"
                            on:click={()=>changePanal(panal.id)}>
                            <td class="name" style="{panal.delete?'text-decoration:line-through;':''}" >
                                {panal.name}
                            </td>
                            <td class="add_time" style="{panal.delete?'text-decoration:line-through;':''}" >
                                {panal.add_time}
                            </td>
                            <td class="adder" style="{panal.delete?'text-decoration:line-through;':''}" >
                                {panal.adder.username}
                            </td>
                            <td class="auditor" style="{panal.delete?'text-decoration:line-through;':''}" >
                                {panal.auditor?panal.auditor.username:''}
                            </td>
<!--                                <td class="delete_panal" on:click|stopPropagation={()=>handleDelete(panal.id, panal.delete)}>-->
                            <td class="delete_panal"
                                on:click|stopPropagation={()=>handleEventForSure(dict.PANAL, dict.DELETE, [panal.id], [!panal.delete])}
                            >
                                <span class="icon-cross {panal.delete?'':'undeleted'}"></span>
                            </td>
<!--                                <td class="done_cancel" on:click|stopPropagation={()=>handleDoneCancel(panal.id, !panal.done)}>-->
                            <td class="done_cancel"
                                on:click|stopPropagation={()=>handleEventForSure(dict.PANAL, dict.DONE, [panal.id], [!panal.done])}
                            >
                                <span class="{panal.done?'icon-undo2':''}"></span>
                            </td>
                            <td class="enter">
                                <span class="icon-enter" on:click={()=>handleEnter(panal.id)}></span>
                            </td>
                        </tr>
                    {/each}
                </table>
                <div class="leftPageWrapper">
                    <div class="pagewrapper" on:click={()=>handlePage(-1)}>
                        {#if previous}
                            <span class="icon-arrow-left"></span>
                        {/if}
                    </div>
                    <div class="pagewrapper" on:click={()=>handlePage(1)}>
                        {#if next}
                            <span class="icon-arrow-right"></span>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="midRightContentRight">
                <table class="rightTable">
                    <tr>
                        <th class="sampleSn">样本编号</th>
                        <th class="name">病人姓名</th>
                        <th class="gender">性别</th>
                        <th class="receiveTime">收样日期</th>
                        <th class="Depth">Depth</th>
                        <th class="effectDepth">effectDepth</th>
                        <th class="coverage">coverage</th>
                        <th class="effectCoverage500">effectCoverage500</th>
<!--                        <th class="targetCount">靶向总数</th>-->
<!--                        <th class="hereditaryCount">遗传总数</th>-->
<!--                        <th class="tmbCount">TMB总数</th>-->
                    </tr>
                    {#each paged_sample_list as sample}
                        <tr>
                            <td class="sampleSn">{sample.sampleSn}</td>
                            <td class="name">{sample.name?sample.name:'-'}</td>
                            <td class="gender">{sample.gender?sample.gender:'-'}</td>
                            <td class="receiveTime">{sample.receiveTime?sample.receiveTime:'-'}</td>
                            <td class="Depth">{sample[dict.QC]?sample[dict.QC][dict.DEPTH]:'-'}</td>
                            <td class="effectDepth">{sample[dict.QC]?sample[dict.QC][dict.EFFECTDEPTH]:'-'}</td>
                            <td class="coverage">{sample[dict.QC]?sample[dict.QC][dict.COVERAGE]:'-'}</td>
                            <td class="effectCoverage500">{sample[dict.QC]?sample[dict.QC][dict.EFFECTCOVERAGE500]:'-'}</td>
<!--                            <td class="targetCount">{sample.targetCount}</td>-->
<!--                            <td class="hereditaryCount">{sample.hereditaryCount}</td>-->
<!--                            <td class="tmbCount">{sample.TMBCount}</td>-->
                        </tr>
                    {/each}
                </table>
                <div class="rightPagewrapper">
                    <Page2 page={currentPage} totalPage={total_pages_of_samples} on:changePage={handleChangePage}></Page2>
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
    <Sure message={sendMessage} on:sureReply={handleSureReply}></Sure>
{/if}

<script>
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {userInfo} from '../../store/store'
    import {push} from 'svelte-spa-router'
    import js2excel from 'js2excel'

    import {up_sheet_name_dict} from '../../configs/config'

    import Header from '../../components/Header/Header.svelte'
    import Footer from '../../components/Footer/Footer.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    import Loading from '../../components/Loading/Loading.svelte'
    import Sure from '../../components/Sure/Sure.svelte'
    import Page2 from '../../components/Page/Page2.svelte'
    import {onMount, createEventDispatcher} from 'svelte'
    import Page from "../../components/Page/Page.svelte";
    import {arrayToDict, getItemByIdandOperateAttr} from "../../utils/arrays";

    const dispatch = createEventDispatcher()
    let excel2json = js2excel.excel2json
    let __getJsonFromExcel = (file) => {
        return new Promise(function(resolve, reject){
            excel2json([file[dict.FILE]], (data) => {
                resolve([file, data])
            }, 'excel2json')
        })
    }

    let dict = {
        DELETE: 'delete', DONE: 'done', PANAL: 'panal', NAME: 'name', FILE: 'file',
        SHEETDICT: 'sheet_dict', UPSHEETNAMELIST: 'up_sheet_name_LIST', TARGET: 'target',
        TMB: 'TMB', HEREDITARY: 'hereditary', QC: 'QC', qc: 'qc', STATUS: 'status', SKIP: 'skip', SAMPLEINFO: 'sampleInfo',
        TARGETCOUNT: 'targetCount', HEREDITARYCOUNT: 'hereditaryCount', TMBCOUNT: 'TMBCount',
        DEPTH: 'Depth', EFFECTDEPTH: 'effectDepth', COVERAGE: 'coverage', EFFECTCOVERAGE500: 'effectCoverage500',
        VALUE: 'value',
        IMMUNE: "immune", TNB: "TNB", HLA: "HLA", FUSION: "fusion", CHEMICAL: "chemical", CNA: "CNA", MSI: "MSI",
        CLINICAL_TRIALS: "clinicaltrials", HRR: "HRR", MLPA: "MLPA",
    }

    let dictTranslate = {delete: '删除', done: '完成', panal: 'Panal'}

    // TODO 用于检索可以上传的sheet名称，后续可以继续添加，仅仅用到了key，value还没有用
    // let up_sheet_name_dict = {
    //     target: {value: dict.TARGET, skip: 1},
    //     靶向: {value: dict.TARGET, skip: 1},
    //     hereditary: {value: dict.HEREDITARY, skip: 1},
    //     遗传: {value: dict.HEREDITARY, skip: 1},
    //     TMB: {value: dict.TMB, skip: 1},
    //     QC: {value: dict.QC, skip: 0},
    //     样本信息: {value: dict.SAMPLEINFO, skip: 1},
    //     immune: {value: dict.IMMUNE, skip: 1},
    //     免疫: {value: dict.IMMUNE, skip: 1},
    //     TNB: {value: dict.TNB, skip: 1},
    //     HLA: {value: dict.HLA, skip: 1},
    //     fusion: {value: dict.FUSION, skip: 1},
    //     融合: {value: dict.FUSION, skip: 1},
    //     chemical: {value: dict.CHEMICAL, skip: 1},
    //     化疗: {value: dict.CHEMICAL, skip: 1},
    //     CNA: {value: dict.CNA, skip: 1},
    //     MSI: {value: dict.MSI, skip: 0},
    //     clinicaltrials: {value: dict.CLINICAL_TRIALS, skip: 0},
    //     HRR: {value: dict.HRR, skip: 0},
    //     MLPA:{value: dict.MLPA, skip: 1}
    // }
    // 用于上传标题模板选择, key需要和dict中一致，即和up_sheet_name_dict中的value一致
    // let up_sheet_title_template_dict = {
    //     target: [],
    //     hereditary: [],
    //     TMB: [],
    //     QC: [],
    //     sampleInfo: [],
    //     immune: [],
    //     TNB: [],
    //     HLA: [],
    //     fusion: [],
    //     chemical: [],
    //     CNA: [],
    //     MSI: [],
    //     clinicaltrials: [],
    //     HRR: [],
    //     MLPA: []
    // }
    let up_sheet_title_template_dict =  Object.keys(up_sheet_name_dict).reduce((result, sheet_name)=>{
        let sheet_name_value = up_sheet_name_dict[sheet_name][dict.VALUE]
        if(!result.hasOwnProperty(sheet_name_value)){
            result[sheet_name_value] = []
        }
        return result
    },{})
    let up_sheet_title_template_dict_ori = JSON.parse(JSON.stringify(up_sheet_title_template_dict))

    let panal_list = []
    let sample_list = []
    let sample_dict = {}
    let qc_list = []
    // let mutant_list = []
    // let target_list = []
    // let hereditary_list = []
    // let tmb_list = []
    let previous
    let next
    let userdetail = {}
    let level = userInfo.getLevel()

    let current_panal_id = -1

    let file_list = []
    let selected_file_list = []
    let file_name = ''
    let uploadBtnDisabled = false
    // let file_excel2json_unfinised_num = -1
    let excelsDivShow = false
    $: if (file_list.length === 0) {
        excelsDivShow = false
    }
    // $: if (file_excel2json_unfinised_num===0) {
    //     console.log('all file excel2json finished')
    //
    //     for (let file of file_list) {
    //         let sheet_name_list = Object.keys(file[dict.SHEETDICT])
    //
    //         // console.log(sheet_name_list)
    //         let up_sheet_name_list = []
    //         for (let sheet_name of sheet_name_list) {
    //             // 在全局上传字典up_sheet_name_dict中能找到，
    //             // 在局部上传列表up_sheet_name_list中尚不存在
    //             if (up_sheet_name_dict.hasOwnProperty(sheet_name) &&
    //                 up_sheet_name_list.indexOf(sheet_name) === -1) {
    //                 up_sheet_name_list.push(sheet_name)
    //             }
    //         }
    //
    //         // 如果 局部上传列表up_sheet_name_list的长度不等于0，则包含
    //         if (up_sheet_name_list.length !== 0) {
    //             // sheet_name_list改为file的sheet_name_dict
    //             for (let name of up_sheet_name_list){
    //                 let sheet_lines = file[dict.SHEETDICT][name].length===0? 0:file[dict.SHEETDICT][name].length - up_sheet_name_dict[name][dict.SKIP]
    //                 let status = sheet_lines >0 ? true: false
    //                 file[dict.UPSHEETNAMELIST].push({
    //                     name: name,
    //                     status: status
    //                 })
    //             }
    //             selected_file_list.push(file)
    //         }
    //
    //         selected_file_list = selected_file_list
    //     }
    //     // console.log(file_list)
    //
    //     // 制作template选择的数据
    //     for (let file of file_list) {
    //         for (let sheet_name of file[dict.UPSHEETNAMELIST]) {
    //             // console.log(file[dict.NAME], sheet_name[dict.NAME])
    //
    //             // 判断sheet页是否有内容，有内容就一定有标题栏
    //             let num = file[dict.SHEETDICT][sheet_name[dict.NAME]].length
    //             // console.log('$: if ', num)
    //             if (num===0) continue
    //
    //             let value = up_sheet_name_dict[sheet_name[dict.NAME]][dict.VALUE]
    //             if (up_sheet_value_dict[value]) {
    //                 // console.log('$: if', value)
    //                 // 第一项默认选中
    //                 let status = up_sheet_value_dict[value].length===0?true:false
    //                 let item = {
    //                     excel_name: file[dict.NAME],
    //                     sheet_name: sheet_name[dict.NAME],
    //                     status: status
    //                }
    //                up_sheet_value_dict[value].push(item)
    //             }
    //         }
    //     }
    //     // console.log(up_sheet_value_dict)
    //
    //     // 重置为-1，等待下一次上传
    //     file_excel2json_unfinised_num = -1
    //
    //     loadingShow = false
    //     excelsDivShow = true
    // }


    let errors = {
        panal: '',
        unauthorized: '',
        name: '',
        excel: '',
        detail: ''
    }

    let errors_ori = JSON.parse(JSON.stringify(errors))

    let loadingShow = false
    let sureShow = false

    // 处理需要确认的事情的公用变量
    let sureModel
    let sureEvent
    let sureObjectIDList = []
    let sureObjectValueList = []
    let sendMessage = ''
    function setSendMessage() {
        let handle = sureObjectValueList[0] ? "完成" : "撤销"
        sendMessage = "是否" + handle + dictTranslate[sureModel] + dictTranslate[sureEvent]
    }


    // 左侧panal的页面参数
    // num 为panal的总数
    let num = 0
    let totalPagesofPanal = -1
    function setTotalPagesOfPanal () {
        totalPagesofPanal = Math.ceil(num/panalsFilterParams.page_size)
    }


    // 右侧sample的页面参数
    let currentPage = 1
    let pageNum = 20
    let total_pages_of_samples = -1
    function setTotalPagesOfSamples () {
        total_pages_of_samples= Math.ceil(sample_list.length/pageNum)
    }

    let paged_sample_list = []
    function getPagedSampleList(){
        let start = (currentPage-1)*pageNum
        let end
        if(currentPage===total_pages_of_samples){
            end = sample_list.length
        }else{
            end = currentPage*pageNum
        }
        paged_sample_list = sample_list.slice(start, end)
    }


    let panalsFilterParams = {
        page: 1,
        page_size: 20,
        delete: false,
        done: null,
    }
    let search = null

    function test() {
        // console.log(filterParams)
        // console.log(userInfo.getName() + " " + userInfo.getToken() + " " +
        //         userInfo.getGroup() + " " + userInfo.getLevel())
        // let p = {name: 'gong', bool: null}
        // console.log(JSON.parse(JSON.stringify(p)))
        // console.log(JSON.parse(JSON.stringify(filterParams)))
        // console.log(totalPages)
        // console.log(mutant_list)
        // console.log(sample_list)
        // console.log(paged_sample_list)
        // console.log(file_list)
        // console.log(selected_file_list)
        // console.log(up_sheet_value_dict)
        // 使用Promise.all处理
        // console.log(panal_list)
        // console.log(qc_list)
        // console.log(sample_list, sample_dict)
        console.log(up_sheet_title_template_dict)
    }

    async function handlePanalFilter(field, selectedStatus) {
        console.log('handleFilter begin')
        if (panalsFilterParams[field] === null) {
            panalsFilterParams[field] = !selectedStatus

            panalsFilterParams.page = 1
            await getPanalList()
        } else if (panalsFilterParams[field] !== selectedStatus) {
            panalsFilterParams[field] = null

            panalsFilterParams.page = 1
            await getPanalList()
        }
    }

    function handleEnter(panal_id){
        // console.log(panal_id)
        push(`/sampleInfoInPanal/${panal_id}`)
    }

    async function changePanal(panal_id) {
        if (current_panal_id === panal_id) return
        current_panal_id = panal_id
        await getSamplesList()
    }

    // TODO 此处接受Sure组件的信息，然后对应不同实践进行分类处理
    async function handleSureReply(e) {
        if (e.detail.status) {
            switch (sureModel) {
                case dict.PANAL:
                    switch (sureEvent) {
                        case dict.DELETE:
                            await handleDelete(sureObjectIDList[0], sureObjectValueList[0])
                            break
                        case dict.DONE:
                            await handleDoneCancel(sureObjectIDList[0], sureObjectValueList[0])
                            break
                    }
                    break
            }
        }

        sureShow = false
    }

    async function handleSearch() {
        await getPanalList()
        search = null
    }

    function handleSearchKeydown(event){
        // tab键就是9，回车是13
        if (event.which !== 13) return;
        event.preventDefault();
        handleSearch()
    }

    // TODO 此处确定对象类型，事件类型，对象id，对象目的值
    function handleEventForSure(model, event, object_id_list, object_value_list) {
        sureModel = model
        sureEvent = event
        sureObjectIDList = object_id_list
        sureObjectValueList = object_value_list
        switch (model) {
            case dict.PANAL:
                switch (event) {
                    case dict.DONE:
                        if (sureObjectValueList[0]) return
                        break
                    case dict.DELETE:
                        break
                }
                break
        }

        setSendMessage()
        sureShow = true
    }

    async function handleDelete(panal_id, status) {
        loadingShow = true

        let success = false
        await api.updatePanal(panal_id, {delete: status}).then((response) => {
            success = true
        }).catch((error) => {
            errors.detail = error.data.detail ? error.data.detail : ""
            console.error("handleDelete", error.data)
        })

        if (success) {
            // console.log(num, filterParams.page_size, totalPagesofPanal)
            // TODO 此处如果删除不是null，即全部显示, 删除panal会缩小，如果刚好在末页需要重新定义page
            if (panalsFilterParams.delete !== null &&
                    num%panalsFilterParams.page_size===1 &&
                    panalsFilterParams.page === totalPagesofPanal &&
                    totalPagesofPanal !== 1) {
                totalPagesofPanal--
                panalsFilterParams.page = totalPagesofPanal
            }

            await getPanalList()
        }

        loadingShow = false
    }

    async function handleDoneCancel(panal_id, status) {
        loadingShow = true
        let success = false

        await api.updatePanal(panal_id, {done: status}).then((response) => {
            success = true
        }).catch((error) => {
            // 此处两种detail，身份认证信息未提供；未找到
            errors.detail = error.data.detail ? error.data.detail : ""
            console.error("handleDoneCancel", error.data)
        })

        if (success) {
            // TODO 此处如果完成是true，即全部显示, 撤销panal会缩小，如果刚好在末页需要重新定义page
            if (panalsFilterParams.done === true &&
                    num%panalsFilterParams.page_size===1 &&
                    panalsFilterParams.page === totalPagesofPanal &&
                    totalPagesofPanal !== 1) {
                totalPagesofPanal--
                panalsFilterParams.page = totalPagesofPanal
            }
            await getPanalList()
        }

        loadingShow = false
    }

    async function handlePage(i) {
        console.log("handlePage " + totalPagesofPanal )
        let p = panalsFilterParams.page + i
        if (p>totalPagesofPanal || p<1) return
        panalsFilterParams.page = p
        await getPanalList()
    }

    function handleChangePage(event){
        console.log(event.detail.page)
        currentPage = event.detail.page
        getPagedSampleList()
    }

    function handleMessage(event) {
        console.log('APP')
        console.log(event.detail.show)
    }

    function reset_errors() {
        errors = JSON.parse(JSON.stringify(errors_ori))
    }

    // function __setFileSheetDict(){
    //     for (let file of file_list) {
    //         // console.log('file', file)
    //
    //         excel2json([file[dict.FILE]], (data) => {
    //             // console.log(data)
    //             // 获取excel的sheet名列表
    //             // file[dict.SHEETDICT] = Object.keys(data)
    //             file[dict.SHEETDICT] = data
    //
    //             file_excel2json_unfinised_num--
    //         }, 'excel2json')
    //     }
    // }

    function __resetFileRelated() {
        // 1）文件名置空
        file_name = ''
        // 2）全部的file_list重置为空
        file_list = []
        // 3）筛选过的selected_file_list 置空
        selected_file_list = []
        // 4）up_sheet_value_dict重置
        up_sheet_title_template_dict = JSON.parse(JSON.stringify(up_sheet_title_template_dict_ori))
    }
    // 文件替换时候
    function load() {
        reset_errors()
        __resetFileRelated()

        let filewidget = document.getElementById('filewidget')

        let name_dict = {}
        for (let file of filewidget.files) {
            let panalName = fileUtil.getKey(file.name)
            if (name_dict[panalName]) {
                name_dict[panalName]++
            }else{
                name_dict[panalName] = 1
            }


            let file_item = {}
            file_item[dict.NAME] = file.name
            file_item[dict.FILE] = file
            // file的json2excel后的sheet数据字典
            file_item[dict.SHEETDICT] = {}
            file_item[dict.UPSHEETNAMELIST] = []
            file_list = [...file_list, file_item]
        }

        // console.log('name_dict', name_dict)

        // name字典，按从大到小排列，逆序排列, 名字出现次数最多的作为上传panal的name
        let name_list = Object.keys(name_dict).map(function(key) {
            return [key, name_dict[key]];
        });
        name_list.sort(function (first, second) {
            return second[1] - first[1];
        })
        file_name = name_list[0][0]

        // file_excel2json_unfinised_num = file_list.length
        loadingShow = true

        // excel2json 回调函数是异步的
        // __setFileSheetDict()

        let __getJsonFromExcel = (file) => {
            return new Promise(function(resolve, reject){
                excel2json([file[dict.FILE]], (data) => {
                    resolve([file, data])
                }, 'excel2json')
            })
        }
        // todo 使用Promise.all处理
        let jsonGetPromiseArr = file_list.map(file=>{
            return __getJsonFromExcel(file)
        })
        // console.log("jsonGetPromiseArr", jsonGetPromiseArr)
        // fileJson[0] 即file_list中的单个file
        Promise.all(jsonGetPromiseArr).then((fileJsonList)=>{
            for (let fileJson of fileJsonList) {
                fileJson[0][dict.SHEETDICT] = fileJson[1]
            }
            // console.log(file_list)

            for (let file of file_list) {
                // 单个文件的所有"sheet表名称"列表
                let sheet_name_list = Object.keys(file[dict.SHEETDICT])

                // console.log(sheet_name_list)
                // excel中真实存在的上传列表名
                let up_sheet_name_list = []
                for (let sheet_name of sheet_name_list) {
                    // 在全局上传字典up_sheet_name_dict中能找到，
                    // 在局部上传列表up_sheet_name_list中尚不存在
                    if (up_sheet_name_dict.hasOwnProperty(sheet_name) &&
                            up_sheet_name_list.indexOf(sheet_name) === -1) {
                        up_sheet_name_list.push(sheet_name)
                    }
                }

                // 如果 局部上传列表up_sheet_name_list的长度不等于0，则包含
                if (up_sheet_name_list.length !== 0) {
                    // sheet_name_list改为file的sheet_name_dict
                    for (let name of up_sheet_name_list){
                        // let sheet_lines = file[dict.SHEETDICT][name].length===0? 0:file[dict.SHEETDICT][name].length - up_sheet_name_dict[name][dict.SKIP]
                        // let status = sheet_lines >0 ? true: false

                        // status不再判断有无内容，全部勾选
                        file[dict.UPSHEETNAMELIST].push({
                            name: name,
                            status: true
                        })
                    }
                    selected_file_list.push(file)
                }

                selected_file_list = selected_file_list
            }
            // console.log(file_list)

            // 制作 "标题模板" 选择的数据
            for (let file of file_list) {
                for (let sheet_name of file[dict.UPSHEETNAMELIST]) {
                    // console.log(file[dict.NAME], sheet_name[dict.NAME])

                    // 判断sheet页是否有内容，有内容就一定有标题栏
                    // 但是，有标题不一定有内容哦！！！！
                    let num = file[dict.SHEETDICT][sheet_name[dict.NAME]].length
                    // console.log('$: if ', num)
                    if (num===0) continue

                    let value = up_sheet_name_dict[sheet_name[dict.NAME]][dict.VALUE]
                    if (up_sheet_title_template_dict[value]) {
                        // console.log('$: if', value)
                        // 第一项默认选中
                        let status = up_sheet_title_template_dict[value].length===0?true:false
                        let item = {
                            excel_name: file[dict.NAME],
                            sheet_name: sheet_name[dict.NAME],
                            status: status
                        }
                        up_sheet_title_template_dict[value].push(item)
                    }
                }
            }

            loadingShow = false
            excelsDivShow = true

            // TODO 置空，不然同一文件无法再传
            filewidget.value = ''
        }).catch((err)=>{
            console.log('load', err)
            loadingShow = false
        })

    }

    async function upload() {
        loadingShow = true

        excelsDivShow = false
        reset_errors()

        // 制作上传数据, new FormData不支持列表上传，那就只能一个文件一个文件传了
        let form = new FormData()

        // 添加panal名
        // console.log('upload file_name', name)
        form.append('name', file_name)

        // 添加excel文件，制作上传表名列表文件sheet_names
        let sheet_names = {}
        let file_name_list = []
        for (let file of selected_file_list){
            // 添加file文件
            form.append(file[dict.NAME], file[dict.FILE])
            file_name_list.push(file[dict.NAME])
            let up_sheet_names = []
            for (let sheet of file[dict.UPSHEETNAMELIST]) {
                if (sheet.status){
                        up_sheet_names.push(sheet.name)
                }

            }
            sheet_names[file[dict.NAME]] = up_sheet_names
        }
        // 添加上传表名列表文件sheet_names的json
        console.log('sheet_names', sheet_names)
        form.append('sheet_names_dict', JSON.stringify(sheet_names))

        // 剔除up_sheet_value_dict中的status为false的excel-sheet项
        let file_dict = {}
        for (let file of file_list){
            file_dict[file[dict.NAME]] = file[dict.FILE]
        }
        let template_dict = {}
        console.log('upload up_sheet_title_template_dict', up_sheet_title_template_dict)
        for (let type in up_sheet_title_template_dict){
            for (let item of up_sheet_title_template_dict[type]){
                if (item.status){
                    template_dict[type] = {}
                    template_dict[type] = {excel: item.excel_name, sheet: item.sheet_name}
                    // 查看是否有selected_file_list中不存在的file，补充上传
                    if (file_name_list.indexOf(item.excel_name) === -1){
                        form.append(item.excel_name, file_dict[item.excel_name])
                    }
                    break
                }
            }
        }
        console.log('template_dict', template_dict)
        // 添加模板字典json
        form.append('template_dict', JSON.stringify(template_dict))

        let success = false
        await  api.excelUpload(form).then((response)=>{
            console.log("upload then", response.data)
            success = true
            errors.panal = response.data.panal ? response.data.panal : ''
        }).catch((error)=>{
            console.log("upload catch", error, error.data)
            errors.detail = '出错了！' + JSON.stringify(error.data?error:error.data)
        })

        if (success) {
            __resetFileRelated()
            // 置换首页
            panalsFilterParams.page = 1
            await getPanalList()
        }

        uploadBtnDisabled = false
        loadingShow = false
    }

    function changeExcelDivShow(){
        excelsDivShow = !excelsDivShow
    }
    // 控制sheet页的选择是否进入上传队伍
    function handleSelectSheet(file_index, sheet_index){
        console.log(file_index, sheet_index)
        let status = selected_file_list[file_index][dict.UPSHEETNAMELIST][sheet_index][dict.STATUS]
        selected_file_list[file_index][dict.UPSHEETNAMELIST][sheet_index][dict.STATUS] =　!status
    }
    // 选择sheet作为模板
    function handleSelectTemplate(sheet_value, item_index){
        if (up_sheet_title_template_dict[sheet_value][item_index] === true) return

        up_sheet_title_template_dict[sheet_value].forEach((item, index)=>{
            // console.log(item, index)
            if (item_index===index){
                item[dict.STATUS] = true
            }else{
                item[dict.STATUS] = false
            }
        })

        up_sheet_title_template_dict = up_sheet_title_template_dict
        // console.log(up_sheet_value_dict)
    }

    // 获取指定panal的sample

    // 获取panal的列表详情
    async function getPanalList() {
        // console.log("getPanalList begin")
        loadingShow = true

        let success = false

        await api.listPanal({
            search,
            ...panalsFilterParams
        }).then((response) => {
            // console.log(response.data)
            panal_list = response.data.results
            num = response.data.count
            next = response.data.next
            previous = response.data.previous
            if (panal_list.length!==0) {
                current_panal_id = panal_list[0].id
            }
            success = true
        }).catch((error) => {
            console.error('getPanalList', error)
            if (error.data) {
                errors.unauthorized = error.data.detail ? error.data.detail : ""
            }else{
                errors.detail = error
            }
        })

        if (success) {
            await getSamplesList()
            getPagedSampleList()
        }

        loadingShow = false
    }

    // 给sample_list添加每个sample的突变总数
    // function buildTotalMutsforSampleandSetTotalPages(){
    //
    //     for (let sample of sample_list) {
    //         sample[dict.TARGETCOUNT] = 0
    //         sample[dict.HEREDITARYCOUNT] = 0
    //         sample[dict.TMBCOUNT] = 0
    //     }
    //     for (let mutant of mutant_list) {
    //         // 给sample添加突变总数
    //         if (mutant.type === dict.TARGET){
    //             let value  = getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.TARGETCOUNT], 'get')
    //             getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.TARGETCOUNT], 'modify', value+1)
    //             continue
    //         }
    //         if (mutant.type === dict.HEREDITARY) {
    //             let value  = getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.HEREDITARYCOUNT], 'get')
    //             getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.HEREDITARYCOUNT], 'modify', value+1)
    //             continue
    //         }
    //         if (mutant.type === dict.TMB) {
    //             let value = getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.TMBCOUNT], 'get')
    //             getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.TMBCOUNT], 'modify', value + 1)
    //             continue
    //         }
    //
    //     }
    //     sample_list = sample_list
    // }


    function __setsampleListQC(){
        console.log("__setsampleListQC", qc_list, sample_dict)
        qc_list.forEach(qc=>{
            // qc表数据可能比sample中的样本多
            if(sample_dict.hasOwnProperty(qc.sample)){
                sample_dict[qc.sample][dict.QC] = qc
            }
        })
    }

    async function getSamplesList() {
        loadingShow = true

        let sample_success = false
        let qc_success = false
        console.log("getSamplesList: " + current_panal_id)
        if (current_panal_id !== -1) {
            // page_size写的较大，获取全部样本信息
            await api.listSample({
                panalId: current_panal_id,
                page_size: 1000
            }).then(response=>{
                // console.log('listSample: ', response.data)
                sample_list = response.data.results
                sample_dict = arrayToDict(sample_list, "id", true)
                // sample_dict = sample_list.reduce((result, sample)=>{
                //     result[sample.id] = sample
                // }, {})
                sample_success = true
            }).catch(error=>{
                console.error('getSampleList api.listSample', error)
                if (error.data) {
                    errors.detail = error.data.detail ? error.data.detail : ''
                }
            })

            await api.listQC({
                panalId: current_panal_id,
                page_size: 1000
            }).then(response=>{
                // console.log('listSample: ', response.data)
                qc_list = response.data.results
                qc_success = true
            }).catch(error=>{
                console.error('getSampleList api.listSample', error)
                if (error.data) {
                    errors.detail = error.data.detail ? error.data.detail : ''
                }
            })

            // await api.retrievePanal(current_panal_id).then((response) => {
            //     sample_list = response.data.samples
            //     // console.log('sample_list', sample_list)
            //
            //     sample_dict = arrayToDict(sample_list, "id")
            //     // console.log('sample_dict', sample_dict)
            //     qc_list = response.data.qcs
            //     // console.log(sample_list)
            //     // mutant_list = response.data.mutants
            //     // target_list = response.data.target
            //     // hereditary_list = response.data.hereditary
            //     // tmb_list = response.data.tmb
            //     success = true
            // }).catch((error) => {
            //     console.error('getSampleList', error)
            //     if (error.data) {
            //         errors.detail = error.data.detail ? error.data.detail : ''
            //     }
            // })
        }

        if (sample_success && qc_success) {
            getPagedSampleList()
            // 修改总页数
            setTotalPagesOfSamples()

            __setsampleListQC()

            // buildTotalMutsforSampleandSetTotalPages()
            setTotalPagesOfPanal()
        }

        loadingShow = false
    }

    onMount(() => {
        getPanalList()
    })
</script>



<style>

    /*TODO 高度需要好LeftMenus中高度一致 */
    .middle{
        width: 100%;
        min-height: 770px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        display: flex;
    }

    .midRight{
        flex: 1;
        flex-flow: column;
        display: flex;
    }

    .midRightHead{
        width: 100%;
        flex: 0 0 70px;
        border-bottom: 1px solid black;
    }

    .headUp{
        width: 100%;
        height: 40px;
        display: flex;
    }
    .uploadfile{
        flex: 0 0 350px;
        height: 100%;
        padding: 0 5px;
        border-right: 1px solid #cccccc;
        position: relative;
    }
    .uploadfile input::-webkit-input-placeholder{
        font-size: 14px;
        color: gray;
    }
    .uploadfile input{
        margin: 10px 2px;
        padding: 0;
        font-size: 14px;
        text-align: center;
        /*去除手机端input button圆角方法*/
        -webkit-appearance: none!important;
        border-radius: 0!important;
    }
    .uploadfile .fileSelectInput{
        width: 75px;
        height: 25px;
        border: none;
        float: left;
    }

    .uploadfile .nameInput{
        width: 160px;
        height: 25px;
        float: left;
    }
    .uploadfile .excelShowWrapper{
        margin: 10px 2px;
        width: 25px;
        height: 25px;
        float: left;
    }
    .uploadfile .excelShowWrapper button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #cccccc;
    }
    .uploadfile button{
        margin: 10px 2px;
        padding: 0 1px;
        width: 60px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        border: 1px solid #cccccc;
        float: left
    }
    .uploadfile .excelDiv{
        position: absolute;
        top: 39px;
        left: 0;
        width: 360px;
        min-height: 150px;
        font-size: 12px;
        z-index: 10;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        background: white;
    }
    .uploadfile .excelDiv span{
        margin: 3px;
        height: 20px;
        line-height: 20px;
    }
    .uploadfile .excelDiv .excelTablesWrapper{
        margin: 3px;
        background: white;
    }
    .uploadfile .excelDiv table{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        table-layout: fixed;
        word-break: break-all;
    }
    .uploadfile .excelDiv table th, .uploadfile .excelDiv table td{
        height: 20px;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    .uploadfile .excelDiv .excelContetWrapper{
        min-height: 105px;
        max-height: 300px;
        border-bottom: 1px solid #cccccc;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .uploadfile .excelDiv .templateTableWrapper{
        max-height: 150px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .uploadfile .excelDiv table th, .uploadfile .excelDiv table td{
        box-sizing: border-box;
    }
    .uploadfile .excelDiv table .excel{
        width: 160px;
    }
    .uploadfile .excelDiv table .sheet{
        width: 70px;
    }
    .uploadfile .excelDiv table .lines{
        width: 55px;
    }
    .uploadfile .excelDiv table .select{
        width: 50px;
    }
    .uploadfile .excelDiv table .select button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        border: none;
    }
    .uploadfile .excelDiv table .templateName{
        width: 55px;
    }


    .searchWrapper{
        flex: 0 0 260px;
        padding: 10px 10px 0 10px;
        border-right: 1px solid #cccccc;
    }

    .searchWrapper input{
        padding: 0;
        margin: 0;
        width: 230px;
        /*去除手机端input button圆角方法*/
        -webkit-appearance: none!important;
        border-radius: 0!important;
    }
    .searchWrapper input::-webkit-input-placeholder{
        text-align: center;
        font-size: 12px;
        color: #666666;
    }

    .searchSpanWrapper {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 16px;
    }

    .filterWrapper{
        flex: 0 0 320px;
        border-right: 1px solid #cccccc;
    }
    .filterWrapper label{
        font-size: 14px;
        display: inline-block;
        margin: 10px 2px 0 5px;
    }
    .filterWrapper input{
        font-size: 18px;
    }

    .leftPageWrapper {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 25px;
    }
    .leftPageWrapper .pagewrapper{
        display: inline-block;
        width:40px;
        margin: 0 auto;
    }
    .pagewrapper:hover{
        color: #09c762;
    }
    .leftError{
        height: 20px;
        line-height: 20px;
        padding: 5px;
        text-align: left;
        border-top: 1px solid #cccccc;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }

    .midRightContent{
        flex: 1;
        display: flex;
    }
    .midRightContentLeft{
        flex: 0 0 400px;
        padding: 2px;
        border-right: 1px solid black;
        position: relative;
    }
    .lefttable{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 12px;
        /*固定td宽度*/
        table-layout:fixed;
        word-break:break-all;
    }
    .lefttable tr.done{
        background: #cccccc;
    }
    .lefttable tr:hover{
        background: #09c762;
    }
    .lefttable tr:first-child:hover{
        background: #ffffff;
    }
    .lefttable .now{
        border: 2px solid black;
    }

    .midRightContentLeft table th{
        border-left: 1px solid #cccccc;
        border-bottom: 3px solid #cccccc;
        overflow: hidden;
    }
    .midRightContentLeft table td{
        height: 30px;
        border-bottom: 1px solid #cccccc;
    }
    .midRightContentLeft table td span{
        font-size: 16px;
    }
    .midRightContentLeft table .name{
        width: 100px;
    }
    .midRightContentLeft table .add_time{
        width: 100px;
    }
    .midRightContentLeft table .adder{
        width: 55px;
    }
    .midRightContentLeft table .auditor{
        width: 55px;
    }
    .midRightContentLeft table .delete_panal{
        width: 35px;
    }
    .midRightContentLeft table .done_cancel{
        width: 35px;
    }
    .midRightContentLeft table .enter{
        width: 35px;
    }
    .enter span:hover{
        color: #ffffff;
    }


    .lefttable .deleted{
        color: black;
    }
    .lefttable .undeleted{
        color: #999999;
    }

    .midRightContentRight{
        flex: 1;
        padding: 2px;
        position: relative;
    }

    .rightTable{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        font-size: 12px;
        /*固定td宽度*/
        table-layout:fixed;
        word-break:break-all;
    }
    .rightTable th{
        height: 32px;
        border-left: 1px solid #cccccc;
        border-bottom: 3px solid #cccccc;
        overflow: hidden;
    }
    .rightTable td{
        height: 30px;
        border-bottom: 1px solid #cccccc;
    }
    .rightTable .sampleSn{
        width: 100px;
    }
    .rightTable .name{
        width: 100px;
    }
    .rightTable .gender{
        width: 35px;
    }
    .rightTable .receiveTime{
        width: 100px;
    }
    .rightTable .Depth{
        width: 75px;
    }
    .rightTable .effectDepth{
        width: 75px;
    }
    .rightTable .coverage{
        width: 75px;
    }
    .rightTable .effectCoverage500{
        width: 75px;
    }
    .rightTable .targetCount{
        width: 35px;
    }
    .rightTable .hereditaryCount{
        width: 35px;
    }
    .rightTable .tmbCount{
        width: 35px;
    }

    .error{
        color: orangered;
        font-size: 12px;
    }

    .rightPagewrapper{
        width: 400px;
        height: 45px;
        position: absolute;
        right: 2px;
        bottom: 2px;
    }


</style>
