<Header></Header>

<div class="middle">
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <button class="submenuBtn {params.type===dict.TARGET?'selectedSubMenu':''}"
                    on:click={()=>handleSelectSubmenu(dict.TARGET)}>
                靶向突变
            </button>
            <button class="submenuBtn {params.type===dict.HEREDITARY?'selectedSubMenu':''}"
                    on:click={()=>handleSelectSubmenu(dict.HEREDITARY)}>
                遗传突变
            </button>
            <button class="submenuBtn {params.type===dict.TMB?'selectedSubMenu':''}"
                    on:click={()=>handleSelectSubmenu(dict.TMB)}>
                TMB突变
            </button>
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
                                    {selected_sampleIds_list.length === sample_list.length? '取消':'全选'}
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
                                        <span class="{selected_sampleIds_list.indexOf(sample.id)>-1?'icon-checkbox-checked':
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
                            {totalSubmitAndAffirmed}条已提交，{totalUnsubmitAndAffirmed}条待提交，{totalUnsubmitAndUnaffirmed}条待审核
                        </div>
                        <div class="uploadButtomWrapper">
                            <div class="uploadMessage" bind:this={uploadMessageDiv}>
                                {#each upload_message_list as message}
                                    {message}<br>
                                {/each}
                            </div>
                            <div class="uploadBnWrapper">
                                <button class="icon-cloud-upload {panal_unable_handle || totalUnsubmitAndAffirmed === 0?'disabled':''}"
                                        disabled="{panal_unable_handle || totalUnsubmitAndAffirmed === 0?'disabled':''}"
                                        on:click={()=>uploadAffirmedMutant()}>&nbsp;提交</button>
                                <button class="icon-file-excel {totalUnsubmitAndUnaffirmed !== 0 || totalUnsubmitAndAffirmed !== 0 || panal_unable_handle ?'disabled':''}"
                                        disabled="{totalUnsubmitAndUnaffirmed !== 0 || totalUnsubmitAndAffirmed !== 0 || panal_unable_handle ?'disabled':''}"
                                        on:click={()=>checkNOUS_AandUS_UAandCreateOutput()}>&nbsp;建表</button>
                                <button class="icon-download {excel_url?'':'disabled'}"
                                        disabled="{excel_url?'':'disabled'}"
                                        on:click={()=>download()}>&nbsp;下载</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="leftMidWrapper">
                    <div class="selectFile">
                        <input class="fileInput" id="fileWidget" type="file"
                               multiple="true" accept=".bam,.bai" on:change={()=>loadFiles()}/>
                        共{sampleSn_inTrack_list.length}对Bam/Bai文件
                        <button class="clear" on:click={()=>clearTracks()}>取消</button>
                    </div>
                    <div class="fileList">
                        {#each sampleSn_inTrack_list as sampleSn}
                            <div class="sampleSn">{sampleSn}</div>
                        {/each}
                    </div>
                </div>

<!--                <div class="leftButtomWrapper">-->
<!--                    <button class="copy" on:click={()=>handleEventForSure(model_dict.MUTANT, dict.COPY)}>复制突变</button>-->
<!--                </div>-->
            </div>
            <div class="contentRight">
                <div class="mutantList">
                    <div class="topInsideWrapper" bind:this={topScroll} on:scroll={()=>handleScroll(dict.TOPSCROLL)}>
                        <table class="rightMutantTable">
                            <tr>
                                <th class="logs"
                                    on:click={()=>handleSubmenuFilter(dict.LOG)}>
                                    {log_status_list[log_status_selected_index].content}
                                </th>
                                <th class="done"
                                    on:click={()=>handleSubmenuFilter(mutant_status_dict.DONE)}>
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
                                <th class="exonicfuncRefgene">
                                    <select bind:this={exonicfuncRefgeneSelection}
                                            on:change="{(e) => changeMutantParamExonicfuncRefgene(e.target.value)}"
                                            class="inside"
                                    >
                                        {#each exonicfuncRefgene_type_list as type}
                                            <option value={type.value}>
                                                {type.name}
                                            </option>
                                        {/each}
                                    </select>
                                </th>
                                <th class="projectAbbreviation">项目简称</th>
                                <th class="hgvs">hgvs命名</th>
                                <th class="geneVar">位点解析</th>
                                <th class="clinsig">突变分类</th>
                                <th class="intervarAutomated">突变分类2</th>
                            </tr>
                        </table>
                    </div>
                    <div class="insideWrapper" bind:this={insideScroll} on:scroll={()=>handleScroll(dict.INSIDESCROLL)}>
                        <table class="down rightMutantTable">
                            {#each mutant_list as mutant, index (mutant.id)}
                                <tr class="mutantItem
                                            {now_mutant_id===mutant.id?'current':''}
                                            {mutant_submit_dict[mutant.id]?
                                            (mutant_submit_dict[mutant.id][dict.STATUS]===mutant_status_dict.FREE && mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.NOWVALUE]?
                                            mutant_status_dict.DELETED:mutant_submit_dict[mutant.id][dict.STATUS]):''}"
                                    on:click|stopPropagation={()=>handleChangeCurrentMutantId(mutant.id, mutant.sample)}
                                    data-mutantId="{mutant.id}"
                                    data-sampleId="{mutant.sample}"
                                >
                                    <td class="logs">
                                        <button class="{mutant.copy?'icon-copy':(mutant.logs.length!==0?'icon-calendar':'icon-info')}"
                                            disabled="{mutant.logs.length==0?'disabled':''}"
                                            on:click={()=>handleLogsDisplay(mutant.id)}></button>
                                        {#if mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][dict.LOGSDISPLAY]:false }
                                            <div class="logsWrapper">
                                                <table class="logTable">
                                                    <tr>
                                                        <th class="editTime">修改时间</th>
                                                        <th class="editer">操作人员</th>
                                                        <th class="done">完成</th>
                                                        <th class="delete">删除</th>
                                                        <th class="posStart">起始位置</th>
                                                        <th class="posEnd">终止位置</th>
                                                        <th class="ref">参考序列</th>
                                                        <th class="alt">突变序列</th>
                                                        <th class="reason_type">修改原因</th>
                                                        <th class="submit_type">操作类型</th>
                                                    </tr>
                                                </table>
                                                <div class="logTableWraper">
                                                    <table class="logTable">
                                                        {#each mutant_list[index].logs as log}
                                                            <tr>
                                                                <td class="editTime">{log.add_time}</td>
                                                                <td class="editer">{log.editor.username}</td>
                                                                <td class="done" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.DONE][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.DONE][dict.NOWVALUE]==="True"?'是':'否'}
                                                                </td>
                                                                <td class="delete" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.DELETE][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.DELETE][dict.NOWVALUE]===''?'':(log[dict.LOGFIELDDETAIL][mutant_field_dict.DELETE][dict.NOWVALUE]==="True"?'是':'否')}
                                                                </td>
                                                                <td class="posStart" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.POSSTART][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.POSSTART][dict.NOWVALUE]}
                                                                </td>
                                                                <td class="posEnd" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.POSEND][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.POSEND][dict.NOWVALUE]}
                                                                </td>
                                                                <td class="ref" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.REF][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.REF][dict.NOWVALUE]}
                                                                </td>
                                                                <td class="alt" title="修改前：{log[dict.LOGFIELDDETAIL][mutant_field_dict.ALT][dict.PREVALUE]}">
                                                                    {log[dict.LOGFIELDDETAIL][mutant_field_dict.ALT][dict.NOWVALUE]}
                                                                </td>
                                                                <td class="reason_type" title="{log.reason_desc}">{log_reason_type_dict[log.reason_type]?log_reason_type_dict[log.reason_type]:''}</td>
                                                                <td class="submit_type">{log_submit_type_dict[log.submit_type]?log_submit_type_dict[log.submit_type]:''}</td>
                                                            </tr>
                                                        {/each}
                                                    </table>
                                                </div>
                                                <div class="bnWrapper">
                                                    <button on:click={()=>handleLogsDisplay(mutant.id)}>关闭</button>
                                                </div>
                                            </div>
                                        {/if}
                                    </td>
                                    <td class="done">
                                        <button class="{mutant_submit_dict[mutant.id]?
                                                            (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?
                                                            'icon-lock':'icon-unlocked'):'icon-unlocked'}"
                                            on:click={()=>handleEventForSure(model_dict.MUTANT, mutant_status_dict.DONE, [mutant.id, mutant.sample])}
                                            disabled="{panal_unable_handle?'disabled':''}">
                                        </button>
                                    </td>
                                    <td class="affirmed">
                                        <button class="{mutant_submit_dict[mutant.id]?
                                                            ([mutant_status_dict.CHECKED, mutant_status_dict.EDITED, mutant_status_dict.DELETED].indexOf(mutant_submit_dict[mutant.id][dict.STATUS]) !== -1?
                                                            'icon-checkbox-checked':'icon-checkbox-unchecked'):''}"
                                            on:click={()=>handleAffirmForMutSubmits(mutant.id, mutant.sample)}
                                            disabled="{panal_unable_handle?'disabled':
                                                (mutant_submit_dict[mutant.id]?
                                                (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':''):'')}">
                                        </button>
                                        {#if mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][dict.REASONDISPLAY]:false}
                                            <div class="reasonWrapper">
                                                <div class="selectWrapper">
                                                    修改类型：
                                                    <select value="{mutant_submit_dict[mutant.id]?
                                                                mutant_submit_dict[mutant.id][dict.REASONTYPE][dict.NOWVALUE]:''}"
                                                            on:change={(e)=>handleAddReason(e, mutant.id, dict.REASONTYPE)}>
                                                        {#each reason_type_list as reason_type}
                                                            <option value="{reason_type.type}">{reason_type.context}</option>
                                                        {/each}
                                                    </select>
                                                </div>
                                                <div class="textareaWrapper">
                                                    原因描述：
                                                    <textarea value="{mutant_submit_dict[mutant.id]?
                                                                    mutant_submit_dict[mutant.id][dict.REASONDESC][dict.NOWVALUE]:''}"
                                                              on:input={(e)=>handleAddReason(e, mutant.id, dict.REASONDESC)}></textarea>
                                                </div>
                                                <div class="reasaonBnWrapper">
                                                    <button on:click|stopPropagation={()=>handleAddReasonSure(mutant.id, mutant.sample)}>确定</button>
                                                    <button on:click|stopPropagation={()=>handleAddReasonCancel(mutant.id)}>取消</button>
                                                </div>
                                            </div>
                                        {/if}
                                    </td>
                                    <td class="recover">
                                        <button class="{mutant_submit_dict[mutant.id]?
                                                            (mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.NOWVALUE] === mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.PREVALUE] &&
                                                              mutant_submit_dict[mutant.id][mutant_field_dict.POSSTART][dict.NOWVALUE] === mutant_submit_dict[mutant.id][mutant_field_dict.POSSTART][dict.PREVALUE] &&
                                                              mutant_submit_dict[mutant.id][mutant_field_dict.POSEND][dict.NOWVALUE] === mutant_submit_dict[mutant.id][mutant_field_dict.POSEND][dict.PREVALUE] &&
                                                              mutant_submit_dict[mutant.id][mutant_field_dict.REF][dict.NOWVALUE] === mutant_submit_dict[mutant.id][mutant_field_dict.REF][dict.PREVALUE] &&
                                                              mutant_submit_dict[mutant.id][mutant_field_dict.ALT][dict.NOWVALUE] === mutant_submit_dict[mutant.id][mutant_field_dict.ALT][dict.PREVALUE]
                                                            ?'equal':''):''} icon-undo2"
                                            on:click={()=>recoverValueForMutSubmits([mutant.id],[dict.POSSTART, dict.POSEND, dict.REF, dict.ALT, dict.DELETE, dict.REASONDESC, dict.REASONTYPE])}
                                            disabled="{panal_unable_handle?'disabled':
                                                (mutant_submit_dict[mutant.id]?
                                                (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        </button>
                                    </td>
                                    <td class="delete" title="实时数据：{mutant.delete?'删除':'保留'}">
                                        <button class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.NOWVALUE]?'':'undeleted'):'undeleted'} icon-cross"
                                            on:click={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.DELETE)}
                                                disabled="{panal_unable_handle?'disabled':
                                                    (mutant_submit_dict[mutant.id]?
                                                    (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                    (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        </button>
                                        <div class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.NOWVALUE] !== mutant_submit_dict[mutant.id][mutant_field_dict.DELETE][dict.PREVALUE]?'icon-warning':''):''}"></div>
                                    </td>
                                    <td class="sampleSn" title="样本id为：{mutant.sample}，突变id为：{mutant.id}">{mutant.sampleSn}</td>
                                    <td class="chr">{mutant.chr}</td>
                                    <td class="posStart" title="实时数据：{mutant.posStart}">
                                        <input class="mutantInput" type="number"
                                            value="{mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][mutant_field_dict.POSSTART][dict.NOWVALUE]:null}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.POSSTART)}
                                               disabled="{panal_unable_handle?'disabled':
                                                   (mutant_submit_dict[mutant.id]?
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        <div class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.POSSTART][dict.NOWVALUE] !== mutant_submit_dict[mutant.id][mutant_field_dict.POSSTART][dict.PREVALUE]?'icon-warning':''):''}"></div>
                                    </td>
                                    <td class="posEnd" title="实时数据：{mutant.posEnd}">
                                        <input class="mutantInput" type="number"
                                            value="{mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][mutant_field_dict.POSEND][dict.NOWVALUE]:null}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.POSEND)}
                                               disabled="{panal_unable_handle?'disabled':
                                                   (mutant_submit_dict[mutant.id]?
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        <div class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.POSEND][dict.NOWVALUE] !== mutant_submit_dict[mutant.id][mutant_field_dict.POSEND][dict.PREVALUE]?'icon-warning':''):''}"></div>
                                    </td>
                                    <td class="ref" title="实时数据：{mutant.ref}">
                                        <input class="mutantInput" type="text"
                                            value="{mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][mutant_field_dict.REF][dict.NOWVALUE]:null}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.REF)}
                                               disabled="{panal_unable_handle?'disabled':
                                                   (mutant_submit_dict[mutant.id]?
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        <div class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.REF][dict.NOWVALUE] !== mutant_submit_dict[mutant.id][mutant_field_dict.REF][dict.PREVALUE]?'icon-warning':''):''}"></div>
                                    </td>
                                    <td class="alt" title="实时数据：{mutant.alt}">
                                        <input class="mutantInput" type="text"
                                            value="{mutant_submit_dict[mutant.id]?mutant_submit_dict[mutant.id][mutant_field_dict.ALT][dict.NOWVALUE]:null}"
                                            on:change={(e)=>handleValueChangeForMutSubmits(e, mutant.id, dict.ALT)}
                                               disabled="{panal_unable_handle?'disabled':
                                                   (mutant_submit_dict[mutant.id]?
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] === mutant_status_dict.DONE?'disabled':
                                                   (mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.FREE && mutant_submit_dict[mutant.id][dict.STATUS] !== mutant_status_dict.DONE?'disabled':'')):'')}">
                                        <div class="{mutant_submit_dict[mutant.id]?(mutant_submit_dict[mutant.id][mutant_field_dict.ALT][dict.NOWVALUE] !== mutant_submit_dict[mutant.id][mutant_field_dict.ALT][dict.PREVALUE]?'icon-warning':''):''}"></div>
                                    </td>
                                    <td class="freq">{mutant.freq?mutant.freq.toFixed(4):''}</td>
                                    <td class="exonicfuncRefgene" title="{mutant.exonicfuncRefgene}">
                                        <div class="inside">{mutant.exonicfuncRefgene}</div>
                                    </td>
                                    <td class="projectAbbreviation">{mutant.projectAbbreviation}</td>
                                    <td class="hgvs" title="{mutant.hgvs}">
                                        <div class="inside" >{mutant.hgvs}</div>
                                    </td>
                                    <td class="geneVar" title="{mutant.geneVar}">
                                        <div class="inside">{mutant.geneVar}</div>
                                    </td>
                                    <td class="clinsig" title="{mutant.clinsig}">
                                        <div class="inside">{mutant.clinsig}</div>
                                    </td>
                                    <td class="intervarAutomated" title="{mutant.intervarAutomated}">
                                        <div class="inside">{mutant.intervarAutomated}</div>
                                    </td>

                                </tr>
                            {/each}
                        </table>
                    </div>
                    <div class="pagewrapper">
                        <Page page={mutant_param_page} totalPage={mutant_totalPage}
                              on:changePageSize={handleChangePageSizeForMutant} on:changePage={handleChangePageForMutant}></Page>
                    </div>
                </div>
<!--                <div class="igvWrapper">-->
<!--                    <div class="igvBind" bind:this={igv_bind}></div>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</div>

<Footer></Footer>

{#if loadingShow}
    <Loading></Loading>
{/if}
{#if sureShow}
    <Sure message={sendSureMessage} on:sureMessage={handleSureMessage}></Sure>
{/if}
<script>
    // import io from 'socket.io-client'
    import {onMount, onDestroy, createEventDispatcher, beforeUpdate, afterUpdate} from 'svelte'

    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {
        getItemById,
        getItemById2,
        getItemByIdandOperateAttr,
        removeFromUniqueArray,
        ifContentEqualArrays
    } from '../../utils/arrays'
    import {userInfo} from '../../store/store'

    import {push} from 'svelte-spa-router'
    // import igv from 'igv/dist/igv.min'

    import Header from '../../components/Header/Header.svelte'
    import Footer from '../../components/Footer/Footer.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    import Loading from '../../components/Loading/Loading.svelte'
    import Sure from '../../components/Sure/Sure.svelte'
    import Page from '../../components/Page/Page3.svelte'

    import {dict_translate} from "../../utils/dict";
    import {getTime, getParentNodeByParentClassName} from "../../utils/common";

    const { ipcRenderer, remote } =window.require('electron')
    const {exec, execSync} = window.require('child_process')
    const iconv = window.require('iconv-lite');
    const Store = window.require('electron-store')
    const settingsStore = new Store({name: 'Settings'})

    const dispatch = createEventDispatcher()

    let dict = {BAM: 'bam', BAI: 'bai', TARGET: 'target', HEREDITARY: 'hereditary', TMB: 'TMB', tmb: 'tmb',
        CONTENT: 'content', GET: 'get', ADD: 'add', MODIFY: 'modify', DELETE: 'delete',
        TOPSCROLL: 'topScroll', INSIDESCROLL: 'insideScroll', NOWVALUE: 'nowValue', PREVALUE: 'preValue',
        SAMPLEID2UNDERLINE: 'sample__id', DONE: 'done', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
        ALLMUT: 'allMut', S_AMUT: "subAndAffMut", US_AMUT: 'unsubAndAffMut', US_UAMUT: 'unsubAndUnaffMut',
        STATUS: 'status', SAMPLEID: 'sampleId', SAMPLESN: 'sampleSn', AFFIRMED: 'affirmed', RECOVER: 'recover',
        REASONTYPE: 'reason_type', REASONDESC: 'reason_desc', REASONDISPLAY: 'reason_display',
        BLANK: 'blank', LOGSDISPLAY: 'logs_display', LOG: 'log', LOGFIELDDETAIL: 'log_field_details',
        COPY: 'copy', MUTANTS: 'mutants', TYPE: 'type', PATH: 'path'
    }

    // 数据下载后，创建mutant_submit_dict, 只有done和free状态
    // 修改数据后，状态改为checked， deleted，edited
    let mutant_status_dict = {'FREE': 'free', 'DONE':'done', 'CHECKED': 'checked', 'DELETED': 'deleted', 'EDITED': 'edited'}
    let mutant_field_dict = {'POSSTART': 'posStart', 'POSEND': 'posEnd', 'REF': 'ref', 'ALT': 'alt', 'DELETE': 'delete', 'DONE': 'done'}
    let model_dict = {PANAL: 'panal', MUTANT: 'mutant'}
    let log_reason_type_dict = {false_positive: '假阳性', merge_complex_loci: '复杂位点合并', other: '其它'}
    let log_submit_type_dict = {copy: '拷贝', check: '核查', edit: '编辑', delete: '删除', release: '释放',
    undelete: '撤销删除', undelete_edit: '撤销删除再编辑'}


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
    function reset_errors(){
        errors = JSON.parse(JSON.stringify(errors_ori))
    }

    let loadingShow = false
    let sureShow = false

    //igv控制参数
    // let igv_bind
    // let igvBrowser

    // panal的done状态
    let panal_unable_handle = false
    let all_excel_url = {target: null, hereditary: null, TMB: null}
    let excel_url = all_excel_url[dict.TARGET]


    // sample列表相关参数
    let sample_list = []
    let sampleSn_dict = {}
    let selected_sampleIds_list = []
    let pre_selected_sampleIds_list = []
    let all_sample_record_dict = {target:{}, hereditary:{}, TMB:{}}
    let sample_record_dict = all_sample_record_dict[dict.TARGET]



    // 以下参数，在__moveCountFromToInSamRecDict的样本单独统计中，同时进行处理
    // 未提交已审核 总数 US_AMUT
    let all_totalUnsubmitAndAffirmed = {target: 0, hereditary: 0, TMB: 0}
    let totalUnsubmitAndAffirmed = all_totalUnsubmitAndAffirmed[dict.TARGET]
    // 未提交未审核 总数 US_UAMUT
    let all_totalUnsubmitAndUnaffirmed = {target: 0, hereditary: 0, TMB: 0}
    let totalUnsubmitAndUnaffirmed = all_totalUnsubmitAndUnaffirmed[dict.TARGET]
    // 已提交已审核 总数 S_AMUT
    let all_totalSubmitAndAffirmed = {target: 0, hereditary: 0, TMB: 0}
    let totalSubmitAndAffirmed = all_totalSubmitAndAffirmed[dict.TARGET]



    // mutant列表相关
    let mutant_list = []
    // 用作校验和计算每个sample的突变总数
    let mutant_list_whole_panal = []
    // let target_list_whole_panal = []
    // let hereditary_list_whole_panal = []
    // let tmb_list_whole_panal = []

    let all_mutant_total_num = {target: 0, hereditary: 0, TMB: 0}
    let mutant_total_num = all_mutant_total_num[dict.TARGET]

    //处理mutant数据修改相关参数
    let mutant_submit_dict = {}


    // 目前的mutant的id，sample的id
    let now_mutant_id = -1
    let now_sample_id = -1

    // 当前筛选条件下的突变总数
    let mutant_num
    // mutant的总页数
    let mutant_totalPage
    function changeMutantTotalPage() {
        mutant_totalPage = Math.ceil(mutant_num/mutant_param_page_size)
    }


    // 其中sampleIds根据selected_sample_ids内容变动
    let mutant_param_page = 1
    let mutant_param_page_size = 20


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
    let mutant_param_done = done_status_list[0].status
    function changeMutantParamDone(index=null) {
        if (index!==null){
            done_status_selected_index = index
        }
        mutant_param_done = done_status_list[done_status_selected_index].status
    }

    // 筛选是否存在编辑或删除的记录
    let log_status_list = [{
            status: null,
            content: '全部记录'
        }, {
            status: 'True',
            content: '修改记录'
        }]
    let log_status_selected_index = 0
    let mutant_param_logsEdit = log_status_list[0].status
    function changeMutantParamLogsEdit(index=null) {
        if (index!==null){
            log_status_selected_index = index
        }
        mutant_param_logsEdit = log_status_list[log_status_selected_index].status
    }

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
    // 初始化ordering=的参数
    let mutant_param_order = [
        order_query_dict[dict.SAMPLEID2UNDERLINE][0].status,
        order_query_dict[dict.CHR][0].status,
        order_query_dict[dict.POSSTART][0].status,
        order_query_dict[dict.POSEND][0].status].join(',')

    // TODO 用于上述的动态更新，svelte无真computed，不想报错，只能人工改改改！！！
    function changeMutantParamOrder() {
        mutant_param_order = [
            order_query_dict[dict.SAMPLEID2UNDERLINE][sampleId_status_selected_index].status,
            order_query_dict[dict.CHR][chr_status_selected_index].status,
            order_query_dict[dict.POSSTART][posStart_status_selected_index].status,
            order_query_dict[dict.POSEND][posEnd_status_selected_index].status
        ].join(',')
    }

    // exonicfuncRefgene筛选相关参数
    let all_exonicfuncRefgene_type_list ={target: [{name: "突变方式(全选)", value: null}],
        hereditary: [{name: "突变方式(全选)", value: null}],
        TMB: [{name: "突变方式(全选)", value: null}]}
    let exonicfuncRefgene_type_list = all_exonicfuncRefgene_type_list[dict.TARGET]
    let mutant_param_exonicfuncRefgene = null
    let exonicfuncRefgeneSelection
    function changeMutantParamExonicfuncRefgene(value){
        // value为null时候，返回的是"null"字符串
        // console.log(mutant_param_exonicfuncRefgene, value)
        mutant_param_exonicfuncRefgene = value==='null' ? null: value
        getMutantslist()
    }

    // 用于sure组件通信使用
    let sureModel
    let sureEvent
    let sureObjectIdList = []
    let sureObjectValueList = []
    let sendSureMessage = ''
    function changeSendSureMessage() {
        sendSureMessage = "是否对" + dict_translate[sureModel] + "进行" + dict_translate[sureEvent] + "相关操作"
    }


    // 上传数据的结果信息列表
    let upload_message_list = []

    // track的configs库
    let track_configs_dict = {}
    let bamAndBai_path_dict = {}
    let sampleSn_inTrack_list = []

    //编辑理由相关参数
    let reason_type_list = [{'type': '',
                             'context': '请选择'},
                            {'type': 'false_positive',
                             'context': '假阳性'},
                            {'type': 'merge_complex_loci',
                            'context': '复杂位点合并'},
                            {'type': 'other',
                             'context': '其它'}]

    // 获取路径中的：值
    export let params = {}
    $: if (params.type === dict.TARGET) {
        // 先是页面拿数据渲染，接着这个过程，然后才是onMount begin
        if (sample_record_dict !==  all_sample_record_dict[dict.TARGET]){
            // console.log('params.type sample_record_dict 对象不一致，更新开始')
            __setDatabyParamsType()

            mutant_param_page = 1
            getMutantslist()
        }

    }
    $: if (params.type === dict.HEREDITARY) {
        if (sample_record_dict !==  all_sample_record_dict[dict.HEREDITARY]){
            __setDatabyParamsType()

            mutant_param_page = 1
            getMutantslist()
        }

    }
    $: if (params.type === dict.TMB) {
        if (sample_record_dict !==  all_sample_record_dict[dict.TMB]){
            __setDatabyParamsType()

            mutant_param_page = 1
            getMutantslist()
        }
    }


    let FieldDisplayOrderList = ['drugLevel', 'cancerType', 'drugs', 'hgvs', 'geneVar', 'clinsig', 'intervarAutomated']

    // let socket = null

    async function test(e) {
        // console.log(e, e.shiftKey, e.ctrlKey)
        // getItemByIdandOperateAttr(list, 2, ['content'], 'delete')
        // console.log(sample_list)
        // console.log(selected_sampleIds_list)
        // console.log(JSON.stringify(mutant_submit_dict[2466]))
        // console.log(sample_record_dict)
        // console.log(sampleSn_inTrack_list)
        // console.log(params.type)
        // console.log(mutant_list)
        // console.log(getItemByIdandOperateAttr(list, 2, ['content'], 'get'))
        // getItemByIdandOperateAttr(list, 2, ['content', 'a', 'b'], 'modify', 1234)
        // console.log( mutant_submit_dict)
        // console.log(all_mutant_total_num)
        // console.log(all_totalSubmitAndAffirmed, all_totalUnsubmitAndAffirmed, all_totalUnsubmitAndUnaffirmed)
        // console.log(panal_unable_handle)
        // console.log(all_excel_url)
        // console.log(sampleSn_dict)
        // console.log(track_configs_dict, Object.keys(track_configs_dict))
        // console.log(bamAndBai_path_dict)
        // console.log(remote.app.getPath('userData'))
        // console.log('store', settingsStore.get('ifIgvConnect'))
        // console.log(window.location.href)
    }

    function stopPropagation(event){
        event.stopPropagation()
    }

    // 获取sample列表， 获取整个panal的mutant列表，仅一次用于初始化页面时
    async function getSamplesList(panal_id) {
        // console.log('begin getSamplesList')
        loadingShow = true

        await api.retrievePanal(panal_id).then((response) => {
            sample_list = response.data.samples

            mutant_list_whole_panal = response.data[dict.MUTANTS]

            all_excel_url[dict.TARGET] = response.data.target_url
            all_excel_url[dict.HEREDITARY] = response.data.hereditary_url
            all_excel_url[dict.TMB] = response.data.tmb_url

            panal_unable_handle = response.data.done || response.data.delete ? true:false

            // 遍历获取新数组
            selected_sampleIds_list = sample_list.map((value, index, array)=>{
                return value.id})

        }).catch((error) => {
            console.error("getSamplesList", error)
            if (error.data) {
                errors.detail = error.data.detail ? error.data.detail : error.data
            }
        })

        loadingShow = false
        // console.log('end getSamplesList')
    }

    // 设置mutant列表和mutant总数
    function __setMutListAndMutantNum(list, count) {
        mutant_list = list
        // 转换logs_details为字典类型
        for (let mutant of mutant_list){
            if (mutant.logs.length > 0) {
                for (let log of mutant.logs) {
                    log[dict.LOGFIELDDETAIL] = {
                        done: {nowValue: '', preValue: ''},
                        delete: {nowValue: '', preValue: ''},
                        posStart: {nowValue: '', preValue: ''},
                        posEnd: {nowValue: '', preValue: ''},
                        ref: {nowValue: '', preValue: ''},
                        alt: {nowValue: '', preValue: ''}
                    }
                    for (let detail of log.log_details) {
                        log[dict.LOGFIELDDETAIL][detail.subject_field_name][dict.NOWVALUE] = detail.new_value
                        log[dict.LOGFIELDDETAIL][detail.subject_field_name][dict.PREVALUE] = detail.old_value
                    }
                }
            }
        }
        mutant_list = mutant_list
        // 此筛选条件下的mutant总数，用于总页数计算
        mutant_num = count
        changeMutantTotalPage()
    }

    // 获取mutant列表(2)
    async function getMutantslist(){
        // console.log('begin getMutantsList')
        // 获取mutant列表
        // 如果没有选中任何sample，将mutant_list置空
        // console.log('getMutantList begin')
        loadingShow = true

        // TODO 这个正好避免第一次加载时候，$: params.type 执行一次getMutantList
        // $: params.type 也设置了判断，第一次执行getMutantList的判断
        if (selected_sampleIds_list.length===0) {
            __setMutListAndMutantNum([], 0)
            loadingShow = false
            // console.log('getMutantList 中 selected_sampleIds_list 长度为0， 退出执行！')
            return
        }

        await api.mutantList({
            search: params.type,
            page: mutant_param_page,
            page_size: mutant_param_page_size,
            done: mutant_param_done,
            ordering: mutant_param_order,
            sampleIds: selected_sampleIds_list.join(','),
            panalId: params.panalId,
            logsEdit: mutant_param_logsEdit,
            exonicfuncRefgene: mutant_param_exonicfuncRefgene
        }).then((response)=>{
            console.log('getMutantsList', response.data)
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


    function __setMutantInMutantSubmitDict(mutant){
        mutant_submit_dict[mutant.id] = {
            type: mutant.type,
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
            },
            chr: mutant.chr,
            reason_type: {
                nowValue: '',
                preValue: ''
            },
            reason_desc: {
                nowValue: '',
                preValue: ''
            },
            reason_display: false,
            logs_display: false
        }
    }

    // 给sample_list添加每个sample的突变总数
    function buildMutantSubmitDictandAllSampleRecordDictandAllMutantTotalNum(){

        // console.log('begin build mutant_submit_dict')
        // 构建sample_record_dict(id为key)，构建sampleSn_dict(sampleSn为key)
        for (let sample of sample_list) {
            for (let type of [dict.TARGET, dict.HEREDITARY, dict.TMB]){
                all_sample_record_dict[type][sample.id] = {
                    sampleSn: sample.sampleSn,
                    allMut: 0,
                    subAndAffMut: 0,
                    unsubAndAffMut: 0,
                    unsubAndUnaffMut: 0
                }
            }

            sampleSn_dict[sample.sampleSn] = {
                sampleId: sample.id
            }
        }

        // 构造mutant_submit_dict
        for (let mutant of mutant_list_whole_panal) {
            // 制作mutant修改的提交列表
            __setMutantInMutantSubmitDict(mutant)
            all_sample_record_dict[mutant.type][mutant.sample][dict.ALLMUT]++
            if (mutant.done) {
                all_sample_record_dict[mutant.type][mutant.sample][dict.S_AMUT]++
                all_totalSubmitAndAffirmed[mutant.type]++
            }else{
                all_sample_record_dict[mutant.type][mutant.sample][dict.US_UAMUT]++
                all_totalUnsubmitAndUnaffirmed[mutant.type]++
            }


            switch (mutant.type) {
                case dict.TARGET:
                    all_mutant_total_num[dict.TARGET]++
                    break
                case dict.HEREDITARY:
                    all_mutant_total_num[dict.HEREDITARY]++
                    break
                case dict.TMB:
                    all_mutant_total_num[dict.TMB]++
                    break
            }

            // 添加筛选mutant.exonicfuncRefgene的项目
            if(all_exonicfuncRefgene_type_list[mutant.type].every(type=>type.name!==mutant.exonicfuncRefgene)){
                all_exonicfuncRefgene_type_list[mutant.type].push({
                    name: mutant.exonicfuncRefgene,
                    value: mutant.exonicfuncRefgene
                })
            }
        }

        // console.log(all_mutant_total_num)
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
    function handleChangeCurrentMutantId (mutant_id, sample_id) {
        let pre_sample_id = now_sample_id
        let pre_mutant_id = now_mutant_id
        now_mutant_id = mutant_id
        now_sample_id = sample_id

        // 更好染色体位置
        let mutant_posStart = mutant_submit_dict[now_mutant_id][mutant_field_dict.POSSTART][dict.NOWVALUE]
        let mutant_posEnd = mutant_submit_dict[now_mutant_id][mutant_field_dict.POSEND][dict.NOWVALUE]
        // console.log(mutant_posStart, mutant_posEnd)
        if (!mutant_posStart && !mutant_posEnd) return

        // 非同一sample 或者 样本选中的有改变， 都需要重新加载
        let ifEqual = ifContentEqualArrays(selected_sampleIds_list, pre_selected_sampleIds_list)
        if (settingsStore.get('ifNowMutantTop')){
            if (pre_sample_id !== now_sample_id  || !ifEqual) loadTracks()
        }else{
            if(!ifEqual) loadTracks()
        }

        // 非同一mutant， 进入后再判断位置是否有变化
        if (pre_mutant_id !== now_mutant_id) changeLocus()


    }

    // 处理切换target，hereditary，tmb
    function handleSelectSubmenu(type){
        console.log(type, params.type)
        if (type===params.type) return
        // console.log('handleSelectSubmenu ' + type)
        let panalId = params.panalId
        // 只切换路由，数据没有自动刷新啊！！
        push(`/${type}/${panalId}`)
    }

    // 处理sample样品全选、取消全选
    async function handleSelectAllSample() {
        // console.log('handleAll' + selected_sampleIds_list.length + " " + sample_list.length)
        loadingShow = true

        if (selected_sampleIds_list.length !== sample_list.length) {
            selected_sampleIds_list =  sample_list.map((value, index, array) => {return value.id})
        }else{
            selected_sampleIds_list = []
        }

        mutant_param_page = 1
        // loadTracks()
        await getMutantslist()

        loadingShow = false
    }

    // 处理sample样品单独选择
    async function handleSelectSample(sample_id) {
        // console.log('handleSelectSample ' + sample_id)
        loadingShow = true

        if (selected_sampleIds_list.indexOf(sample_id)===-1) {
            selected_sampleIds_list.push(sample_id)
            selected_sampleIds_list = selected_sampleIds_list.sort((a, b)=>{return(a-b)})
        }else{
            selected_sampleIds_list = removeFromUniqueArray(selected_sampleIds_list, sample_id)
        }

        mutant_param_page = 1
        // loadTracks()
        await getMutantslist()

        loadingShow = false
    }


    // 处理muatant列表中false/true类过滤问题
    async function handleSubmenuFilter(object_event) {
        switch (object_event) {
            case mutant_status_dict.DONE:
                done_status_selected_index = (done_status_selected_index+1)%(done_status_list.length)
                // 更新mutant_param_done
                changeMutantParamDone()
                break
            case dict.LOG:
                log_status_selected_index = (log_status_selected_index+1)%(log_status_list.length)
                changeMutantParamLogsEdit()
                break
        }

        mutant_param_page = 1
        await getMutantslist()

    }

    // 处理mutant排序问题
    async function handleOrderEVENT(event_type){
        loadingShow = true

        // console.log(event_type)
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

        //改变ordering的参数
        changeMutantParamOrder()

        mutant_param_page = 1
        await getMutantslist()

        loadingShow = false
    }

    // 处理每页显示数量
    function handleChangePageSizeForMutant(event){
        mutant_param_page_size = event.detail.pageSize
        changeMutantTotalPage()

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
        // 处理三项的panal层面的总数统计
        switch (from) {
            case dict.S_AMUT:
                totalSubmitAndAffirmed--
                all_totalSubmitAndAffirmed[params.type]--
                break
            case dict.US_AMUT:
                totalUnsubmitAndAffirmed--
                all_totalUnsubmitAndAffirmed[params.type]--
                break
            case dict.US_UAMUT:
                totalUnsubmitAndUnaffirmed--
                all_totalUnsubmitAndUnaffirmed[params.type]--
                break
        }
        switch (to) {
            case dict.S_AMUT:
                totalSubmitAndAffirmed++
                all_totalSubmitAndAffirmed[params.type]++
                break
            case dict.US_AMUT:
                totalUnsubmitAndAffirmed++
                all_totalUnsubmitAndAffirmed[params.type]++
                break
            case dict.US_UAMUT:
                totalUnsubmitAndUnaffirmed++
                all_totalUnsubmitAndUnaffirmed[params.type]++
                break
        }

        sample_record_dict[sample_id][from]--
        sample_record_dict[sample_id][to]++
    }

    // 将mutant_submit_dict中某mutant的status进行改变
    function __changeMutantStatusInMutSubDict(mutant_id, status) {

        mutant_submit_dict[mutant_id][dict.STATUS] = status
    }

    // 查看mutant修改历史
    function handleLogsDisplay(mutant_id) {
        // console.log('logdisplay')
        mutant_submit_dict[mutant_id][dict.LOGSDISPLAY] = !mutant_submit_dict[mutant_id][dict.LOGSDISPLAY]
    }

    // 处理撤销mutant完成事物
    async function changeMutantDone(mutant_sample_ids, mutant_done_status) {
        loadingShow = true

        let mutant_id = mutant_sample_ids[0]
        let sample_id = mutant_sample_ids[1]
        // console.log(mutant_id + " " + sample_id)
        await api.updateMutant(mutant_id, {
            done: mutant_done_status
        }).then((response)=>{
            // console.log(response.data)
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


    // 处理复制突变拷贝
    async function handleCopyMutant(){
        // console.log('handlecopymutant ' + now_mutant_id)

        loadingShow = true

        let success = false
        await api.copyMutant(now_mutant_id, 1).then((response)=>{
            // console.log(response.data)
            success = true
            // 现在的突变id需要更换
            now_mutant_id = response.data.mutant
        }).catch((error)=>{
            console.error('handleCopyMutant', error)
            errors.detail = error.data?error.data.mutant:''
        })

        if (success){
            // 获取新拷贝的突变的所在页
            //done为全部
            changeMutantParamDone(2)
            // logEdit为全部
            changeMutantParamLogsEdit(0)
            // 设置页面size为全部突变总数
            let pre_mutant_param_page_size = mutant_param_page_size

            mutant_total_num++
            all_mutant_total_num[params.type]++

            mutant_param_page_size = mutant_total_num
            mutant_param_page = 1
            // 更新一次页面
            await getMutantslist()

            let i = 1
            let copy_mutant = null
            for (let mutant of mutant_list) {
                if (mutant.id === now_mutant_id) {
                    copy_mutant = JSON.parse(JSON.stringify(mutant))
                    break
                }
                i++
            }

            // 获取所在新突变的页码
            mutant_param_page = Math.ceil(i/pre_mutant_param_page_size)
            mutant_param_page_size = pre_mutant_param_page_size
            // console.log(i + " " + mutant_param_page + " " + mutant_param_page_size)

            // 更新mutant_record_dict
            sample_record_dict[now_sample_id][dict.ALLMUT]++
            sample_record_dict[now_sample_id][dict.US_UAMUT]++
            // 更新总数
            totalUnsubmitAndUnaffirmed++
            all_totalUnsubmitAndUnaffirmed[params.type]++

            // 更新mutant_submit_dict
            __setMutantInMutantSubmitDict(copy_mutant)

            // 再次更新
            await getMutantslist()
        }

        loadingShow = false
    }

    // TODO 此处确定对象类型，事件类型，对象id，对象目的值
    function handleEventForSure(model, event, object_id_list=[], object_value_list=[]) {
        reset_errors()

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

                        changeSendSureMessage()
                        // 显示确认界面
                        sureShow = true
                        break
                    case dict.COPY:
                        // console.log(now_mutant_id + " " + now_sample_id)
                        if (panal_unable_handle) {
                            errors.detail = '请先撤销panal完成，再来复制突变！'
                            return
                        }
                        if (now_mutant_id === -1){
                            errors.detail = '请先选择一条需要复制的突变！'
                            return
                        }
                        if (mutant_submit_dict[now_mutant_id][dict.STATUS] !== mutant_status_dict.FREE ){
                            errors.detail = '请先释放或解除锁定此条突变后，再复制！'
                            return
                        }

                        changeSendSureMessage()
                        sureShow = true
                        break
                }
                break

        }

    }

    // TODO 此处接受Sure组件的信息，然后对应不同实践进行分类处理
    async function handleSureMessage(e) {
        loadingShow = true
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
                        case dict.COPY:
                            await handleCopyMutant()
                            break
                    }
                    break
            }
        }

        loadingShow = false
    }


    // 处理审核确认事件(附属方法)
    function __checkModifyFieldEqual (mutant_id, field=null) {
        let default_field_list = [dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
        if (field) default_field_list.push(field)
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
        // 永远考虑外一，虽然不可能
        // 处于done状态，直接返回
        if (status === mutant_status_dict.DONE) return

        // 如果处于3个已审阅状态，则撤回到未审核
        if ([mutant_status_dict.CHECKED, mutant_status_dict.DELETED, mutant_status_dict.EDITED].
        indexOf(status) !== -1) {
            // 修改状态为free
            __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.FREE)
            // 此时必然是 未提交已审核 状态，则未提交已审核-1, 未提交未审核+1
            __moveCountFromToInSamRecDict(sample_id, dict.US_AMUT, dict.US_UAMUT)
            return
        }

        // 此时必然是 未提交未审核 状态
        // 查看是否有修改，如果有修改，弹出
        if (__check4FieldEqual(mutant_id, mutant_field_dict.DELETE)) {
            //此时必然是 未提交未审核 状态，未提交未审核-1, 未提交已审核+1
            __moveCountFromToInSamRecDict(sample_id, dict.US_UAMUT, dict.US_AMUT)
            // 将状态从free设置为checked
            __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.CHECKED)
            // 另外将reason_type, reason_desc恢复
            recoverValueForMutSubmits([mutant_id], [dict.REASONTYPE, dict.REASONDESC])
            return
        }else{
            mutant_submit_dict[mutant_id][dict.REASONDISPLAY] = true
        }
    }
    // 处理添加编辑原因
    function handleAddReason(event, mutant_id, type) {
        // console.log(event.target.value)
        mutant_submit_dict[mutant_id][type][dict.NOWVALUE] = event.target.value

    }
    // 添加reason对话框，选择取消
    function handleAddReasonCancel(mutant_id){
        mutant_submit_dict[mutant_id][dict.REASONDISPLAY] = false
    }
    // 添加reason对话框，选择确定
    function handleAddReasonSure(mutant_id, sample_id) {
        // 此时必然是 未提交未审核 状态，则未提交未审核-1, 未提交已审核+1
        __moveCountFromToInSamRecDict(sample_id, dict.US_UAMUT, dict.US_AMUT)

        // 判断是删除，还是修改
        if (mutant_submit_dict[mutant_id][dict.DELETE][dict.NOWVALUE]) {
            __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.DELETED)
        }else{
            __changeMutantStatusInMutSubDict(mutant_id, mutant_status_dict.EDITED)
        }
        mutant_submit_dict[mutant_id][dict.REASONDISPLAY] = false
    }


    //恢复mutant数据，按field列表恢复
    function recoverValueForMutSubmits(mutant_id_list, field_list=[]) {
        let default_field_list = [dict.POSSTART, dict.POSEND, dict.REF, dict.ALT]
        if (field_list.length > 0) default_field_list = field_list
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
        if (excel_url) window.location.href = excel_url
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
        // console.log(JSON.stringify(params))
        return params
    }

    async function checkNOUS_AandUS_UAandCreateOutput(){
        // console.log('开始生成excel')
        loadingShow = true

        // 创建表
        let success = false
        if (!excel_url && totalUnsubmitAndAffirmed === 0 && totalUnsubmitAndUnaffirmed === 0) {
           await api.createExcel(params.panalId, params.type).then((response)=>{
               // console.log(response.data)
               success = true

               let time = getTime()
               upload_message_list.push(time + ' excel表格创建成功')
               upload_message_list = upload_message_list

               // excel_url = response.data.url 这是没有用的最后一级不是地址了，已经就是一份拷贝了
               all_excel_url[params.type] = response.data.url
               excel_url = response.data.url

           }).catch((error)=>{
               console.error('checkS_AMUTandCreateOutput success', error)
               errors.detail = 'excel表格创建失败：' + error.data?error.data.panal:''
           })
        }
        // 将panal设置为 done
        if (success &&
                all_totalUnsubmitAndUnaffirmed[dict.TARGET] === 0 &&
                all_totalUnsubmitAndUnaffirmed[dict.HEREDITARY] === 0 &&
                all_totalUnsubmitAndUnaffirmed[dict.TMB] === 0 &&
                all_totalUnsubmitAndAffirmed[dict.TARGET] === 0 &&
                all_totalUnsubmitAndAffirmed[dict.HEREDITARY] === 0 &&
                all_totalUnsubmitAndAffirmed[dict.TMB] === 0 &&
                all_excel_url[dict.TARGET] &&
                all_excel_url[dict.HEREDITARY] &&
                all_excel_url[dict.TMB]
        ) {
            await api.updatePanal(params.panalId, {
                done: true
            }).then((response) => {
                let panal = response.data
                panal_unable_handle = true

                let time = getTime()
                upload_message_list.push(time + ' Panal ' + panal.name + '已经设置为完成！')
                upload_message_list = upload_message_list
            }).catch((error) => {
                console.error('checkS_AMUTandCreateOutput panal done', error)
                errors.detail = 'Panal设置为完成失败'
            })
        }

        loadingShow = false
    }

    async function uploadAffirmedMutant() {
        // console.log('uploadAffirmedMutant begin')

        loadingShow = true

        if (totalUnsubmitAndAffirmed===0){
            errors.detail = '没有已审核的mutant需要提交'
            return
        }
        if (panal_unable_handle) {
            errors.detail = 'panal已经审核完成，请先撤回'
            return
        }


        let success_num = 0
        let fail_num = 0

        for (let mutant_id in mutant_submit_dict) {
            // 先判断是不是type类型为params.type
            if (mutant_submit_dict[mutant_id][dict.TYPE] !== params.type) continue

            let status = mutant_submit_dict[mutant_id][dict.STATUS]
            let sample_id = mutant_submit_dict[mutant_id][dict.SAMPLEID]
            let sampleSn = mutant_submit_dict[mutant_id][dict.SAMPLESN]
            let submit = false
            let success = false
            let deleteNowValue = mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.NOWVALUE]
            let deletePreValue = mutant_submit_dict[mutant_id][mutant_field_dict.DELETE][dict.PREVALUE]
            let reasonTypeNowValue = mutant_submit_dict[mutant_id][dict.REASONTYPE][dict.NOWVALUE]
            let reasonDescNowValue = mutant_submit_dict[mutant_id][dict.REASONDESC][dict.NOWVALUE]

            if (deletePreValue) {

                // 已删除提交后的撤回状态
                if (status === mutant_status_dict.CHECKED) {
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
                    if (__check4FieldEqual(mutant_id)) {
                        // 仅仅取消删除
                        await api.updateMutant(mutant_id, {
                            done: true,
                            delete: deleteNowValue,
                            reason_type: reasonTypeNowValue,
                            reason_desc: reasonDescNowValue
                        }).then((response) => {
                            //delete的preValue改为nowValue，即false
                            __substitutePreValueInMutSubDict(mutant_id, [mutant_field_dict.DELETE])
                            success = true
                        }).catch((error) => {
                        })
                    }else{
                        // 取消删除，并且进行了修改
                        let params = __getUnequalParamsInMutSubDict(mutant_id)
                        params[mutant_field_dict.DELETE] = deleteNowValue
                        params[dict.REASONTYPE] = reasonTypeNowValue
                        params[dict.REASONDESC] = reasonDescNowValue
                        await api.updateMutant(mutant_id,
                                params).then((response) => {
                            // 排开done，4项有差异的field，外加delete，preValue替换为nowValue
                            delete params[mutant_field_dict.DONE]
                            for (let field in params) {
                                __substitutePreValueInMutSubDict(mutant_id, [field])
                            }
                            success = true
                        }).catch((error) => {
                        })
                    }
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
                        delete: deleteNowValue,
                        reason_type: reasonTypeNowValue,
                        reason_desc: reasonDescNowValue
                    }).then((response) => {
                        //delete的preValue改为nowValue, 即true
                        __substitutePreValueInMutSubDict(mutant_id, [mutant_field_dict.DELETE])
                        success = true
                    }).catch((error) => {
                        console.error('api.updateMutant', error)
                    })
                }

                if (status === mutant_status_dict.EDITED) {
                    submit = true
                    let params = __getUnequalParamsInMutSubDict(mutant_id)
                    params[dict.REASONTYPE] = reasonTypeNowValue
                    params[dict.REASONDESC] = reasonDescNowValue
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
                    upload_message_list.push(time + " " + sampleSn + " " + mutant_id + " 已处理。")
                } else {
                    fail_num++
                    upload_message_list.push(time + " " + sampleSn + " " + mutant_id + " 上传失败！")
                }
                upload_message_list = upload_message_list
            }
        }


        let time = getTime()
        upload_message_list.push(time + " 提交成功" + success_num + "条, 失败" + fail_num + "条。")
        mutant_param_page = 1
        await  getMutantslist()

        loadingShow = false

        // console.log('uploadAffirmedMutant end')
    }


    // 为track_configs_dict添加track信息
    function addTrackConfigs(files){
        let bamFiles = fileUtil.getFilesDictBySuffix(files, '.bam')
        let baiFiles = fileUtil.getFilesDictBySuffix(files, '.bai')
        let paired_Files = {}
        // 循环bamfiles文件
        for (let bam_name in bamFiles) {
            let find = false
            // 循环bai_name文件，把匹配的找出来
            for (let bai_name in baiFiles) {
                if (bam_name === bai_name) {
                    find = true
                    break
                }
            }
            if (find) {
                let sampleSn
                let find = false
                for (let sample of sample_list) {
                    // bam_name样子为NGS200111-53DJ，如果sampleSn为NGS200111-5使用indexOf就会错误配对！！
                    // 没找到包含的就跳过
                    let index = bam_name.indexOf(sample.sampleSn)
                    if (index === -1) continue

                    // 匹配了剩余部分如果还有数字，就不是完全匹配
                    let substr = bam_name.replace(sample.sampleSn, '')
                    // console.log('addtrackconfig', substr)
                    if (substr.match(/\d+/g)) continue

                    sampleSn = sample[dict.SAMPLESN]
                    find = true
                    break
                }
                paired_Files[sampleSn] = {"bam": bamFiles[bam_name], "bai": baiFiles[bam_name]}
            }
        }
        for (let sampleSn in paired_Files) {
            if (sampleSn_dict[sampleSn] === undefined) continue
            track_configs_dict[sampleSn_dict[sampleSn][dict.SAMPLEID]] = {
                name: sampleSn,
                type: "alignment",
                format: 'bam',
                samplingDepth: 100,
                alignmentRowHeight: 10,
                // 不显示remove按钮
                removable: false,
                //track高度
                height: 170,
                // 突变频率大于1%颜色显示
                alleleFreqThreshold: 0.01,
                url: paired_Files[sampleSn][dict.BAM],
                indexURL: paired_Files[sampleSn][dict.BAI]
            }

            bamAndBai_path_dict[sampleSn_dict[sampleSn][dict.SAMPLEID]] = [
                    paired_Files[sampleSn][dict.BAM][dict.PATH].replace(/\\/g,'/'),
                    paired_Files[sampleSn][dict.BAI][dict.PATH].replace(/\\/g,'/')
                ]

            // 刷新 sampleSn_inTrack_list
            if (sampleSn_inTrack_list.indexOf(sampleSn) === -1) {
                sampleSn_inTrack_list.push(sampleSn)
            }
        }
        sampleSn_inTrack_list = sampleSn_inTrack_list

    }

    // 加载bam，bai文件
    function loadFiles() {
        let fileWidget = document.getElementById('fileWidget')
        let files = fileWidget.files
        addTrackConfigs(files)
        fileWidget.value = ''
        loadTracks()
    }

    // 取消所有track信息
    function
    clearTracks () {
        track_configs_dict = {}
        sampleSn_inTrack_list = []
        // if (igvBrowser) {
        //     igvBrowser.removeAllTracks()
        // }
        if(settingsStore.get('ifIgvConnect')){
            ipcRenderer.send('remove-tracks')
        }

    }


    // 加载igv的tracks
    function loadTracks() {
        // console.log('loadtracks begin')

        // 先移除所有的tracks
        // igvBrowser.removeAllTracks()

        let reordered_sampleIds_list = []
        // console.log(now_sample_id + " " + selected_sampleIds_list)
        if (now_sample_id && selected_sampleIds_list.indexOf(now_sample_id)!== -1) {
            // console.log(now_sample_id)
            reordered_sampleIds_list = [].concat([now_sample_id], removeFromUniqueArray(selected_sampleIds_list, now_sample_id))
        }else{
            reordered_sampleIds_list = selected_sampleIds_list
        }
        // console.log(reordered_sampleIds_list)

        // 按now_sample_id为第一位的tracks列表，重新加载
        // if(igvBrowser){
        //     for (let sampleId of reordered_sampleIds_list) {
        //         if (track_configs_dict[sampleId]) {
        //             igvBrowser.loadTrack(track_configs_dict[sampleId])
        //         }
        //     }
        // }
        if(settingsStore.get('ifIgvConnect')){
            ipcRenderer.send("load-tracks",
                reordered_sampleIds_list.reduce((result, sampleId)=>{
                    if(bamAndBai_path_dict.hasOwnProperty(sampleId)){
                        result.push(bamAndBai_path_dict[sampleId])
                    }
                    return result
                },[])
            )
        }

        pre_selected_sampleIds_list = JSON.parse(JSON.stringify(selected_sampleIds_list))
    }


    // 编写染色体位置
    function __calculateScope (chr, start, end) {
        let new_start = start?start-30:end-30
        let new_end = end?end + 30:start + 30

        let scope = chr + ":" + new_start +"-" + new_end
        // console.log("scope: " + scope)
        return scope
    }
    // 更好染色体位置
    function changeLocus() {
        console.log('change Locus begin')


        let mutant = mutant_submit_dict[now_mutant_id]
        let query = __calculateScope(mutant[dict.CHR], mutant[mutant_field_dict.POSSTART][dict.NOWVALUE], mutant[mutant_field_dict.POSEND][dict.NOWVALUE])
        // console.log(query)

        // if (igvBrowser) {
        //     igvBrowser.search(query)
        // }
        if(settingsStore.get('ifIgvConnect')){
            ipcRenderer.send('search-locus', query)
        }else{
            errors.detail = '使用igv，请设置"勾选连接igv"、打开igv。'
        }
    }

    function __setDatabyParamsType(){
        mutant_total_num = all_mutant_total_num[params.type]

        sample_record_dict = all_sample_record_dict[params.type]

        totalSubmitAndAffirmed = all_totalSubmitAndAffirmed[params.type]
        totalUnsubmitAndAffirmed = all_totalUnsubmitAndAffirmed[params.type]
        totalUnsubmitAndUnaffirmed = all_totalUnsubmitAndUnaffirmed[params.type]

        excel_url = all_excel_url[params.type]

        exonicfuncRefgene_type_list = all_exonicfuncRefgene_type_list[params.type]
        // todo 筛选框值修改，不会触发onChange事件！！
        exonicfuncRefgeneSelection.value = null
        mutant_param_exonicfuncRefgene = null
    }


    function __handleContextMenu(e){
        // console.log(e.target, document.querySelector('.down'), document.querySelector('.down').contains(e.target))


        if (document.querySelector('.down').contains(e.target)){
            let element =getParentNodeByParentClassName(e.target, 'mutantItem')
            handleChangeCurrentMutantId(parseInt(element.dataset.mutantid), parseInt(element.dataset.sampleid))

            let menu = new remote.Menu()
            let deleteMenuItem = new remote.MenuItem({
                label: '复制',
                // enabled: mutant_submit_dict[element.dataset.mutantid][dict.STATUS] === mutant_status_dict.FREE,
                click: ()=>{
                    // todo dataset中data-后面大写没用，全部转为小写了, 类型是字符串了
                    // console.log(element, element.dataset, element.dataset.mutantid, element.dataset.sampleid)
                    handleEventForSure(model_dict.MUTANT, dict.COPY)
                }
            })
            menu.append(deleteMenuItem)
            menu.popup({window: remote.getCurrentWindow()})
        }

    }


    onMount(async ()=>{
        // console.log('begin onMount')
        //开启loading层
        loadingShow = true

        // socket = io.connect("http://localhost:60151");
        // socket.on('connect', function() {
        //     console.log('igv已连接');
        // })
        // socket.on('error', function() {
        //     console.log('igv报错');
        // })


        // let options =
        //         {
        //             reference:
        //                     {
        //                         id: "hg19",
        //                         fastaURL: "/database/ucsc.hg19.fasta",
        //                         indexURL: "/database/ucsc.hg19.fasta.fai"
        //                     },
        //             locus: 'chr1:1983-2020'
        //         };
        //
        // await igv.createBrowser(igv_bind, options).then((browser)=>{
        //     igvBrowser = browser
        // })

        await getSamplesList(params.panalId)

        await getMutantslist()

        buildMutantSubmitDictandAllSampleRecordDictandAllMutantTotalNum()

        __setDatabyParamsType()

        ipcRenderer.on('connect-igv-error-caution',(event, message)=>{
            errors.detail = message
        })

        ipcRenderer.on('reset-errors', ()=>{
            reset_errors()
        })

        document.addEventListener('contextmenu', __handleContextMenu)

        // console.log('onMount end')
        loadingShow = false
    })

    onDestroy(()=>{
        document.removeEventListener('contextmenu', __handleContextMenu)
    })

    beforeUpdate(()=>{
        // TODO offsetHeight为含边框的div高度，scrollTop为元素被上边框遮住的部分，scrollHeight为内容高度
        autoscroll = uploadMessageDiv && (uploadMessageDiv.offsetHeight + uploadMessageDiv.scrollTop) < uploadMessageDiv.scrollHeight
    })

    afterUpdate(()=>{
        if (autoscroll) uploadMessageDiv.scrollTo(0, uploadMessageDiv.scrollHeight)
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
    .subMenu .submenuBtn{
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
    .leftMidWrapper .selectFile button:hover{
        background: #09c762;
    }
    .leftMidWrapper .fileList{
        height: 107px;
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
        /*此处必须要加这个0，不然table无法滚动 TODO*/
        width: 0;
        flex: 1;
        /*display: flex;*/
        /*flex-flow: column;*/
    }
    .contentRight .mutantList{
        /*flex: 0 0 460;*/
        height: 100%;
        padding: 3px;
        border-bottom: 1px solid #cccccc;
        display: flex;
        flex-flow: column;
        box-sizing: border-box;
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
    .contentRight .rightMutantTable tr.done{
        background: #aaaaaa;
        color: #cccccc;
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
        flex: 0 0 51px;
    }
    .contentRight .insideWrapper{
        /*height: 370px;*/
        overflow: scroll;
        flex: 0 0 718px;
    }
    .contentRight .rightMutantTable .gray.icon-sort-amount-asc{
        color: #cccccc;
    }

    .contentRight .rightMutantTable td .icon-warning{
        font-size: 16px;
        color: indianred;
    }
    .contentRight .rightMutantTable th.logs:hover{
        background: #09c762;
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


    .contentRight .rightMutantTable>tr>th, .contentRight .rightMutantTable>tr>td{
        height: 32px;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    /*TODO 下面内容很重要*/
    .contentRight .rightMutantTable.down>tr>td{
        white-space: nowrap;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*-moz-text-overflow: ellipsis;*/
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
    .contentRight .logs{
        min-width: 35px;
    }
    .contentRight .logs button{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
        border: none;
    }
    .contentRight .logs button.icon-calendar:hover{
        background: #09c762;
    }
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
    .contentRight .done button.icon-unlocked:hover{
        background: #09c762;
    }
    .contentRight .done button.icon-lock:hover{
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
    .contentRight td.logs{
        position: relative;
        overflow: visible;
    }
    .contentRight td.logs .logsWrapper{
        position: absolute;
        /* todo 因为外侧.insideWrapper使用了overflow: scroll; 横向的scroll使得无法溢出左table边界了*/
        left: 0px;
        top: 35px;
        z-index: 20;
        width: 650px;
        height: 235px;
        background: white;
        border: 1px solid #666666;
    }
    .contentRight .logsWrapper button{
        margin: 12px 0;
        padding: 0;
        width: 50px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        font-weight: bold;
        border: 1px solid black;
    }
    .contentRight .logsWrapper .logTableWraper{
        height: 150px;
        overflow-y: scroll;
    }
    .contentRight .logsWrapper .logTable{
        border-collapse: collapse;
        border: 1px solid #cccccc;
        text-align: center;
        color: black;
        font-size: 12px;
        font-weight: bold;
        /*固定td宽度*/
        table-layout:fixed;
        /*这个用于强制换行*/
        word-break: break-all;
    }
    .contentRight .logsWrapper .logTable th{
        height: 32px;
        border-left: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        /*TODO 恢复外面大表的 white-space: nowrap */
        white-space: normal;
    }
    .contentRight .logsWrapper .logTable td{
        height: 30px;
        border-left: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        white-space: normal;
    }
    .logTable .editTime{
        width: 75px;
    }
    .logTable .editer{
        width: 55px;
    }
    .logTable .done{
        min-width: 40px!important;
    }
    .logTable .delete{
        min-width: 40px!important;
    }
    .logTable .posStart{
        min-width: 75px!important;
    }
    .logTable .posEnd{
        min-width: 75px!important;
    }
    .logTable .ref{
        min-width: 75px!important;
    }
    .logTable .alt{
        min-width: 75px!important;
    }
    .logTable .reason_type{
        width: 55px;
    }
    .logTable .submit_type{
        width: 55px;
    }
    .contentRight .logsWrapper .bnWrapper{
        width: 100%;
        height: 50px;
        border-top: 1px solid #cccccc;
    }

    .contentRight td.logs button.icon-info{
        color: #cccccc;
    }
    .contentRight .affirmed button:hover{
        background: #09c762;
    }
    .contentRight .affirmed button.icon-checkbox-unchecked{
        color: #cccccc;
    }
    .contentRight td.affirmed{
        position: relative;
        overflow: visible;
    }
    .contentRight td.affirmed .reasonWrapper{
        position: absolute;
        left: 0;
        top: 35px;
        z-index: 10;
        width: 300px;
        height: 112px;
        background: white;
        border: 1px solid #666666;
    }
    .contentRight .reasonWrapper .selectWrapper{
        margin: 0 auto;
        width: 80%;
        height: 30px;
        line-height: 30px;
        text-align: left;
    }
    .contentRight .reasonWrapper .selectWrapper select{
        margin: 5px;
        padding: 0;
    }
    .contentRight .reasonWrapper .textareaWrapper{
        margin: 0 auto;
        width: 80%;
        height: 42px;
        line-height: 40px;
        text-align: left;
    }
    .contentRight .reasonWrapper .textareaWrapper textarea{
        margin: 0;
        padding: 0;
        width: 170px;
        height: 40px;
        vertical-align: middle;
    }
    .contentRight .reasonWrapper .reasaonBnWrapper{
        margin: auto;
        width: 70%;
        height: 40px;
    }
    .contentRight .reasonWrapper .reasaonBnWrapper button{
        margin: 8px 15px;
        width: 60px;
        height: 24px;
        border: 1px solid #cccccc;
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
    /*为已审核状态， icon-undo2无颜色*/
    .contentRight tr.checked .icon-undo2{
        color: #cccccc;
    }
    .contentRight tr.edited .icon-undo2{
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
        height: 100%;
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
    .contentRight .exonicfuncRefgene{
        min-width: 150px;
    }
    .contentRight .exonicfuncRefgene .inside{
        padding: 0;
        margin: 0;
        width: 150px;
        height: 100%;
        border: none;
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
    .contentRight .clinsig{
        min-width: 150px;
    }
    .contentRight .clinsig .inside{
        width: 150px;
    }
    .contentRight .intervarAutomated{
        min-width: 150px;
    }
    .contentRight .intervarAutomated .inside{
        width: 150px;
    }

    .pagewrapper{
        flex: 1;
    }

    /*.contentRight .igvWrapper{*/
    /*    flex: 1;*/
    /*}*/
    /*.contentRight .igvBind{*/
    /*    margin: 3px auto;*/
    /*}*/
</style>
