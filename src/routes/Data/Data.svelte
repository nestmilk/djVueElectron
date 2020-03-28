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
                    <div class="leftAffirmSelectWrapper">
                        <button class="commonButton
                                   {sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1 &&
                                        affirmSelection_dict[all_affirmWorkingStatus_of_sheet_dict[params.type]][dict.TYPE]===dict.SINGLE?
                                        'select':''}
                                    "
                            on:click={()=>openAffirmSelectionShow(dict.SINGLE)}
                        >单项审核</button>
                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1 &&
                            singleAffirmSelectionShow
                        }
                            <div class="AffrimeWrapper singleAffirmWrapper"
                                 on:mouseleave={closeAffirmSelectionShow}
                            >
                                <table>
                                    {#each singleAffirmSelectionConfig as item}
                                        <tr class="selectItemTR"
                                            on:click={()=>changeAffirmWorkingStatus(item[dict.VALUE])}
                                        >
                                            <td class="content">
                                                <div class="selectContentDiv">{item[dict.CONTENT]}</div>
                                            </td>
                                            <td class="tick">
                                                <button class="selectItemButton
                                                    {all_affirmWorkingStatus_of_sheet_dict[params.type]===item[dict.VALUE]?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                                >
                                                </button>
                                            </td>
                                        </tr>
                                    {/each}
                                </table>
                            </div>
                        {/if}

                        <button class="commonButton
                                   {sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1 &&
                                        affirmSelection_dict[all_affirmWorkingStatus_of_sheet_dict[params.type]][dict.TYPE]===dict.MULTIPLE?
                                        'select':''}"
                                on:click={()=>openAffirmSelectionShow(dict.MULTIPLE)}
                        >
                            同批审核</button>
                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1 &&
                            multipleAffirmSelectionShow
                        }
                            <div class="AffrimeWrapper multipleAffirmWrapper"
                                 on:mouseleave={closeAffirmSelectionShow}
                            >
                                <table>
                                    {#each multipleAffirmSelectionConfig as item}
                                        <tr class="selectItemTR"
                                            on:click={()=>changeAffirmWorkingStatus(item[dict.VALUE])}
                                        >
                                            <td class="content">
                                                <div class="selectContentDiv">{item[dict.CONTENT]}</div>
                                            </td>
                                            <td class="tick">
                                                <button class="selectItemButton
                                                        {all_affirmWorkingStatus_of_sheet_dict[params.type]===item[dict.VALUE]?'icon-checkbox-checked':'icon-checkbox-unchecked'}"
                                                ></button>
                                            </td>
                                        </tr>
                                    {/each}
                                </table>
                            </div>
                        {/if}

                    </div>
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
                                        <td class="total">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.ALLDATA]:''}</td>
                                        <td class="submitedAndAffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.S_ADATA]:''}</td>
                                        <td class="unsubmitedAndAffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.US_ADATA]:''}</td>
                                        <td class="unsubmitedAndUnaffirmed">{all_sample_record_dict[params.type][sample.id]?all_sample_record_dict[params.type][sample.id][dict.US_UADATA]:''}</td>
                                        <td class="tick">
                                            <button class="selectOne {selected_sampleId_list.indexOf(sample.id)>-1?'icon-checkbox-checked':
                                                'icon-checkbox-unchecked'}">
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </table>
                        </div>
                    </div><!--leftSampleTableWrapper-->
                    <div class="leftMessageWrapper">
                        <div class="messageWrapper">
                            <div class="title">
                                {all_sheet_record_dict[params.type][dict.S_ADATA]}条已提交，{all_sheet_record_dict[params.type][dict.US_ADATA]}条待提交，{all_sheet_record_dict[params.type][dict.US_UADATA]}条待审核
                            </div>
                            <div class="uploadMessageWrapper">
                                <div class="uploadMessage" bind:this={uploadMessageDiv}>
                                    {#each all_uploadMessage_dict[params.type] as message}
                                        {message}<br>
                                    {/each}
                                </div>
                                <div class="uploadBnWrapper">
                                    <button class="icon-cloud-upload {panal_unable_handle || all_sheet_record_dict[params.type][dict.US_ADATA] === 0?'disabled':''}"
                                            disabled="{panal_unable_handle || all_sheet_record_dict[params.type][dict.US_ADATA] === 0?'disabled':''}"
                                            on:click={submitAffirmedData}
                                    >&nbsp;提交</button>
                                </div>
                            </div><!--uploadMessageWrapper-->
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
                                    <!-- 针对单项确认审核或取消审核 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.SIN_CANCEL_OR_AFFIRM}
                                        <th class="affirmed short">单审单消</th>
                                    {/if}
                                    <!-- 针对编辑单项修改原因 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.EDIT_SINAFF_REASON}
                                        <th class="affirmed short">编辑原因</th>
                                    {/if}
                                    <!-- 针对查看单项提交的过往日志 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CHECK_SINSUB_LOGS}
                                        <th class="logs short hoverGreen"
                                            on:click={()=>handleToggleFilter(dict.LOGSEDIT)}
                                        >
                                            {subFilter_selections_dict[dict.LOGSEDIT][all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]][dict.CONTENT]}
                                        </th>
                                    {/if}
                                    <!-- 针对取消单项审核的提交 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_SINSUB_DONE}
                                        <th class="done short hoverGreen"
                                            on:click={()=>handleToggleFilter(dict.DONE)}
                                        >
                                            {subFilter_selections_dict[dict.DONE][all_subFilter_indexes_dict[params.type][dict.DONE][0]][dict.CONTENT]}
                                        </th>
                                    {/if}

                                    <!-- 针对确认多项审核 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.MUL_AFFIRM}
                                        <th class="select short hoverGreen">多项审核</th>
                                    {/if}
                                    <!-- 针对取消多项审核 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_MULAFF}
                                        <th class="select short hoverGreen">取消审核</th>
                                    {/if}
                                    <!-- 针对编辑多项审核的原因 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.EDIT_MULAFF_REASON}
                                        <th class="select short hoverGreen">编辑原因</th>
                                    {/if}
                                    <!-- 针对增减多项审核的条目 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.ADJUST_MULAFF_ITEMS}
                                        <th class="select short hoverGreen">增减条目</th>
                                    {/if}

                                    {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                                        <th class="delete short">删除此行</th>
                                    {/if}
                                {/if}


                                {#each all_wholeTitle_list[params.type] as field}
                                    {#if field===dict.SAMPLESN}
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="sampleSn hoverGreen" on:click={()=>handleToggleFilter(dict.SAMPLEID2UNDERLINE)}>
                                                {@html subFilter_selections_dict[dict.SAMPLEID2UNDERLINE][all_subFilter_indexes_dict[params.type][dict.ORDERING][0]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field}">{all_titleItemList_dict[params.type][field][dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field===dict.CHR &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="chr hoverGreen" on:click={()=>handleToggleFilter(dict.CHR)}>
                                                {@html subFilter_selections_dict[dict.CHR][all_subFilter_indexes_dict[params.type][dict.ORDERING][1]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field}">{all_titleItemList_dict[params.type][field][dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field===dict.POSSTART &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="posStart hoverGreen" on:click={()=>handleToggleFilter(dict.POSSTART)}>
                                                {@html subFilter_selections_dict[dict.POSSTART][all_subFilter_indexes_dict[params.type][dict.ORDERING][2]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field}">{all_titleItemList_dict[params.type][field][dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field===dict.POSEND &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) &&
                                        !sheetDisplayConfigDict[params.type].ifSimpleOrdering
                                    }
                                        {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                            <th class="posEnd hoverGreen" on:click={()=>handleToggleFilter(dict.POSEND)}>
                                                {@html subFilter_selections_dict[dict.POSEND][all_subFilter_indexes_dict[params.type][dict.ORDERING][3]][dict.CONTENT]}
                                            </th>
                                        {:else}
                                            <th class="{field}">{all_titleItemList_dict[params.type][field][dict.TRANSLATE]}</th>
                                        {/if}
                                    {:else if field===dict.EXONICFUNCREFGENE &&
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
                                        <th class="{field}">{all_titleItemList_dict[params.type][field][dict.TRANSLATE]}</th>
                                    {/if}
                                {/each}
                            </tr>
                        </table><!--rightDataTable-->
                    </div><!--titleTableWrapper-->
                    <div class="dataTableWrapper"
                         bind:this={bottomScroll}
                         on:scroll={()=>handleScroll(dict.BOTTOMSCROLL)}
                    >
                        <table class="downTable rightDataTable">
                            {#each page_data as line_data, index}
                                <tr class="lineData
                                    {all_now_data_id[params.type]===line_data.id?'current':''}
                                    {all_status_of_data_dict[params.type][line_data.id]}
                                    {all_nowValue_of_data_dict[params.type][line_data.id] &&
                                        all_nowValue_of_data_dict[params.type][line_data.id][dict.DELETE]?'trueDelete':''
                                    }
                                    "
                                    on:click={(e)=>handle_lineTR_rightClicked(e, line_data.id, line_data.sampleId)}

                                    data-id="{line_data.id}"
                                    data-sampleid="{line_data[dict.SAMPLEID]}"
                                >

                                    {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                                        <!-- 针对单项确认审核或取消审核 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.SIN_CANCEL_OR_AFFIRM}
                                            <td class="affirmed short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_status_of_data_dict[params.type][line_data.id]===dict.FREE?
                                                                    'icon-checkbox-unchecked':'icon-checkbox-checked'}"
                                                            on:click={()=>handleSinAffirm_or_Cancel(line_data.id, line_data.sampleId)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对编辑单项修改原因 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.EDIT_SINAFF_REASON}
                                            <td class="affirmed short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="icon-pencil"
                                                            on:click={()=>handleEditSinAffReason(line_data.id)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对查看单项提交的过往日志 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CHECK_SINSUB_LOGS}
                                            <td class="logs short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="icon-book"
                                                            on:click={()=>handleSingleDataLogdetailsShow(line_data.id)}
                                                    ></button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对取消单项审核的提交 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_SINSUB_DONE}
                                            <td class="done short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{line_data[dict.DONE]?'icon-lock':'icon-unlocked'}"

                                                            disabled="{panal_unable_handle?'disabled':''}">
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}

                                        <!-- 针对确认多项审核 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.MUL_AFFIRM}
                                            <td class="select short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_selected_dataIds_dict[params.type].indexOf(line_data.id)===-1?
                                                                'icon-checkbox-unchecked':'icon-checkbox-checked'}"
                                                        on:click={()=>handleMulAffirm_lineTDClick(line_data.id)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对取消多项审核 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_MULAFF}
                                            <td class="select short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_selected_dataIds_dict[params.type].indexOf(line_data.id)===-1?
                                                                'icon-checkbox-unchecked':'icon-checkbox-checked'}"
                                                            on:click={()=>handle_lineTDClick_for_idsInSameCheckedGroup(line_data.id)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对编辑多项审核的原因 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.EDIT_MULAFF_REASON}
                                            <td class="select short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_selected_dataIds_dict[params.type].indexOf(line_data.id)===-1?
                                                                'icon-checkbox-unchecked':'icon-file-text'}"
                                                            on:click={()=>handle_lineTDClick_for_idsInSameCheckedGroup(line_data.id)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对增减多项审核的条目 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.ADJUST_MULAFF_ITEMS}
                                            <td class="select short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_selected_dataIds_dict[params.type].indexOf(line_data.id)===-1?
                                                                'icon-checkbox-unchecked':'icon-checkbox-checked'}"
                                                            on:click={()=>handle_lineTDClick_for_adjuctMulAffItems(line_data.id)}
                                                    >
                                                    </button>
                                                {/if}
                                            </td>
                                        {/if}


                                        <td class="delete short"
                                            title="实时数据：{line_data[dict.DELETE]?'删除':'保留'}"
                                        >
                                            <button class="icon-cross
                                                           {all_nowValue_of_data_dict[params.type][line_data.id] &&
                                                               all_nowValue_of_data_dict[params.type][line_data.id][dict.DELETE]?'':'undeleted'}
                                                           {all_nowValue_of_data_dict[params.type][line_data.id] && all_nowValue_of_data_dict[params.type][line_data.id][dict.DELETE]!==
                                                               all_preValue_of_data_dict[params.type][line_data.id][dict.DELETE]?'unequal':''}
                                                           {all_status_of_data_dict[params.type][line_data.id]===dict.FREE &&
                                                                page_id_availableEdit_dict[line_data.id]?'availableEdit':''}
                                                           "
                                                    on:click={(e)=>changeValue_In_AllNowvalueOfDataDict(e, line_data.id, dict.DELETE)}
                                                    disabled="{all_status_of_data_dict[params.type][line_data.id]===dict.FREE &&
                                                                    page_id_availableEdit_dict[line_data.id]?
                                                                    '':'disabled'
                                                              }"
                                            >
                                            </button>
                                            {#if all_nowValue_of_data_dict[params.type][line_data.id] && all_nowValue_of_data_dict[params.type][line_data.id][dict.DELETE]!==
                                            all_preValue_of_data_dict[params.type][line_data.id][dict.DELETE]}
                                                <div class="icon-warning"></div>
                                            {/if}
                                        </td>
                                    {/if}

                                    {#each all_wholeTitle_list[params.type] as field}
                                        <!--
                                            1.首先该filed的config设定为可编辑modify
                                            2. 该filed在当前页，人为操作设为availableEdit，以便操作
                                            3. 或者被修改了，强制显示为input状态，呈现差异
                                        -->
                                        {#if all_titleItemList_dict[params.type][field][dict.MODIFY] &&
                                            (
                                                page_id_availableEdit_dict[line_data.id] ||
                                                (all_nowValue_of_data_dict[params.type][line_data.id] && all_nowValue_of_data_dict[params.type][line_data.id][field]!==all_preValue_of_data_dict[params.type][line_data.id][field])
                                            )
                                        }
                                            <td class="{field} containInput
                                                        {all_nowValue_of_data_dict[params.type][line_data.id]?
                                                            (all_nowValue_of_data_dict[params.type][line_data.id][field]!==all_preValue_of_data_dict[params.type][line_data.id][field]?'unequal':''):''}
                                                      "
                                                title="实时数据：{line_data[field]}{field==='sampleSn'?' '+line_data[dict.ID]:''}"
                                                on:mouseenter={()=>handleMutantTDMouseenter(field, line_data.id)}
                                                on:mouseleave={()=>handleMutantTDMouseleave(field, line_data.id)}
                                            >
                                                <input class="dataInput" type={all_titleItemList_dict[params.type][field][dict.TYPE]}
                                                       value="{all_nowValue_of_data_dict[params.type][line_data.id]?all_nowValue_of_data_dict[params.type][line_data.id][field]:''}"
                                                       disabled="{all_status_of_data_dict[params.type][line_data.id]===dict.FREE &&
                                                                    page_id_availableEdit_dict[line_data.id]?'':'disabled'}"

                                                       on:change={(e)=>changeValue_In_AllNowvalueOfDataDict(e, line_data.id, field)}
                                                >
                                                <div class="upBesideInput icon-warning"></div>
                                                <div class="downBesideInput icon-undo2
                                                                {page_ModifyField_mouseEnter_dict[line_data.id][field] &&
                                                                    page_id_availableEdit_dict[line_data.id]?'show':''
                                                                }
                                                            "
                                                     on:click={()=>recover_values_InNowPageDataDict([line_data.id],[field])}
                                                ></div>
                                            </td>
                                        {:else}
                                            <td class="{field} contentTD"
                                                title="实时数据：{line_data[field]}{field==='sampleSn'?' '+line_data[dict.ID]:''}"
                                            >
                                                <div class="inside">{all_nowValue_of_data_dict[params.type][line_data.id]?all_nowValue_of_data_dict[params.type][line_data.id][field]:''}</div>
                                            </td>
                                        {/if}
                                    {/each}
                                </tr>
                            {/each}
                        </table><!--rightDataTable-->
                    </div><!--dataTableWrapper-->
                    <div class="dataPagerWrapper">
                        <Page page={all_search_params_dict[params.type][dict.PAGE]}
                              totalPage={total_page_nums}
                              currentPageSize={all_search_params_dict[params.type][dict.PAGE_SIZE]}
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
{#if sureShow}
    <Sure message="{sureMessage}" on:sureReply={handleSureReply}></Sure>
{/if}
{#if reasonShow}
    <Reason
        reasonType_list="{all_reasonType_list_dict[params.type]?all_reasonType_list_dict[params.type]:[{value: null, context: '请选择'}]}"
        preValue="{preValue}"
        preDesc="{preDesc}"
        on:cancel={handleAddReasonCancel}
        on:sure={handleAddReasonSure}
    ></Reason>
{/if}
{#if singleDataLogdetailsShow}
    <SingleDataLogdetails
        id="{singleData_id}"
        logs="{singleDataRelatedIds_Logs_forShow}"
        fieldList="{all_modifyTitle_list_dict[params.type]}"
        titleDict="{all_titleItemList_dict[params.type]}"
        on:close={handleClosesingleDataLogdetailsShow}
    >
    </SingleDataLogdetails>
{/if}
<script>
    import uuidv4 from 'uuid/v4'

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
    import Sure from '../../components/Sure/Sure.svelte'
    import Reason from '../../components/Reason/Reason.svelte'
    import SingleDataLogdetails from '../../components/SingleDataLogdetails/SingleDataLogdetails.svelte'


    // 引入本地脚本
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {
        removeFromUniqueArray,
        ifContentEqualArrays,
        arrayToDict
    } from '../../utils/arrays'
    import {getTime, getParentNodeByParentClassName} from "../../utils/common";
    import {sheetDisplayConfigList, common_filter_subFilters_dict, common_subFilter_selections_dict,
        affirmSelectionConfig} from './config'
    import {dict_translate} from '../../utils/dict'
    const sheetDisplayConfigDict = JSON.parse(JSON.stringify(arrayToDict(sheetDisplayConfigList, 'sheet')))

    // 引入electron相关包
    const { ipcRenderer, remote } =window.require('electron')
    // const {exec, execSync} = window.require('child_process')
    // const iconv = window.require('iconv-lite');
    const Store = window.require('electron-store')
    const settingsStore = new Store({name: 'Settings'})

    let dict = {
        SAMPLEINFOINPANAL: "sampleInfoInPanal",
        SHEET: 'sheet', SUBMENU_TRANSLATE: "submenu_translate", FILTERS: "filters",
        PARAM: 'param', SEARCH: 'search',
        ID: 'id', SAMPLE: 'sample', SAMPLESN: 'sampleSn',  TITLE_LIST: 'title_list',
        PAGE: 'page', PAGE_SIZE: 'page_size', SAMPLEID: 'sampleId', SAMPLEIDS: 'sampleIds', PANALID: 'panalId',
        TITLE: 'title', TRANSLATE: 'translate',
        TYPE: 'type', CONTENT: 'content', VALUE: 'value', STATUS: 'status',
        TOPSCROLL: 'topScroll', BOTTOMSCROLL: 'bottomScroll',
        ALLDATA: 'allData', S_ADATA: "subAndAffData", US_ADATA: 'unsubAndAffData', US_UADATA: 'unsubAndUnaffData',
        DONE: 'done', LOGSEDIT: 'logsEdit', ORDERING: 'ordering', EXONICFUNCREFGENE: 'exonicfuncRefgene',
        SAMPLEID2UNDERLINE: 'sample__id', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
        TARGET: "target", HEREDITARY: "hereditary", TMB: "TMB",
        MODIFY: 'modify', IFEQUAL: 'ifEqual',
        DELETE: "delete", FREQ: 'freq',
        NOWDISPLAY: 'nowDisplay', DEFAULTDISPLAY: 'defaultDisplay', SELECTDISPLAY: 'selectDisplay',
        FIELD_MOUSE_ENTER: 'field_mouse_enter',
        FREE: 'free', CHECKED: 'checked', DELETED: 'deleted', EDITED: 'edited',
        AVAILABLE_EDIT: 'availableEdit', REASON_TYPE: 'reason_type', REASON_DESC: 'reason_desc', LOG_ID: 'log_id',
        DEFAULT: 'default', IDS: 'ids', NOTHING: 'nothing',
        SINGLE: 'single', MULTIPLE: 'multiple',
        SIN_CANCEL_OR_AFFIRM: "single_cancel_or_affirm", CHECK_SINSUB_LOGS: "check_single_submit_logs",
        CANCEL_SINSUB_DONE: "cancel_single_submit_done", EDIT_SINAFF_REASON: "edit_single_affirm_reason",
        MUL_AFFIRM: "multiple_affirm", CANCEL_MULAFF: 'cancel_multiple_affirm', EDIT_MULAFF_REASON: "edit_multiple_affirm_reason",
        CANCEL_MULSUB_DONE: "cancel_multiple_submit_done",
        ADJUST_MULAFF_ITEMS: "adjust_multiple_affirm_items", DESC: 'desc',
        CANCEL: 'cancel', MULTIPLE_AFFIRM: "multiple_affirm", SINGLE_AFFIRM: "single_affirm", ADJUST_ITEMS: "adjust_items",
        DELETED_IDS: "deleted_ids", LEFT_IDS: "left_ids", ADDED_IDS: "added_ids", PREVALUE_NOWVALUE_UPDATE: 'preValue_nowValue_update',
        LOG_DETAILS: "log_details", SUBJECT_ID: 'subject_id', SUBJECT_FIELD_NAME: "subject_field_name",
        NEW_VALUE: 'new_value', OLD_VALUE: 'old_value', PREVIOUS_LOG_UPDATE: "previous_log_update",
        EDITOR: 'editor', ADD_TIME: "add_time",
    }
    // 获取路径中的：值
    export let params = {}

    // 控制loading页面的显示
    let loadingShow = false
    // 控制确定页面的显示
    let sureShow = false
    // 控制修改原因页面的显示
    let reasonShow = false
    // 控制singleAffirm显示
    let singleAffirmSelectionShow = false
    // 控制multipleAffirm显示
    let multipleAffirmSelectionShow = false
    // 控制单数据过往logdetails显示
    let singleDataLogdetailsShow = false

    let sureEvent
    let sureOperation
    let sureMessage = ''
    function changeSendSureMessage() {
        sureMessage = "是否对" + dict_translate[sureEvent] + "进行" + dict_translate[sureOperation] + "相关操作!"
    }
    function handleSureReply(e){
        console.log('handleSureReply', e.detail.status)
        if (e.detail.status) {
            switch (sureEvent) {
                case dict.MULTIPLE_AFFIRM:
                    switch (sureOperation) {
                        case dict.CANCEL:
                            __handleCancelMulAffirm()
                            break
                        case dict.ADJUST_ITEMS:
                            console.log('handleSureReply 增减条目')
                            break
                        default:
                            break
                    }
                    break
                default:
                    break
            }
        }

        sureShow = false
    }

    let singleAffirmSelectionConfig = JSON.parse(JSON.stringify(affirmSelectionConfig.reduce((result,item)=>{
        if (item[dict.TYPE]===dict.SINGLE){
            result.push(item)
        }
        return result
    }, [])))
    let multipleAffirmSelectionConfig = JSON.parse(JSON.stringify(affirmSelectionConfig.reduce((result,item)=>{
        if (item[dict.TYPE]===dict.MULTIPLE){
            result.push(item)
        }
        return result
    }, [])))
    let affirmSelection_dict = JSON.parse(JSON.stringify(arrayToDict(affirmSelectionConfig, 'value')))

    // 用于每页，是否锁定一批审核，以便进行增减条目
    let all_locked_logId_for_adjustMultipleAffirmItems = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = null
        return result
    },{})))
    // 重置当前页的增减项目的锁定
    function __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems(){
        all_locked_logId_for_adjustMultipleAffirmItems[params.type] = null
    }

    function openAffirmSelectionShow(type){
        switch (type) {
            case dict.SINGLE:
                singleAffirmSelectionShow = true
                multipleAffirmSelectionShow = false
                return
            case dict.MULTIPLE:
                multipleAffirmSelectionShow = true
                singleAffirmSelectionShow = false
                return
            default:
                return;
        }
    }
    function closeAffirmSelectionShow(type){
        singleAffirmSelectionShow = false
        multipleAffirmSelectionShow = false
    }
    let all_affirmWorkingStatus_of_sheet_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = dict.SIN_CANCEL_OR_AFFIRM
        return result
    },{})))

    function __checkIfInsideMultipleAffirm(id){
        let log_id = all_submit_logs_dict[params.type][id]
        if(log_id){
            if(logs_together_dict[log_id][dict.IDS].length>1){
                return true
            }else{
                return false
            }
        }else{
            // 如果log为null，则必然是单选审核
            return false
        }
    }
    function __check_availSelect_if_FreeAndTruelyEdited(id){
        //如果状态不是free，返回false
        let status = all_status_of_data_dict[params.type][id]
        if (status!==dict.FREE) return false

        let delete_preValue = all_preValue_of_data_dict[params.type][id][dict.DELETE]
        let delete_nowValue = all_nowValue_of_data_dict[params.type][id][dict.DELETE]
        if(!delete_preValue && delete_nowValue){
            // 1) free状态下，必须是真删除，才true
            return true
        }else{
            // 2) free状态下，必须是有真修改的（delete false， 删除撤销的不算）才true, 否则返回false
            // todo 理论上应该要查修改记录的历史值
            let unequal_values = __check_unequalValues_ofModifiyFields(id, [...all_modifyTitle_list_dict[params.type]])
            return Object.keys(unequal_values).length>0
        }
    }
    function __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(str_id){
        let id = parseInt(str_id)
        // console.log('<===__check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict begin')
        let affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        switch (affirm_status) {
            case dict.SIN_CANCEL_OR_AFFIRM:
                let status_sin_cancelOrAffirm = all_status_of_data_dict[params.type][id]
                // 只要状态是free就显示
                if (status_sin_cancelOrAffirm===dict.FREE) return true

                // 如果是三种已确认审核状态
                if ([dict.EDITED, dict.CHECKED, dict.DELETED].indexOf(status_sin_cancelOrAffirm)!==-1){
                    // 再判断是不是在批量组内
                    let ifInsideMultiple_sin_cancelOrAffirm = __checkIfInsideMultipleAffirm(id)
                    if (!ifInsideMultiple_sin_cancelOrAffirm) return true
                }
                // 其它情况返回false
                return false
            case dict.EDIT_SINAFF_REASON:
                // 先判断是不是在批量组内
                let ifInsideMultiple_editSinAffReason = __checkIfInsideMultipleAffirm(id)
                // 首先不在批量组内，且有all_submit_logs_dict中存在此id，并且其log_id不为null（！！强制转化为boolean值）, 则显示
                console.log(!ifInsideMultiple_editSinAffReason, all_submit_logs_dict[params.type].hasOwnProperty(id), all_submit_logs_dict[params.type][id])
                return !ifInsideMultiple_editSinAffReason &&
                        all_submit_logs_dict[params.type].hasOwnProperty(id) &&
                        !!all_submit_logs_dict[params.type][id]
            case dict.MUL_AFFIRM:
                return __check_availSelect_if_FreeAndTruelyEdited(id)
            case dict.CANCEL_MULAFF:
                return __checkIfInsideMultipleAffirm(id)
            case dict.EDIT_MULAFF_REASON:
                return __checkIfInsideMultipleAffirm(id)
            case dict.ADJUST_MULAFF_ITEMS:
                let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
                if (locked_logId){
                    let locked_ids = logs_together_dict[locked_logId][dict.IDS]
                    // console.log("__check_availSelect_of_oneData_already...", locked_ids, id, locked_ids.indexOf(id)!==-1, __check_availSelect_if_FreeAndTruelyEdited(id))
                    // 注意传入的id可能为字符串，需要提前转为整数！！
                    return locked_ids.indexOf(id)!==-1 || __check_availSelect_if_FreeAndTruelyEdited(id)
                }else{
                    // 在批量组内, 即可
                    return __checkIfInsideMultipleAffirm(id)
                }
            case dict.CHECK_SINSUB_LOGS:
                return all_previousLog_list_dict[params.type][id] && all_previousLog_list_dict[params.type][id].length!==0
            case dict.CANCEL_SINSUB_DONE:
                let status_cancel_sinSub_done = all_status_of_data_dict[params.type][id]
                if(status_cancel_sinSub_done === dict.DONE){
                    __update_allRecentlyPreviousLogDict()
                }else{
                    return false
                }
            default:
                return false
        }
    }
    function __check_availSelect_of_oneData_notInsideAllStatusOfDataDict(done){
        // console.log('<===__check_availSelect_of_oneData_notInsideAllStatusOfDataDict begin')
        let affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        switch (affirm_status) {
            case dict.SIN_CANCEL_OR_AFFIRM:
                return !done
            case dict.EDIT_SINAFF_REASON:
                return false
            case dict.MUL_AFFIRM:
                return false
            case dict.CANCEL_MULAFF:
                return false
            case dict.ADJUST_MULAFF_ITEMS:
                return false
            default:
                return false
        }
    }

    // 重置当前页面某id是否可选
    function __update_oneId_availSelect_inPageIdAvailSelectDict(id){
        page_id_availableSelect_dict[id] = __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id)
    }
    // 重置当前页所有id，是否可选
    function __update_allIds_availSelect_inPageIdAvailSelectDict(){
        for (let id in page_id_availableSelect_dict) {
            __update_oneId_availSelect_inPageIdAvailSelectDict(id)
        }
    }
    // 重置当前页某id为不可编辑
    function __set_oneId_false_availEdit_inPageIdAvailEditDict(id){
        page_id_availableEdit_dict[id] = false
    }
    // 重置当前页所有id，都不可编辑
    function __set_allIds_false_availEdit_inPageIdAvailEditDict(){
        for (let id in page_id_availableEdit_dict){
            page_id_availableEdit_dict[id] = false
        }
    }

    // 所有可编辑页面的过往日志记录
    let all_previousLog_list_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        if (item[dict.FILTERS].indexOf(dict.LOGSEDIT)> -1){
            result[sheet] = {}
        }
        return result
    }, {})))
    //只包含最后一次previousLog的id字典
    let all_latestPreviousLog_dict = JSON.parse(JSON.stringify(all_previousLog_list_dict))
    // 切换审核工作状态时调用，更新all_latestPreviousLog_dict，
    // 其中同样更新了不在当前页面的相关id的logs
    async function __update_allRecentlyPreviousLogDict(){
        loadingShow = true

        let unloaded_ids = []

        for (let id in all_previousLog_list_dict[params.type]){
            let logs = JSON.parse(JSON.stringify(all_previousLog_list_dict[params.type][id]))
            if(logs.length>0){
                // 挑选日志最近的
                let recent_log = logs.sort((a,b)=>b.id-a.id)[0]
                let ids = recent_log[dict.IDS].sort((a,b)=>a-b)
                // console.log("__update_allrecentlyPreviousLogDict recent_log logId ids", recent_log, ids)
                ids.forEach(id=>{
                    if(!all_previousLog_list_dict[params.type].hasOwnProperty(id)) unloaded_ids.push(id)
                })
            }
        }

        console.log("__update_allrecentlyPreviousLogDict", unloaded_ids)
        //更新没有的id的过往logs数据，todo 非本页，固没有更新当前页面availSelect状态
        if(unloaded_ids.length>0){
            await __update_Ids_and_relatedIds_PreviousLogs(unloaded_ids)
        }

        loadingShow = false
    }
    // 按单个id获取的新log数据，更新ll_previous_logs_dict
    function __update_oneId_inAllPreviousLogListDict(result){
        //每个log的列表
        all_previousLog_list_dict[params.type][result.id] = []
        let related_ids = []
        for (let log of result.data){
            let ids = []
            let log_details = {}
            for (let detail of log[dict.LOG_DETAILS]){
                // 1) ids把这个log中，所有log_detail的数据id（同批审核成员）收集在一起
                let subject_id = detail[dict.SUBJECT_ID]
                if(ids.indexOf(subject_id)===-1) {
                    ids.push(subject_id)
                }

                // 2) 把这个数据id的所有修改过的字段，重新整理下，放在log_details字典中，key为字段名
                if(subject_id===result.id){
                    log_details[detail[dict.SUBJECT_FIELD_NAME]] = {
                        new_value: detail[dict.NEW_VALUE],
                        old_value: detail[dict.OLD_VALUE]
                    }
                }
            }

            // 将结构调整后的log数据推入 all_previousLog_list_dict 数组
            all_previousLog_list_dict[params.type][result.id].push({
                id: log[dict.ID],
                log_id: log[dict.LOG_ID],
                data_id: result.id,
                ids,
                log_details,
                editor: log[dict.EDITOR],
                add_time: log[dict.ADD_TIME],
                type: log[dict.REASON_TYPE],
                desc: log[dict.REASON_DESC]
            })

            // 将log的ids推入related_ids
            for(let id of ids){
                if(related_ids.indexOf(id)===-1) related_ids.push(id)
            }
        }

        return related_ids
    }

    // 获取某id的日志的promise
    let __getLogPromise = (id)=>{
        return new Promise((resolve,reject)=>{
            api.listLog({
                modelName: params.type,
                subjectIds: id
            }).then(
                    response=>resolve({
                        id,
                        data: response.data
                    })
            ).catch(error=> {
                // console.log('__getLogPromise', error)
                reject(error)
            })
        })
    }
    async function __get_UnloadedIds_updatePreviousLogs(ids){
        // ids的logs中涉及的ids，除开查询本身的ids
        let all_absolutelyRelated_ids = []
        let allLogsPromiseArray = ids.map(id=>__getLogPromise(id))

        await Promise.all(allLogsPromiseArray).then(datas=>datas.forEach(data=>{
            // console.log("__getIdsPreviousLogs", data)
            // 利用获取到的某id的data，更新对应all_previousLog_list_dict中对应的id的previousLog列表
            let related_ids = __update_oneId_inAllPreviousLogListDict(data)
            // 将每个id的logs中的related_ids列表，除开ids表中，unloaded推入总表all_related_ids
            related_ids.forEach(id=>{
                if(all_absolutelyRelated_ids.indexOf(id)===-1 && ids.indexOf(id)===-1) all_absolutelyRelated_ids.push(id)
            })
        })).catch(errors=>{
            // 只报了第一个，errors居然不是数组 todo
            console.log('__getPageSubmitLogs', errors)
        })

        return all_absolutelyRelated_ids
    }
    async function __update_Ids_and_relatedIds_PreviousLogs(id_list=null, updateAvailSelect=false){
        loadingShow = true

        // 默认使用当前页的所有id进行更新
        let ids = page_data.map(data=>data.id)
        if(id_list){
            ids = id_list
        }

        // 收集回传的查询ids的logs中涉及的非查询ids本身的 id列表
        let unloaded_ids = []
        // A) 先加载ids，返回获取相关但没有下载的id表(unloaded_ids)
        await __get_UnloadedIds_updatePreviousLogs(ids).then(ids=>unloaded_ids=ids)

        // B) 再次加载unloaded_ids
        await __get_UnloadedIds_updatePreviousLogs(unloaded_ids).then(ids=>{
            console.log("__getIdsPreviousLogs unloaded_ids second_unloaded_ids all_previousLog_list_dict", unloaded_ids, ids, all_previousLog_list_dict)
        })

        if(updateAvailSelect){
            //更新完logs日志，肯定需要更新一下页面可选项
            __update_allIds_availSelect_inPageIdAvailSelectDict()
        }

        loadingShow = false
    }
    // 改变审核的工作环境
    async function changeAffirmWorkingStatus(type){
        let pre_affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        //1) 先修改当前工作状态
        all_affirmWorkingStatus_of_sheet_dict[params.type] = type

        // 2) 调整当前页的数据条目能否操作按钮显示
        __update_allIds_availSelect_inPageIdAvailSelectDict()

        //3) 确认工作状态切换，需要调整的参数
        switch (type) {
            case dict.SIN_CANCEL_OR_AFFIRM:
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                break
            case dict.EDIT_SINAFF_REASON:
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                break
            case dict.MUL_AFFIRM:
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                break
            case dict.EDIT_SINAFF_REASON:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                break
            case dict.CANCEL_MULAFF:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []
                break
            case dict.EDIT_MULAFF_REASON:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []
                break
            case dict.ADJUST_MULAFF_ITEMS:
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []
                break
            case dict.CHECK_SINSUB_LOGS:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []

                // 更新当前页的相关previousLogs
                await __update_Ids_and_relatedIds_PreviousLogs(null, true)
                break
            case dict.CANCEL_SINSUB_DONE:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                all_selected_dataIds_dict[params.type] = []

                break
            default:
                break
        }

    }

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

    //标题相关参数 每页title_list的列表，
    let all_wholeTitle_list = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].map(title_list_item=>title_list_item[dict.TITLE])
        return result
    }, {})))
    // 每页的title_list,转化为字典， 其中nowDisplay用于控制是否此标题栏显示
    let all_titleItemList_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let title_list = item[dict.TITLE_LIST].map(title=>{
            title[dict.NOWDISPLAY]= title[dict.DEFAULTDISPLAY]?true:false
            return title
        })
        result[item[dict.SHEET]] = arrayToDict(title_list, dict.TITLE)
        return result
    }, {})))
    // 每页需要修改的title列表
    let all_modifyTitle_list_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].reduce((title_result, title)=>{
            if (title[dict.MODIFY]){
                title_result.push(title[dict.TITLE])
            }
            return title_result
        }, [])
        return result
    }, {})))

    // 当前页面信息列表，用于循环展示
    let page_data = []
    // 随着页面初始化后更新, 鼠标进入各个id的field后值变为true，初始化为false
    let page_ModifyField_mouseEnter_dict = {}
    // 当前页，各个id当前能否编辑，初始化全为false
    let page_id_availableEdit_dict = {}
    // 当前页面的id，能否操作列按钮显示
    let page_id_availableSelect_dict = {}


    //用作差异校验, 每页以id为key，value为所有field的字典
    let all_preValue_of_data_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = {}
        return result
    }, {})))
    // 用于当前修改记录, 每页以id为key，value为所有field的字典
    let all_nowValue_of_data_dict = JSON.parse(JSON.stringify(all_preValue_of_data_dict))


    // 每页同批多选的id号
    let all_selected_dataIds_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result,item)=>{
        result[item[dict.SHEET]] = []
        return result
    }, {})))


    // 修改all_nowValue_of_data_dict中的值
    function recover_values_InNowPageDataDict(id_list, field_list=[]){
        // console.log('recoverValuesInNowPageDataDict', id_list, field_list, all_status_of_data_dict[params.type])
        let recover_field_list = all_modifyTitle_list_dict[params.type]
        if (field_list.length > 0) {
            recover_field_list = field_list
        }
        id_list.forEach(id=>{
            // 判断数据条目是否为free状态,free才能修改
            if (all_status_of_data_dict[params.type][id]===dict.FREE) {
                recover_field_list.forEach(field=>{
                    all_nowValue_of_data_dict[params.type][id][field] = all_preValue_of_data_dict[params.type][id][field]
                })
            }
        })
    }
    function changeValue_In_AllNowvalueOfDataDict(e, id, field, force=false){
        // 只能状态为free或者人为forece为true，才能修改nowValue
        if (all_status_of_data_dict[params.type][id]===dict.FREE || force) {
            if(field===dict.DELETE){
                let pre_nowValue = all_nowValue_of_data_dict[params.type][id][dict.DELETE]
                all_nowValue_of_data_dict[params.type][id][dict.DELETE] = !pre_nowValue
                // 同时需要将其余已修改的项恢复
                recover_values_InNowPageDataDict([id])
            }else{
                // 操作前先将delete置换为false
                all_nowValue_of_data_dict[params.type][id][dict.DELETE] = false
                //// 接着修改title的值
                if ([dict.POSSTART, dict.POSEND].indexOf(field) > -1){
                    all_nowValue_of_data_dict[params.type][id][field] = parseInt(e.target.value)
                }else if (field === dict.FREQ){
                    let eValue = e.target.value

                    // console.log(eValue, isNaN(eValue), parseFloat(eValue)>=0, parseFloat(eValue)<=1)
                    if(!isNaN(eValue) && parseFloat(eValue)>=0 && parseFloat(eValue)<=1){
                        all_nowValue_of_data_dict[params.type][id][field] = eValue
                    }else{
                        remote.dialog.showErrorBox('频率输入不正确', '必须为浮点数，范围在0-1之间！')
                    }
                }else{
                    all_nowValue_of_data_dict[params.type][id][field] = e.target.value
                }
            }

            // 更新此条
            __update_oneId_availSelect_inPageIdAvailSelectDict(id)
        }
    }
    // 处理鼠标划入突变的td的状态, 为了触发单元格 恢复按钮
    function handleMutantTDMouseenter (field, id){
        page_ModifyField_mouseEnter_dict[id][field] = true
    }
    function handleMutantTDMouseleave (field, id){
        page_ModifyField_mouseEnter_dict[id][field] = false
    }

    function __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_id, status, reason=null, unequal_values=null, common_log_id=null, adjust_mulAff_items=false){
        // console.log('<=== __change_dataStatus_params_logs_availSelect_sampleRecord_sheetRecord begin')
        // 1) 修改此条数据的status
        all_status_of_data_dict[params.type][id] = status
        __set_oneId_false_availEdit_inPageIdAvailEditDict(id)

        switch (status) {
            case dict.CHECKED:
                // 2) 添加此id的提交params
                all_submit_params_dict[params.type][id] = {
                    done: true
                }
                // 3) 此条日志id设为null
                let log_checked_id = uuidv4()
                all_submit_logs_dict[params.type][id] = log_checked_id
                logs_together_dict[log_checked_id] = {
                    ids: [id],
                    value: 'check',
                    desc: ""
                }

                // 4) 更新sampleRecord和sheetRecord
                __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_UADATA, dict.US_ADATA)

                // 5) 将done的nowValue改为true
                all_nowValue_of_data_dict[params.type][id][dict.DONE] = true
                return
            case dict.EDITED:
                // 2) 添加此id的提交params
                all_submit_params_dict[params.type][id] = {
                    done: true,
                    ...unequal_values
                }
                // 3) 此条日志id设为为uuidv4生成，添加日志详情
                // 判断是否提供批处理共享的common_log_id
                if (common_log_id) {
                    all_submit_logs_dict[params.type][id] = common_log_id
                }else{
                    let log_edited_id = uuidv4()
                    all_submit_logs_dict[params.type][id] = log_edited_id
                    logs_together_dict[log_edited_id] = {
                        ids: [id],
                        ...reason
                    }
                }
                // 针对调整多项审核条目数目
                if(adjust_mulAff_items){
                    logs_together_dict[common_log_id][dict.IDS] = [...logs_together_dict[common_log_id][dict.IDS], id]
                }

                // 4) 更新sampleRecord和sheetRecord
                __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_UADATA, dict.US_ADATA)

                // 5) 将done的nowValue改为true
                all_nowValue_of_data_dict[params.type][id][dict.DONE] = true
                return
            case dict.DELETED:
                // 2) 添加此id的提交params
                all_submit_params_dict[params.type][id] = {
                    done: true,
                    delete: true
                }
                // 3) 此条日志id设为为uuidv4生成，添加日志详情
                // 判断是否提供批处理共享的common_log_id
                if (common_log_id) {
                    all_submit_logs_dict[params.type][id] = common_log_id
                }else{
                    let log_deleted_id = uuidv4()
                    all_submit_logs_dict[params.type][id] = log_deleted_id
                    logs_together_dict[log_deleted_id] = {
                        ids: [id],
                        ...reason
                    }
                }
                // 针对调整多项审核条目数目
                if(adjust_mulAff_items){
                    logs_together_dict[common_log_id][dict.IDS] = [...logs_together_dict[common_log_id][dict.IDS], id]
                }

                // 4) 更新sampleRecord和sheetRecord
                __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_UADATA, dict.US_ADATA)

                // 5) 将done的nowValue改为true
                all_nowValue_of_data_dict[params.type][id][dict.DONE] = true
                return
            case dict.FREE:
                // 2) 此条数据id对应的log_id，删除log详情
                let log_id = all_submit_logs_dict[params.type][id]
                if(!adjust_mulAff_items){
                    //批次的删除一个，剩余就没法删除，需要判断一下
                    if (logs_together_dict.hasOwnProperty(log_id)){
                        delete logs_together_dict[log_id]
                    }
                }else{
                    // 针对多项审核条目删除, 将日志详情里面的ids列表剔除此id
                    logs_together_dict[log_id][dict.IDS] = removeFromUniqueArray(logs_together_dict[log_id][dict.IDS], id)
                }
                delete all_submit_logs_dict[params.type][id]
                // 3）删除此id的提交params
                delete all_submit_params_dict[params.type][id]

                // 4) 更新sampleRecord和sheetRecord
                __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_ADATA, dict.US_UADATA)

                // 5) 将done的nowValue改为false
                all_nowValue_of_data_dict[params.type][id][dict.DONE] = false
                return
            case dict.DONE:
                // 2) preValue使用nowValue进行替换
                for (let field in all_submit_params_dict[params.type][id]){
                    all_preValue_of_data_dict[params.type][id][field] = all_nowValue_of_data_dict[params.type][id][field]
                }

                //3) 删除submit_params和submit_logs
                delete all_submit_params_dict[params.type][id]
                delete all_submit_logs_dict[params.type][id]

                //4) 更新sampleRecord和sheetRecord
                let sampleId = all_preValue_of_data_dict[params.type][id][dict.SAMPLEID]
                __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sampleId, dict.US_ADATA, dict.S_ADATA)
                return
            default:
                return
        }
    }

    // 将sample_record_dict和sheet_record_dict中相关总数进行增减
    function __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, from, to){
        // console.log("__moveCountFromToInAllSampleRecordandAllSheetRecord", sample_id, all_sample_record_dict, all_sheet_record_dict, from, to)
        all_sample_record_dict[params.type][sample_id][from]--
        all_sample_record_dict[params.type][sample_id][to]++

        all_sheet_record_dict[params.type][from]--
        all_sheet_record_dict[params.type][to]++
    }
    // 查看此条数据，所有modifyTitle列表对应的值是否有过修改
    function __check_unequalValues_ofModifiyFields(id, modify_list=[], sub_nowData=null, sub_preData=null){
        let default_field_list = [...all_modifyTitle_list_dict[params.type], dict.DELETE]
        if (modify_list.length > 0) {
            default_field_list = modify_list
        }
        let unequal_fieldValue_dict = default_field_list.reduce((result, field)=>{

            let nowValue = sub_nowData?sub_nowData[field]:all_nowValue_of_data_dict[params.type][id][field]
            let preValue = sub_preData?sub_preData[field]:all_preValue_of_data_dict[params.type][id][field]
            if (nowValue!==preValue){
                result[field] = nowValue
            }
            return result
        }, {})
        // console.log("__checkModifyFieldEqual")
        return unequal_fieldValue_dict
    }

    // 处理单项审核的确认或取消
    function handleSinAffirm_or_Cancel(id, sample_id){
        let status = all_status_of_data_dict[params.type][id]
        if (status === dict.FREE) {
            // 如果数据状态是free，按钮点击为确认审核
            // 查看是否有修改，如果有修改，弹出修改原因
            let unequal_values = __check_unequalValues_ofModifiyFields(id)
            // console.log("handleSingleAffirm", unequal_values)
            if (Object.keys(unequal_values).length === 0) {
                // 将状态从free设置为checked
                __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_id, dict.CHECKED)
                return
            }else{
                // 显示修改原因填写页面, 逻辑跳转handleAddReasonSure处理
                preValue = null
                preDesc = null
                reasonShow = true
            }

        }else if([dict.CHECKED, dict.DELETED, dict.EDITED].indexOf(status) !== -1){
            // 如果数据状态是已审核中一种，按钮点击为 取消审核确认
            // 修改状态为free
            __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_id, dict.FREE)
        }
    }

    // 处理编辑单项修改的原因
    function handleEditSinAffReason(id){
        let log_id = all_submit_logs_dict[params.type][id]
        let log_detail = logs_together_dict[log_id]
        preValue = log_detail[dict.VALUE]
        preDesc = log_detail[dict.DESC]
        reasonShow = true
    }

    // 无重复列表，
    // 如果点击的id在列表中，从列表剔除，
    // 如果点击的id不在列表中，加入列表
    function __handleMultipleSelect(list, id){
        let copied_list = JSON.parse(JSON.stringify(list))
        if (copied_list.indexOf(id)>-1){
            return removeFromUniqueArray(copied_list, id)
        }else{
            copied_list.push(id)
            return copied_list
        }
    }
    function handleMulAffirm_lineTDClick(id){
        // 处理多选问题
        all_selected_dataIds_dict[params.type] = __handleMultipleSelect(all_selected_dataIds_dict[params.type], id)

        // 更新此条是否可选的状态
        __update_oneId_availSelect_inPageIdAvailSelectDict(id)
    }

    function __getSampleIdsDict_by_dataIdsList(id_list){
        return id_list.reduce((result, id)=>{
            let sample_id = all_preValue_of_data_dict[params.type][id][dict.SAMPLEID]
            result[id]=sample_id
            return result
        },{})
    }
    // 选择列显示时，处理多选时候的审核
    function __handleMulAffirm(){
        // 只有此页有选中id才进行处理，显示原因填写表
        if(all_selected_dataIds_dict[params.type].length > 0){
            preValue = null
            preDesc = null
            reasonShow = true
        }
    }
    // 针对选择多选组，用于选取同批提交的ids
    function handle_lineTDClick_for_idsInSameCheckedGroup(id){
        let log_id = all_submit_logs_dict[params.type][id]
        let id_list = logs_together_dict[log_id][dict.IDS]
        all_selected_dataIds_dict[params.type] = id_list
    }
    // 用于取消多选同批次的审核
    function __handleCancelMulAffirm(){
        let id_list  = all_selected_dataIds_dict[params.type]
        let sampleId_dict = __getSampleIdsDict_by_dataIdsList(id_list)
        id_list.forEach(id=>{
            __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sampleId_dict[id], dict.FREE)
        })

        //1) 清空id选中列表
        all_selected_dataIds_dict[params.type] = []
        //2) 调整当前页的数据条目能否操作按钮显示
        for (let id in page_id_availableSelect_dict) {
            __update_oneId_availSelect_inPageIdAvailSelectDict(id)
        }
    }
    function  __check_ifWouldLeftNone_of_originallockedLogId(expected_selected_ids){
        let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
        // console.log('__check_atLeast_keepOneId_in_lockedLogId', expected_selected_ids, locked_logId, JSON.parse(JSON.stringify(logs_together_dict[locked_logId])))
        let ids = JSON.parse(JSON.stringify(logs_together_dict[locked_logId][dict.IDS]))
        let left_ids_of_originalLockedLogId = ids.reduce((result, id)=>{
            if (expected_selected_ids.indexOf(id)!==-1) result.push(id)
            return result
        }, [])

        // console.log('__check_atLeast_keepOneId_in_lockedLogId', left_ids_of_originalLockedLogId, JSON.parse(JSON.stringify(logs_together_dict[locked_logId])), logs_together_dict[locked_logId])
        return left_ids_of_originalLockedLogId.length===0
    }
    // 针对多选审核增减项目时候
    function handle_lineTDClick_for_adjuctMulAffItems(id){
        let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
        if(locked_logId){
            // 锁定状态下, 检查原logId包含的ids条目至少保留一个
            let expected_selected_ids = __handleMultipleSelect(all_selected_dataIds_dict[params.type], id)
            if(__check_ifWouldLeftNone_of_originallockedLogId(expected_selected_ids)){
                remote.dialog.showMessageBox({
                    type: 'info',
                    title: '增减同批次条目注意',
                    message: `目前是仅剩最后一条原始审核条目(id为${id})，不可剔除！`
                })
            }else{
                all_selected_dataIds_dict[params.type] = expected_selected_ids
            }
        }else{
            // 非锁定状态下
            let log_id = all_submit_logs_dict[params.type][id]
            let id_list = logs_together_dict[log_id][dict.IDS]
            all_selected_dataIds_dict[params.type] = id_list
        }

    }
    let singleDataRelatedIds_Logs_forShow = {}
    let singleData_id
    // 单个数据过往信息显示
    async function handleSingleDataLogdetailsShow(id){
        singleData_id = id
        let logs = all_previousLog_list_dict[params.type][id]
        let related_logs = {}
        // 遍历本数据id的历史logs
        Object.keys(logs).forEach(logId=>{
            let ids = logs[logId][dict.IDS]
            ids.forEach(related_id=>{
                if(!related_logs.hasOwnProperty(related_id)) {
                    related_logs[related_id] = all_previousLog_list_dict[params.type][related_id]
                }
            })
        })
        console.log("handleSingleDataLogdetailsShow unloaded_ids related_logs", related_logs)

        // 1)当前id的每个log中ids去除自身id，2)非当前id的其它id的log转化为字典
        for (let data_id in related_logs){
            let logs = related_logs[data_id]

            if (parseInt(data_id)===id){
                // 3)防止当前id的log数组排序混乱，排一下序
                logs.sort((a,b)=>a.id-b.id)
                logs.forEach(log=>{
                    log[dict.IDS] = removeFromUniqueArray(log[dict.IDS], id)
                    //4) 去除自身id后，以防外一，排下序
                    log[dict.IDS].sort((a,b)=>a-b)
                })
                singleDataRelatedIds_Logs_forShow[data_id] = logs
            }else{
                let logs_dict = logs.reduce((result, log)=>{
                    result[log[dict.ID]] = log
                    return result
                },{})
                singleDataRelatedIds_Logs_forShow[data_id] = logs_dict
            }
        }

        console.log('handleSingleDataLogdetailsShow singleDataRelatedIds_Logs_forShow', singleDataRelatedIds_Logs_forShow)

        singleDataLogdetailsShow = true
    }
    // 关闭
    function handleClosesingleDataLogdetailsShow(){
        singleDataLogdetailsShow = false
    }

    // 先前的页面type
    let pre_params_type
    // 判断参数表中是否有panalId的信息，如果没有为第一次加载，手工添加
    function __addPanalIDIfFirstLoad(){
        if (!all_search_params_dict[params.type][dict.PANALID]){
            all_search_params_dict[params.type][dict.PANALID] = params[dict.PANALID]
        }
    }
    function __updateTotalPageNums(){
        // console.log("__updateTotalPageNums", data_count)
        total_page_nums = Math.ceil(data_count/all_search_params_dict[params.type][dict.PAGE_SIZE])
        // console.log("__updateTotalPageNums", total_page_nums)
    }

    // 存储所有页面，每条数据的状态
    let all_status_of_data_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = {}
        return result
    }, {})))
    function __update_allDataStatusDict_allNowValueOfDataDict_allPreValueOfDataDict(){

        for (let data of page_data) {
            let id = data[dict.ID]

            //1) 本地无此条记录 2) 或者此页需要每次都强制更新每条数据
            if (!all_status_of_data_dict[params.type].hasOwnProperty(id) || sheetDisplayConfigDict[params.type][dict.PREVALUE_NOWVALUE_UPDATE]) {
                // 插入新数据的nowValue
                all_nowValue_of_data_dict[params.type][id] = JSON.parse(JSON.stringify(data))
                // 插入新数据的preValue
                all_preValue_of_data_dict[params.type][id] = JSON.parse(JSON.stringify(data))
                // 插入新数据的状态大表
                all_status_of_data_dict[params.type][id] = data[dict.DONE]?dict.DONE:dict.FREE
            }else{
                // 如果有记录，再判断数据是否外部可能会被人修改了，
                // 最常见为测试，其次为多人操作
                // 整个title表都查一遍，反正查了
                console.log('__update_allDataStatusDict_allNowVal... do not update')
                let unequal_values = __check_unequalValues_ofModifiyFields(id,
                        [...all_wholeTitle_list[params.type], dict.DELETE, dict.DONE], data)

                if(Object.keys(unequal_values).length>0) {
                    remote.dialog.showMessageBox({
                        type: 'info',
                        title: `数据库被人修改(未处理)，数据ID为${id}`,
                        message: '最新数据：'+JSON.stringify(unequal_values)+
                                '，目前数据：'+ JSON.stringify(Object.keys(unequal_values).reduce((result, field)=>{
                                    result[field] = all_preValue_of_data_dict[params.type][id][field]
                                    return result
                                }, {}))
                    })
                }
                // todo 后期要根据done状态修改
            }
        }

    }


    // 根据all_query_params_dict[params.type]， 当前页名，获取当前页所有信息
    async function __getPageData () {
        // console.log('__getPageData begin')
        loadingShow = true

        // 第一次切换到mutant上加载，还没有更新获得panalId和sampleIds参数
        __addPanalIDIfFirstLoad()

        let success = false

        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        // console.log("__getPageData upperQueryName params", name)

        await api[`list${name}`](all_search_params_dict[params.type]).then(response=>{
            page_data = response.data.results
            // 当前页每条id的各个可编辑field的鼠标是否进入，初始化为false
            page_ModifyField_mouseEnter_dict = JSON.parse(JSON.stringify(page_data.reduce((result, item)=>{
                let status_dict = {}
                for (let field in item){
                    status_dict[field] = false
                }
                result[item[dict.ID]] = status_dict
                return result
            }, {})))
            // console.log('__getPageData page_ModifyField_mouseEnter_dict', page_ModifyField_mouseEnter_dict)
            // 当前页各id能否被编辑, 初始化都不能编辑
            page_id_availableEdit_dict =  JSON.parse(JSON.stringify(page_data.reduce((result, item)=>{
                result[item[dict.ID]] = false
                return result
            }, {})))
            // console.log('__getPageData page_id_availableEdit_dict', page_id_availableEdit_dict)
            // 需要结合当前审核工作状态，更新页面可选项
            page_id_availableSelect_dict = JSON.parse(JSON.stringify(page_data.reduce((result, item)=>{
                let id = item[dict.ID]
                // 查看本地是否有状态，如果有就用本地状态判断
                if (all_status_of_data_dict[params.type].hasOwnProperty(id)){
                    result[id] = __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id)
                }else{
                    // 如果本地状态没有，就用数据库状态更新
                    result[id] = __check_availSelect_of_oneData_notInsideAllStatusOfDataDict(item[dict.DONE])
                }
                return result
            }, {})))
            // console.log("__getPageData page_id_availableSelect_dict", page_id_availableSelect_dict)

            // 更新当前页data_num
            data_count = response.data.count

            success = true

        }).catch(error=>{
            console.log("__getPageData", error)
        })

        if(success){
            // console.log('__getPageData success', success)
            // 更新totalPageNums
            __updateTotalPageNums()

            // 更新 all_data_status_dict 中数据状态
            __update_allDataStatusDict_allNowValueOfDataDict_allPreValueOfDataDict()

            //如果当前 审核工作状态, 需要更新之前的过往日志
            if(affirmSelection_dict[all_affirmWorkingStatus_of_sheet_dict[params.type]][dict.PREVIOUS_LOG_UPDATE]){
                console.log('__getPageData 审核工作状态 开始更新日志')
                await __update_Ids_and_relatedIds_PreviousLogs(null, true)
            }
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
    // 若果是表是ifSimpleOrdering，需要将ordering的内容更正为['sample__id']
    //  然后每张表，除开通用的page，page_size, sampleIds，panalId, search筛选项
    //  根据common_filter_subFilters_dict中，特殊筛选大项，构建每个亚级筛选项的所选项目的index
    let all_subFilter_names_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        let uncommon_filters = Object.keys(common_filter_subFilters_dict)
        let specific_found = false
        let specific_filters = []
        for (let filter of item[dict.FILTERS]) {
            if(uncommon_filters.indexOf(filter) > -1){
                specific_found = true
                specific_filters.push(filter)
            }
        }

        if (specific_found) {
            result[sheet] = {}
            // console.log('all_subFilter_indexes_dict', sheet, specific_filters, all_subFilter_names_dict[sheet])
            for (let filter of specific_filters) {
                result[sheet][filter] = common_filter_subFilters_dict[filter]
            }
        }

        // 若果是表是ifSimpleOrdering，需要将ordering的内容更正为['sample__id']
        if (specific_found && result[sheet].hasOwnProperty(dict.ORDERING) &&
                sheetDisplayConfigDict[sheet].ifSimpleOrdering) {
            result[sheet][dict.ORDERING] = [dict.SAMPLEID2UNDERLINE]
        }

        return result
    }, {})))
    // 2) todo 必须先重置all_subFilters_dict, 因为ordering有些是简化的，只含sample__id
    let all_subFilter_indexes_dict = JSON.parse(JSON.stringify(Object.keys(all_subFilter_names_dict).reduce((result, sheet_name)=>{
        let subFilter_names = all_subFilter_names_dict[sheet_name]
        result[sheet_name] = {}
        for (let filter_name in subFilter_names) {
            result[sheet_name][filter_name] = Array(subFilter_names[filter_name].length).fill(0)
        }
        return result
    }, {})))
    // 3) 每页的subFilters的定制版选项列表，再追加三张mutant的exonicfuncRefGene项目列表
    let subFilter_selections_dict = JSON.parse(JSON.stringify(common_subFilter_selections_dict))

    // 获取sheet页的页面筛选参数字典，获取当前页内容时直接调取即可！！
    let all_search_params_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
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
    function __set_all_specfic_Params_in_AllSearchParamsDict() {
        // console.log("<=== __set_all_specfic_Params...")
        // sheet为页面
        for(let sheet in all_subFilter_indexes_dict){
            // console.log("__set_all_specfic_Params... 按页begin", sheet)
            let subFilter_indexes = all_subFilter_indexes_dict[sheet]
            // filter为筛选项的大名， ordering: [0, 0, 0, 0]
            for(let filter in subFilter_indexes) {
                // console.log("__set_all_specfic_Params... 按大过滤begin", filter)
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
                    all_search_params_dict[sheet][filter] = value_list[0]
                }else{
                    all_search_params_dict[sheet][filter] = value_list.join(',')
                }
                // console.log("__set_all_specfic_Params... 按大过滤end", filter)
            }
            // console.log("__set_all_specfic_Params... 按页end", sheet)
        }
        // console.log("__set_all_specfic_Params... ===>")
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

        // 增加筛选页面数量可能会伸缩，页面设置为1比较保险
        all_search_params_dict[params.type][dict.PAGE] = 1
        // 其中包含，页面切换回第一页
        __set_all_specfic_Params_in_AllSearchParamsDict()
        await __getPageData()

        loadingShow = false
    }
    // 用于绑定exonicfuncRefgene标题筛选框, 一个页面只能绑定一次
    let exonicfuncRefgeneSelection
    function change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict(index){
        console.log("change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict", index)
        all_subFilter_indexes_dict[params.type][dict.EXONICFUNCREFGENE][0] = index

        // 因为exonicFuncRefGene筛选项变化，页面先设置为1
        all_search_params_dict[params.type][dict.PAGE] = 1
        // 其中包含，页面切换回第一页
        __set_all_specfic_Params_in_AllSearchParamsDict()
        __getPageData()
    }


    // 当前页面数据的总条数 todo 需要手动更新
    let data_count
    // 当前总页数
    let total_page_nums

    function handleChangePageSize(event){
        // console.log("handleChangePageSize", event.detail.pageSize)
        all_search_params_dict[params.type][dict.PAGE_SIZE] = event.detail.pageSize

        // 当前sheet的totalPageNums更新，data_num固定，但是当前页page_size生了变化！
        __updateTotalPageNums()
        // 当前sheet的nowPageNum设置为1，返回第一页
        all_search_params_dict[params.type][dict.PAGE] = 1
        __getPageData()
    }
    function handleChangePage(event){
        // console.log("handleChangePage", event.detail.page)

        all_search_params_dict[params.type][dict.PAGE] = event.detail.page
        __getPageData()
    }

    // 整个表的sampleId的列表
    let sample_list = []
    // sampleSn对应sampleId
    let sampleSn_dict = {}
    // 选中的样本id列表
    let selected_sampleId_list = []
    // panal能否被操作的状态
    let panal_unable_handle = false

    let sheets_needSamplRecordDict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        // 筛选当中有 ‘logsEdit=’的需要，才说明有编辑的可能性
        if (sheetDisplayConfigDict[item[dict.SHEET]][dict.FILTERS].indexOf(dict.LOGSEDIT) > -1) result.push(item[dict.SHEET])
        return result
    },[])))
    // 统计每页sampleId为key，包含sampleSn，总数，未审核，未提交等的每个sample的总数
    let all_sample_record_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        // // 仅构建有编辑记录的页面的，样本信息记录表, 这样其它页面的样本表无法正常显示
        // if (sheetDisplayConfigDict[sheet][dict.FILTERS].indexOf(dict.LOGSEDIT)>-1){}
        result[sheet] = {}
        return result
    }, {})))
    // 整页的已提交，未提交，未审核等总数的记录
    let all_sheet_record_dict =  JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = {
            subAndAffData: 0,
            unsubAndAffData: 0,
            unsubAndUnaffData: 0,
        }
        return result
    }, {})))

    // 有编辑记录筛选项的sheet页，每条数据提交的params数据汇总
    let all_submit_params_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        if (item[dict.FILTERS].indexOf(dict.LOGSEDIT)> -1){
            result[sheet] = {}
        }
        return result
    }, {})))
    // 同上，每页中key为数据dataId号，value为log的logId号
    let all_submit_logs_dict = JSON.parse(JSON.stringify(all_submit_params_dict))
    // log的实际内容, 不分页key使用的logId, ids为所在dataId列表
    let logs_together_dict = {}

    // 有编辑记录筛选项的每页，提交原因类型的列表的字典
    let all_reasonType_list_dict =  JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        if (item[dict.FILTERS].indexOf(dict.LOGSEDIT)> -1){
            result[sheet] = item[dict.REASON_TYPE]
        }
        return result
    }, {})))
    // 有编辑记录筛选项的每页，提交原因类型的字典的字典
    let all_reasonType_dicts =  JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        if (item[dict.FILTERS].indexOf(dict.LOGSEDIT)> -1){
            result[sheet] = item[dict.REASON_TYPE].reduce((reasonDict_result, reason)=>{
                reasonDict_result[reason[dict.VALUE]] = reason[dict.CONTENT]
                return reasonDict_result
            }, {})
        }
        return result
    }, {})))


    // 绑定上传信息的div
    let uploadMessageDiv
    let autoscroll
    // 上传数据的结果信息列表
    let all_uploadMessage_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = []
        return result
    },{})))


    async function submitAffirmedData(){
        loadingShow = true

        //先上传log
        let success_logs = []
        let fail_logs = []
        for (let log_id in logs_together_dict){
            let success = false
            let log_detail = logs_together_dict[log_id]
            await api.createLog({
                log_id,
                type: log_detail[dict.VALUE],
                desc: log_detail[dict.DESC]
            }).then(response=>{
                success = true
                success_logs.push(log_id)
            }).catch(error=>{
                console.log("submitAffirmedData createLog", error)
                fail_logs.push(log_id)
            })

            let time = getTime()
            all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 日志(${log_id.split('-')[0]}...)${success?'已上传。':'上传失败！'}`]
        }
        console.log("submitAffirmedData success_logs fail_logs", success_logs, fail_logs)

        //开始上传数据
        // key为log_id, value为成功提交的ids列表
        let success_num = 0
        let fail_num = 0
        let success_ids_dict = {}
        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        for (let str_id in all_submit_params_dict[params.type]){
            let id = parseInt(str_id)
            let success = false
            let sampleId = all_preValue_of_data_dict[params.type][id][dict.SAMPLEID]
            let log_id = all_submit_logs_dict[params.type][id]
            await api[`update${name}`](id,
                    {
                        log_id,
                        ...all_submit_params_dict[params.type][id]
                    }
            ).then(response=>{
                success = true
                success_num++
                if(success_ids_dict.hasOwnProperty(log_id)){
                    success_ids_dict[log_id].push(id)
                }else{
                    success_ids_dict[log_id] = [id]
                }
                // 1) 更新相关参数
                __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sampleId, dict.DONE)
                // 2) 更新页面的availableSelect
                __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                // 3) availableEdit修改为false
                __set_oneId_false_availEdit_inPageIdAvailEditDict(id)
            }).catch(error=>{
                fail_num++
                console.log(`submitAffirmedData update${name}`, error)
            })

            let time = getTime()
            all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} ${all_preValue_of_data_dict[params.type][id][dict.SAMPLESN]} ${id} ${success?'已上传。':'上传失败！'}`]
        }
        console.log("submitAffirmedData success_ids fail_ids", success_ids_dict)

        // 1) 找出全部提交成功的logId号
        let complete_logIds = []
        let dirty_ids_dict = {}
        for (let log_id in logs_together_dict) {
            if(success_ids_dict.hasOwnProperty(log_id)){
                let ori_ids = JSON.parse(JSON.stringify(logs_together_dict[log_id][dict.IDS]))
                let success_ids = JSON.parse(JSON.stringify(success_ids_dict[log_id]))
                if (ori_ids.length===success_ids.length){
                    //长度一样完全删除
                    complete_logIds.push(log_id)
                }else{
                    dirty_ids_dict[log_id] = success_ids
                    // 不完全删除，删除详情中成功提交的
                    logs_together_dict[log_id][dict.IDS] = ori_ids.reduce((result, id)=>{
                        if (success_ids.indexOf(id)===-1) result.push(id)
                        return result
                    }, [])
                }
            }

        }
        // 2）完全成功提交的删除log详情
        complete_logIds.forEach(log_id=>{
            delete logs_together_dict[log_id]
        })


        // a. 消息提示整体情况
        let time = getTime()
        all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 数据提交${success_num}条，失败${fail_num}条`]
        // b. seletect_ids清空
        all_selected_dataIds_dict[params.type] = []

        // todo 针对污染数据发出提醒 todo 之后需要改为自动取消提交
        Object.keys(dirty_ids_dict).forEach(log_id=>{
            remote.dialog.showMessageBox({
                type: 'info',
                title: '存在批量审核不完全提交！',
                message: `请记录后撤回污染数据的提交：${JSON.stringify(dirty_ids_dict[log_id])}`
            })
        })

        loadingShow = false
    }


    // 传递给Reason组件的值
    let preValue
    let preDesc
    function handleAddReasonCancel(){
        reasonShow = false
    }
    function handleAddReasonSure(e){
        // todo 需要根据目前审核工作状态进行区分
        reasonShow = false
        // console.log(e.detail.value, e.detail.desc)
        let reason = {
            value: e.detail.value,
            desc: e.detail.desc
        }

        let id = all_now_data_id[params.type]
        let sample_id = all_now_sample_id[params.type]

        // 根据不同审核状态，分别处理
        switch (all_affirmWorkingStatus_of_sheet_dict[params.type]) {
            case dict.SIN_CANCEL_OR_AFFIRM:
                // 涉及原因，肯定有不等项了，先获取不等项的值
                let unequal_values = __check_unequalValues_ofModifiyFields(id)
                console.log("handleAddReasonSure",unequal_values)
                // 判断不等项中有没有delete，如果有需要明确删除为true
                // 否则如果删除是false，可能是删除提交后撤销，当前准备撤销删除或加修改后的提交状态
                let type = unequal_values.hasOwnProperty(dict.DELETE) && unequal_values[dict.DELETE]?dict.DELETED:dict.EDITED

                //1) 修改数据相关记录
                __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_id, type, reason, unequal_values)
                break
            case dict.EDIT_SINAFF_REASON:
                // 仅仅需要更新本条数据的log详情
                let log_id_editSinAffReason = all_submit_logs_dict[params.type][id]
                let log_detail = logs_together_dict[log_id_editSinAffReason]
                log_detail[dict.VALUE] = reason[dict.VALUE]
                log_detail[dict.DESC] = reason[dict.DESC]
                break
            case dict.MUL_AFFIRM:
                let sampleIds_dict = __getSampleIdsDict_by_dataIdsList(all_selected_dataIds_dict[params.type])
                let log_id_mulAffirm = uuidv4()
                logs_together_dict[log_id_mulAffirm] = JSON.parse(JSON.stringify(reason))
                logs_together_dict[log_id_mulAffirm][dict.IDS] = JSON.parse(JSON.stringify(all_selected_dataIds_dict[params.type]))

                for (let id of all_selected_dataIds_dict[params.type]) {
                    let sample_id = sampleIds_dict[id]
                    // 涉及原因，肯定有不等项了，先获取不等项的值
                    let unequal_values = __check_unequalValues_ofModifiyFields(id)

                    // 判断不等项中有没有delete，如果有需要明确删除为true, 才能判定位 删除状态
                    // 否则如果删除是false，可能是删除提交后撤销，当前准备撤销删除或加修改后的提交状态， 编辑状态
                    let type = unequal_values.hasOwnProperty(dict.DELETE) && unequal_values[dict.DELETE]?dict.DELETED:dict.EDITED

                    // 1) 分别修改相关记录，reason不用提交了
                    __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_id, type, null, unequal_values, log_id_mulAffirm)
                    // 2）重置availableSelect
                    __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                }

                // 3) 最后，清空当前页被选中的数据id
                all_selected_dataIds_dict[params.type] = []
                break
            case dict.EDIT_MULAFF_REASON:
                // 仅仅需要更新本条数据的log详情
                let first_id_editMulAffReason =  all_selected_dataIds_dict[params.type][0]
                let log_id_editMulAffReason = all_submit_logs_dict[params.type][first_id_editMulAffReason]
                let log_detail_editMulAffReason = logs_together_dict[log_id_editMulAffReason]
                log_detail_editMulAffReason[dict.VALUE] = reason[dict.VALUE]
                log_detail_editMulAffReason[dict.DESC] = reason[dict.DESC]
                break
            case dict.ADJUST_MULAFF_ITEMS:
                let difference = JSON.parse(JSON.stringify(__checkDifference_between_selectedIds_and_lockedIds()))
                let sample_ids = __getSampleIdsDict_by_dataIdsList([...difference[dict.DELETED_IDS], ...difference[dict.LEFT_IDS], ...difference[dict.ADDED_IDS]])
                let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
                console.log('handleAddReasonSure', difference, sample_ids)
                // 统一修改日志详情的类型和原因
                let locked_log_detail = logs_together_dict[locked_logId]
                locked_log_detail[dict.VALUE] = reason[dict.VALUE]
                locked_log_detail[dict.DESC] = reason[dict.DESC]

                difference[dict.DELETED_IDS].forEach(id=>{
                    __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_ids[id], dict.FREE, null, null, null, true)
                    __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                })
                difference[dict.ADDED_IDS].forEach(id=>{
                    // 同上，判断修改类型
                    let unequal_values = __check_unequalValues_ofModifiyFields(id)
                    let type = unequal_values.hasOwnProperty(dict.DELETE) && unequal_values[dict.DELETE]?dict.DELETED:dict.EDITED
                    // console.log('handleAddReasonSure', unequal_values, type, id)
                    // 1) 分别修改相关记录，reason不用提交了
                    __change_dataStatus_params_logs_sampleRecord_sheetRecord(id, sample_ids[id], type, null, unequal_values, locked_logId, true)
                    __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                })

                break
            default:
                break
        }
    }


    // 目前data的id，sample的id
    let all_now_data_id = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = null
        return result
    }, {})))
    let all_now_sample_id = JSON.parse(JSON.stringify(all_now_data_id))
    let all_pre_data_id = JSON.parse(JSON.stringify(all_now_data_id))
    let all_pre_sample_id =JSON.parse(JSON.stringify(all_now_data_id))
    function __change_dataIds_and_sampleIds(id, sample_id){
        all_pre_data_id[params.type] = all_now_data_id[params.type]
        all_pre_sample_id[params.type] = all_now_sample_id[params.type]
        all_now_data_id[params.type] = id
        all_now_sample_id[params.type] = sample_id
    }
    function handle_lineTR_rightClicked(e, id, sample_id){
        let affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        // 1.必须id状态为free；2.必须affrim工作状态允许编辑 3.按住ctrl键
        if (all_status_of_data_dict[params.type][id]===dict.FREE &&
                affirmSelection_dict[affirm_status][dict.AVAILABLE_EDIT] &&
                e.ctrlKey){
            // 将现在ctrl点击id的设为true,其余遍历设置为false
            for (let data of page_data){
                // todo 小心data_id类型为string，id为number
                // console.log("handle_lindTR_rightClicked", typeof data_id, typeof id)
                let data_id = data[dict.ID]
                page_id_availableEdit_dict[data_id] = id === data_id
            }
        }
        __change_dataIds_and_sampleIds(id, sample_id)
    }

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
        // console.log("__setSampleIdList_and_AllSampleRecordDict__allSpecificFilters", sampleInfoInPanals, sample_list)

        // 顺便初始化已选择的样本id列表，即selected_sampleId_list
        selected_sampleId_list = JSON.parse(JSON.stringify(sample_list.map(sample=>sample[dict.ID])))

        // 顺便
        sampleSn_dict = JSON.parse(JSON.stringify(sampleInfoInPanals.reduce((result, sampleInfoInPanal)=>{
            result[sampleInfoInPanal[dict.SAMPLE][dict.SAMPLESN]] = sampleInfoInPanal[dict.SAMPLE][dict.ID]
            return result
        }, {})))

        // 更新all_sample_record_dict
        for (let sheet in all_sample_record_dict) {
            all_sample_record_dict[sheet] = JSON.parse(JSON.stringify(sampleInfoInPanals.reduce((result, sampleInfoInPanal)=>{
                // 顺便统计更新all_sheet_record_dict, 每页总数详细
                all_sheet_record_dict[sheet][dict.S_ADATA] = all_sheet_record_dict[sheet][dict.S_ADATA] + parseInt(sampleInfoInPanal[`${sheet}SubmitCount`])
                all_sheet_record_dict[sheet][dict.US_UADATA] = all_sheet_record_dict[sheet][dict.US_UADATA] + parseInt(sampleInfoInPanal[`${sheet}Count`]) - parseInt(sampleInfoInPanal[`${sheet}SubmitCount`])

                result[sampleInfoInPanal[dict.SAMPLE][dict.ID]] = {
                    allData: parseInt(sampleInfoInPanal[`${sheet}Count`]),
                    subAndAffData: parseInt(sampleInfoInPanal[`${sheet}SubmitCount`]),
                    unsubAndAffData: 0,
                    unsubAndUnaffData: parseInt(sampleInfoInPanal[`${sheet}Count`]) - parseInt(sampleInfoInPanal[`${sheet}SubmitCount`])
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

            // 就算values没有，也要添加默认项
            let new_selections = []
            if(values){
                let value_list = values.split(';')
                value_list.forEach(value=>new_selections.push({
                    value: value,
                    content: value
                }))
            }

            subFilter_selections_dict[`${sheet.toLowerCase()}_exonicfuncRefgene`] = [{value: null, content: "突变方式(全选)"}, ...new_selections]

        }
        // 顺便更新所有的页面搜索参数初始化
        __set_all_specfic_Params_in_AllSearchParamsDict()
    }


    // 处理sample样品全选、取消全选的切换
    async function handleToggleAllSample(){
        loadingShow = true

        if (selected_sampleId_list.length !== sample_list.length) {
            selected_sampleId_list =  sample_list.map(item => item[dict.ID])

            //更新当前sampleIds查询参数
            all_search_params_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }else{
            selected_sampleId_list = []

            //更新当前sampleIds查询参数, 如果不设置就是&sampleIds=&, 返回的还是全部数据
            all_search_params_dict[params.type][dict.SAMPLEIDS] = 0
        }

        // 切换回第一页
        all_search_params_dict[params.type][dict.PAGE] = 1

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
            all_search_params_dict[params.type][dict.SAMPLEIDS] = 0
        }else{
            all_search_params_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }

        // 切换回第一页
        all_search_params_dict[params.type][dict.PAGE] = 1

        await __getPageData()

        loadingShow = false
    }


    // 获取所有样本的id和sampleSn信息
    async function getSampleList(){
        loadingShow = true

        await api.retrievePanal(params.panalId).then(response=>{
            // console.log("getPanalSummary", response.data)

            panal_unable_handle = response.data.done || response.data.delete ? true:false

            // 初始化sampleId_list, 利用sampleInfoInPanals中样本信息，对手工表All_sample_record_dict初始化
            __setSampleIdList_and_AllSampleRecordDict__allSpecificFilters(response.data)

        }).catch(error=>{
            console.log("getSampleList", error)
        })

        loadingShow = false
    }

    // 更新所有页面查询的panalId, sampleIds参数
    function __updatePanalId_and_sampleIdsParams() {
        for (let sheet_name in all_search_params_dict ){
            all_search_params_dict[sheet_name][dict.PANALID] = parseInt(params[dict.PANALID])
            all_search_params_dict[sheet_name][dict.SAMPLEIDS] = sample_list.map(item=>item[dict.ID]).join(',')
        }
    }

    function __reset_exonicfuncRefgeneSelection_and_preParamsExonicFuncRefgeneIndex(){
        if (exonicfuncRefgeneSelection){
            // 筛选框重置
            exonicfuncRefgeneSelection.value = 0

            // 之前页面的筛选坐标重置
            all_subFilter_indexes_dict[pre_params_type][dict.EXONICFUNCREFGENE][0] = 0
            // 修改param的exonicFuncrefgene的值，偷懒把特殊的筛选项params重置了
            __set_all_specfic_Params_in_AllSearchParamsDict()
        }
    }
    // 动态更新当前页面信息
    $: if (pre_params_type !== params.type) {
        // console.log('listem params.type 先前params.type 现在params.tpe', pre_params_type, params.type)

        //todo 筛选框值修改，不会触发onChange事件, 返回人工修改
        __reset_exonicfuncRefgeneSelection_and_preParamsExonicFuncRefgeneIndex()
        __getPageData()
    }

    // 查看selected_ids和locked_logId包含的ids的差异
    function __checkDifference_between_selectedIds_and_lockedIds(){
        let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
        if(!locked_logId) return

        let locked_ids = logs_together_dict[locked_logId][dict.IDS]
        let selected_ids = all_selected_dataIds_dict[params.type]

        let deleted_ids = []
        let left_ids = []
        let added_ids = []
        for (let locked_id of locked_ids){
            if (selected_ids.indexOf(locked_id)===-1){
                deleted_ids.push(locked_id)
            }else{
                left_ids.push(locked_id)
            }
        }
        for (let selected_id of selected_ids){
            if (locked_ids.indexOf(selected_id)===-1) added_ids.push(selected_id)
        }
        console.log('__checkDifference_between_selectedIds_and_lockedIds', deleted_ids, left_ids, added_ids)
        return {
            ifEqual: deleted_ids.length===0 && added_ids.length===0,
            deleted_ids,
            left_ids,
            added_ids
        }
    }

    function __handleContextMenu(e){
        if (document.querySelector('.downTable').contains(e.target)){
            let lineData_element = getParentNodeByParentClassName(e.target, 'lineData')
            // 使用右键获取当前data的id和sample的id，20.3.19弃用
            let right_id = parseInt(lineData_element.dataset.id)
            // let sampleId = parseInt(lineData_element.dataset.sampleid)
            let id = all_now_data_id[params.type]
            let sample_id = all_now_sample_id[params.type]
            let status = all_status_of_data_dict[params.type][id]

            // 多选和非多选状态，生成的右键菜单应该不同
            let menu = new remote.Menu
            // enabled 必须接受true，false，保证__check...返回true或false
            switch (all_affirmWorkingStatus_of_sheet_dict[params.type]) {
                case dict.SIN_CANCEL_OR_AFFIRM:
                    let sin_affrim_MenuItem = new remote.MenuItem({
                        label: all_status_of_data_dict[params.type][id]===dict.FREE?
                                '单项审核':
                                ([dict.CHECKED, dict.DELETED, dict.EDITED].indexOf(status) !== -1?
                                                '取消审核':
                                                ''
                                ),
                        enabled: id===right_id && __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id),
                        click: ()=>{
                            handleSinAffirm_or_Cancel(id, sample_id)
                        }
                    })
                    menu.append(sin_affrim_MenuItem)
                    break
                case dict.EDIT_SINAFF_REASON:
                    let edit_sinAff_MenuItem = new remote.MenuItem({
                        label: '编辑原因',
                        enabled: id===right_id && __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id),
                        click: ()=>{
                            handleEditSinAffReason(id)
                        }
                    })
                    menu.append(edit_sinAff_MenuItem)
                    break
                case dict.MUL_AFFIRM:
                    let num_mulAffrim = all_selected_dataIds_dict[params.type].length
                    let mul_affirm_affirmMenuItem = new remote.MenuItem({
                        label: `确认审核(共${num_mulAffrim}条)`,
                        enabled: num_mulAffrim>0,
                        click: ()=>{
                            __handleMulAffirm()
                        }
                    })
                    menu.append(mul_affirm_affirmMenuItem)
                    break
                case dict.CANCEL_MULAFF:
                    let num_cancelMulAff = all_selected_dataIds_dict[params.type].length
                    let cancel_mulAff_affirm_MenuItem = new remote.MenuItem({
                        label: `取消审核(共${num_cancelMulAff}条)`,
                        enabled: num_cancelMulAff>0,
                        click: ()=>{
                            sureEvent = dict.MULTIPLE_AFFIRM
                            sureOperation = dict.CANCEL
                            changeSendSureMessage()
                            sureShow = true
                        }
                    })
                    menu.append(cancel_mulAff_affirm_MenuItem)
                    break
                case dict.EDIT_MULAFF_REASON:
                    let num_EditMulAffReason = all_selected_dataIds_dict[params.type].length
                    let edit_mulAff_reason_MenuItem = new remote.MenuItem({
                        label: `编辑原因(共${num_EditMulAffReason}条共享)`,
                        enabled: num_EditMulAffReason>0,
                        click: ()=>{
                            let first_id = all_selected_dataIds_dict[params.type][0]
                            handleEditSinAffReason(first_id)
                        }
                    })
                    menu.append(edit_mulAff_reason_MenuItem)
                    break
                case dict.ADJUST_MULAFF_ITEMS:
                    //每次打开都会更新一次locked_logId
                    let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
                    let lock_adjustItems_MenuItem = new remote.MenuItem({
                        label: locked_logId?'取消锁定':'锁定批次',
                        enabled: locked_logId?true:(all_selected_dataIds_dict[params.type].length>0),
                        click: ()=>{
                            if(locked_logId){
                                console.log('__handleContextMenu have locked_logId 取消锁定', locked_logId, logs_together_dict)
                                // 恢复selected_ids为logId所包含的ids
                                all_selected_dataIds_dict[params.type] = logs_together_dict[locked_logId][dict.IDS]
                                // 当前锁定的logId设为空
                                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                                // 更新一遍页面可选
                                __update_allIds_availSelect_inPageIdAvailSelectDict()
                            }else{
                                console.log('__handleContextMenu does not have locked_logId 开始锁定', locked_logId, logs_together_dict)
                                // 设置当前locked_logid为选择的dataIds的共享logId
                                let first_id =  all_selected_dataIds_dict[params.type][0]
                                all_locked_logId_for_adjustMultipleAffirmItems[params.type] = all_submit_logs_dict[params.type][first_id]
                                // 更新一遍页面可选
                                __update_allIds_availSelect_inPageIdAvailSelectDict()
                            }
                        }
                    })
                    menu.append(lock_adjustItems_MenuItem)

                    let ifEqual = locked_logId?__checkDifference_between_selectedIds_and_lockedIds()[dict.IFEQUAL]:true
                    // todo enabled需要查看selected_ids与原来locked_ids是否有差异！
                    let adjust_mulAff_items_menuItem =new remote.MenuItem({
                        label: "增减条目",
                        enabled: locked_logId && !ifEqual?true:false,
                        click: ()=>{
                            sureEvent = dict.MULTIPLE_AFFIRM
                            sureOperation  = dict.ADJUST_ITEMS
                            changeSendSureMessage()
                            reasonShow = true
                        }
                    })
                    menu.append(adjust_mulAff_items_menuItem)
                    break
                default:
                    break
            }


            // 仅需要编辑的页面才会有审核按钮
            if(sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) > -1){
                menu.popup({window: remote.getCurrentWindow()})
            }

        }
    }


    onMount(async () => {
        pre_params_type = params.type

        // 获取样本列表
        await getSampleList()
        // 更新所有页面查询的panalId, sampleIds参数
        __updatePanalId_and_sampleIdsParams()

        document.addEventListener('contextmenu', __handleContextMenu)

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


    // 测试使用
    function test() {
        // console.log(whole_panal_infoList_dict)
        // console.log(sample_list, sampleSn_dict)
        // console.log(now_page_data)
        // console.log(all_titleConfigList_dict)
        // console.log(all_sample_record_dict)
        // console.log(all_sheet_record_dict)
        // let ordering =  new OrderingFilter()
        // ordering.toggleNowId(dict.SAMPLEID2UNDERLINE)
        // console.log(exonic.getValue())
        // exonic.toggleNowId()
        // console.log(exonic.getValue())
        // console.log(all_searchParams_dict, all_subFilter_indexes_dict, all_subFilter_names_dict, subFilter_selections_dict, all_sample_record_dict)
        // console.log(exonicfuncRefgeneSelection)
        // console.log(all_editedData_dict)
        // console.log(all_pre_data_id, all_pre_sample_id, all_now_data_id, all_now_sample_id)
        console.log(all_modifyTitle_list_dict)
        // console.log(all_titleList_dict)
        // console.log(pageModifyField_mouseEnter_dict)
        // console.log(uuidv4())
        // console.log(all_selected_dataIds_dict)
        // console.log(all_preValue_of_data_dict, all_nowValue_of_data_dict)
        // console.log(all_now_data_id[params.type], all_now_sample_id[params.type])
        // console.log(all_preValue_of_data_dict)
        // console.log(all_selected_dataIds_dict[params.type])
        console.log(all_submit_params_dict)
        console.log(all_submit_logs_dict, logs_together_dict)
        // console.log(all_affirm_status_dict)
        // console.log(page_availableSelect_dict)
        // console.log(all_selected_dataIds_dict)
        // console.log(all_nowValue_of_data_dict[params.type], all_preValue_of_data_dict[params.type])
        // console.log(page_id_availableEdit_dict)
        // console.log(all_locked_logId_for_adjustMultipleAffirmItems, all_selected_dataIds_dict)
        console.log(all_previousLog_list_dict)
        console.log(all_latestPreviousLog_dict)
    }

</script>



<style>

    /*TODO 高度需要和LeftMenus中高度一致 */
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
        color: black;
        font-weight: bold;
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
    .navLeft .leftAffirmSelectWrapper{
        position: relative;
        flex: 0 0 32px;
        width: 302px;
        border-bottom: 1px solid black;
    }
    .navLeft .leftAffirmSelectWrapper .commonButton{
        float: left;
        width: 149px;
        height: 30px;
        line-height: 30px;
        margin: 1px;
        padding: 0;
        font-size: 16px;
        font-width: bold;
        background: white;
    }
    .navLeft .leftAffirmSelectWrapper .commonButton.select{
        background: mediumorchid;
        color: white;
    }
    .navLeft .leftAffirmSelectWrapper .AffrimeWrapper {
        position: absolute;
        width: 149px;
        min-height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        border: 1px solid #939393;
        background: white;
    }
    .navLeft .leftAffirmSelectWrapper .AffrimeWrapper .selectItemTR{
        border-bottom: 1px solid #cccccc;
    }
    .navLeft .leftAffirmSelectWrapper .singleAffirmWrapper{
        top: 32px;
        left: 1px;
    }
    .navLeft .leftAffirmSelectWrapper .multipleAffirmWrapper{
        top: 32px;
        right: 1px;
    }
    .navLeft .leftAffirmSelectWrapper .content{
        font-size: 14px;
        width: 130px;
        text-align: left;
    }
    .navLeft .leftAffirmSelectWrapper .content .selectContentDiv{
        box-sizing: border-box;
        width: 130px;
        height: 100%;
        padding: 0 3px;
    }
    .navLeft .leftAffirmSelectWrapper .tick{
        width: 20px;
    }
    .navLeft .leftAffirmSelectWrapper .tick .selectItemButton{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        border: none;
        background: white;
    }
    .navLeft .leftMessage{
        flex: 0 0 30px;
        width: 308px;
        line-height: 20px;
        box-sizing: border-box;
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
        width: 304px;
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
    .navLeft .leftMessageWrapper .messageWrapper .uploadMessageWrapper{
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
        width: 58px;
        float: left;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper button{
        margin: 2px 3px 0 2px;
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
        flex: 0 0 750px;
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
    .contentRight .rightDataTable .trueDelete .contentTD{
        text-decoration: line-through;
    }
    .contentRight .rightDataTable .lineData.current{
        border: 2px solid black;
    }
    .contentRight .rightDataTable .lineData.done{
        background: #777777;
        color: white;
    }
    .contentRight .rightDataTable .lineData.checked{
        background: #82f9fc;
    }
    .contentRight .rightDataTable .lineData.edited{
        background: #f791fc;
    }
    .contentRight .rightDataTable .lineData.deleted {
        background: #fc8064;
    }
    .contentRight .rightDataTable>tr>th, .contentRight .rightDataTable>tr>td{
        height: 35px;
        margin: 0;
        padding: 0;
        /*padding-top: 0;*/
        /*padding-bottom: 0;*/
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        min-width: 120px;
    }

    .contentRight .rightDataTable .lineData .icon-cross.undeleted{
        color: #cccccc;
    }
    .contentRight .rightDataTable .lineData .icon-cross.unequal{
        background: #eaffad;
    }
    .contentRight .rightDataTable .lineData .icon-cross.availableEdit{
        background: #eaffad;
    }
    /*每行按钮鼠标*/
    .contentRight .rightDataTable .lineData td>button{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        width: 33px;
        height: 33px;
        border: none;
        background: none;
        border-radius: 0;
    }
    .contentRight .rightDataTable .lineData td.short:hover{
        background: #09c762;
    }
    .contentRight .rightDataTable .lineData td.short.noHover:hover{
        background: none;
    }
    .contentRight .rightDataTable .lineData .icon-warning{
         font-size: 14px;
         color: indianred;
     }
    /*和每行删除单元格相关*/
    .contentRight .rightDataTable .lineData .delete{
        position: relative;
    }
    .contentRight .rightDataTable .lineData .delete .icon-warning{
        position: absolute;
        top: -1px;
        right: -1px;
    }


    /*和单元格恢复相关*/
    .contentRight .rightDataTable .lineData .containInput{
        position: relative;
    }
    .contentRight .rightDataTable .lineData .containInput .dataInput{
        position: absolute;
        left: 2px;
        top: 5px;
        width: 115px;
        border: none;
        font-weight: bold;
        background: #eaffad;
    }
    .contentRight .rightDataTable .lineData .containInput.unequal .dataInput{
        width: 98px;
    }
    .contentRight .rightDataTable .lineData .containInput.unequal .upBesideInput{
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 14px;
    }
    .contentRight .rightDataTable .lineData .containInput.unequal .downBesideInput.show{
        position: absolute;
        right: 2px;
        bottom: 2px;
        font-size: 14px;
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
    /*控制短的单元格的长度*/
    .contentRight .rightDataTable .short{
        min-width: 35px!important;
        max-width: 35px;
    }

    .contentRight .dataPagerWrapper{
        flex: 1;
    }
</style>
