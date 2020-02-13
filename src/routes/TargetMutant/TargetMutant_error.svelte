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
                            <th class="submitedAndAffirmed">已提交已审核</th>
                            <th class="unsubmitedAndAffirmed">未提交已审核</th>
                            <th class="unsubmitedAndUnaffirmed">未提交未审核</th>
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
                                    <td class="submitedAndAffirmed"></td>
                                    <td class="unsubmitedAndAffirmed"></td>
                                    <td class="unsubmitedAndUnaffirmed"></td>
                                    <td class="tick">
                                        <span class="{selected_sample_ids.indexOf(sample.id)>-1?'icon-checkbox-checked':
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
                            共计0条待提交，0条待审核
                            <button class="icon-cloud-upload">&nbsp;提交</button>
                        </div>
                    </div>
                </div>
                <div class="leftMidWrapper">
                    <div class="selectFile">
                        <input class="fileInput" id="fileWidget" type="file"
                               multiple="true" accept=".bam,.bai" />
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
                                <th class="projectAbbreviation">项目简称</th>
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
                                <tr class="{cur_mutant_id===mutant.id?'current':''}" on:click={()=>handleChangeCurrentMutantId(mutant.id)}>
                                    <td class="done">
                                        <button class="{mutant.done?'icon-lock':'icon-unlocked'}"
                                            on:click={()=>handleEventForSure(model_dict.MUTANT,
                                            mutant_status_dict.DONE, mutant.id, mutant.done)}>
                                        </button>
                                    </td>
                                    <td class="affirmed">
                                        <button class="{checkAffirmedMutSubmits(mutant.id)?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                            on:click={()=>handleAffirmForMutSubmits(mutant.id)}></button>
                                    </td>
                                    <td class="recover">
                                        <button class="{checkAllFieldsEqualForMutSubmits(mutant.id)?'equal':''} icon-undo2"
                                                on:click={()=>recoverValueForMutSubmits([mutant.id],[mutant_field_dict.DELETE])}>
                                        </button>
                                    </td>
                                    <td class="delete" title="实时数据：{mutant.delete?'删除':'保留'}">
                                        <button class="{checkDeleteNowvalueForMutSubmits(mutant.id)?'':'undeleted'} icon-cross"
                                            on:click={(e)=>handleValueChangeForMutSubmits(e, mutant.id, mutant_field_dict.DELETE)}></button>
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, mutant_field_dict.DELETE)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="sampleSn">{mutant.sample.sampleSn}</td>
                                    <td class="projectAbbreviation">{mutant.projectAbbreviation}</td>
                                    <td class="chr">{mutant.chr}</td>
                                    <td class="posStart" title="实时数据：{mutant.posStart}">
                                        <input class="mutantInput" type="number"
                                            value="{getValueInMutSubmits(mutant.id, mutant_field_dict.POSSTART)}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, mutant_field_dict.POSSTART)}/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, mutant_field_dict.POSSTART)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="posEnd" title="实时数据：{mutant.posEnd}">
                                        <input class="mutantInput" type="number"
                                               value="{getValueInMutSubmits(mutant.id, mutant_field_dict.POSEND)}"
                                               on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, mutant_field_dict.POSEND)}/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, mutant_field_dict.POSEND)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="ref" title="实时数据：{mutant.ref}">
                                        <input class="mutantInput" type="text"
                                               value="{getValueInMutSubmits(mutant.id, mutant_field_dict.REF)}"
                                               on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, mutant_field_dict.REF)}/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, mutant_field_dict.REF)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="alt" title="实时数据：{mutant.alt}">
                                        <input class="mutantInput" type="text"
                                               value="{getValueInMutSubmits(mutant.id, mutant_field_dict.ALT)}"
                                               on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, mutant_field_dict.ALT)}/> <!-- 只能绑定一层的值-->
                                        <div class="{checkValueChangeInMutSubmits(mutant.id, mutant_field_dict.ALT)?'':'icon-warning'}"></div>
                                    </td>
                                    <td class="freq">{mutant.freq.toFixed(3)}</td>
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

        import {onMount, createEventDispatcher} from 'svelte'
        import {dict_translate} from "../../utils/dict";

        const dispatch = createEventDispatcher()

        let dict = {CONTENT: 'content', GET: 'get', ADD: 'add', MODIFY: 'modify', DELETE: 'delete',
            TOPSCROLL: 'topScroll', INSIDESCROLL: 'insideScroll', NOWVALUE: 'nowValue', PREVALUE: 'preValue',
            SAMPLEID2UNDERLINE: 'sample__id', DONE: 'done', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', 'REF': 'ref', 'ALT': 'alt',
            SAMMUTNUM: 'sample_mutant_num', SAMMUTAUDITEDNUM: 'sample_mutant_audited_num', STATUS: 'status',
            SAMPLEID: 'sampleId'}

        // 数据下载后，创建mutant_submit_dict, 只有done和free状态
        // 修改数据后，状态改为checked， deleted，edited
        let mutant_status_dict = {'FREE': 'free', 'DONE':'done', 'CHECKED': 'checked', 'DELETED': 'deleted', 'EDITED': 'edited'}
        let mutant_field_dict = {'POSSTART': 'posStart', 'POSEND': 'posEnd', 'REF': 'ref', 'ALT': 'alt', 'DELETE': 'delete', 'DONE': 'done'}
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

        let cur_mutant_id = -1

        // sample列表相关参数
        let sample_list = []
        let selected_sample_ids = []

        // mutant列表相关
        let mutant_list = []
        // 用作校验和计算每个sample的突变总数
        let mutant_list_whole_panal = []



        //处理mutant数据修改相关参数
        let mutant_submit_dict = {}
        let mutant_change_set = new Set()

        $: checkAffirmedMutSubmits = (mutant_id) =>{
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return false
            }else{
                let affirm_list = [mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED]
                if (affirm_list.indexOf(mutant_submit_dict[mutant_id][dict.STATUS]) !== -1) return true
            }
        }
        //查看mutant条中所有数值，是否一致
        $: checkAllFieldsEqualForMutSubmits = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return true
            }else{
                let default_field_list = [mutant_field_dict.DELETE, mutant_field_dict.POSSTART, mutant_field_dict.POSEND, mutant_field_dict.REF, mutant_field_dict.ALT]
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
        //查看mutant中的delete的nowValue
        $: checkDeleteNowvalueForMutSubmits = (mutant_id) => {
            if (JSON.stringify(mutant_submit_dict) === '{}') {
                return false
            }else{
                return mutant_submit_dict[mutant_id][dict.DELETE][dict.NOWVALUE]
            }
        }
        // 为修改项的input提供value值
        $: getValueInMutSubmits = (mutant_id, field)=>{
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return null
            }else{
                return mutant_submit_dict[mutant_id][field].nowValue
            }
        }
        // 查看修改前后值有没有变化，给出警示图标
        $: checkValueChangeInMutSubmits = (mutant_id, field) =>{
            if (JSON.stringify(mutant_submit_dict) === '{}'){
                return true
            }else{
                return mutant_submit_dict[mutant_id][field].nowValue === mutant_submit_dict[mutant_id][field].preValue
            }
        }

        // 查看sample中已提交已审核的数量
        // $: countSubmitedAndAffirmedForMutSubmits = (sample_id) =>{
        //     if (JSON.stringify(mutant_submit_dict) === '{}') {
        //         return -1
        //     }else {
        //         let sub_and_aff = 0
        //         for (let mutantId in mutant_submit_dict) {
        //             if (mutant_submit_dict[mutantId][dict.SAMPLEID] === sample_id)
        //                 if (mutant_submit_dict[mutantId][dict.STATUS] === mutant_status_dict.DONE) {
        //                     sub_and_aff++
        //                 }
        //         }
        //         return sub_and_aff
        //     }
        // }
        // 查看sample中未提交已审核的数量
        // $: countUnsubmitedAndAffirmedForMutSubmits = (sample_id) => {
        //     if (JSON.stringify(mutant_submit_dict) === '{}') {
        //         return -1
        //     } else {
        //         let unsub_and_aff = 0
        //         for (let mutantId in mutant_submit_dict) {
        //             if (mutant_submit_dict[mutantId][dict.SAMPLEID] === sample_id) {
        //                 if ([mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED].
        //                 indexOf(mutant_submit_dict[mutantId][dict.STATUS]) !== -1) {
        //                     unsub_and_aff++
        //                 }
        //             }
        //         }
        //         return unsub_and_aff
        //     }
        // }
        // 查看sample中未提交未审核的数量
        // $: countUnsubmitedAndUnaffirmedForMutSubmits = (sample_id) =>{
        //     if (JSON.stringify(mutant_submit_dict) === '{}') {
        //         return -1
        //     }else {
        //         let unsub_and_unaff = 0
        //         for (let mutantId in mutant_submit_dict) {
        //             if (mutant_submit_dict[mutantId][dict.SAMPLEID] === sample_id) {
        //                 if (mutant_submit_dict[mutantId][dict.STATUS] === mutant_status_dict.FREE) {
        //                     unsub_and_unaff++
        //                 }
        //             }
        //         }
        //         return unsub_and_unaff
        //     }
        // }
        // 统计有多少要提交
        // $:countTotalUnsubmitedAndAffirmed = () => {
        //     if (JSON.stringify(mutant_submit_dict) === '{}') {
        //         return -1
        //     } else {
        //         let unsub_and_aff = 0
        //         for (let mutantId in mutant_submit_dict) {
        //             if ([mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED].
        //             indexOf(mutant_submit_dict[mutantId][dict.STATUS]) !== -1) unsub_and_aff++
        //         }
        //         return unsub_and_aff
        //     }
        // }
        // 统计有多少没审核
        // $:countTotalUnsubmitedAndUnaffirmed = () => {
        //     if (JSON.stringify(mutant_submit_dict) === '{}') {
        //         return -1
        //     } else {
        //         let unsub_and_unaff = 0
        //         for (let mutantId in mutant_submit_dict) {
        //             if (mutant_submit_dict[mutantId][dict.STATUS] === mutant_status_dict.FREE) unsub_and_unaff++
        //         }
        //         return unsub_and_unaff
        //     }
        // }






        // 目前的mutant的id，sample的id
        let now_mutant_id = -1
        let now_sample_id = -1

        // mutant的总页数
        let mutant_num
        $: mutant_totalPage = ()=>{
            return Math.ceil(mutant_num/mutant_param_page_size)
        }


        // 其中sampleIds根据selected_sample_ids内容变动
        let mutant_param_page = 1
        let mutant_param_page_size = 10

        $:mutant_param_sampleIds = ()=>{
            return selected_sample_ids.join(',')
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
            // console.log(sample_list)
            // console.log(mutant_submit_dict)
            // console.log(sample_list)
            console.log(mutant_list)
            // console.log(getItemByIdandOperateAttr(list, 2, ['content'], 'get'))
            // getItemByIdandOperateAttr(list, 2, ['content', 'a', 'b'], 'modify', 1234)
            // console.log(JSON.stringify(list))list
        }


        // 获取sample列表， 获取整个panal的mutant列表，仅一次用于初始化页面时
        async function getSamplesList(panal_id) {
            // console.log('begin getSamplesList')
            loadingShow = true

            await api.retrievePanal(panal_id).then((response) => {
                sample_list = response.data.samples
                mutant_list_whole_panal = response.data.mutants
                // 遍历获取新数组
                selected_sample_ids = sample_list.map((value, index, array)=>{return value.id})
            }).catch((error) => {
                console.log("getSamplesList", error)
                if (error.data) {
                    errors.detail = error.data.detail ? error.data.detail : ''
                }
            })

            loadingShow = false
            // console.log('end getSamplesList')
        }

        // 获取mutant列表(1)
        function __setMutList2AndMutantNum(list, count) {
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

            if (selected_sample_ids.length===0) {
                __setMutList2AndMutantNum([], 0)
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
                __setMutList2AndMutantNum(response.data.results, response.data.count)
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
        function buildMutantSubmitDictandTotalMutantsOfSample(){
            // console.log('begin build mutant_submit_dict')
            for (let sample of sample_list) {
                sample[dict.SAMMUTNUM] = 0
            }
            for (let mutant of mutant_list_whole_panal) {
                // 制作mutant修改的提交列表
                mutant_submit_dict[mutant.id] = {
                    sampleId: mutant.sample,
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


                // 给sample添加突变总数
                // let value  = getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.SAMMUTNUM], 'get')
                // getItemByIdandOperateAttr(sample_list, mutant.sample, [dict.SAMMUTNUM], 'modify', value+1)
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
        function handleChangeCurrentMutantId (mutant_id) {
            cur_mutant_id = mutant_id
        }


        // 处理sample样品全选、取消全选
        async function handleSelectAllSample() {
            console.log('handleAll' + selected_sample_ids.length + " " + sample_list.length)
            if (selected_sample_ids.length !== sample_list.length) {
                selected_sample_ids =  sample_list.map((value, index, array) => {return value.id} )
            }else{
                selected_sample_ids = []
            }

            mutant_param_page = 1
            await getMutantslist()
        }

        // 处理sample样品单独选择
        async function handleSelectSample(sample_id) {
            console.log('handleSelectSample ' + sample_id)
            if (selected_sample_ids.indexOf(sample_id)===-1) {
                selected_sample_ids.push(sample_id)
                selected_sample_ids = selected_sample_ids.sort((a,b)=>{return(a-b)})
            }else{
                selected_sample_ids = removeFromUniqueArray(selected_sample_ids, sample_id)
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
            console.log(mutant_param_order())

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


        // 处理撤销mutant完成事物
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




        // 处理mutant属性修改
        function handleAffirmForMutSubmits(mutant_id){
            if (mutant_status_dict[mutant_id][dict.DELETE][dict.NOWVALUE]) {
                mutant_status_dict[mutant_id][dict.STATUS] = mutant_status_dict.DELETED
                return
            }
        }

        function handleValueChangeForMutSubmits(e, mutant_id, field){
            // console.log(e.target.value)
            console.log()
            if ([mutant_field_dict.POSSTART, mutant_field_dict.POSEND].indexOf(field) !== -1) {
                mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = parseInt(e.target.value)
            }else if ([mutant_field_dict.REF, mutant_field_dict.ALT].indexOf(field) !== -1) {
                mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = e.target.value
            }else if (mutant_field_dict.DELETE === field) {
                mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = !mutant_submit_dict[mutant_id][field][dict.NOWVALUE]
                // 同时需要将其余已修改的项恢复
                recoverValueForMutSubmits([mutant_id])
            }

            // 根据是否新旧value一致，添加set表，后期用于数据恢复
            if (mutant_submit_dict[mutant_id][field][dict.NOWVALUE] === mutant_submit_dict[mutant_id][field][dict.PREVALUE]) {
                mutant_change_set.delete(mutant_id)
            }else{
                mutant_change_set.add(mutant_id)
            }
            console.log(mutant_change_set)
        }

        //恢复mutant数据，按field列表恢复
        function recoverValueForMutSubmits(mutant_id_list, field_list=[]) {
            let default_field_list = [mutant_field_dict.POSSTART, mutant_field_dict.POSEND, mutant_field_dict.REF, mutant_field_dict.ALT]
            for (let field of field_list) {
                if (default_field_list.indexOf(field) === -1) default_field_list.push(field)
            }
            for (let mutant_id of mutant_id_list) {
                for (let field of default_field_list) {
                    mutant_submit_dict[mutant_id][field][dict.NOWVALUE] = mutant_submit_dict[mutant_id][field][dict.PREVALUE]
                }
                //剔除出去
                mutant_change_set.delete(mutant_id)
            }
        }




        onMount(async ()=>{
            console.log('begin onMount')
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

            buildMutantSubmitDictandTotalMutantsOfSample()

            loadingShow = false
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
        flex: 0 0 305px;
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
    .sampleTable .submitedAndAffirmed, .sampleTable .unsubmitedAndAffirmed, .sampleTable .unsubmitedAndUnaffirmed {
        width: 45px;
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
    .leftTopMidWrapper .messageWrapper .title button{
        margin: 0 3px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 55px;
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
    .contentRight .delete{
        min-width: 60px;
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
