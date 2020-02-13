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
                            <th class="total">条目总数</th>
                            <th class="submitedAndAffirmed">已提已审</th>
                            <th class="unsubmitedAndAffirmed">未提已审</th>
                            <th class="unsubmitedAndUnaffirmed">未提未审</th>
                            <th class="tick">
                                <button class="selectALL" on:click={handleSelectAllSample}>
                                    {selected_sample_ids_list.length === sample_list.length? '取消':'全选'}
                                </button>
                            </th>
                        </tr>
                    </table>
                    <div class="tableContent">
                        <table class="sampleTable ">
                            {#each sample_list as sample}
                                <tr on:click={()=>handleSelectSample(sample.id)}>
                                    <td class="sampleSn">{sample.sampleSn}</td>
                                    <td class="total">{sample_record_dict[sample.id]?sample_record_dict[sample.id][dict.ALLMUT]:''}</td>
                                    <td class="submitedAndAffirmed">{sample_record_dict[sample.id]?sample_record_dict[sample.id][dict.S_AMUT]:''}</td>
                                    <td class="unsubmitedAndAffirmed">{sample_record_dict[sample.id]?sample_record_dict[sample.id][dict.US_AMUT]:''}</td>
                                    <td class="unsubmitedAndUnaffirmed">{sample_record_dict[sample.id]?sample_record_dict[sample.id][dict.US_UAMUT]:''}</td>
                                    <td class="tick">
                                        <span class="{selected_sample_ids_list.indexOf(sample.id)>-1?'icon-checkbox-checked':
                                        'icon-checkbox-unchecked'}"></span>
                                    </td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </div>
                <div class="leftTopMidWrapper">
                    <div class="messageWrapper">
                        <div class="title">
                            {countTotalUnsubtmitAndAffirmed()}条待提交，{countTotalUnsubtmitAndUnaffirmed()}条待审核
                            <button class="icon-download" on:click={()=>download()}></button>
                            <button class="icon-cloud-upload" on:click={()=>uploadAffirmedMutant()}>&nbsp;提交</button>
                        </div>
                        <div class="uploadMessage" bind:this={uploadMessageDiv}>
                            {#each upload_message_list as message}
                                {message}<br>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="leftMidWrapper">
                    <div class="selectFile">
                        <input class="fileInput" id="fileWidget" type="file"
                               multiple="true" accept=".bam,.bai" on:change={()=>loadFiles()}/>
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
                                <th class="affirmed">确定审核</th>
                                <th class="recover">修改恢复</th>
                                <th class="delete">删除此行</th>
                                <th class="sampleSn" on:click={()=>handleOrderEVENT(dict.SAMPLEID2UNDERLINE)}>样本编号
                                    <div class="icon-sort-amount-asc {order_query_dict[dict.SAMPLEID2UNDERLINE][sampleId_status_selected_index].status !== dict.SAMPLEID2UNDERLINE?
                                    'gray':''}"></div>
                                </th>
                                <th class="chr" on:click={()=>handleOrderEVENT(dict.CHR)}>染色体
                                    <div class="icon-sort-amount-asc {order_query_dict[dict.CHR][chr_status_selected_index].status !== dict.CHR?
                                    'gray':''}"></div>
                                </th>
                                <th class="posStart" on:click={()=>handleOrderEVENT(dict.POSSTART)}>起始位置
                                    <div class="icon-sort-amount-asc {order_query_dict[dict.POSSTART][posStart_status_selected_index].status !== dict.POSSTART?
                                    'gray':''}"></div>
                                </th>
                                <th class="posEnd" on:click={()=>handleOrderEVENT(dict.POSEND)}>终止位置
                                    <div class="icon-sort-amount-asc {order_query_dict[dict.POSEND][posEnd_status_selected_index].status !== dict.POSEND?
                                    'gray':''}"></div>
                                </th>
                                <th class="ref">参考序列</th>
                                <th class="alt">突变序列</th>
                                <th class="freq">频率</th>
                                <th class="projectAbbreviation">项目简称</th>
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
                                <tr class="{now_mutant_id===mutant.id?'current':''} {checkTrColor(mutant.id)}"
                                    on:click={()=>handleChangeCurrentIds(mutant.id, mutant.sample.id)}>
                                    <td class="done">
                                        <button class="{checkDoneMutSubmits(mutant.id)?'icon-lock':'icon-unlocked'}"
                                            on:click={()=>handleEventForSure(model_dict.MUTANT, mutant_status_dict.DONE, [mutant.id, mutant.sample.id])}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.DONE)?'disabled':''}">
                                        </button>
                                    </td>
                                    <td class="affirmed">
                                        <button class="{checkAffirmedMutSubmits(mutant.id)?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                            on:click={()=>handleAffirmForMutSubmits(mutant.id, mutant.sample.id)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.AFFIRMED)?'disabled':''}">
                                        </button>
                                    </td>
                                    <td class="recover">
                                        <button class="{checkAllFieldsEqualForMutSubmits(mutant.id)?'equal':''} icon-undo2"
                                            on:click={()=>recoverValueForMutSubmits([mutant.id],[dict.DELETE])}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.RECOVER)?'disabled':''}">
                                        </button>
                                    </td>
                                    <td class="delete" title="实时数据：{mutant.delete?'删除':'保留'}">
                                        <button class="{checkDeleteNowvalueForMutSubmits(mutant.id)?'':'undeleted'} icon-cross"
                                            on:click={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.DELETE)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.DELETE)?'disabled':''}">
                                        </button>
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, dict.DELETE)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="sampleSn" title="样本id为：{mutant.sample.id}，突变id为：{mutant.id}">{mutant.sample.sampleSn}</td>
                                    <td class="chr">{mutant.chr}</td>
                                    <td class="posStart" title="实时数据：{mutant.posStart}">
                                        <input class="mutantInput" type="number"
                                            value="{getValueInMutSubmits(mutant.id, dict.POSSTART)}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.POSSTART)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.POSSTART)?'disabled':''}"/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, dict.POSSTART)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="posEnd" title="实时数据：{mutant.posEnd}">
                                        <input class="mutantInput" type="number"
                                            value="{getValueInMutSubmits(mutant.id, dict.POSEND)}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.POSEND)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.POSEND)?'disabled':''}"/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, dict.POSEND)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="ref" title="实时数据：{mutant.ref}">
                                        <input class="mutantInput" type="text"
                                            value="{getValueInMutSubmits(mutant.id, dict.REF)}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.REF)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.REF)?'disabled':''}"/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, dict.REF)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="alt" title="实时数据：{mutant.alt}">
                                        <input class="mutantInput" type="text"
                                            value="{getValueInMutSubmits(mutant.id, dict.ALT)}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.ALT)}
                                            disabled="{checkIfNeedDisabled(mutant.id, dict.ALT)?'disabled':''}"/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, dict.ALT)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="freq">{mutant.freq.toFixed(3)}</td>
                                    <td class="projectAbbreviation">{mutant.projectAbbreviation}</td>
                                    <td class="hgvs">
                                        <div class="inside" title="{mutant.hgvs}">{mutant.hgvs}</div>
                                    </td>
                                    <td class="geneVar">
                                        <div class="inside" title="{mutant.geneVar}">{mutant.geneVar}</div>
                                    </td>
                                    <td class="exonicfuncRefgene">
                                        <div class="inside" title="{mutant.exonicfuncRefgene}">{mutant.exonicfuncRefgene}</div>
                                    </td>
                                    <td class="clinsig">
                                        <div class="inside" title="{mutant.clinsig}">{mutant.clinsig}</div>
                                    </td>
                                    <td class="intervarAutomated">
                                        <div class="inside" title="{mutant.intervarAutomated}">{mutant.intervarAutomated}</div>
                                    </td>

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
    <script>
        import api from '../../api'
        import fileUtil from '../../utils/file'
        import {
            getItemById,
            getItemById2,
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

        import {onMount, createEventDispatcher, beforeUpdate, afterUpdate} from 'svelte'
        import {dict_translate} from "../../utils/dict";
        import {getTime} from "../../utils/common";

        const dispatch = createEventDispatcher()

        let dict = {CONTENT: 'content', GET: 'get', ADD: 'add', MODIFY: 'modify', DELETE: 'delete',
            TOPSCROLL: 'topScroll', INSIDESCROLL: 'insideScroll', NOWVALUE: 'nowValue', PREVALUE: 'preValue',
            SAMPLEID2UNDERLINE: 'sample__id', DONE: 'done', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
            ALLMUT: 'allMut', S_AMUT: "subAndAffMut", US_AMUT: 'unsubAndAffMut', US_UAMUT: 'unsubAndUnaffMut',
            STATUS: 'status', SAMPLEID: 'sampleId', SAMPLESN: 'sampleSn', AFFIRMED: 'affirmed', RECOVER: 'recover'}

        // 数据下载后，创建mutant_submit_dict, 只有done和free状态
        // 修改数据后，状态改为checked， deleted，edited
        let mutant_status_dict = {'FREE': 'free', 'DONE':'done', 'CHECKED': 'checked', 'DELETED': 'deleted', 'EDITED': 'edited'}
        let mutant_field_dict = {'POSSTART': 'posStart', 'POSEND': 'posEnd', 'REF': 'ref', 'ALT': 'alt', 'DELETE': 'delete', 'DONE': 'done'}
        let model_dict = {PANAL: 'panal', MUTANT: 'mutant'}


        // 控制右侧的标题和下面mutant内容的联动
        let topScroll
        let insideScroll

        // 绑定上传信息的div
        let uploadMessageDiv
        let autoscroll

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

        let now_mutant_id = -1
        let now_sample_id = -1

        // panal的done状态
        let panal_done = false

        // sample列表相关参数
        let sample_list = []
        let sampleSn_dict = {}
        let selected_sample_ids_list = []
        let sample_record_dict = {}


        // 计算未提交已审核总数
        $: countTotalUnsubtmitAndAffirmed = ()=>{
            let num = 0
            for (let sample_id in sample_record_dict) {
                num += sample_record_dict[sample_id][dict.US_AMUT]
            }
            return num
        }
        // 计算未提交未审核总数
        $: countTotalUnsubtmitAndUnaffirmed = ()=>{
            let num = 0
            for (let sample_id in sample_record_dict) {
                num += sample_record_dict[sample_id][dict.US_UAMUT]
            }
            return num
        }


        // mutant列表相关
        let mutant_list = []
        // 用作校验和计算每个sample的突变总数
        let mutant_list_whole_panal = []


        //处理mutant数据修改相关参数
        let mutant_submit_dict = {}

        // 检查mutant单行，是否已经被审核done
        $: checkDoneMutSubmits = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return false
            }else {
                return mutant_submit_dict[mutant_id][dict.STATUS] === mutant_status_dict.DONE
            }
        }
        // 检查mutant单行，是否已经被确认affirmed
        $: checkAffirmedMutSubmits = (mutant_id) =>{
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return false
            }else{
                let affirm_list = [mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED]
                if (affirm_list.indexOf(mutant_submit_dict[mutant_id][dict.STATUS]) !== -1) {
                    return true
                }
            }
        }
        //查看mutant条中所有5个field，包含delete，是否一致
        $: checkAllFieldsEqualForMutSubmits = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return true
            }else{
                let default_field_list = [dict.DELETE, dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
                let all_equal = true
                for (let field of default_field_list) {
                    if (mutant_submit_dict[mutant_id][field][dict.NOWVALUE] !==
                            mutant_submit_dict[mutant_id][field][dict.PREVALUE]) {
                        all_equal = false
                        break
                    }
                }
                return all_equal
            }
        }
        //查看mutant中的delete的nowValue状态
        $: checkDeleteNowvalueForMutSubmits = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return false
            }else{
                return mutant_submit_dict[mutant_id][dict.DELETE][dict.NOWVALUE]
            }
        }
        // 获取mutant的单行的某个field的nowValue
        $: getValueInMutSubmits = (mutant_id, field)=>{
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return null
            }else{
                return mutant_submit_dict[mutant_id][field].nowValue
            }
        }
        // 判断mutant的单行的某个field的nowValue和preValue是否相同
        $: checkValueChangeInMutSubmits = (mutant_id, field) =>{
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return true
            }else{
                return mutant_submit_dict[mutant_id][field].nowValue === mutant_submit_dict[mutant_id][field].preValue
            }
        }
        // 判断affirmed，recover，delete，posStart，posEnd，ref，alt是否需要disabled
        $: checkIfNeedDisabled = (mutant_id, button) => {
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return true
            }else{
                // 如果panal状态为done，全部都是disabled
                if (panal_done) return true

                let status = mutant_submit_dict[mutant_id][dict.STATUS]
                // 如果mutant是已审核的done状态，除开done，全部都disabled
                if (status === mutant_status_dict.DONE && button !== dict.DONE) return true

                let affirmed_list = [mutant_status_dict.EDITED, mutant_status_dict.DELETED, mutant_status_dict.CHECKED]
                // 如果是3种已确认状态，除开done，affirmed，全部disabled
                if (affirmed_list.indexOf(status) !== -1 && button !== dict.DONE && button !== dict.AFFIRMED) return true
            }
        }
        // 判断mutant行的状态
        $: checkTrColor = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return true
            }else{
                let status = mutant_submit_dict[mutant_id][dict.STATUS]
                let deleteNowValue = mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.NOWVALUE]
                if (status === mutant_status_dict.FREE && deleteNowValue) {
                    // 此时为已删除提交后撤回后状态，任然需要标注为delete红色
                    return mutant_status_dict.DELETED
                }
                return status
            }
        }


        // mutant的总页数
        let mutant_num
        $: mutant_totalPage = ()=>{
            return Math.ceil(mutant_num/mutant_param_page_size)
        }


        // 其中sampleIds根据selected_sample_ids内容变动
        let mutant_param_page = 1
        let mutant_param_page_size = 10

        $:mutant_param_sampleIds = ()=>{
            return selected_sample_ids_list.join(',')
        }

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
        $: mutant_param_done = ()=> {return done_status_list[done_status_selected_index].status}

        // 处理mutant排序相关事宜参数
        let order_query_dict = {
            sample__id: [{status: dict.SAMPLEID2UNDERLINE,
                content: 'sampleId顺序'},
                {status: null,
                    content: 'SampleId无序'}],
            chr: [{status: dict.CHR,
                content: 'chr顺序'},
                {status: null,
                    content: 'chr无序'}],
            posStart: [{status: dict.POSSTART,
                content: 'posStart顺序'},
                {status: null,
                    content: 'posStart无序'}],
            posEnd: [{status: dict.POSEND,
                content: 'posEnd顺序'},
                {status: null,
                    content: 'posEnd无序'}]
        }
        let sampleId_status_selected_index = 0
        let chr_status_selected_index = 0
        let posStart_status_selected_index = 0
        let posEnd_status_selected_index = 0
        $: mutant_param_order = () =>{
            return [order_query_dict[dict.SAMPLEID2UNDERLINE][sampleId_status_selected_index].status,
                order_query_dict[dict.CHR][chr_status_selected_index].status,
                order_query_dict[dict.POSSTART][posStart_status_selected_index].status,
                order_query_dict[dict.POSEND][posEnd_status_selected_index].status].join(',')
        }

        // 用于sure组件通信使用
        let sureModel
        let sureEvent
        let sureObjectIdList = []
        let sureObjectValueList = []

        $: sendSureMessage = () => {
            return "是否对" + dict_translate[sureModel] + "进行" + dict_translate[sureEvent] + "相关操作"
        }


        // 上传数据的结果信息列表
        let upload_message_list = []


        // track的configs库
        let track_configs_dict = {}

        // 获取路径中的：值
        export let params = {}


        async function test() {
            // let list=[
            //     {id: 1,
            //     content: {
            //         a:{}
            //     }},
            //     {id: 2,
            //         content: {
            //             a:{
            //                 b: 222
            //             }
            //     }},
            // ]
            // console.log(JSON.stringify(list))
            // getItemByIdandOperateAttr(list, 2, ['content'], 'delete')
            // console.log(sample_list)

            // await api.updateMutant(8684, {
            //     done: true,
            //     posStart: null,
            // }).then((response)=>{
            //     console.log('上传完成')
            // }).catch((error)=>{
            //     console.error(error)
            // })
            // console.log(JSON.stringify(mutant_submit_dict))
            // console.log(selected_sample_ids_list)
            // console.log(sample_record_dict)
            // console.log(sampleSn_dict)
            console.log(track_configs_dict)
            // console.log(mutant_list)
            // console.log(getItemByIdandOperateAttr(list, 2, ['content'], 'get'))
            // getItemByIdandOperateAttr(list, 2, ['content', 'a', 'b'], 'modify', 1234)
        }


        // 获取sample列表， 获取整个panal的mutant列表，仅一次用于初始化页面时
        async function getSamplesList(panal_id) {
            // console.log('begin getSamplesList')
            loadingShow = true

            await api.retrievePanal(panal_id).then((response) => {
                sample_list = response.data.samples
                mutant_list_whole_panal = response.data.mutants
                panal_done = response.data.done
                // 遍历获取新数组
                selected_sample_ids_list = sample_list.map((value, index, array)=>{return value.id})
            }).catch((error) => {
                console.error("getSamplesList", error)
                if (error.data) {
                    errors.detail = error.data.detail ? error.data.detail : ''
                }
            })

            loadingShow = false
            // console.log('end getSamplesList')
        }

        // 设置mutant列表和mutant总数
        function __setMutListAndMutantNum(list, count) {
            mutant_list = list
            mutant_num = count
        }
        // 获取mutant列表(2)
        async function getMutantslist(){
            // console.log('begin getMutantsList')
            // 获取mutant列表
            // 如果没有选中任何sample，将mutant_list置空
            // console.log('getMutantList begin')
            loadingShow = true

            if (selected_sample_ids_list.length===0) {
                __setMutListAndMutantNum([], 0)
                loadingShow = false
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
                __setMutListAndMutantNum(response.data.results, response.data.count)
            }).catch((error)=>{
                console.error('getMutantList', error)
                if(error.data){
                    errors.detail = error.data.detail?error.data.detail: ''
                }
            })

            loadingShow = false
            // console.log('end getMutantsList')
        }


        // 给sample_list添加每个sample的突变总数
        function buildMutantSubmitDictandAllSampleRecordDictandAllMutantTotalNum(){
            // console.log('begin build mutant_submit_dict')
            // 构建sample_record_dict(id为key)，构建sampleSn_dict(sampleSn为key)
            for (let sample of sample_list) {
                sample_record_dict[sample.id] = {
                    sampleSn: sample.sampleSn,
                    allMut: 0,
                    subAndAffMut: 0,
                    unsubAndAffMut: 0,
                    unsubAndUnaffMut: 0
                }
                sampleSn_dict[sample.sampleSn] = {
                    sampleId: sample.id
                }
            }
            // 构造mutant_submit_dict
            for (let mutant of mutant_list_whole_panal) {
                // 制作mutant修改的提交列表
                mutant_submit_dict[mutant.id] = {
                    sampleId: mutant.sample,
                    sampleSn: mutant.sampleSn,
                    status: mutant.done ? mutant_status_dict.DONE : mutant_status_dict.FREE,
                    delete: {
                        nowValue: mutant.delete,
                        preValue: mutant.delete
                    },
                    posStart: {
                        nowValue: mutant.posStart,
                        preValue: mutant.posStart
                    },
                    posEnd: {
                        nowValue: mutant.posEnd,
                        preValue: mutant.posEnd
                    },
                    ref: {
                        nowValue: mutant.ref,
                        preValue: mutant.ref
                    },
                    alt: {
                        nowValue: mutant.alt,
                        preValue: mutant.alt
                    }

                }
                sample_record_dict[mutant.sample][dict.ALLMUT]++
                if (mutant.done) {
                    sample_record_dict[mutant.sample][dict.S_AMUT]++
                }else{
                    sample_record_dict[mutant.sample][dict.US_UAMUT]++
                }
            }

            // TODO 必须左赋值一次啊，不然就是打开页面，无法获取数据
            // sample_list = sample_list
            mutant_submit_dict = mutant_submit_dict

            // console.log('end build mutant_submit_dict')
        }



        //处理mutant列表头和身体滑动联动问题
        function handleScroll(object){
            // console.log(topScroll.scrollLeft)
            if (object === dict.TOPSCROLL) {
                insideScroll.scrollTo(topScroll.scrollLeft, 0)
            }else if (object === dict.INSIDESCROLL) {
                topScroll.scrollTo(insideScroll.scrollLeft, 0)
            }
        }


        // 处理点击mutant行，更好当前选中突变id
        function handleChangeCurrentIds (mutant_id, sample_id) {
            now_mutant_id = mutant_id
            now_sample_id = sample_id
        }


        // 处理sample样品全选、取消全选
        async function handleSelectAllSample() {
            // console.log('handleAll' + selected_sample_ids_list.length + " " + sample_list.length)
            if (selected_sample_ids_list.length !== sample_list.length) {
                selected_sample_ids_list =  sample_list.map((value, index, array) => {return value.id} )
            }else{
                selected_sample_ids_list = []
            }

            mutant_param_page = 1
            await getMutantslist()
        }

        // 处理sample样品单独选择
        async function handleSelectSample(sample_id) {
            // console.log('handleSelectSample ' + sample_id)
            if (selected_sample_ids_list.indexOf(sample_id)===-1) {
                selected_sample_ids_list.push(sample_id)
                selected_sample_ids_list = selected_sample_ids_list.sort((a, b)=>{return(a-b)})
            }else{
                selected_sample_ids_list = removeFromUniqueArray(selected_sample_ids_list, sample_id)
            }

            mutant_param_page = 1
            await getMutantslist()
        }


        // 处理muatant列表中false/true类过滤问题
        async function handleSubmenuFilter(object_event) {
            if (object_event===mutant_status_dict.DONE) {
                done_status_selected_index = (done_status_selected_index+1)%(done_status_list.length)

                mutant_param_page = 1
                await getMutantslist()
            }
        }

        // 处理mutant排序问题
        async function handleOrderEVENT(event_type){
            console.log(event_type)
            switch (event_type) {
                case dict.SAMPLEID2UNDERLINE:
                    sampleId_status_selected_index = (sampleId_status_selected_index +1)%
                            (order_query_dict[dict.SAMPLEID2UNDERLINE].length)
                    break
                case dict.CHR:
                    chr_status_selected_index = (chr_status_selected_index + 1)%
                            (order_query_dict[dict.CHR].length)
                    break
                case dict.POSSTART:
                    posStart_status_selected_index = (posStart_status_selected_index + 1)%
                            (order_query_dict[dict.POSSTART].length)
                    break
                case dict.POSEND:
                    posEnd_status_selected_index = (posEnd_status_selected_index + 1)%
                            (order_query_dict[dict.POSEND].length)
                    break
            }

            mutant_param_page = 1
            await getMutantslist()
        }

        // 处理每页显示数量
        function handleChangePageSizeForMutant(event){
            mutant_param_page_size = event.detail.pageSize

            mutant_param_page = 1
            getMutantslist()
        }
        // 处理翻页
        function handleChangePageForMutant(event){
            mutant_param_page = event.detail.page

            getMutantslist()
        }

        // 将sample_record_dict记录中某sample的from项总数-1，然后+1到to项总数
        function __moveCountFromToInSamRecDict (sample_id, from , to) {
            sample_record_dict[sample_id][from]--
            sample_record_dict[sample_id][to]++
        }
        // 将mutant_submit_dict中某mutant的status进行改变
        function __changeMutantStatusInMutSubDict(mutant_id, status) {
            mutant_submit_dict[mutant_id][dict.STATUS] = status
        }

        // 处理撤销mutant完成事物
        async function changeMutantDone(mutant_sample_ids, mutant_done_status) {
            loadingShow = true
            let mutant_id = mutant_sample_ids[0]
            let sample_id = mutant_sample_ids[1]
            console.log(mutant_id + " " + sample_id)
            await api.updateMutant(mutant_id, {
                done: mutant_done_status
            }).then((response)=>{
                console.log(response.data)
                // 修改成功后，将对应的mutant，status修改为free
                __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.FREE)
                // 修改对应sample的，已提交已修改-1，未提交未修改+1
                __moveCountFromToInSamRecDict(sample_id, dict.S_AMUT, dict.US_UAMUT)
            }).catch((error)=>{
                console.error('changeMutantDone', error)
                if (error.data) errors.data = error.data?error.data:''
            })

            loadingShow = false
        }

        // TODO 此处确定对象类型，事件类型，对象id，对象目的值
        function handleEventForSure(model, event, object_id_list=[], object_value_list=[]) {
            sureModel = model
            sureEvent = event
            sureObjectIdList = object_id_list
            sureObjectValueList = object_value_list

            //针对不同模型处理
            switch (sureModel) {
                case model_dict.MUTANT:
                    // 针对不同的事项处理
                    switch (sureEvent) {
                        case mutant_status_dict.DONE:
                            // console.log('mutant done')
                            let mutant_id = sureObjectIdList[0]
                            // 如状态是未完成，则返回
                            if (mutant_submit_dict[mutant_id][dict.STATUS] !== mutant_status_dict.DONE) return
                            // 显示确认界面
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
                                await changeMutantDone(sureObjectIdList, false)
                                await getMutantslist()
                                break
                        }
                        break
                }
            }else{
                loadingShow = false
            }
        }

        // 处理审核确认事件(附属方法)
        function __check4FieldEqual (mutant_id) {
            let default_field_list = [dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
            let equal = true
            for (let field of default_field_list) {
                if (mutant_submit_dict[mutant_id][field][dict.NOWVALUE] !==
                        mutant_submit_dict[mutant_id][field][dict.PREVALUE]) {
                    equal = false
                    break
                }
            }
            return equal
        }
        // 处理审核确认事件
        function handleAffirmForMutSubmits(mutant_id, sample_id) {

            let status = mutant_submit_dict[mutant_id][dict.STATUS]
            // 如果处于3个已审阅状态，则撤回到未审核
            if ([mutant_status_dict.CHECKED, mutant_status_dict.DELETED, mutant_status_dict.EDITED].
            indexOf(status) !== -1) {
                // 修改状态为free
                __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.FREE)
                // 此时必然是 未提交已审核 状态，则未提交已审核-1, 未提交未审核+1
                __moveCountFromToInSamRecDict(sample_id, dict.US_AMUT, dict.US_UAMUT)
                return
            }

            // 此时必然是 未提交未审核 状态，则未提交未审核-1, 未提交已审核+1
            __moveCountFromToInSamRecDict(sample_id, dict.US_UAMUT, dict.US_AMUT)

            if (mutant_submit_dict[mutant_id][dict.DELETE][dict.NOWVALUE]) {
                __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.DELETED)
                return
            }else{
                // 统计是否已经存在4个field的修改，有修改则为edited
                if (__check4FieldEqual(mutant_id)) {
                    __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.CHECKED)
                    return
                }else{
                    __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.EDITED)
                    return
                }
            }
        }
        //恢复mutant数据，按field列表恢复
        function recoverValueForMutSubmits(mutant_id_list, field_list=[]) {
            let default_field_list = [dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
            for (let field of field_list) {
                if (default_field_list.indexOf(field) === -1) default_field_list.push(field)
            }
            for (let mutant_id of mutant_id_list) {
                for (let field of default_field_list) {
                    mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = mutant_submit_dict[mutant_id][field][dict.PREVALUE]
                }
            }
        }
        // 处理mutant属性修改
        function handleValueChangeForMutSubmits(e, mutant_id, field){
            // console.log(e.target.value)

            if (field === mutant_field_dict.DELETE) {
                mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = !mutant_submit_dict[mutant_id][field][dict.NOWVALUE]
                // 同时需要将其余已修改的项恢复
                recoverValueForMutSubmits([mutant_id])
            }else{
                // 操作前如果将delete置换为false
                mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.NOWVALUE] = false
                // 接着修改field的nowValue
                if ([dict.POSSTART, dict.POSEND].indexOf(field) !== -1) {
                    mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = parseInt(e.target.value)
                }else if ([dict.REF, dict.ALT].indexOf(field) !== -1) {
                    mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = e.target.value
                }
            }

        }


        function download() {
            window.location.href = 'http://192.168.137.67:8001/media/target/zc2/zc2_2019-12-19_11:35:53.xlsx'
        }


        // 在mutant_submit_dict中，将某mutant的preValue使用nowValue进行替换
        function __substitutePreValueInMutSubDict(mutant_id, field_list) {
            for (let field of field_list) {
                mutant_submit_dict[mutant_id][field][dict.PREVALUE] = mutant_submit_dict[mutant_id][field][dict.NOWVALUE]
            }
        }
        // 在mutant_submit_dict中，查看4个域是否相等，返回上传准备数据
        function __getUnequalParamsInMutSubDict(mutant_id){
            let default_field_list = [dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
            let params = {done: true}
            for (let field of default_field_list) {
                if (mutant_submit_dict[mutant_id][field][dict.NOWVALUE] !==
                        mutant_submit_dict[mutant_id][field][dict.PREVALUE]) {
                    params[field] = mutant_submit_dict[mutant_id][field][dict.NOWVALUE]
                }
            }
            console.log(JSON.stringify(params))
            return params
        }

        async function uploadAffirmedMutant() {
            loadingShow = true
            if (panal_done) {
                errors.detail = 'panal已经审核完成，请先撤回'
            }

            let success_num = 0
            let fail_num = 0
            for (let mutant_id in mutant_submit_dict) {
                let status = mutant_submit_dict[mutant_id][dict.STATUS]
                let sample_id = mutant_submit_dict[mutant_id][dict.SAMPLEID]
                let sampleSn = mutant_submit_dict[mutant_id][dict.SAMPLESN]
                let submit = false
                let success = false
                let deleteNowValue = mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.NOWVALUE]
                let deletePreValue = mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.PREVALUE]

                if (deletePreValue) {

                    // 已删除提交后的撤回状态
                    if (status === mutant_status_dict.CHECKED) {
                        submit = true
                        // 取消删除
                        await api.updateMutant(mutant_id, {
                            done: true,
                            delete: deleteNowValue
                        }).then((response) => {
                            //delete的preValue改为nowValue，即false
                            __substitutePreValueInMutSubDict(mutant_id, [mutant_field_dict.DELETE])
                            success = true
                        }).catch((error) => {
                        })
                    }
                    if (status === mutant_status_dict.DELETED) {
                        submit = true
                        // 保持删除，只需修改done为true
                        await api.updateMutant(mutant_id, {
                            done: true
                        }).then((response) => {
                            success = true
                        }).catch((error) => {
                        })
                    }
                    if (status === mutant_status_dict.EDITED) {
                        submit = true
                        // 取消删除，并且进行了修改
                        let params = __getUnequalParamsInMutSubDict(mutant_id)
                        params[mutant_field_dict.DONE] = true
                        params[mutant_field_dict.DELETE] = deleteNowValue
                        await api.updateMutant(mutant_id,
                                params).then((response) => {
                            // 排开done，delete，4项中有差异的field，preValue替换为nowValue
                            delete params[mutant_field_dict.DONE]
                            for (let field in params) {
                                __substitutePreValueInMutSubDict(mutant_id, field)
                            }
                            success = true
                        }).catch((error) => {
                        })
                    }
                } else {
                    // 非已删除提交后的撤回状态
                    if (status === mutant_status_dict.CHECKED) {
                        submit = true
                        await api.updateMutant(mutant_id, {
                            done: true
                        }).then((response) => {
                            success = true
                        }).catch((error) => {
                        })
                    }

                    if (status === mutant_status_dict.DELETED) {
                        submit = true
                        await api.updateMutant(mutant_id, {
                            done: true,
                            delete: deleteNowValue
                        }).then((response) => {
                            //delete的preValue改为nowValue, 即true
                            __substitutePreValueInMutSubDict(mutant_id, [mutant_field_dict.DELETE])
                            success = true
                        }).catch((error) => {
                        })
                    }

                    if (status === mutant_status_dict.EDITED) {
                        submit = true
                        let params = __getUnequalParamsInMutSubDict(mutant_id)
                        await api.updateMutant(mutant_id,
                                params).then((response) => {
                            // 排开done，4项中有差异的field，preValue替换为nowValue
                            delete params[mutant_field_dict.DONE]
                            for (let field in params) {
                                __substitutePreValueInMutSubDict(mutant_id, [field])
                            }
                            success = true
                        }).catch((error) => {
                        })
                    }
                }

                if (submit) {
                    let time = getTime()

                    if (success) {
                        // 如果成功 mutant项需要把状态改为done
                        __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.DONE)
                        // sample_record_dict中未提交已审核-1，已提交已审核+1
                        __moveCountFromToInSamRecDict(sample_id, dict.US_AMUT, dict.S_AMUT)
                        success_num++
                        upload_message_list.push(time + " 样本" + sampleSn + " 突变" + mutant_id + " 已处理。")
                    } else {
                        fail_num++
                        upload_message_list.push(time + " 样本" + sampleSn + " 突变" + mutant_id + " 上传失败！")
                    }
                    upload_message_list = upload_message_list
                }
            }

            let time = getTime()
            upload_message_list.push(time + " 提交成功" + success_num + "条, 失败" + fail_num + "条。")
            mutant_param_page = 1
            getMutantslist()

            loadingShow = false
        }


        // 为track_configs_dict添加track信息
        function addTrackConfigs(files){
            let bamFiles = fileUtil.getFilesDictBySuffix(files, '.bam')
            let baiFiles = fileUtil.getFilesDictBySuffix(files, '.bai')
            let paired_Files = {}
            for (let bam_name in bamFiles) {
                let find = false
                for (let bai_name in baiFiles) {
                    if (bam_name === bai_name) {
                        find = true
                        break
                    }
                }
                if (find) {
                    paired_Files[bam_name] = {"bam": bamFiles[bam_name], "bai": baiFiles[bam_name]}
                }
            }

            for (let sampleSn in paired_Files) {
                if (sampleSn_dict[sampleSn]) {
                    track_configs_dict[sampleSn_dict[sampleSn][dict.SAMPLEID]] = {
                        name: sampleSn,
                        type: "alignment",
                        format: 'bam',
                        samplingDepth: 100,
                        alignmentRowHeight: 10,
                        // 不显示remove按钮
                        removable: false,
                        //track高度
                        height: 120,
                        url: paired_Files[sampleSn].bam,
                        indexURL: paired_Files[sampleSn].bai
                    }
                }
            }
        }

        // 加载bam，bai文件
        function loadFiles() {
            let fileWidget = document.getElementById('fileWidget')
            let files = fileWidget.files
            addTrackConfigs(files)
            fileWidget.value = ''
        }



        onMount(async ()=>{
            // console.log('begin onMount')
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

            buildMutantSubmitDictandSampleRecordDict()

            loadingShow = false
        })

        beforeUpdate(()=>{
            // TODO offsetHeight为含边框的div高度，scrollTop为元素被上边框遮住的部分，scrollHeight为内容高度
            autoscroll = uploadMessageDiv && (uploadMessageDiv.offsetHeight + uploadMessageDiv.scrollTop) < uploadMessageDiv.scrollHeight
        })

        afterUpdate(()=>{
            if (autoscroll) uploadMessageDiv.scrollTo(0, uploadMessageDiv.scrollHeight)
        })

    </script>
{/if}







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
        flex: 0 0 308px;
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
        border-bottom: 1px solid black;
    }
    .leftTopMidWrapper .messageWrapper{
        margin: 3px;
    }
    .leftTopMidWrapper .messageWrapper .title{
        padding: 5px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border-bottom: 1px solid #cccccc;
    }
    .leftTopMidWrapper .messageWrapper .uploadMessage{
        height: 182px;
        margin-bottom: 5px;
        font-size: 12px;
        overflow-y: scroll;
    }
    .leftTopMidWrapper .messageWrapper .title button{
        margin: 0 3px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 55px;
        float: right;
    }
    .leftTopMidWrapper .messageWrapper .title button.icon-download{
        margin: 0 3px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 35px;
        float: right;
    }

    .leftMidWrapper{
        flex: 0 0 150px;
        border-bottom: 1px solid black;
    }
    .leftMidWrapper .selectFile{
        padding: 3px;
        width: 300px;
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
    .contentRight .rightMutantTable tr.current{
        border: 2px solid black;
    }
    .contentRight .rightMutantTable tr.checked{
        background: #c3fff0;
    }
    .contentRight .rightMutantTable tr.deleted{
        background: #ff7f70
    }
    .contentRight .rightMutantTable tr.edited{
        background: #ff8bd7;
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
    .contentRight .rightMutantTable .gray.icon-sort-amount-asc{
        color: #cccccc;
    }

    .contentRight .rightMutantTable td .icon-warning{
        font-size: 16px;
        color: indianred;
    }
    .contentRight .rightMutantTable tr.done{
        background: #aaaaaa;
    }
    .contentRight .rightMutantTable th.done:hover{
        background: #09c762;
    }
    .contentRight .rightMutantTable th.sampleSn:hover{
        background: #09c762;
    }
    .contentRight .rightMutantTable th.chr:hover{
        background: #09c762;
    }
    .contentRight .rightMutantTable th.posStart:hover{
        background: #09c762;
    }
    .contentRight .rightMutantTable th.posEnd:hover{
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
    .contentRight .rightMutantTable tr.done{
        color: #cccccc;
    }

    .contentRight .inside{
        /*white-space: nowrap;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        overflow-x: scroll;
    }
    .contentRight .mutantInput{
        margin: 0 5px 0 3px;
        border: none;
        font-weight: bold;
    }
    .contentRight .mutantInput:hover{
        background: #09c762;
    }
    /*此处必须用min-width，不然table会在div宽度内自己调整，无法溢出实现scroll TODO*/
    .contentRight .done{
        min-width: 35px;
    }
    .contentRight .done button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
        border: none;
    }
    .contentRight .done button:hover{
        background: #09c762;
    }
    .contentRight .done button.icon-unlocked{
        color: #cccccc;
    }
    .contentRight .affirmed{
        min-width: 35px;
    }
    .contentRight .affirmed button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
        border: none;
    }
    .contentRight .affirmed button:hover{
        background: #09c762;
    }
    .contentRight .affirmed button.icon-checkbox-unchecked{
        color: #cccccc;
    }
    .contentRight .recover{
        min-width: 35px;
    }
    .contentRight .recover button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
        border: none;
    }
    .contentRight .recover button:hover{
        background: #09c762;
    }
    .contentRight .recover .icon-undo2.equal{
        color: #cccccc;
    }
    .contentRight tr.checked .icon-undo2{
        color: #cccccc;
    }
    .contentRight tr.edited .icon-undo2{
        color: #cccccc;
    }
    .contentRight tr.deleted .icon-undo2{
        color: #cccccc;
    }
    .contentRight .delete{
        min-width: 60px;
    }
    .contentRight tr.done .icon-cross{
        color: #cccccc;
    }
    .contentRight .delete button{
        margin: 0;
        padding: 0;
        width: 30px;
        height: 33px;
        background: white;
        border: none;
        float: left;
    }
    .contentRight .delete button:hover{
        background: #09c762;
    }
    .contentRight .undeleted.icon-cross{
        color: #cccccc;
    }
    .contentRight tr.checked .icon-cross{
        color: #cccccc;
    }
    .contentRight tr.edited .icon-cross{
        color: #cccccc;
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
    .contentRight .posEnd .mutantInput{
        float: left;
        width: 90px;
    }
    .contentRight .ref{
        min-width: 90px;
    }
    .contentRight .ref .mutantInput{
        float: left;
        width: 60px;
    }
    .contentRight .alt{
        min-width: 90px;
    }
    .contentRight .alt .mutantInput{
        float: left;
        width: 60px;
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


    .contentRight .igvWrapper{
        flex: 1;
    }
    .contentRight .igvBind{
        width: 95%;
        margin: 3px auto;
    }
</style>
