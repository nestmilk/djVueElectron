<div class="middle"
     on:mouseup={handleMiddleMouseUp}
     on:mousemove={handleMiddleMouseMove}
>
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <div class="subMenuDirection icon-circle-left {submenu_page===0?'inactive':''}"
                 on:click={()=>handleChangeSubmenuPage(-1)}></div>
            <div class="subMenuWrapper" bind:this={subMenuWrapper}>
                {#each submenu_group_list[submenu_page] as submenu}
                    <div class="{submenu_page!==submenu_total_page-1?'bnWrapper':''}">
                        <button class="submenuBtn {params.type===submenu?'selectedSubMenu':''}"
                                on:click={()=>handleSelectSubmenu(submenu)}
                                data-sheet='{submenu}'
                        >
                            {submenu_translate_dict[submenu]}
                        </button>
                    </div>
                {/each}
            </div>
            <div class="subMenuDirection icon-circle-right {submenu_page===submenu_total_page-1?'inactive':''}"
                 on:click={()=>handleChangeSubmenuPage(1)}>
            </div>
        </div>
        <div class="middleContent">
            {#if params.type !== dict.SAMPLEINFOINPANAL}
                <div class="navLeft">
                    <div class="divider"
                         on:mousedown={handleDividerMouseDown}
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
                                    <button class="selectALL" on:click={(e)=>handleToggleAllSample(e)}>
                                        {selected_sampleId_list.length === sample_list.length? '取消':'全选'}
                                    </button>
                                </th>
                            </tr>
                        </table>
                        <div class="tableContent">
                            <table class="sampleTable ">
                                {#each sample_list as sample}
                                    <tr on:click={()=>handleSelectSample(sample[dict.ID])}>
                                        <td class="sampleSn"
                                            title="{sample[dict.ID]}"
                                        >{sample[dict.SAMPLESN]}</td>
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
                                    <button on:click={test}>test</button>
                                </div>
                            </div><!--uploadMessageWrapper-->
                        </div>
                    </div>

                    <div class="leftSelectFileWrapper">
                        <div class="selectFile">
                            <input class="fileInput" id="fileWidget" type="file"
                                   multiple="true" accept=".bam,.bai"
                                   on:change={()=>loadFiles()}
                            />
                            共{sampleSn_inTrackConfigDict_list.length}对Bam/Bai文件
                            <button class="clear" on:click={()=>clearTracks()}>取消</button>
                        </div>
                        <div class="fileList">
                            {#each sampleSn_inTrackConfigDict_list as sampleSn}
                                <div class="sampleSn">{sampleSn}</div>
                            {/each}
                        </div>
                    </div>

                    <div class="leftButtomWrapper">
                    </div>
                </div>
            {/if}

            <div class="contentRight">
                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                    <div class="filterWrapper">
                        <div class="doneWrapper">
                            <span>提交状态:</span>
                            <!--testValue也能触发$: if (pre_params_type !== params.type) 可能是params.type! 暂时先偷个巧-->
                            <!-- bug 但是，如果首页是例如target等包含此类选择的页面，第一次登入无法控制$: if 需要切到其它页面再转入才行！！-->
                            <select bind:this={doneFilter}
                                    value={all_subFilter_indexes_dict[params.type][dict.DONE][0]}
                                    on:change={(e)=>handleChangeFilter(e, dict.DONE)}
                            >
                                {#each subFilter_selections_dict[dict.DONE] as selection, index}
                                    <option value={index}>
                                        {selection[dict.CONTENT]}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="deleteWrapper">
                            <span>删除状态:</span>
                            <select bind:this={deleteFilter}
                                    value={all_subFilter_indexes_dict[params.type][dict.DELETE][0]}
                                    on:change={(e)=>handleChangeFilter(e, dict.DELETE)}
                            >
                                {#each subFilter_selections_dict[dict.DELETE] as selection, index}
                                    <option value={index}>
                                        {selection[dict.CONTENT]}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="logsEditWrapper">
                            <span>修改历史:</span>
                            <select bind:this={logsEditFilter}
                                    value={all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]}
                                    on:change={(e)=>handleChangeFilter(e, dict.LOGSEDIT)}
                            >
                                {#each subFilter_selections_dict[dict.LOGSEDIT] as selection, index}
                                    <option value={index}>
                                        {selection[dict.CONTENT]}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="idsWrapper">
                            <span>数据ID:</span>
                            <input bind:value="{query_ids}"
                                   bind:this={idsInput}
                                   placeholder="请填写数据Id，多个id间空格分隔"
                                   on:click={handleOpenIDsGroupSelect}
                                   on:input={handleCloseIDsGroupSelect}
                                   on:keydown={handleIdsQueryKeydown}
                            />

                            {#if idsGroupSelectShow}
                                <div class="groupSelect" on:mouseleave={handleCloseIDsGroupSelect}>
                                    {#each idsGroupSelections as select}
                                        <div class="item" on:click={()=>handleIdsGroupSelect(select[dict.VALUE])}>{select[dict.TRANSLATE]}</div>
                                    {/each}
                                </div>
                            {/if}

                            <button class="icon-undo2"
                                    title="清空所有过滤条件"
                                    on:click={handleClearQueryIDS}
                            ></button>
                        </div>

                    </div>
                    <div class="editBigInputWrapper">
                        <span class="abstract">
                            {#if !now_input_id && !now_input_field}
                                无编辑单元
                            {:else if now_params_type!==params.type}
                                数据在"{submenu_translate_dict[now_params_type]}"表
                            {:else if page_data.every(data=>data.id!==now_input_id)}
                                数据"{now_input_id}"，不在此页
                            {:else}
                                数据"{now_input_id}"，标题"{all_titleListItem_dict[now_params_type][now_input_field][dict.TRANSLATE]}"：
                            {/if}
                        </span><!--abstract-->
                        <input class="bigInput"
                               value={now_input_field && now_input_id && all_nowValue_of_data_dict[now_params_type][now_input_id]?
                                            all_nowValue_of_data_dict[now_params_type][now_input_id][now_input_field]:''}
                               disabled="{now_input_field && now_input_id &&
                                            !panal_unable_handle &&
                                            now_params_type === params.type &&
                                            page_data.some(data=>data.id===now_input_id) &&
                                            page_id_availableEdit_dict[now_input_id]?'':'disabled'}"

                               on:change={handleValueChangeInBigInput}
                        />
                    </div><!--editBigInputWrapper-->
                {/if}

                <div class="dataWrapper">
                    <div class="selectFieldsWrapper"
                         bind:this={selectFields}
                         on:mouseleave={closeSelectFieldDiv}
                    >
                        <div class="firstDefaultTitle selectFieldItem"  on:click={toggleDefaultFiledsOpen}>
                            <span>恢复默认标题栏</span>
                            <span class="checkBox icon-undo2
                                    {!all_titleDefaultShow_dict[params.type]?'active':''}"
                            ></span>
                        </div>
                        {#if  all_selectTitle_list_dict[params.type].length > 0}
                            <div class="contentWrapper">
                                {#each [...all_defaultTitle_list_dict[params.type],
                                    ...all_selectTitle_list_dict[params.type]] as field }
                                    <div class="selectFieldItem"
                                         on:click={()=>toggle_selectField_nowDisplay(field)}
                                    >
                                        <span>{params.type===dict.SAMPLEINFOINPANAL?
                                                    `${all_titleListItem_dict[params.type][field][dict.TRANSLATE]}`:
                                                    `${field}(${all_titleListItem_dict[params.type][field][dict.TRANSLATE]})`}
                                        </span>
                                        <span class="checkBox {all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]?'icon-checkbox-checked':'icon-checkbox-unchecked'}"></span>
                                    </div>
                                {/each}
                            </div>
                        {/if}

                    </div>


                    <div class="titleTableWrapper" bind:this={topScroll}
                         on:scroll={handleTopScroll} >
                        <table class="upTable rightDataTable">
                            <tr class="lineTitle">
                                <!--显示行号-->
                                {#if openLineNum}
                                    <th class="affirmed short">
                                        行号
                                    </th>
                                {/if}
                                <!--针对概览页，选择 已经全部提交的样本条目-->
                                {#if params.type===dict.SAMPLEINFOINPANAL}
                                    <th class="affirmed short hoverGreen"
                                        on:click={handleToggleAllSample_inSampeInfoInPanal}
                                    >
                                        {all_selected_dataIds_dict[params.type].length===sample_list.length?'取消':'全选'}
                                    </th>
                                {/if}

                                {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) !== -1}
                                    <!-- 针对单项确认审核或取消审核 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.SIN_CANCEL_OR_AFFIRM}
                                        <th class="affirmed short">单审单消</th>
                                    {/if}
                                    <!-- 针对编辑单项修改原因 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.EDIT_SINAFF_REASON}
                                        <th class="affirmed short">编辑原因</th>
                                    {/if}
                                    <!-- 针对查看提交的过往日志 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CHECK_SINSUB_LOGS}
                                        <th class="logs short hoverGreen"
                                            on:click={()=>handleToggleFilter(dict.LOGSEDIT)}
                                        >
                                            {subFilter_selections_dict[dict.LOGSEDIT][all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]][dict.CONTENT]}
                                        </th>
                                    {/if}
                                    <!-- 针对取消单项审核的提交 -->
                                    {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_SUBMIT_DONE}
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


                                {#each all_wholeTitle_list_dict[params.type] as field}
                                    {#if all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]}
                                        {#if field===dict.SAMPLESN}
                                            {#if sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.ORDERING) > -1}
                                                <th class="sampleSn hoverGreen" on:click={()=>handleToggleFilter(dict.SAMPLEID2UNDERLINE)}>
                                                    {@html subFilter_selections_dict[dict.SAMPLEID2UNDERLINE][all_subFilter_indexes_dict[params.type][dict.ORDERING][0]][dict.CONTENT]}
                                                </th>
                                            {:else}
                                                <th class="{field}">{all_titleListItem_dict[params.type][field][dict.TRANSLATE]}</th>
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
                                                <th class="{field}">{all_titleListItem_dict[params.type][field][dict.TRANSLATE]}</th>
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
                                                <th class="{field}">{all_titleListItem_dict[params.type][field][dict.TRANSLATE]}</th>
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
                                                <th class="{field}">{all_titleListItem_dict[params.type][field][dict.TRANSLATE]}</th>
                                            {/if}
                                        {:else if field===dict.EXONICFUNCREFGENE &&
                                        sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.EXONICFUNCREFGENE) > -1
                                        }
                                        <!--                                                    on:change="{(e) => change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict(e.target.value)}"-->
                                            <th class="exonicfuncRefgene" >
                                                <!--bind:value会触发页面刷新，即可触发$: if (pre_params_type !== params.type) -->
                                                <select value={all_subFilter_indexes_dict[params.type][dict.EXONICFUNCREFGENE][0]}
                                                        on:change={(e)=>handleChangeFilter(e, `${params.type.toLowerCase()}_exonicfuncRefgene`)}
                                                        class="inside"
                                                >
                                                    <!--初次加载还没有特异性的exonicfuncRefgene-->
                                                    {#each subFilter_selections_dict[`${params.type.toLowerCase()}_exonicfuncRefgene`] ||
                                                    subFilter_selections_dict['initial_exonicfuncRefgene']
                                                    as selection, index
                                                    }
                                                        <option value={index}>
                                                            {selection[dict.CONTENT]}
                                                        </option>
                                                    {/each}
                                                </select>
                                            </th>
                                        {:else}
                                            <th class="{field}">{all_titleListItem_dict[params.type][field][dict.TRANSLATE]}</th>
                                        {/if}
                                    {/if}
                                {/each}
                            </tr>
                        </table><!--rightDataTable-->
                    </div><!--titleTableWrapper-->
                    <div class="dataTableWrapper"
                         bind:this={bottomScroll}
                         on:scroll={handleBottomScroll}
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
                                    <!--显示行号-->
                                    {#if openLineNum}
                                        <td class="affirmed short">
                                            {index+1}
                                        </td>
                                    {/if}
                                    <!--针对概览页，选择 已经全部提交的样本条目-->
                                    {#if params.type===dict.SAMPLEINFOINPANAL}
                                        <td class="affirmed short">
                                            {#if page_id_availableSelect_dict[line_data.id]}
                                                <button class="{all_selected_dataIds_dict[params.type].indexOf(line_data[dict.SAMPLEID])===-1?'icon-checkbox-unchecked':'icon-checkbox-checked'}"
                                                    on:click={()=>handleSelectSampleId(line_data[dict.SAMPLEID])}
                                                >
                                                </button>
                                            {/if}
                                        </td>
                                    {/if}

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
                                        <!-- 针对查看提交的过往日志 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CHECK_SINSUB_LOGS}
                                            <td class="logs short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="icon-book"
                                                            on:click={()=>handleCheckSingleSubmitLogs(line_data.id)}
                                                    ></button>
                                                {/if}
                                            </td>
                                        {/if}
                                        <!-- 针对取消单项审核的提交 -->
                                        {#if all_affirmWorkingStatus_of_sheet_dict[params.type] === dict.CANCEL_SUBMIT_DONE}
                                            <td class="done short">
                                                {#if page_id_availableSelect_dict[line_data.id]}
                                                    <button class="{all_status_of_data_dict[params.type][line_data.id]===dict.DONE?'icon-lock':''}"
                                                            disabled="{panal_unable_handle?'disabled':''}"
                                                            on:click={()=>handleCancelSubmitDone(line_data.id)}
                                                    ></button>
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
                                                                'icon-checkbox-unchecked':'icon-checkbox-checked'}"
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

                                    {#each all_wholeTitle_list_dict[params.type] as field}
                                        {#if all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]}
                                            <!--区分处理一些特殊的field-->
                                            {#if all_titleListItem_dict[params.type][field][dict.CONNECT_IMMUNE]}
                                                {#if all_preValue_of_data_dict[params.type][line_data.id]}
                                                    <td class="">
                                                        {#each genes_connectImmune_dict[field] as instance }
                                                            <div>{instance[dict.ID]}</div>
                                                        {/each}
                                                    </td>
                                            {:else}
                                                <!--
                                                    1.首先该filed的config设定为可编辑modify
                                                    2. 该filed在当前页，人为操作设为availableEdit，以便操作
                                                    3. 或者被修改了，强制显示为input状态，呈现差异
                                                -->
                                                {#if all_titleListItem_dict[params.type][field][dict.MODIFY] &&
                                                    (page_id_availableEdit_dict[line_data.id] ||
                                                        (all_nowValue_of_data_dict[params.type][line_data.id] && all_nowValue_of_data_dict[params.type][line_data.id][field]!==all_preValue_of_data_dict[params.type][line_data.id][field]))
                                                }
                                                    <td class="{field} containInput
                                                        {all_nowValue_of_data_dict[params.type][line_data.id]?
                                                            (all_nowValue_of_data_dict[params.type][line_data.id][field]!==all_preValue_of_data_dict[params.type][line_data.id][field]?'unequal':''):''}
                                                      "
                                                        title="{field==='sampleSn'?`样本ID：${line_data[dict.SAMPLEID]}, 数据ID：${line_data[dict.ID]}`:`实时数据：${line_data[field]}`}"
                                                        on:mouseenter={()=>handleMutantTDMouseenter(field, line_data.id)}
                                                        on:mouseleave={()=>handleMutantTDMouseleave(field, line_data.id)}
                                                    >
                                                        <input class="dataInput" type={all_titleListItem_dict[params.type][field][dict.TYPE]}
                                                               value="{all_nowValue_of_data_dict[params.type][line_data.id]?all_nowValue_of_data_dict[params.type][line_data.id][field]:''}"
                                                               disabled="{all_status_of_data_dict[params.type][line_data.id]===dict.FREE &&
                                                                    page_id_availableEdit_dict[line_data.id]?'':'disabled'}"
                                                               on:change={(e)=>changeValue_In_AllNowvalueOfDataDict(e, line_data.id, field)}
                                                               on:focus={(e)=>focusNowField(e, line_data.id, field)}
                                                        >
                                                        <div class="upBesideInput icon-warning"></div>
                                                        <!--__getPageData 此时获取到新的page_data 开始更新界面
                                                            但是page_id_modifyField_mouseEnter_dicts还是旧的那页的，会找不到数据id-->
                                                        <div class="downBesideInput icon-undo2
                                                                {page_id_modifyField_mouseEnter_dicts[line_data.id] &&
                                                                    page_id_modifyField_mouseEnter_dicts[line_data.id][field] &&
                                                                    page_id_availableEdit_dict[line_data.id]?'show':''
                                                                }
                                                            "
                                                             on:click={()=>recover_nowValue_byIDs_fields([line_data.id],[field])}
                                                        ></div>
                                                    </td>
                                                {:else}
                                                    <td class="{field} contentTD
                                                            {params.type===dict.SAMPLEINFOINPANAL && field.includes('SubmitCount') &&
                                                                all_nowValue_of_data_dict[params.type][line_data.id] &&
                                                                all_nowValue_of_data_dict[params.type][line_data.id][field]!==all_nowValue_of_data_dict[params.type][line_data.id][field.replace('Submit', '')]?'unequal':''}
                                                            "
                                                        title="{field==='sampleSn'?`样本ID：${line_data[dict.SAMPLEID]}, 数据ID：${line_data[dict.ID]}`:`实时数据：${line_data[field]}`}"
                                                    >
                                                        <div class="inside {params.type===dict.TNB && field===dict.tmb &&
                                                                    all_nowValue_of_data_dict[params.type][line_data.id] &&
                                                                    all_nowValue_of_data_dict[dict.TMB][all_nowValue_of_data_dict[params.type][line_data.id][field]] &&
                                                                    all_nowValue_of_data_dict[dict.TMB][all_nowValue_of_data_dict[params.type][line_data.id][field]][dict.DELETE]?'tmbDelete':''}
                                                                {field===dict.SAMPLESN?dict.SAMPLESN:''}
                                                                "
                                                        >
                                                            {#if (params.type===dict.SAMPLEINFOINPANAL && field===dict.SAMPLESN) ||
                                                            (field===dict.SAMPLESN && openSampleInfo)}
                                                                <div class="iconWrapper">
                                                                    <div class="icon
                                                                            {all_nowValue_of_data_dict[params.type][line_data.id]?
                                                                                (sampleTypeConfigDict.hasOwnProperty(sample_dict[all_nowValue_of_data_dict[params.type][line_data.id][field]][dict.TYPE])?
                                                                                    sampleTypeConfigDict[sample_dict[all_nowValue_of_data_dict[params.type][line_data.id][field]][dict.TYPE]][dict.ICON]:''):''}
                                                                            "
                                                                    ></div>
                                                                </div>
                                                            {/if}

                                                            {all_nowValue_of_data_dict[params.type][line_data.id]?
                                                            all_nowValue_of_data_dict[params.type][line_data.id][field]:''}
                                                        </div>
                                                    </td>
                                                {/if}<!--普通标题栏，区分编辑input还是普通div显示-->
                                            {/if}<!--处理特殊标题栏-->
                                        {/if}<!--处理当前标题栏是否显示-->

                                    {/each}
                                </tr>
                            {/each}
                        </table><!--rightDataTable-->
                    </div><!--dataTableWrapper-->
                    <div class="dataPagerWrapper">
                        <Page page={all_search_params_dict[params.type][dict.PAGE]}
                              totalPage={total_page_nums}
                              currentPageSize={all_search_params_dict[params.type][dict.PAGE_SIZE]}
                              paramsType={params.type}
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
{#if addDataShow}
    <AddData
        sheet_data="{added_data_dict[dict.SHEET_INFO_LIST]}"
        on:submit={handleAddDataSubmit}
        on:cancel={handleAddDataCancel}
    ></AddData>
{/if}

{#if logDetailsShow}
    <LogDetails
        idLogIds="{id_logId_lists_forShow}"
        logs="{previousLogs_dicts}"
        fieldList="{all_modifyTitle_list_dict[params.type]}"
        titleDict="{all_titleListItem_dict[params.type]}"
        statusDict="{all_status_of_data_dict[params.type]}"
        cancelSubmit="{cancelSubmit}"
        on:close={handleCloseLogdetailsShow}
        on:cancel={__handleCancelDispatch_fromLogDetailsPage}
    >
    </LogDetails>
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
    import LogDetails from '../../components/LogDetails/Logdetails.svelte'
    import AddData from '../../components/AddData/AddData.svelte'


    // 引入本地脚本
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {
        removeFromUniqueArray,
        ifContentEqualArrays,
        arrayToDict,
        findIndexByFieldValue
    } from '../../utils/arrays'
    import {getTime, getParentNodeByParentClassName} from "../../utils/common";
    import {
        sheetDisplayConfigList,
        common_filter_subFilters_dict,
        common_subFilter_selections_dict,
        affirmSelectionConfig,
        idsGroupSelections,
        upSheet_name_dict,
        sampleTypeConfig
    } from '../../configs/config'
    import {dict_translate} from '../../utils/dict'

    const sheetDisplayConfigDict = arrayToDict(sheetDisplayConfigList, 'sheet')
    const sampleTypeConfigDict = arrayToDict(sampleTypeConfig, 'value')

    // 引入electron相关包
    const { ipcRenderer, remote } =window.require('electron')
    // const {exec, execSync} = window.require('child_process')
    // const iconv = window.require('iconv-lite');
    const Store = window.require('electron-store')
    const isDev = window.require('electron-is-dev')
    const fs = window.require('fs').promises
    const settingsStore = new Store({name: 'Settings'})

    let dict = {
        SAMPLEINFOINPANAL: "sampleInfoInPanal",
        SHEET: 'sheet', SUBMENU_TRANSLATE: "submenu_translate", FILTERS: "filters",
        PARAM: 'param', SEARCH: 'search', DATA: 'data', COPY: 'copy',
        ID: 'id', SAMPLE: 'sample', SAMPLESN: 'sampleSn',  TITLE_LIST: 'title_list',
        PAGE: 'page', PAGE_SIZE: 'page_size', SAMPLEID: 'sampleId', SAMPLEIDS: 'sampleIds', PANALID: 'panalId',
        TITLE: 'title', TRANSLATE: 'translate',
        TYPE: 'type', CONTENT: 'content', VALUE: 'value', STATUS: 'status',
        TOPSCROLL: 'topScroll', BOTTOMSCROLL: 'bottomScroll',
        ALLDATA: 'allData', S_ADATA: "subAndAffData", US_ADATA: 'unsubAndAffData', US_UADATA: 'unsubAndUnaffData',
        DONE: 'done', LOGSEDIT: 'logsEdit', ORDERING: 'ordering', EXONICFUNCREFGENE: 'exonicfuncRefgene',
        SAMPLEID2UNDERLINE: 'sample__id', CHR: 'chr', POSSTART: 'posStart', POSEND: 'posEnd', REF: 'ref', ALT: 'alt',
        TARGET: "target", HEREDITARY: "hereditary", TMB: "TMB", tmb: "tmb", TNB: 'TNB',
        MODIFY: 'modify', IFEQUAL: 'ifEqual',
        DELETE: "delete", FREQ: 'freq',
        NOWDISPLAY: 'nowDisplay', DEFAULTDISPLAY: 'defaultDisplay', SELECTDISPLAY: 'selectDisplay',
        FIELD_MOUSE_ENTER: 'field_mouse_enter',
        FREE: 'free', CHECKED: 'checked', DELETED: 'deleted', EDITED: 'edited',
        AVAILABLE_EDIT: 'availableEdit', REASON_TYPE: 'reason_type', REASON_DESC: 'reason_desc', LOG_ID: 'log_id',
        DEFAULT: 'default', IDS: 'ids', NOTHING: 'nothing',
        SINGLE: 'single', MULTIPLE: 'multiple',
        SIN_CANCEL_OR_AFFIRM: "single_cancel_or_affirm", CHECK_SINSUB_LOGS: "check_single_submit_logs",
        CANCEL_SUBMIT_DONE: "cancel_submit_done", EDIT_SINAFF_REASON: "edit_single_affirm_reason",
        MUL_AFFIRM: "multiple_affirm", CANCEL_MULAFF: 'cancel_multiple_affirm', EDIT_MULAFF_REASON: "edit_multiple_affirm_reason",
        ADJUST_MULAFF_ITEMS: "adjust_multiple_affirm_items", DESC: 'desc',
        CANCEL: 'cancel', MULTIPLE_AFFIRM: "multiple_affirm", SINGLE_AFFIRM: "single_affirm", ADJUST_ITEMS: "adjust_items",
        DELETED_IDS: "deleted_ids", LEFT_IDS: "left_ids", ADDED_IDS: "added_ids", PREVALUE_NOWVALUE_UPDATE: 'preValue_nowValue_update',
        LOG_DETAILS: "log_details", SUBJECT_ID: 'subject_id', SUBJECT_FIELD_NAME: "subject_field_name",
        NEW_VALUE: 'new_value', OLD_VALUE: 'old_value', PREVIOUS_LOG_UPDATE: "previous_log_update",
        EDITOR: 'editor', ADD_TIME: "add_time", CHECK: 'check', SUBMIT: 'submit',
        BAM: 'bam', BAI: 'bai', PATH: 'path', IGV_CONTROL: 'igv_control', NEED_COPY: 'need_copy', NEED_CHECK: 'need_check',
        FREE_UNMODIFIED: 'free_unmodified', NEED_ALL_CHECK: 'need_all_check',
        MUL_AFF_IDS: "multiple_affirmed_ids", UA_US_IDS: "unaffirmed_unsubmited_ids", A_US_IDS: "affirmed_unsubmited_ids",
        E_US_IDS: "edited_unsubmited_ids", NOW_SELECTED_IDS: "now_selected_ids",
        NAME: 'name', FILE: 'file', SHEET_DATA_DICT: 'sheet_data_dict', SHEET_INFO_LIST: 'sheet_info_list',
        SKIP: 'skip', STATUS_FOR_DATA_UPDATE: "status_for_data_update", STATUS_FOR_TEMPLATE_UPDATE: "status_for_template_update",
        POSITIVE: 'positive', NEGATIVE: 'negative', TEST: 'test', ICON: 'icon',
        SAMPLE_TYPE: "sample_type", CHANGE: "change", CONNECT_IMMUNE: 'connect_immune',
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
    let logDetailsShow = false


    let field_needCheck_inSampleInfoinPanal = JSON.parse(JSON.stringify(sheetDisplayConfigDict[dict.SAMPLEINFOINPANAL][dict.TITLE_LIST].reduce((result, title)=>{
        if (title[dict.NEED_CHECK]){
            result.push(title[dict.TITLE])
        }
        return result
    }, [])))


    async function __handleCopyData(){
        loadingShow = true

        let copy_data_id
        let sample_id = all_now_sample_id[params.type]
        let success = false
        await api.copyData(
                params.type,
                all_now_data_id[params.type],
                uuidv4(),
                userInfo.getToken()
        ).then(response=>{
            // console.log("__handleCopyData", response.data)
            success = true

            // 利用返回id更换now_id
            copy_data_id = response.data.id
            __change_dataIds_and_sampleIds(copy_data_id, sample_id)
        }).catch(error=>{
            console.log('__handleCopyData copyData', error)
            errors = error
        })

        // 获取当前搜索参数下，复制后的所有数据，从而找出copy数据所在页码
        let all_data
        // 如果存在ids筛选，则加入copy数据的id
        let ids_param = all_search_params_dict[params.type][dict.IDS]
        let ids = ids_param?`${ids_param},${copy_data_id}`:null
        if(success){
            // 修改sample和sheet record中的总数
            __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, null, dict.US_UADATA)

            // 计算页内数据总数，作为page_size
            let count = Object.keys(all_sheet_record_dict[params.type]).reduce((count, count_name)=>{
                return count + all_sheet_record_dict[params.type][count_name]
            }, 0)

            let name = params.type
            name = name.slice(0, 1).toUpperCase() + name.slice(1)
            await api[`list${name}`]({
                ...all_search_params_dict[params.type],
                page: 1,
                page_size: count,
                ids
            }).then(response=>{
                // console.log("__handleCopyData list...", response.data)
                all_data = response.data.results
            }).catch(error=>{
                console.log("__handleCopyData list...", error)
                errors = error
            })
        }

        let copy_data_page
        if(all_data){
            let index = findIndexByFieldValue(all_data, dict.ID, copy_data_id)
            let page_size = all_search_params_dict[params.type][dict.PAGE_SIZE]
            copy_data_page = Math.ceil((index+1)/page_size)
            console.log("__handleCopyData", all_data, index, page_size, copy_data_page)
        }

        // 更新all_search_params_dict中page, ids
        all_search_params_dict[params.type][dict.PAGE] = copy_data_page
        all_search_params_dict[params.type][dict.IDS] = ids

        await __getPageData()

        loadingShow = false
    }

    function __change_sampleType(sample_id, type){
        let sampleSn = __get_sampleSn_bySampleId_inSampleList(sample_id)
        // 1) 修改sample_list中样本类型
        let sample = sample_list.find(sample=>sample[dict.ID]===sample_id)
        sample[dict.TYPE] = type
        // 2) 修改sample_dict中样本类型
        sample_dict[sampleSn][dict.TYPE] = type
    }

    function __recover_nowValue_afterSetPreValue__Done(sheet, id ,done){
        all_preValue_of_data_dict[sheet][id][dict.DONE] = done
        recover_nowValue_byIDs_fields([id], [...all_modifyTitle_list_dict[sheet], dict.DELETE, dict.DONE], true, sheet)
    }
    function __handle_localData_afterChangeSampleType(goal_done, sheet, id, sample_id){
        let status = all_status_of_data_dict[sheet][id]
        // 1) 修改status
        let goal_status = goal_done?dict.DONE:dict.FREE
        all_status_of_data_dict[sheet][id] = goal_status

        // 2) 修改nowValue(修改preValue: done),
        __recover_nowValue_afterSetPreValue__Done(sheet, id ,goal_done)

        //3) 移动count改value
        if(goal_done){
            // 目的状态为Done， 本身Done的不用修改
            switch (status){
                case dict.FREE:
                    __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_UADATA, dict.S_ADATA ,sheet)
                    break
                case dict.CHECKED: case dict.EDITED: case dict.DELETED:
                    __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_ADATA, dict.S_ADATA ,sheet)
                    break
                default:
                    break
            }
        }else{
            // 目的状态为Free，本身Free的不用改，
            switch (status) {
                case dict.DONE:
                    __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.S_ADATA, dict.US_UADATA ,sheet)
                    break
                case dict.CHECKED: case dict.EDITED: case dict.DELETED:
                    __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_ADATA, dict.US_UADATA ,sheet)
                    break
                default:
                    break
            }
        }

        // 4）删除对应的日志
        __delete_oneData_params_logRelated(sheet, id)
    }
    async function __handleChangeSampleType(){
        loadingShow = true

        let {sample_id, panal_id, sampleSn, type} = sureData
        console.log('__handleChangeSampleType', sample_id, panal_id, sampleSn, type)
        let log_id = uuidv4()

        let form = new FormData()
        form.append('sample_id', sample_id)
        form.append('panal_id', panal_id)
        form.append('type', type)
        form.append('token', userInfo.getToken())
        form.append('log_id', log_id)

        let data = null
        await api.changeSampleType(form).then(response=>{
            console.log("__handleChangeSampleType", response.data.data)
            // data为sheet页中修改为goal_done的数据
            data = response.data.data
            // 1) 修改样本类型
            __change_sampleType(sample_id, type)
        }).catch(error=>{
            console.log("__handleChangeSampleType", error)
            errors = error
        })

        if(data){
            let goal_done = sampleTypeConfigDict[type][dict.DONE]
            // data为sheet页中修改为goal_done的数据
            for (let sheet in data){
                let sheet_data = data[sheet]

                // 收集更新数据中存在，而本地存储中不存在id
                let ids_notLocalLoaded_butInSheetData = []
                // a）处理修改返回的数据
                for(let id in sheet_data){
                    let data = sheet_data[id]
                    if(!all_status_of_data_dict[sheet].hasOwnProperty(id)){
                        ids_notLocalLoaded_butInSheetData.push(id)
                        // 没有数据强制注入status,nowValue,preValue
                        __update_dataStatusDict_nowValueOfDataDict_preValueOfDataDict([data], sheet, true)
                        if(goal_done){
                            // 原本注入时候肯定为free， 现在要冲free移动到done
                            __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_UADATA, dict.S_ADATA ,sheet)
                        }else{
                            // 原本注入时候肯定为free， 现在要冲free移动到done
                            __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.S_ADATA, dict.US_UADATA ,sheet)
                        }
                    }
                }
                // console.log("__handleChangeSampleType sheet ids_notLoaded_inSheetData", sheet, ids_notLocalLoaded_butInSheetData)

                // a）本地已经缓存的数据
                for (let id in all_status_of_data_dict[sheet]){
                    let __sampleId = all_preValue_of_data_dict[sheet][id][dict.SAMPLEID]
                    if(__sampleId===sample_id &&
                            !ids_notLocalLoaded_butInSheetData.hasOwnProperty(id)){
                        // console.log("__handleChangeSampleType loaded_id", id)
                        __handle_localData_afterChangeSampleType(goal_done, sheet, id, sample_id)
                    }
                }
            }
        }

        // 更新smpleInfoInPanal页
        await __getPageData()

        loadingShow = false
    }

    async function __affirmCheck_selectedSampleIds_beFreeandUnmodified_data(){
        loadingShow = true
        let panalId = params[dict.PANALID]
        let sampleIds = selected_sampleId_list.join(',')
        let search = all_search_params_dict[params.type][dict.SEARCH]
        // 计算sheet页内，已选样本的数据总数
        let count = selected_sampleId_list.reduce((count, sample_id)=>{
            count = count + all_sample_record_dict[params.type][sample_id][dict.ALLDATA]
            return count
        }, 0)
        // console.log('__check_allData_freeandUnmodified', panalId, sampleIds, search, count)

        let results = []
        //A) 如果记录的数据总条数 和 状态库中存储的数据条数 不一致，下载所有数据
        if(data_count!==Object.keys(all_status_of_data_dict[params.type]).length){
            let name = params.type
            name = name.slice(0, 1).toUpperCase() + name.slice(1)
            let success = false
            await api[`list${name}`]({
                panalId,
                sampleIds,
                search,
                page_size: count
            }).then(response=>{
                // console.log('__check_allData_freeandUnmodified', response.data)

                if(response.data.count !== count){
                    remote.dialog.showMessageBox({
                        type: 'info',
                        title: '数据数量不一致',
                        message: `数据库现有数据${response.data.count}条，本地数据量显示${data_count}条。`
                    })
                }else{
                    success = true
                    results = response.data.results
                }
            }).catch(error=>{
                console.log('__check_allData_freeandUnmodified', error)
                errors = error
            })

            if(success){
                // B) 更新所有数据的status，nowValue, preValue
                __update_dataStatusDict_nowValueOfDataDict_preValueOfDataDict(results)
            }else{
                remote.dialog.showErrorBox('更新所需ids错误', '网络不稳定，请稍后尝试')
                return
            }
        }

        // C) 判断本地存储到的数据，selected_sampleId_list中样本id对应的所有ids
        // 是否free，是否unmodified，如果符合提交
        let ids = Object.keys(all_preValue_of_data_dict[params.type]).reduce((result, id)=>{
            if (selected_sampleId_list.indexOf(all_preValue_of_data_dict[params.type][id][dict.SAMPLEID])!==-1 &&
                    result.indexOf(id)===-1){
                result.push(id)
            }
            return result
        }, [])
        console.log('__check_allData_freeandUnmodified ids', ids)
        for (let id of ids){
            let sample_id = all_preValue_of_data_dict[params.type][id][dict.SAMPLEID]
            let status = all_status_of_data_dict[params.type][id]
            let unequal_values = __check_unequalValues_ofModifiyFields(id)
            if(status===dict.FREE && Object.keys(unequal_values).length===0){
                // 将状态从free设置为checked
                __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, dict.CHECKED)
            }
        }

        // D) 当前页各id能否被编辑, 全设置为false
        __set_allIds_availEdit_false_inPageIdAvailEditDict()
        // E) 当前页每条id的各个可编辑field的鼠标是否进入, 全设置为false
        __set_allIdMofidyFields_mouseEnter_false_inPageIdModifyFieldMouseEnterDicts()
        // F) 重置当前页所有id，是否可选
        __update_allIds_availSelect_inPageIdAvailSelectDict()

        loadingShow = false
    }


    let sureEvent
    let sureOperation
    let sureData = {}
    let sureMessage = ''
    function __changeSendSureMessage() {
        sureMessage = "是否对" + dict_translate[sureEvent] + "进行" + dict_translate[sureOperation] + "相关操作!"
    }
    function openSureMessage(event, operation, data){
        // console.log('openSureMessage', event, operation, data)
        sureEvent = event
        sureOperation = operation
        sureData = data
        __changeSendSureMessage()
        sureShow = true
    }
    async function handleSureReply(e){
        // console.log('handleSureReply', e.detail.status)
        let reply = e.detail.status

        // 先关闭sure窗口，不然太丑了！
        sureShow = false

        switch (sureEvent) {
            case dict.MULTIPLE_AFFIRM:
                switch (sureOperation) {
                    case dict.CANCEL:
                        if (reply) {
                            __handleCancelMulAffirm()
                        }
                        break
                    default:
                        break
                }
                break
            case dict.SUBMIT:
                switch (sureOperation) {
                    case dict.CANCEL:
                        // console.log('handleSureReply 取消相关提交', selected_ids_forCancelDone)
                        if (reply){
                            logDetailsShow = false
                            await __handleCancelSelectedIdsDone()
                        }

                        cancelSubmit = false
                        break
                    default:
                        break
                }
                break
            case dict.MODIFY:
                switch (sureOperation) {
                    case dict.CANCEL:
                        if(reply){
                            recover_nowValue_byIDs_fields(all_selected_dataIds_dict[params.type], [...all_modifyTitle_list_dict[params.type], dict.DELETE])
                            // 全面懒更新可否选择
                            __update_allIds_availSelect_inPageIdAvailSelectDict()
                            // 清空all_selected_dataIds_dict
                            __reset_selectedIds_inAllSelectedDataIdsDict()
                        }
                        break
                    default:
                        break
                }
                break
            case dict.FREE_UNMODIFIED:
                switch (sureOperation){
                    case dict.CHECK:
                        // console.log('handleSureReply 未审核未修改 确认审核')
                        if(reply){
                            await __affirmCheck_selectedSampleIds_beFreeandUnmodified_data()
                        }
                        break
                    default:
                        break
                }
                break
            case dict.DATA:
                switch (sureOperation) {
                    case dict.COPY:
                        // console.log('handleSureReply 数据复制')
                        if(reply){
                            await __handleCopyData()
                        }
                        break
                    default:
                        break
                }
                break
            case dict.SAMPLE_TYPE:
                switch (sureOperation){
                    case dict.CHANGE:
                        if(reply){
                            // console.log('handleSureReply', sureData)
                            await __handleChangeSampleType()
                        }
                        break
                    default:
                        break
                }
                break
            default:
                break
        }

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
    let affirmSelection_dict = arrayToDict(affirmSelectionConfig, 'value')

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
    // 所有页面初始化都是 单项审核工作状态，包括概览页面
    let all_affirmWorkingStatus_of_sheet_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = dict.SIN_CANCEL_OR_AFFIRM
        return result
    },{})))

    function __checkIfInsideMultipleAffirm(id){
        let log_id = all_submit_logs_dict[params.type][id]
        if(log_id &&
            logs_together_dict.hasOwnProperty(log_id) &&
            logs_together_dict[log_id][dict.IDS].length>1
        ){
            return true
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

        if(params.type===dict.SAMPLEINFOINPANAL){
            // console.log('__check_availSelect_of_oneData_alreadyInsid 概览页面')
            // 确保需要校验的 SubmitCount(提交数)与 对应的Count(总数) 相等
            return field_needCheck_inSampleInfoinPanal.every(field=>{
                let submitCount = all_nowValue_of_data_dict[params.type][id][field]
                let count_field = field.replace('Submit', '')
                let count = all_nowValue_of_data_dict[params.type][id][count_field]
                // console.log('__check_availSelect_of_oneData_alreadyInsid', count_field, count, submitCount)

                return  count === submitCount
            })
        }

        // console.log('<===__check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict begin')
        // 根据审核工作状态 判断当前页面某条数据id，是否可选择
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
                let logId_edit_sinAff_reason = all_submit_logs_dict[params.type][id]
                // 1) 首先不在批量组内，2)log详情中能找到对应的logId
                return !ifInsideMultiple_editSinAffReason &&
                        logs_together_dict.hasOwnProperty(logId_edit_sinAff_reason)
            case dict.MUL_AFFIRM:
                return __check_availSelect_if_FreeAndTruelyEdited(id)
            case dict.CANCEL_MULAFF:
                return __checkIfInsideMultipleAffirm(id)
            case dict.EDIT_MULAFF_REASON:
                return __checkIfInsideMultipleAffirm(id)
            case dict.ADJUST_MULAFF_ITEMS:
                let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
                // console.log('__check_availSelect_of_oneData_already...', locked_logId, logs_together_dict, logs_together_dict[locked_logId])
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
                // console.log("__check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict 查看提交过往记录")
                return all_previousLog_list_dict[params.type][id] && all_previousLog_list_dict[params.type][id].length!==0
            case dict.CANCEL_SUBMIT_DONE:
                let status_cancel_sinSub_done = all_status_of_data_dict[params.type][id]
                if(status_cancel_sinSub_done === dict.DONE &&
                        all_previousLog_list_dict[params.type].hasOwnProperty(id) &&
                        all_previousLog_list_dict[params.type][id].length>0
                ){
                    return true
                    // let logs_cancel_sinSub_done = JSON.parse(JSON.stringify(all_previousLog_list_dict[params.type][id]))
                    // let latest_ids = logs_cancel_sinSub_done.sort((a, b)=>b.id-a.id)[0][dict.IDS]
                    // // console.log("__check_availSelect_of_oneData_alreadyInsideA...", latest_ids)
                    // return latest_ids.length===1
                }else{
                    return false
                }
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
        let ids = page_data.map(data=>data.id)
        for (let id of ids) {
            __update_oneId_availSelect_inPageIdAvailSelectDict(id)
        }
    }
    // 重置当前页某id为不可编辑
    function __set_oneId_false_availEdit_inPageIdAvailEditDict(id){
        page_id_availableEdit_dict[id] = false
    }
    // 重置当前页所有id，都不可编辑
    function __set_allIds_false_availEdit_inPageIdAvailEditDict(){
        let ids = page_data.map(data=>data.id)
        for (let id of ids){
            __set_oneId_false_availEdit_inPageIdAvailEditDict(id)
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

    // 根据一个id的，某个包含它相关的log，进行一次previousLog的列表推入实践
    // return： 此log下的所有data的id列表
    function __pushOnce_inAllPreviousLogListDict_byOneIdandOneLog(id, log){
        let ids = []
        let log_details = {}
        for (let detail of log[dict.LOG_DETAILS]){
            // 1) ids把这个log中，所有log_detail的数据id（同批审核成员）收集在一起
            let subject_id = detail[dict.SUBJECT_ID]
            if(ids.indexOf(subject_id)===-1) {
                ids.push(subject_id)
            }

            // 2) 把这个数据id的所有修改过的字段，重新整理下，放在log_details字典中，key为字段名
            if(subject_id===id){
                log_details[detail[dict.SUBJECT_FIELD_NAME]] = {
                    new_value: detail[dict.NEW_VALUE],
                    old_value: detail[dict.OLD_VALUE]
                }
            }
        }

        // 将结构调整后的log数据推入 all_previousLog_list_dict 数组
        all_previousLog_list_dict[params.type][id].push({
            id: log[dict.ID],
            log_id: log[dict.LOG_ID],
            data_id: id,
            ids,
            log_details,
            editor: log[dict.EDITOR],
            add_time: log[dict.ADD_TIME],
            type: log[dict.REASON_TYPE],
            desc: log[dict.REASON_DESC]
        })

        return ids
    }
    // 按单个id的单个log数据，更新all_previous_log_list_dict
    function __update_inAllPreviousLogListDict_byOneIdandManyLogs(id, logs){
        // console.log('__update_oneId_byLogs_inAllPreviousLogListDict id logs', id, logs)
        //先清空数据id对应的previousLogs列表
        all_previousLog_list_dict[params.type][id] = []

        let related_ids = []
        for (let logId in logs){
            let found = false
            let log = logs[logId]
            for (let log_detail of log[dict.LOG_DETAILS]){
                if (log_detail[dict.SUBJECT_ID]===id) {
                    found = true
                    break
                }
            }
            if (found) {
                // ids为此log中所有涉及的data的id列表
                let ids = __pushOnce_inAllPreviousLogListDict_byOneIdandOneLog(id, log)
                ids.forEach(related_id=>{
                    if(related_ids.indexOf(related_id)===-1) {
                        related_ids.push(related_id)
                    }
                })
            }
        }
        // console.log('__update_oneId_byLogs_inAllPreviousLogListDict related_ids', related_ids)
        return related_ids
    }
    // 根据ids获取所有相关logs，根据id_list列表，更新all_previousLog_list_dict
    function __update_previousLogs_byLoadedLogsandIds(id_list, logs){
        // 收集id_list在logs中涉及的id列表，不包括id_list自身
        let absolute_related_ids = []
        id_list.forEach(id=>{
            let related_ids = __update_inAllPreviousLogListDict_byOneIdandManyLogs(id, logs)
            related_ids.forEach(related_id=>{
                if (absolute_related_ids.indexOf(related_id)===-1 &&
                        id_list.indexOf(related_id)===-1){
                    absolute_related_ids.push(related_id)
                }
            })
        })

        // console.log('__update_previousLogs_byLoadedLogsandIds absolute_related_ids', absolute_related_ids)

        absolute_related_ids.forEach(id=>{
            __update_inAllPreviousLogListDict_byOneIdandManyLogs(id, logs)
        })

    }
    async function __update_Ids_and_relatedIds_PreviousLogs(id_list=null){
        loadingShow = true

        // 默认使用当前页的所有id进行更新
        let ids = id_list && id_list.length>0? id_list: page_data.map(data=>data.id)

        //后端已经返回所有ids的logs以及ids同批审核id的logs
        await api.listLog({
                        query: JSON.stringify({
                                modelName: params.type,
                                subjectIds: ids
                            })
        }).then(response=>{
            // console.log('__update_Ids_and_relatedIds_PreviousLogs', response.data)
            __update_previousLogs_byLoadedLogsandIds(ids, response.data)
        }).catch(error=> {
            console.log('__update_Ids_and_relatedIds_PreviousLogs', error)
            errors = error
        })


        //更新完logs日志，肯定需要更新一下页面可选项
        __update_allIds_availSelect_inPageIdAvailSelectDict()

        loadingShow = false
    }

    // 清空当前页面的多选框selected_dataIds
    function __reset_selectedIds_inAllSelectedDataIdsDict(){
        all_selected_dataIds_dict[params.type] = []
    }
    // 改变审核的工作环境
    async function changeAffirmWorkingStatus(type){
        let pre_affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        if (pre_affirm_status===type) return

        // 如果之前工作状态是检查过往日志记录，需要确定logEdits的subfilter坐标是不是0，如果不是需要切换回去0
        if (pre_affirm_status===dict.CHECK_SINSUB_LOGS &&
                all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]!==0){
            __reset_indexes_inAllSubFilterIndexesDict_params_inAllSearchParamsDict([dict.LOGSEDIT])

            __set_page_inAllSearchParamsDict(1)
            await __getPageData()
        }

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
                __reset_selectedIds_inAllSelectedDataIdsDict()
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
                __reset_selectedIds_inAllSelectedDataIdsDict()
                break
            case dict.EDIT_MULAFF_REASON:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                __reset_selectedIds_inAllSelectedDataIdsDict()
                break
            case dict.ADJUST_MULAFF_ITEMS:
                // 清空id多选列表
                __reset_selectedIds_inAllSelectedDataIdsDict()
                break
            case dict.CHECK_SINSUB_LOGS:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                __reset_selectedIds_inAllSelectedDataIdsDict()

                // 更新当前页的相关previousLogs
                await __update_Ids_and_relatedIds_PreviousLogs()
                __update_allIds_availSelect_inPageIdAvailSelectDict()
                break
            case dict.CANCEL_SUBMIT_DONE:
                //当前所有都不能编辑
                __set_allIds_false_availEdit_inPageIdAvailEditDict()
                // 重置当前页的增减项目的锁定
                __set_lockedLogId_null_of_nowSheet_inAllLockedLogIdForAdjustedMulAffItems()
                // 清空id多选列表
                __reset_selectedIds_inAllSelectedDataIdsDict()

                // 更新当前页的相关previousLogs
                await __update_Ids_and_relatedIds_PreviousLogs()
                __update_allIds_availSelect_inPageIdAvailSelectDict
                break
            default:
                break
        }

    }

    // 提示错误信息
    let errors = ''
    function __reset_errors(){
        errors = ''
    }

    // 控制右侧的标题和下面mutant内容的联动
    let topScroll
    let bottomScroll
    function handleTopScroll(){
        // console.log(topScroll.scrollLeft)
        let bottomScroll_scrollTop = bottomScroll.scrollTop
        console.log('handleTopScroll', bottomScroll_scrollTop)
        bottomScroll.scrollTo(topScroll.scrollLeft, bottomScroll_scrollTop)
    }
    function handleBottomScroll(){
        // 如果页面拖动超过了topScroll的底部，就不用管topScrol啦, 废弃，屏幕好的，没有主页面scroll啦
        // if(windowScrollTop<147){
        let bottomScroll_scrollTop = bottomScroll.scrollTop
        topScroll.scrollTo(bottomScroll.scrollLeft, 0)
        bottomScroll.scrollTo(bottomScroll.scrollLeft, bottomScroll_scrollTop)
    }

    //标题相关参数 每页全部title的列表，
    let all_wholeTitle_list_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].map(title_list_item=>title_list_item[dict.TITLE])
        return result
    }, {})))
    // 每页的title_list,转化为字典， 其中nowDisplay用于控制是否此标题栏显示, 包含记录状态
    let all_titleListItem_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
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
    // 每页选择显示的title列表
    let all_selectTitle_list_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].reduce((title_result, title)=>{
            if (!title[dict.DEFAULTDISPLAY] && title[dict.SELECTDISPLAY]){
                title_result.push(title[dict.TITLE])
            }
            return title_result
        }, [])
        return result
    }, {})))
    // 每页默认显示的title列表(默认显示true，选择显示true)
    let all_defaultTitle_list_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.TITLE_LIST].reduce((title_result, title)=>{
            if (title[dict.DEFAULTDISPLAY] && title[dict.SELECTDISPLAY]){
                title_result.push(title[dict.TITLE])
            }
            return title_result
        }, [])
        return result
    }, {})))
    // 页面是否按 默认显示方式 打开状态集合
    let all_titleDefaultShow_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = true
        return result
    },{})))

    let selectFields
    function closeSelectFieldDiv(){
        selectFields.style.display = 'none'
        // document.querySelector(".selectFieldsDiv").style.display = 'none'
    }
    // 处理标题栏菜单中 全部默认标题的打开, 全部选择标题的关闭
    function toggleDefaultFiledsOpen(){
        if (all_titleDefaultShow_dict[params.type]) return
        all_defaultTitle_list_dict[params.type].forEach(field=>{
            all_titleListItem_dict[params.type][field][dict.NOWDISPLAY] = true
        })
        all_selectTitle_list_dict[params.type].forEach(field=>{
            all_titleListItem_dict[params.type][field][dict.NOWDISPLAY] = false
        })

        all_titleDefaultShow_dict[params.type] = true
    }
    // 单个改变可选标题栏是否打开
    function toggle_selectField_nowDisplay(field){
        // 1) 先设置点击的值
        let status = all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]
        all_titleListItem_dict[params.type][field][dict.NOWDISPLAY] = !status

        // 2)查看默认的title是否都打开，选择的title都关闭
        let allDefaultOpened = all_defaultTitle_list_dict[params.type].every(field=>{
            return all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]
        })
        let allSelectClosed = all_selectTitle_list_dict[params.type].every(field=>{
            return !all_titleListItem_dict[params.type][field][dict.NOWDISPLAY]
        })
        all_titleDefaultShow_dict[params.type] = allDefaultOpened && allSelectClosed? true: false

    }

    // 当前页面信息列表，用于循环展示
    let page_data = []
    // 随着页面初始化后更新, 鼠标进入各个id的field后值变为true，初始化为false
    let page_id_modifyField_mouseEnter_dicts = {}
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
    function recover_nowValue_byIDs_fields(id_list, field_list=[], force=false, sheet=null){
        // console.log('recoverValuesInNowPageDataDict', id_list, field_list)
        let default_sheet = sheet?sheet:params.type

        let recover_field_list = all_modifyTitle_list_dict[default_sheet]
        if (field_list && field_list.length > 0) {
            recover_field_list = field_list
        }


        id_list.forEach(id=>{
            // 判断数据条目是否为free状态,free才能修改
            if (all_status_of_data_dict[default_sheet][id]===dict.FREE || force) {
                recover_field_list.forEach(field=>{
                    all_nowValue_of_data_dict[default_sheet][id][field] = all_preValue_of_data_dict[default_sheet][id][field]
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
                recover_nowValue_byIDs_fields([id])
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
        page_id_modifyField_mouseEnter_dicts[id][field] = true
    }
    function handleMutantTDMouseleave (field, id){
        page_id_modifyField_mouseEnter_dicts[id][field] = false
    }

    // 设定当前修改标题
    let now_input_field = null
    let now_input_id = null
    let now_params_type = null
    function focusNowField(e, id, field){
        now_input_field = field
        now_input_id = id
        now_params_type = params.type
    }
    function handleValueChangeInBigInput(event){
        if(now_input_id&&now_input_field){
            all_nowValue_of_data_dict[now_params_type][now_input_id][now_input_field] = event.target.value
        }

    }

    function __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, status, reason=null, unequal_values=null, common_log_id=null, adjust_mulAff_items=false, cancel_submit=false){
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

                // 3) 配置此条id的log_id
                let log_checked_id = uuidv4()
                all_submit_logs_dict[params.type][id] = log_checked_id

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
                if(cancel_submit){
                    // 2) 更新sampleRecord和sheetRecord
                    __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.S_ADATA, dict.US_UADATA)

                    // 3) 将done的nowValue和preValue改为false
                    all_nowValue_of_data_dict[params.type][id][dict.DONE] = false
                    all_preValue_of_data_dict[params.type][id][dict.DONE] = false
                }else{
                    // 2) 此条数据id对应的log_id，删除log详情
                    let log_id = all_submit_logs_dict[params.type][id]
                    if(!adjust_mulAff_items){
                        //批次的删除一个，剩余就没法删除，需要判断一下，
                        // 另一种情况，撤销提交根本就没有详情log
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
                }
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
    // from为null，为copy情况
    function __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, from, to, sheet=null){
        // console.log("__moveCountFromToInAllSampleRecordandAllSheetRecord", sample_id, all_sample_record_dict, all_sheet_record_dict, from, to)
        let defalult_sheet = sheet?sheet:params.type
        if(from){
            all_sample_record_dict[defalult_sheet][sample_id][from]--
            all_sheet_record_dict[defalult_sheet][from]--
        }else{
            all_sample_record_dict[defalult_sheet][sample_id][dict.ALLDATA]++
        }

        all_sample_record_dict[defalult_sheet][sample_id][to]++
        all_sheet_record_dict[defalult_sheet][to]++
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

            // posStart和posEnd数据库是Integer，而本地是number
            // if(field===dict.POSSTART || field===dict.POSEND){
            //     console.log('__check_unequalValues_ofModifiyFields', sub_nowData, field, nowValue, preValue)
            //     nowValue = String(nowValue)
            //     preValue = String(preValue)
            // }

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
                __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, dict.CHECKED)
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
            __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, dict.FREE)
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
    // 批量审核中，处理多选的恢复
    function __handleMultipleRecover(){
        openSureMessage(dict.MODIFY, dict.CANCEL)
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
            __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sampleId_dict[id], dict.FREE)
        })

        //1) 清空id选中列表
        __reset_selectedIds_inAllSelectedDataIdsDict()
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

    // logId和ids的对象的列表
    let id_logId_lists_forShow = []
    // 每个id的logs的列表，转化为字典
    let previousLogs_dicts = {}
    // 单个数据过往信息显示
    let cancelSubmit = false
    function __set_previousLogsDicts(){
        let all_logs = JSON.parse(JSON.stringify(all_previousLog_list_dict[params.type]))
        previousLogs_dicts = Object.keys(all_logs).reduce((result, id)=>{
            let logs = arrayToDict(all_previousLog_list_dict[params.type][id], 'id')
            result[id] = logs
            return result
        }, {})
    }
    async function handleCheckSingleSubmitLogs(id){

        // 防止当前id的log数组排序混乱，排一下序
        let logs = JSON.parse(JSON.stringify(all_previousLog_list_dict[params.type][id])).sort((a,b)=>a.id-b.id)
        // 先清空展示数据列表
        id_logId_lists_forShow = []
        logs.forEach(log=>{
            let ids = JSON.parse(JSON.stringify(log[dict.IDS]))
            id_logId_lists_forShow.push({
                logId: log.id,
                ids: [id, ...removeFromUniqueArray(ids, id)]
            })
        })
        // console.log("handleSingleDataLogdetailsShow", id_logId_lists_forShow)

        __set_previousLogsDicts()
        // console.log("handleSingleDataLogdetailsShow", previousLogs_dicts)

        logDetailsShow = true
    }
    // 关闭
    function handleCloseLogdetailsShow(){
        cancelSubmit = false
        logDetailsShow = false
    }

    // 用于撤销提交的id列表
    let selected_ids_forCancelDone = []
    // 处理logDetais页面返回的撤销列表的取消
    function __handleCancelDispatch_fromLogDetailsPage(e){
        console.log("handleCancelSelectedIdsDone", e.detail[dict.IDS])
        selected_ids_forCancelDone = e.detail[dict.IDS]

        openSureMessage(dict.SUBMIT, dict.CANCEL)
    }
    // 用于实际处理撤销提交操作
    async function __handleCancelSelectedIdsDone(){
        loadingShow = true

        let success_num = 0
        let fail_num = 0
        let failed_ids = []
        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        for (let id of selected_ids_forCancelDone){
            // 前端仅分配一个logId, 由后端直接创建log和log_detail
            let log_id = uuidv4()
            let sampleId = all_preValue_of_data_dict[params.type][id][dict.SAMPLEID]
            let success = false
            await api[`update${name}`](id,
                    {
                        log_id,
                        done: false
                    }
            ).then(response=>{
                success = true
                success_num++
                // 1) 更新相关参数
                __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sampleId, dict.FREE, null, null, null, false, true)
                // // 2) 更新页面的availableSelect
                // __update_oneId_availSelect_inPageIdAvailSelectDict(id)
            }).catch(error=>{
                console.log('__handleCancelSelectedIdsDone', error)
                errors = error
                fail_num++
                failed_ids.push(id)
            })

            let time = getTime()
            all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} ${all_preValue_of_data_dict[params.type][id][dict.SAMPLESN]} ${id} ${success?'撤销成功。':'撤销失败！'}`]
        }

        // a. 消息提示整体情况
        let time = getTime()
        let left_message = fail_num?`，失败${fail_num}条`:'。'
        all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 撤销成功${success_num}条${left_message}`]
        // b. 保险起见
        selected_ids_forCancelDone = []
        __set_page_inAllSearchParamsDict(1)
        await __getPageData()

        // 提示失败的ids
        if (failed_ids.length>0){
            await remote.dialog.showMessageBox({
                type: 'info',
                title: '存在撤销提交失败！',
                message: `请记录后再次撤回提交：${JSON.stringify(failed_ids)}`
            })
        }

        loadingShow = false
    }

    // 处理点击取消提交按钮事情
    function handleCancelSubmitDone(id){
        // 当前id的log数组排序混乱，按logId排一下倒序, 取最新的log
        let latest_log = JSON.parse(JSON.stringify(all_previousLog_list_dict[params.type][id])).sort((a,b)=>b.id-a.id)[0]
        console.log('handleCancelSubmitDone latest_log', latest_log)
        // 先清空展示数据列表
        id_logId_lists_forShow = [{
            logId: latest_log[dict.ID],
            ids: [id, ...removeFromUniqueArray(latest_log[dict.IDS], id)]
        },]

        __set_previousLogsDicts()

        cancelSubmit = true
        logDetailsShow = true
    }

    // 先前的页面type
    // let pre_params_type
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
    function __update_dataStatusDict_nowValueOfDataDict_preValueOfDataDict(data_list=null, sheet=null, force='empty'){
        let default_data_list = data_list && data_list.length>0?data_list:page_data
        let default_sheet = sheet?sheet:params.type
        // 配置文件需要当前sheet更新, 或者按参数更新
        let default_force = force === 'empty'? sheetDisplayConfigDict[default_sheet][dict.PREVALUE_NOWVALUE_UPDATE]:force

        for (let data of default_data_list) {
            let id = data[dict.ID]

            //1) 本地无此条记录 2) 或者此页需要每次都强制更新每条数据（即概览页 每次都更新数据）
            if (!all_status_of_data_dict[default_sheet].hasOwnProperty(id) || default_force) {
                // 插入新数据的nowValue
                all_nowValue_of_data_dict[default_sheet][id] = JSON.parse(JSON.stringify(data))
                // 插入新数据的preValue
                all_preValue_of_data_dict[default_sheet][id] = JSON.parse(JSON.stringify(data))
                // 插入新数据的状态大表
                all_status_of_data_dict[default_sheet][id] = data[dict.DONE]?dict.DONE:dict.FREE
            }else{
                // 如果有记录，再判断数据是否外部可能会被人修改了，
                // 最常见为测试，其次为多人操作
                // 整个title表都查一遍，反正查了
                // console.log('__update_allDataStatusDict_allNowVal... do not update')
                let unequal_values = __check_unequalValues_ofModifiyFields(id,
                        [...all_wholeTitle_list_dict[default_sheet], dict.DELETE, dict.DONE], data)

                if(Object.keys(unequal_values).length>0) {
                    remote.dialog.showMessageBox({
                        type: 'info',
                        title: `数据库被人修改(未处理)，数据ID为${id}`,
                        message: '最新数据：'+JSON.stringify(unequal_values)+
                                '，本地数据(pre)：'+ JSON.stringify(Object.keys(unequal_values).reduce((result, field)=>{
                                    result[field] = all_preValue_of_data_dict[default_sheet][id][field]
                                    return result
                                }, {}))
                    })
                }
                // todo 后期要根据done状态修改
            }
        }

    }

    //初始化当前页面所有id的可修改field为 "鼠标未进入" ，false
    function __set_allIdMofidyFields_mouseEnter_false_inPageIdModifyFieldMouseEnterDicts(){
        page_id_modifyField_mouseEnter_dicts = JSON.parse(JSON.stringify(page_data.reduce((result, item)=>{
            let status_dict = {}
            for (let field in item){
                status_dict[field] = false
            }
            result[item[dict.ID]] = status_dict
            return result
        }, {})))
        // console.log(" __set_allIdMofidyFields_mouseEnter_false...", page_id_modifyField_mouseEnter_dicts[params.type])
    }
    // 初始化当前页所有数据，当前不可编辑 false
    function __set_allIds_availEdit_false_inPageIdAvailEditDict(){
        page_id_availableEdit_dict =  JSON.parse(JSON.stringify(page_data.reduce((result, item)=>{
            result[item[dict.ID]] = false
            return result
        }, {})))
    }

    async function __set_configs_afterPageDataUpdated(){
        // A) 当前页每条id的各个可编辑field的鼠标是否进入，初始化为false未进入
        __set_allIdMofidyFields_mouseEnter_false_inPageIdModifyFieldMouseEnterDicts()

        // B) 当前页各id能否被编辑, 初始化都不能编辑
        __set_allIds_availEdit_false_inPageIdAvailEditDict()

        // C) 更新totalPageNums，利用更新的data_count
        __updateTotalPageNums()

        // D) 更新 all_data_status_dict 中数据状态
        __update_dataStatusDict_nowValueOfDataDict_preValueOfDataDict()

        // E)如果当前 审核工作状态, 需要更新之前的过往日志
        if(affirmSelection_dict[all_affirmWorkingStatus_of_sheet_dict[params.type]][dict.PREVIOUS_LOG_UPDATE]){
            console.log('__getPageData 审核工作状态需要 开始更新日志')
            await __update_Ids_and_relatedIds_PreviousLogs()
        }

        // F) 更新页面所有id可否选择,
        // 查看日志，取消提交的工作状态 依赖于F)
        // 概览依赖于E)的nowValue判断count和submitCout相同
        __update_allIds_availSelect_inPageIdAvailSelectDict()
    }

    // 根据all_query_params_dict[params.type]， 当前页名，获取当前页所有信息
    async function __getPageData () {
        console.log('<=== __getPageData begin , params.type', params.type)
        loadingShow = true
        // 第一次切换到mutant上加载，还没有更新获得panalId和sampleIds参数
        __addPanalIDIfFirstLoad()

        let success = false

        let name = params.type
        name = name.slice(0, 1).toUpperCase() + name.slice(1)
        // console.log("__getPageData upperQueryName params", name)

        await api[`list${name}`](all_search_params_dict[params.type]).then(response=>{
            page_data = response.data.results
            //更新当前页data总条数，__updateTotalPageNums()需要调用，获得总页数
            data_count = response.data.count

            success = true
        }).catch(error=>{
            console.log("__getPageData", error)
            errors = error
        })

        if(success){
            await __set_configs_afterPageDataUpdated()
        }

        loadingShow = false
    }

    // submenu列表(即sheet页，含附加的汇总表）
    let submenu_list = JSON.parse(JSON.stringify(sheetDisplayConfigList.map(item=>item.sheet)))
    let submenu_translate_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        result[item[dict.SHEET]] = item[dict.SUBMENU_TRANSLATE]
        return result
    }, {})))
    function __update_selectedIds_afterPush(){
        // 当前选择的样本id列表，需要用新页面的替换 公用已选 selected_sampleIds_list 列表
        let sampleIds = JSON.parse(JSON.stringify(all_search_params_dict[params.type][dict.SAMPLEIDS]))
        if (sampleIds){
            sampleIds = sampleIds.split(',').map(str_id=>parseInt(str_id))
        }else{
            sampleIds = sample_list.map(sample=>sample[dict.ID])
        }
        selected_sampleId_list = sampleIds
    }
    let doneFilter
    let deleteFilter
    let logsEditFilter
    let pre_params_type
    // submenu选择
    async function handleSelectSubmenu(type){
        if (type===params.type) return
        // 只切换路由，数据没有自动刷新啊！！
        pre_params_type = params.type

        // push之后，params.type没有立即更新，但是页面使用tes获取paramstype已经更新
        // todo 只能手动强制改！
        // push(`/${type}/${params[dict.PANALID]}`)
        params.type = type
        // console.log('handleSelectSubmenu afterPush', params.type)

        //1) 更换公用的selected_ids信息
        __update_selectedIds_afterPush()

        //todo 页面筛选select的更换done，delee，logsEdit, ids填写框内容 此处实际不对，页面还没更新，获取不到doneFilter等dom
        // console.log('yes',doneFilter, topScroll)

        await __getPageData()
    }
    // 1) 每页的filter的定制版subFilters的名字列表，因为三张mutant表的exonicfuncRefGene
    // 如果表是ifSimpleOrdering，需要将ordering的内容更正为['sample__id']
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
    // 2) todo 必须先重置all_subFilters_names_dict, 因为ordering有些是简化的，只含sample__id
    let all_subFilter_indexes_dict = JSON.parse(JSON.stringify(Object.keys(all_subFilter_names_dict).reduce((result, sheet_name)=>{
        let subFilter_names = all_subFilter_names_dict[sheet_name]
        result[sheet_name] = {}
        for (let filter_name in subFilter_names) {
            result[sheet_name][filter_name] = Array(subFilter_names[filter_name].length).fill(0)
        }
        return result
    }, {})))
    // 3) 每页的subFilters的定制版选项列表，后续再追加三张mutant的exonicfuncRefGene项目列表
    let subFilter_selections_dict = JSON.parse(JSON.stringify(common_subFilter_selections_dict))

    let defaultPagesize = 20
    // 获取sheet页的页面筛选参数字典，获取当前页内容时直接调取即可！！
    let all_search_params_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let params = item[dict.FILTERS].reduce((param_dict, subFilter)=>{
            switch (subFilter) {
                case dict.PAGE:
                    param_dict[subFilter] = 1
                    break
                case dict.PAGE_SIZE:
                    param_dict[subFilter] = defaultPagesize
                    break
                case dict.SEARCH:
                    param_dict[subFilter] = item[dict.SHEET]
                    break
                default:
                    param_dict[subFilter] = null
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
    function __set_all_specfic_Params_inAllSearchParamsDict() {
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
    function __find_filterName_subFilterIndex(subFilter){
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
        return [found_filter_name, found_subFilter_index]
    }
    // 切换filter的项
    async function handleToggleFilter(subFilter){
        console.log("<===handleToggleFilter")
        loadingShow = true

        let result = __find_filterName_subFilterIndex(subFilter)
        let found_filter_name = result[0]
        let found_subFilter_index = result[1]

        let index = all_subFilter_indexes_dict[params.type][found_filter_name][found_subFilter_index]
        let new_index = (index+1)%subFilter_selections_dict[subFilter].length
        all_subFilter_indexes_dict[params.type][found_filter_name][found_subFilter_index] = new_index


        // 其中包含，页面切换回第一页
        __set_all_specfic_Params_inAllSearchParamsDict()

        // 增加筛选页面数量可能会伸缩，页面设置为1比较保险
        __set_page_inAllSearchParamsDict(1)
        await __getPageData()

        loadingShow = false
    }
    // 改变filter
    async function handleChangeFilter(event, subFilter){
        loadingShow = true
        let index = event.target.value
        let result = __find_filterName_subFilterIndex(subFilter)

        let found_filter_name = result[0]
        let found_subFilter_index = result[1]

        // console.log('handleChangeFilter', all_subFilter_names_dict, index, all_subFilter_indexes_dict, found_filter_name, found_subFilter_index)

        all_subFilter_indexes_dict[params.type][found_filter_name][found_subFilter_index] = index

        __set_all_specfic_Params_inAllSearchParamsDict()

        __set_page_inAllSearchParamsDict(1)
        await __getPageData()

        loadingShow = false
    }

    // 重置all_subFilter_indexes_dict中所有坐标为0, 默认done， logsEdit, Ordering, exonicFuncrefgene
    function __reset_indexes_inAllSubFilterIndexesDict_params_inAllSearchParamsDict(filter_list=null){
        let subFilter_indexes = all_subFilter_indexes_dict[params.type]
        let filters = Object.keys(subFilter_indexes)
        if(filter_list && filter_list.length>0){
            filters = filter_list
        }
        // console.log('__reset_indexes_inAllSubFilterIndexesDict_pa... subFilter_indexes, filters', subFilter_indexes, filters)
        for (let filter of filters){
            subFilter_indexes[filter] = Array(subFilter_indexes[filter].length).fill(0)
        }

        all_subFilter_indexes_dict = all_subFilter_indexes_dict

        __set_all_specfic_Params_inAllSearchParamsDict()
    }
    function __set_param_ids_inAllSearchParamsDict(ids){
        all_search_params_dict[params.type][dict.IDS] = ids && ids.length>0?ids.join(','):null
    }
    // 重置页面搜索参数，如果给ids列表，就用ids列表更新搜索参数ids
    //"page_size", 没有改动！！！  "panalId",没有改动，"search",没有改动，
    //"sampleIds",使用全部样本， "page", 设为1  （"done", "logsEdit", 'ordering', "exonicfuncRefgene",）全部设为默认0号选项，
    // 'ids'，设为选定或null
    function __reset_params_byIds_exceptPageSize_inAllSearchParamsDict(ids=null){
        // 重置所有特殊过滤的坐标, 以及params, 包括exonicfuncRefene，done，logEdits，ordering
        __reset_indexes_inAllSubFilterIndexesDict_params_inAllSearchParamsDict()
        // 重置sampleIds，全选所有样本，其中包含params
        handleToggleAllSample(null, true)
        // 页面Page切换回第1页，其中含params
        __set_page_inAllSearchParamsDict(1)
        // 设置过滤ids，在params中
        __set_param_ids_inAllSearchParamsDict(ids)
    }
    let query_ids = ''
    let idsInput
    let idsGroupSelectShow = false
    function handleOpenIDsGroupSelect(){
        // console.log("handleOpenIDsGroupSelect")
        idsGroupSelectShow = true
    }
    function handleCloseIDsGroupSelect(){
        // console.log("handleCloseIDsGroupSelect")
        idsGroupSelectShow = false
    }
    function handleIdsGroupSelect(type){
        // console.log("handleIdsGroupSelect", type)
        idsGroupSelectShow = false

        let ids = []
        switch (type) {
            case dict.NOW_SELECTED_IDS:
                ids = all_selected_dataIds_dict[params.type]
                query_ids = ids.join(' ')
                break
            case dict.MUL_AFF_IDS:
                Object.keys(logs_together_dict).forEach(log_id=>{
                    let log_detail = logs_together_dict[log_id]
                    if(log_detail[dict.IDS].length>1) {
                        log_detail[dict.IDS].forEach(id => {
                            if (ids.indexOf(id)===-1) {
                                ids.push(id)
                            }
                        })
                    }
                })
                query_ids = ids.join(' ')
                break
            case dict.A_US_IDS:
                ids = Object.keys(all_status_of_data_dict[params.type]).reduce((result, id)=>{
                    if([dict.CHECKED, dict.EDITED, dict.DELETED].indexOf(all_status_of_data_dict[params.type][id])!==-1){
                        result.push(id)
                    }
                    return result
                }, [])
                query_ids = ids.join(' ')
                break
            case dict.E_US_IDS:
                ids = Object.keys(all_status_of_data_dict[params.type]).reduce((result, id)=>{
                    let unequal_values = __check_unequalValues_ofModifiyFields(id)
                    if(all_status_of_data_dict[params.type][id]!==dict.DONE &&
                        Object.keys(unequal_values).length>0){
                        result.push(id)
                    }
                    return result
                }, [])
                query_ids = ids.join(' ')
                break
            case dict.UA_US_IDS:
                ids = Object.keys(all_status_of_data_dict[params.type]).reduce((result, id)=>{
                    if(all_status_of_data_dict[params.type][id]===dict.FREE){
                        result.push(id)
                    }
                    return result
                }, [])
                query_ids =  ids.join(' ')
                break
            default:
                break
        }

        idsInput.focus()
    }
    //控制ids查询数据
    async function handleIdsQueryKeydown(event){
        if (event.which !== 13) return;
        event.preventDefault();
        // console.log('handleIdsQueryKeydown', query_ids)
        let query_list = query_ids.split(/[ ]+/)
        let ids = []
        query_list.forEach(query=>{
            // console.log(`<${query}>`, query==='')
            let reg = /^[0-9]*$/g
            if (query!=='' && reg.test(query)){
                let id = parseInt(query)
                if (ids.indexOf(id)===-1) ids.push(id)
            }
        })
        console.log('handleIdsQueryKeydown', ids)

        __reset_params_byIds_exceptPageSize_inAllSearchParamsDict(ids)

        await __getPageData()
    }

    async function handleClearQueryIDS(){
        query_ids = ''

        __reset_params_byIds_exceptPageSize_inAllSearchParamsDict()

        await __getPageData()
    }

    // 用于绑定exonicfuncRefgene标题筛选框, 一个页面只能绑定一次
    // let exonicfuncRefgeneSelection
    // async function change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict(index){
    //     console.log("change_exonicfuncRefgene_index_in_AllSubFilterIndexesDict", index)
    //     all_subFilter_indexes_dict[params.type][dict.EXONICFUNCREFGENE][0] = index
    //
    //     // 因为exonicFuncRefGene筛选项变化，页面先设置为1
    //     all_search_params_dict[params.type][dict.PAGE] = 1
    //     // 其中包含，页面切换回第一页
    //     __set_all_specfic_Params_in_AllSearchParamsDict()
    //
    //     await __getPageData()
    // }


    // 当前页面数据的总条数 todo 需要手动更新
    let data_count
    // 当前总页数
    let total_page_nums

    function __set_page_inAllSearchParamsDict(page){
        all_search_params_dict[params.type][dict.PAGE] = page
    }
    async function handleChangePageSize(event){
        console.log("handleChangePageSize", event.detail.pageSize, all_search_params_dict[params.type][dict.PAGE_SIZE])
        if( event.detail.pageSize !== all_search_params_dict[params.type][dict.PAGE_SIZE]){
            all_search_params_dict[params.type][dict.PAGE_SIZE] = event.detail.pageSize

            // 当前sheet的totalPageNums更新，data_num固定，但是当前页page_size生了变化！
            __updateTotalPageNums()
            // 当前sheet的nowPageNum设置为1，返回第一页
            __set_page_inAllSearchParamsDict(1)

            await __getPageData()
        }
    }
    async function handleChangePage(event){
        console.log("handleChangePage", event.detail.page)

        __set_page_inAllSearchParamsDict(event.detail.page)

        await __getPageData()
    }

    // 整个表的sampleId的列表
    let sample_list = []
    // key为sampleSn, value为sample_list中值
    let sample_dict = {}

    // 选中的样本id列表
    let selected_sampleId_list = []
    let pre_selected_sampleId_list = []
    // panal能否被操作的状态
    let panal_unable_handle = false
    let panal_data

    //需要样本记录的页面 列表
    let sheet_needSampleRecordDict_list = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
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

    // 可以执行全部审核操作的页面列表
    let sheet_needAllCheck_list = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        // 筛选当中有 ‘logsEdit=’的需要，才说明有编辑的可能性
        if (sheetDisplayConfigDict[item[dict.SHEET]][dict.NEED_ALL_CHECK]) result.push(item[dict.SHEET])
        return result
    },[])))

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

        //A) 先上传log
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
                errors = error
                fail_logs.push(log_id)
            })

            let time = getTime()
            all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 日志(${log_id.split('-')[0]}...)${success?'已上传。':'上传失败！'}`]
        }

        console.log("submitAffirmedData success_logs fail_logs", success_logs, fail_logs)

        let time = getTime()
        all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 日志上传${success_logs.length}条，失败${fail_logs.length}条`]
        if(fail_logs.length>0) {
            // 如果有日志提交失败就停止后续数据的更新提交
            errors = '日志上传失败，取消后续提交！'
            loadingShow = false
            return
        }


        //B) 开始上传数据
        // key为log_id, value为成功提交的ids列表
        let success_num = 0
        let fail_num = 0
        // 以logId为key，成功提交的ids为值
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
                __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sampleId, dict.DONE)
                // // 2) 更新页面的availableSelect 替换 __getPageData()中G)全部整体更新
                // __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                // // 3) availableEdit修改为false 替换 __getPageData()中B)全部整体初始化false
                // __set_oneId_false_availEdit_inPageIdAvailEditDict(id)
            }).catch(error=>{
                errors = error
                fail_num++
                console.log(`submitAffirmedData update${name}`, error)
            })

            let time = getTime()
            all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} ${all_preValue_of_data_dict[params.type][id][dict.SAMPLESN]} ${id} ${success?'提交成功。':'提交失败！'}`]
        }
        // console.log("submitAffirmedData success_ids fail_ids", success_ids_dict)

        // 1) 找出全部提交成功的logId号
        let complete_logIds = []
        // 以logId为key，部分提交成功的ids为key，后续做出提醒！！
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
            let locked_logId = all_locked_logId_for_adjustMultipleAffirmItems[params.type]
            if(locked_logId === log_id){
                console.log('submitAffirmedData', locked_logId)
                delete all_locked_logId_for_adjustMultipleAffirmItems[params.type]
            }
            delete logs_together_dict[log_id]
        })


        // a. 消息提示整体情况
        time = getTime()
        let left_message = fail_num?`，失败${fail_num}条`:'。'
        all_uploadMessage_dict[params.type] = [...all_uploadMessage_dict[params.type], `${time} 提交成功${success_num}条${left_message}`]
        // b. seletect_ids清空
        __reset_selectedIds_inAllSelectedDataIdsDict()
        // // c. 如果当前affrim工作状态需要更新previousLogs 替换 __getPageData()中F)一致
        // if(affirmSelection_dict[all_affirmWorkingStatus_of_sheet_dict[params.type]][dict.PREVIOUS_LOG_UPDATE]){
        //     await __update_Ids_and_relatedIds_PreviousLogs()
        // }

        __set_page_inAllSearchParamsDict(1)
        await __getPageData()

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
                __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, type, reason, unequal_values)
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
                    __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_id, type, null, unequal_values, log_id_mulAffirm)
                    // 2）重置availableSelect
                    __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                }

                // 3) 最后，清空当前页被选中的数据id
                __reset_selectedIds_inAllSelectedDataIdsDict()
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
                    __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_ids[id], dict.FREE, null, null, null, true)
                    __update_oneId_availSelect_inPageIdAvailSelectDict(id)
                })
                difference[dict.ADDED_IDS].forEach(id=>{
                    // 同上，判断修改类型
                    let unequal_values = __check_unequalValues_ofModifiyFields(id)
                    let type = unequal_values.hasOwnProperty(dict.DELETE) && unequal_values[dict.DELETE]?dict.DELETED:dict.EDITED
                    // console.log('handleAddReasonSure', unequal_values, type, id)
                    // 1) 分别修改相关记录，reason不用提交了
                    __change_dataStatusandPreValueandNowValue_params_logs_sampleRecord_sheetRecord(id, sample_ids[id], type, null, unequal_values, locked_logId, true)
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
    function __openEdit_byOneId_inAllPageIdAvailEditDict(id){
        for (let data of page_data){
            // todo 小心data_id类型为string，id为number
            // console.log("handle_lindTR_rightClicked", typeof data_id, typeof id)
            let data_id = data[dict.ID]
            page_id_availableEdit_dict[data_id] = id === data_id
        }
    }
    function handle_lineTR_rightClicked(e, id, sample_id){
        let affirm_status = all_affirmWorkingStatus_of_sheet_dict[params.type]
        // 1.必须id状态为free；2.必须affrim工作状态允许编辑 3.按住ctrl键
        if (all_status_of_data_dict[params.type][id]===dict.FREE &&
                affirmSelection_dict[affirm_status][dict.AVAILABLE_EDIT] &&
                e.ctrlKey){
            // 将现在ctrl点击id的设为true,其余遍历设置为false
            __openEdit_byOneId_inAllPageIdAvailEditDict(id)
        }

        __change_dataIds_and_sampleIds(id, sample_id)
        __handleUpdateIgvShow()
    }

    let genes_connectImmune_dict = JSON.parse(JSON.stringify(sheetDisplayConfigList.reduce((result, item)=>{
        let sheet = item[dict.SHEET]
        if (item[dict.CONNECT_IMMUNE]){
            result[sheet] = []
        }
        return result
    }, {})))

    // 加载初始化
    function __setSampleList_and_AllSampleRecordDict__allSpecificFilters(data){
        //1） 更新sample_list
        let sampleInfoInPanals = data.sampleInfoInPanals

        sample_list = JSON.parse(JSON.stringify(sampleInfoInPanals.map(sampleInfoInPanal=>{
            let sample = sampleInfoInPanal[dict.SAMPLE]
            return {
                id: sample[dict.ID],
                sampleSn: sample[dict.SAMPLESN],
                type: sample[dict.TYPE]
            }
        })))
        // console.log("__setSampleIdList_and_AllSampleRecordDict__allSpecificFilters", sampleInfoInPanals, sample_list)

        // 顺便初始化已选择的样本id列表，即selected_sampleId_list
        selected_sampleId_list = JSON.parse(JSON.stringify(sample_list.map(sample=>sample[dict.ID])))

        // 顺便初始化 {NGS200306-14: 1, NGS200306-22: 2, NGS200306-42: 3, NGS200208-38: 4}
        sample_dict = JSON.parse(JSON.stringify(sampleInfoInPanals.reduce((result, sampleInfoInPanal)=>{
            let sample = sampleInfoInPanal[dict.SAMPLE]
            let sampleSn = sample[dict.SAMPLESN]
            result[sampleSn] = sample
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
        // 先更新all_subFilters_dict中的三张表名, 再再subFilter_selections_dict中添加这三张表
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

        // 4) 加载与免疫相关的各个表的基因
        for (let sheet in genes_connectImmune_dict){
            let genes = data[`${sheet.toLowerCase()}_genes_inImmune`].split(';')
            genes_connectImmune_dict[sheet] = genes
        }

        // 顺便更新所有的页面搜索参数初始化
        __set_all_specfic_Params_inAllSearchParamsDict()
    }


    // 处理sample样品全选、取消全选的切换
    async function handleToggleAllSample(e, force=false){
        console.log('<=== handleToggleAllSample force', force)
        loadingShow = true

        if (force || selected_sampleId_list.length !== sample_list.length) {
            selected_sampleId_list =  sample_list.map(item => item[dict.ID])

            //更新当前sampleIds查询参数
            all_search_params_dict[params.type][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
        }else{
            selected_sampleId_list = []

            //更新当前sampleIds查询参数, 如果不设置就是&sampleIds=&, 返回的还是全部数据
            all_search_params_dict[params.type][dict.SAMPLEIDS] = 0
        }

        // 切换回第一页
        __set_page_inAllSearchParamsDict(1)

        if(!force){
            await __getPageData()
        }

        loadingShow = false
    }
    // 处理sample样品单独选择
    async function handleSelectSample(sample_id) {
        console.log('handleSelectSample ' + sample_id)
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
        __set_page_inAllSearchParamsDict(1)

        await __getPageData()

        loadingShow = false
    }


    // 获取所有样本的id和sampleSn信息
    async function getSampleList(){
        loadingShow = true

        await api.retrievePanal(params.panalId).then(response=>{
            // console.log("getPanalSummary", response.data)

            panal_unable_handle = response.data.done || response.data.delete ? true:false
            panal_data = response.data

            // 初始化sampleId_list, 利用sampleInfoInPanals中样本信息，对手工表All_sample_record_dict初始化
            __setSampleList_and_AllSampleRecordDict__allSpecificFilters(response.data)

        }).catch(error=>{
            console.log("getSampleList", error)
            errors = error
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

    // function __reset_exonicfuncRefgeneSelection_and_preParamsExonicFuncRefgeneIndex(){
    //     if (exonicfuncRefgeneSelection){
    //         // 筛选框重置
    //         exonicfuncRefgeneSelection.value = 0
    //
    //         // 之前页面的筛选坐标重置
    //         all_subFilter_indexes_dict[pre_params_type][dict.EXONICFUNCREFGENE][0] = 0
    //
    //         // 修改param的exonicFuncrefgene的值，偷懒把特殊的筛选项params重置了
    //         __set_all_specfic_Params_in_AllSearchParamsDict()
    //     }
    // }


    // 动态更新当前页面信息, 这种做法 todo getpagedata 刷新页面一次，又会通过这个再刷新一次页面
    // $: if (pre_params_type !== params.type) {
    //     __getPageData()
    // }

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

    async function __handleExcelOut(){
        loadingShow = true

        await api.createExcel({
            panal_id: parseInt(params[dict.PANALID]),
            sample_ids: all_selected_dataIds_dict[params.type].join(',')
        }).then(response=>{
            // console.log('__handleExcelOut', response.data)
            window.location.href = response.data.excel
        }).catch(error=>{
            console.log('__handleExcelOut', error)
            errors = error
        })

        loadingShow = false
    }

    function __get_sampleSn_bySampleId_inSampleList(sample_id) {
        let sample = sample_list.find(item=>item.id===sample_id)
        return sample? sample[dict.SAMPLESN] : null
    }
    function __getSampleTypeSubMenu(sample_id) {
        // console.log("__getSampleTypeSubMenu", sample_list, sample_id)
        let sampleSn = __get_sampleSn_bySampleId_inSampleList(sample_id)
        return sampleTypeConfig.map(item=>{
            let type = item[dict.VALUE]
            let name = item[dict.TRANSLATE]
            let sample_type = sample_dict[sampleSn][dict.TYPE]
            // console.log("__getSampleTypeSubMenu", type, sampleSn,  sample_dict)

            return {
                label: name,
                type: 'checkbox',
                checked: type === sample_type,
                click: ()=>{
                    // console.log("__getSampleTypeSubMenu click")
                    if(type!==sample_type){
                        openSureMessage(dict.SAMPLE_TYPE, dict.CHANGE, {
                            sample_id,
                            panal_id: params.panalId,
                            sampleSn,
                            type
                        })
                    }
                }
            }
        })
    }

    async function __handleContextMenu(e){
        // sheet页选择
        if (document.querySelector('.subMenuWrapper').contains(e.target)){
            let element =getParentNodeByParentClassName(e.target, 'submenuBtn')
            let sheet = element.dataset.sheet
            console.log("__handleContextMenu sheet", sheet)

            //首先点在了sheet上，右键的sheet与当前params.type一致，并且sheet是需要全部审核的
            if (sheet && params.type===sheet && sheet_needAllCheck_list.indexOf(sheet)!==-1){
                let menu = new remote.Menu()

                // 计算sheet页内，已选样本的数据总数
                let count = selected_sampleId_list.reduce((count, sample_id)=>{
                    count = count + all_sample_record_dict[params.type][sample_id][dict.ALLDATA]
                    return count
                }, 0)

                let recoverMenuItem = new remote.MenuItem({
                    label: `"${submenu_translate_dict[sheet]}"页-选中样本-全部审核(仅限无修改项)`,
                    enabled: count!==0,
                    click: ()=>{
                        // console.log('全部审核')
                        openSureMessage(dict.FREE_UNMODIFIED, dict.CHECK)
                    }
                })
                menu.append(recoverMenuItem)

                menu.popup({window: remote.getCurrentWindow()})
            }

        }

        // 右键upTable 标题栏
        if (document.querySelector('.upTable').contains(e.target)){
            // console.log('右键upTable', document.body.clientWidth, e.clientX)

            let screenWidth = document.body.clientWidth
            let clientX = e.clientX
            let offfset = params.type===dict.SAMPLEINFOINPANAL?300:0
            selectFields.style.left = clientX + 220 < screenWidth ?
                    `${e.clientX-430+offfset}px`:
                    `${screenWidth-700+offfset}px`
            selectFields.style.display = 'block'
        }

        // 右键downTable处理数据表格
        if (document.querySelector('.downTable').contains(e.target)){
            let lineData_element = getParentNodeByParentClassName(e.target, 'lineData')
            // 使用右键获取当前data的id和sample的id，20.3.19弃用
            let right_id = parseInt(lineData_element.dataset.id)
            let right_sample_id = parseInt(lineData_element.dataset.sampleid)
            let right_id_status = all_status_of_data_dict[params.type][right_id]

            let id = all_now_data_id[params.type]
            let sample_id = all_now_sample_id[params.type]
            let status = all_status_of_data_dict[params.type][id]

            // console.log('handleContextMenu .downTable', lineData_element, right_id, right_sample_id)

            // 多选和非多选状态，生成的右键菜单应该不同
            let menu = new remote.Menu

            // A) 页面概览的特有按钮
            if(params.type===dict.SAMPLEINFOINPANAL){
                let excel_menuItem = new remote.MenuItem({
                    label: all_selected_dataIds_dict[params.type].length===sample_list.length?'生成Excel总表':`${all_selected_dataIds_dict[params.type].length}项生成Excel表`,
                    enabled: all_selected_dataIds_dict[params.type].length>0,
                    click: () => {
                        __handleExcelOut()
                    }
                })
                menu.append(excel_menuItem)

                let add_data_menuItem = new remote.MenuItem({
                    label: '追加数据',
                    click: ()=>{
                        ipcRenderer.send('open-single-excel')
                    }
                })
                menu.append(add_data_menuItem)

                let change_sample_type_menuItem = new remote.MenuItem({
                    label: '更换样本类型',
                    enabled: right_sample_id === sample_id,
                    submenu: __getSampleTypeSubMenu(right_sample_id)
                })
                menu.append(change_sample_type_menuItem)
            }

            // B) 只有 需要编辑的页面 对应不同 “审核工作状态” 特有按钮
            if(sheetDisplayConfigDict[params.type][dict.FILTERS].indexOf(dict.LOGSEDIT) > -1){
                // enabled 必须接受true，false，保证__check...返回true或false
                // 根据 审核工作状态（affirmWorkingStatus）添加的按钮
                switch (all_affirmWorkingStatus_of_sheet_dict[params.type]) {
                    case dict.SIN_CANCEL_OR_AFFIRM:
                        let unequal_values_sinCancelorAffirm = id?__check_unequalValues_ofModifiyFields(id):[]
                        let modified__sinCancelorAffirm = Object.keys(unequal_values_sinCancelorAffirm).length>0

                        let single_copy_MenuItem = new remote.MenuItem({
                            label: '单项复制',
                            enabled: id===right_id && status===dict.FREE ,
                            click: ()=>{
                                openSureMessage(dict.DATA, dict.COPY)
                            }
                        })
                        menu.append(single_copy_MenuItem)

                        let single_edit_MenuItem = new remote.MenuItem({
                            label: '单项编辑',
                            enabled: id===right_id && status===dict.FREE && !page_id_availableEdit_dict[id],
                            click: () => {
                                __openEdit_byOneId_inAllPageIdAvailEditDict(id)
                            }
                        })
                        menu.append(single_edit_MenuItem)

                        let single_recover_MenuItem = new remote.MenuItem({
                            label: '单项恢复',
                            enabled: id===right_id &&
                                    __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id) &&
                                    page_id_availableEdit_dict[id] &&
                                    modified__sinCancelorAffirm,
                            click: ()=>{
                                recover_nowValue_byIDs_fields([id], [...all_modifyTitle_list_dict[params.type], dict.DELETE])
                            }
                        })
                        menu.append(single_recover_MenuItem)

                        if(id && status!==dict.DONE){
                            let sin_affrim_MenuItem = new remote.MenuItem({
                                label: status ===dict.FREE?
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
                        }

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

                        let single_edit_inEditMulAffReason_MenuItem = new remote.MenuItem({
                            label: '单项编辑',
                            enabled: id===right_id && status===dict.FREE && !page_id_availableEdit_dict[id],
                            click: () => {
                                __openEdit_byOneId_inAllPageIdAvailEditDict(id)
                            }
                        })
                        menu.append(single_edit_inEditMulAffReason_MenuItem)

                        let multiple_recover_MenuItem = new remote.MenuItem({
                            label: '批量恢复',
                            enabled: num_mulAffrim>0,
                            click: ()=>{
                                __handleMultipleRecover()
                            }
                        })
                        menu.append(multiple_recover_MenuItem)

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
                                openSureMessage(dict.MULTIPLE_AFFIRM, dict.CANCEL)
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

                        let single_edit_MenuItem_inAdjustMulAffItems = new remote.MenuItem({
                            label: '单项编辑',
                            enabled: id===right_id && status===dict.FREE && !page_id_availableEdit_dict[id],
                            click: () => {
                                __openEdit_byOneId_inAllPageIdAvailEditDict(id)
                            }
                        })
                        menu.append(single_edit_MenuItem_inAdjustMulAffItems)

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
                        let adjust_mulAff_items_menuItem = new remote.MenuItem({
                            label: "增减条目",
                            enabled: locked_logId && !ifEqual?true:false,
                            click: ()=>{
                                preValue = logs_together_dict[locked_logId][dict.VALUE]
                                preDesc = logs_together_dict[locked_logId][dict.DESC]
                                reasonShow = true
                            }
                        })
                        menu.append(adjust_mulAff_items_menuItem)
                        break
                    case dict.CHECK_SINSUB_LOGS:
                        let check_sinSub_logs_MenuItem = new remote.MenuItem({
                            label: '查看历史(单项)',
                            enabled: id===right_id && __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id),
                            click: ()=>{
                                handleCheckSingleSubmitLogs(id)
                            }
                        })
                        menu.append(check_sinSub_logs_MenuItem)
                        break
                    case dict.CANCEL_SUBMIT_DONE:
                        let cancel_submit_done_MenuItem = new remote.MenuItem({
                            label: '撤销提交',
                            enabled: id===right_id && __check_availSelect_of_oneData_alreadyInsideAllStatusOfDataDict(id),
                            click: ()=>{
                                handleCancelSubmitDone(id)
                            }
                        })
                        menu.append(cancel_submit_done_MenuItem)
                        break
                    default:
                        break
                }
            }

            menu.popup({window: remote.getCurrentWindow()})
        }

    }

    // 左侧面板缩进控制
    let retract_able = false
    function handleDividerMouseDown(e){
        // console.log('handleDividerMouseDown')
        e.stopPropagation()
        retract_able = true
    }
    function handleMiddleMouseUp(e){
        // console.log('handleMiddleMouseUp')
        e.stopPropagation()
        retract_able = false
    }
    function handleMiddleMouseMove(e){
        e.stopPropagation()
        if(retract_able){
            // console.log('handleMiddleMouseMove', e.clientX)
            let navLeftElement = document.querySelector('.navLeft')

            if(e.clientX - 130 < 18){
                navLeftElement.style.flex = `0 0 18px`
            }else if(e.clientX - 130 > 300){
                navLeftElement.style.flex = `0 0 300px`
            }else{
                navLeftElement.style.flex = `0 0 ${e.clientX - 130}px`
            }
        }
    }

    // track的configs库, igv.js使用，key为sample_id
    let track_configs_dict = {}
    // 控制java igv使用，key为sample_id
    let bamAndBai_path_dict = {}
    // 用于遍历显示的样本名称
    let sampleSn_inTrackConfigDict_list = []
    // 为track_configs_dict添加track信息
    function __addTrackConfigs(files){
        let bamFiles = fileUtil.getFilesDictBySuffix(files, '.bam')
        let baiFiles = fileUtil.getFilesDictBySuffix(files, '.bai')
        // console.log('__addTrackConfigs', files, bamFiles, baiFiles)

        let paired_Files = {}
        // 循环bamfiles文件
        for (let bam_name in bamFiles) {
            if (baiFiles.hasOwnProperty(bam_name)) {
                let matched_sampleSn = null
                for (let sample of sample_list) {
                    let sampleSn = sample[dict.SAMPLESN]
                    // bam_name样子为NGS200111-53DJ，如果sampleSn为NGS200111-5使用indexOf就会错误配对！！
                    // 没找到包含的就跳过
                    let index = bam_name.indexOf(sampleSn)
                    if (index === -1) continue

                    // 匹配了剩余部分如果还有数字，就不是完全匹配
                    let substr = bam_name.replace(sampleSn, '')
                    // console.log('addtrackconfig', substr)
                    if (substr.match(/\d+/g)) continue

                    matched_sampleSn = sampleSn
                    //找到与 文件截断名（bam_name） 匹配的sampleSn后退出遍历
                    break
                }

                if(matched_sampleSn){
                    paired_Files[matched_sampleSn] = {"bam": bamFiles[bam_name], "bai": baiFiles[bam_name]}
                }
            }
        }
        // console.log("__addTrackConfigs", paired_Files)

        for (let sampleSn in paired_Files) {
            let sampleId = sample_dict[sampleSn][dict.ID]
            if (sampleId === undefined) continue

            track_configs_dict[sampleId] = {
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

            // 新的样本路径 会把 旧的样本路径 替换掉
            bamAndBai_path_dict[sampleId] = [
                paired_Files[sampleSn][dict.BAM][dict.PATH].replace(/\\/g,'/'),
                paired_Files[sampleSn][dict.BAI][dict.PATH].replace(/\\/g,'/')
            ]

            // 刷新遍历显示用的sampleSn_inTrack_list
            if (sampleSn_inTrackConfigDict_list.indexOf(sampleSn) === -1) {
                sampleSn_inTrackConfigDict_list.push(sampleSn)
            }
        }
        sampleSn_inTrackConfigDict_list = sampleSn_inTrackConfigDict_list

    }
    // 加载ban，bai文件
    function loadFiles() {
        let fileWidget = document.getElementById('fileWidget')
        let files = fileWidget.files
        //添加igv轨道信息
        __addTrackConfigs(files)
        fileWidget.value = ''

        loadTracks()
    }

    // 控制igv加载轨道
    // 加载igv的tracks
    function loadTracks() {
        // console.log('loadtracks begin')

        // 先移除所有的tracks
        // igvBrowser.removeAllTracks()

        let reordered_sampleIds_list = []
        let now_sample_id = all_now_sample_id[params.type]
        // console.log('loadTracks', all_now_sample_id[params.type] + " " + selected_sampleId_list)

        reordered_sampleIds_list = now_sample_id && selected_sampleId_list.indexOf(now_sample_id)!== -1?
                [now_sample_id, ...removeFromUniqueArray(selected_sampleId_list, now_sample_id)]:
                selected_sampleId_list

        // console.log('loadTracks', reordered_sampleIds_list)

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

        pre_selected_sampleId_list = JSON.parse(JSON.stringify(selected_sampleId_list))
    }
    // 取消所有track信息
    function clearTracks () {
        track_configs_dict = {}
        sampleSn_inTrackConfigDict_list = []
        // if (igvBrowser) {
        //     igvBrowser.removeAllTracks()
        // }

        //bamAndBai文件路径置空
        bamAndBai_path_dict = {}
        if(settingsStore.get('ifIgvConnect')){
            ipcRenderer.send('remove-tracks')
        }

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
    function __changeLocus(chr, posEnd, posStart){
        let query = __calculateScope(chr, posStart, posEnd)

        if(settingsStore.get('ifIgvConnect')){
            ipcRenderer.send('search-locus', query)
        }else{
            errors = '使用igv，请设置"勾选连接igv"、打开igv。'
        }
    }

    //更新igv
    function __handleUpdateIgvShow(){
        let now_data_id = all_now_data_id[params.type]
        let pre_data_id = all_pre_data_id[params.type]
        let now_sample_id = all_now_sample_id[params.type]
        let pre_sample_id =  all_pre_sample_id[params.type]
        // 判断该页面是否需要igv控制
        if(sheetDisplayConfigDict[params.type][dict.IGV_CONTROL]){
            let posStart = all_nowValue_of_data_dict[params.type][now_data_id][dict.POSSTART]
            let posEnd = all_nowValue_of_data_dict[params.type][now_data_id][dict.POSEND]
            if (!posStart && !posEnd) return

            // 选择的sampleId列表有内容增减，或者 需要新sampleId置顶（当前sampleId变化了）
            let ifEqual = ifContentEqualArrays(selected_sampleId_list, pre_selected_sampleId_list)
            if(!ifEqual || (settingsStore.get('ifNowMutantTop') && pre_sample_id !== now_sample_id)){
                loadTracks()
            }

            // 非同一mutant， 进入后再判断位置是否有变化
            let chr = all_nowValue_of_data_dict[params.type][now_data_id][dict.CHR]
            if (pre_data_id !== now_data_id) {
                __changeLocus(chr, posEnd, posStart)
            }
        }
    }

    function handleSelectSampleId(sample_id){
        // console.log('handleSelectSampleId', sample_id)
        let selected_sample_ids = all_selected_dataIds_dict[params.type]
        if (selected_sample_ids.indexOf(sample_id)!==-1){
            all_selected_dataIds_dict[params.type] = removeFromUniqueArray(selected_sample_ids, sample_id)
        }else{
            all_selected_dataIds_dict[params.type] = [...selected_sample_ids, sample_id]
        }
    }

    function handleToggleAllSample_inSampeInfoInPanal(){
        if(all_selected_dataIds_dict[params.type].length===sample_list.length){
            all_selected_dataIds_dict[params.type] = []
        }else{
            all_selected_dataIds_dict[params.type] = sample_list.map(sample=>sample[dict.ID])
        }
    }

    let subMenuWrapper
    let submenu_group_list = [[]]
    let submenu_total_page = 1
    let submenu_page = 0
    function __updateSubmenuGroups(){
        let subMenuWrapper_width = subMenuWrapper.offsetWidth
        //防止出现num等于0， total_page变为infinite
        if (subMenuWrapper_width<100) return
        let subMenuBn_width =  90
        let num = Math.floor(subMenuWrapper_width/(subMenuBn_width+6))
        submenu_total_page = Math.ceil(submenu_list.length/num)
        // console.log('__handleWindowResize', subMenuWrapper_width, subMenuBn_width, num, submenu_total_page)

        let submenu_groups = []
        let paramsType_page
        for (let i=0;i<submenu_total_page;i++){
            let group = submenu_list.slice(num*i, num*(i+1))
            if (group.indexOf(params.type)!==-1) {
                paramsType_page = i
            }
            submenu_groups.push(group)
        }
        submenu_group_list = submenu_groups
        submenu_page = paramsType_page
    }
    function handleChangeSubmenuPage(offset){
        let next_page = submenu_page + offset
        if(next_page>-1 && next_page<submenu_total_page){
            submenu_page = next_page
        }
    }

    // 是否打开行数参数
    let openLineNum = settingsStore.get("ifShowLineNum")
    // 是否打开样本信息图标，目前为sample type
    let openSampleInfo = settingsStore.get("ifShowSampleInfo")

    // 删除某条记录的1. params, 2. log_id，3. 日志详情中的ids剔除或整个删除
    function __delete_oneData_params_logRelated(sheet, str_id){
        let id = parseInt(str_id)
        // console.log("__delete_oneData_params_logRelated all_submit_logs_dict[sheet] logs_together_dict sheet id", JSON.parse(JSON.stringify(all_submit_logs_dict[sheet])), JSON.parse(JSON.stringify(logs_together_dict)), sheet, id)

        if (all_submit_logs_dict[sheet].hasOwnProperty(id)){
            let log_id = all_submit_logs_dict[sheet][id]
            //1)判断日志是否有详情, 修改ids 或 删除日志详情
            if(logs_together_dict.hasOwnProperty(log_id)){
                let log_detail = logs_together_dict[log_id]
                // console.log("__delete_oneData_params_logRelated log_id, log_detail", log_id, log_detail)
                let ids = log_detail[dict.IDS]
                // 判断是否在组内, 即是否还有其它数据
                if (ids.length > 1) {
                    logs_together_dict[log_id][dict.IDS] = removeFromUniqueArray(ids, id)
                }else{
                    delete logs_together_dict[log_id]
                }
            }

            // 2）删除数据对应的log_id
            delete all_submit_logs_dict[sheet][id]
            // 3）删除数据对应的params
            delete all_submit_params_dict[sheet][id]
        }
    }

    // 追加数据相关参数
    let addDataShow = false
    async function handleAddDataSubmit(e){
        // console.log('handleAddDataSubmit', e.detail.data, added_data_dict[dict.SHEET_INFO_LIST])

        addDataShow = false
        loadingShow = true

        let data_info = e.detail.data
        let data_sheet = data_info.reduce((result, data)=>{
            if(data[dict.STATUS_FOR_DATA_UPDATE]){
                result[data[dict.VALUE]] = data[dict.NAME]
            }
            return result
        }, {})
        let template_sheet = data_info.reduce((result, data)=>{
            if(data[dict.STATUS_FOR_TEMPLATE_UPDATE]){
                result[data[dict.VALUE]] = data[dict.NAME]
            }
            return result
        }, {})
        console.log("handleAddDataSubmit", data_sheet, template_sheet)

        let form = new FormData()

        form.append('data_sheet', JSON.stringify(data_sheet))
        form.append('template_sheet', JSON.stringify((template_sheet)))
        form.append('file', added_data_dict[dict.FILE])
        form.append('token', userInfo.getToken())
        form.append('panal_id', params.panalId)
        let data = null
        // 发送上传追加的数据
        await api.addData(form).then(response=>{
            // console.log('handleAddDataSubmit', response.data)
            data = response.data
        }).catch(error=>{
            console.log('handleAddDataSubmit', error)
            errors = error
        })

        if (data){
            // 1) 更新sample_list，sampleSn_dict
            let added_sample_dict = data.samples
            console.log('handleAddDataSubmit added_sampleSn_dict', added_sample_dict)
            for (let sampleSn in added_sample_dict){
                let sample = added_sample_dict[sampleSn]
                sample_list.push({
                    id: sample[dict.ID],
                    sampleSn,
                    type: sample[dict.TYPE]
                })
                sample_dict[sampleSn] = sample
            }
            // 样本设为全选
            selected_sampleId_list = JSON.parse(JSON.stringify(sample_list.map(sample=>sample[dict.ID])))
            //更新所有页sampleIds查询参数
            sheetDisplayConfigList.forEach(item=>{
                let sheet = item[dict.SHEET]
                all_search_params_dict[sheet][dict.SAMPLEIDS] = selected_sampleId_list.join(',')
            })
            // console.log('handleAddDataSubmit', sample_list, sampleSn_dict)

            // 2) 更新all_sample_record_dict， all_sheet_record_dict
            // 为新的sample进行初始化
            for (let sampleSn in added_sample_dict){
                let id = sample_dict[sampleSn][dict.ID]
                for (let sheet in all_sample_record_dict){
                    all_sample_record_dict[sheet][id] = {
                        allData: 0,
                        subAndAffData: 0,
                        unsubAndAffData: 0,
                        unsubAndUnaffData: 0
                    }
                }
            }

            // 3）为新增的数据信息，更新记录
            let info = data.info
            // console.log('handleAddDataSubmit info', info)
            for (let sheet in info){
                let total = 0
                let sheet_need_edit = sheetDisplayConfigDict[sheet][dict.FILTERS].indexOf(dict.LOGSEDIT) > -1

                for (let sampleSn in info[sheet]) {
                    let value = info[sheet][sampleSn]
                    // 统计sheet页新添加总数
                    total = total + value
                    let id = sample_dict[sampleSn][dict.ID]

                    // console.log('handleAddDataSubmit', sheet, sampleSn, id, value, total)
                    let pre_allData = all_sample_record_dict[sheet][id][dict.ALLDATA]
                    let pre_subAndAffData = all_sample_record_dict[sheet][id][dict.S_ADATA]
                    let pre_unsubAndUnaffData = all_sample_record_dict[sheet][id][dict.US_UADATA]

                    // console.log('handleAddDataSubmit', pre_allData, pre_subAndAffData, pre_unsubAndUnaffData)
                    all_sample_record_dict[sheet][id][dict.ALLDATA] = pre_allData + value
                    if(sheet_need_edit){
                        all_sample_record_dict[sheet][id][dict.US_UADATA] = pre_unsubAndUnaffData + value
                    }else{
                        all_sample_record_dict[sheet][id][dict.S_ADATA] = pre_subAndAffData + value
                    }

                }

                // 更新all_sheet_record_dict
                if(sheet_need_edit){
                    all_sheet_record_dict[sheet][dict.US_UADATA] = all_sheet_record_dict[sheet][dict.US_UADATA] + total
                }else{
                    all_sheet_record_dict[sheet][dict.S_ADATA] = all_sheet_record_dict[sheet][dict.S_ADATA] + total
                }
            }

            // 4)更新subFilter_selections_dict
            let exonicfuncRefgenes = data.exonicfuncRefgenes
            // console.log('handleAddDataSubmit exonicfuncRefgenes', exonicfuncRefgenes)

            for (let sheet in exonicfuncRefgenes){
                let values = exonicfuncRefgenes[sheet]
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

            //5) 更新preValue，nowValue，TMB和sampleInfo中数据可能被更新而非仅仅是自动添加,
            let updatedData = data.updatedData
            // console.log('handleAddDataSubmit updatedData', updatedData)

            for (let updated_data of updatedData){
                let sheet = updated_data[dict.SHEET]
                let id = updated_data[dict.ID]
                let data = updated_data[dict.DATA]

                // 先查看本地是否有此条数据
                if (all_status_of_data_dict[sheet].hasOwnProperty(id)){
                    let status = all_status_of_data_dict[sheet][id]
                    let sample_id = all_preValue_of_data_dict[sheet][id][dict.SAMPLEID]
                    // 如果是已审核状态，需要sheet，sample统计迁移
                    if ([dict.CHECKED, dict.EDITED, dict.DELETED].indexOf(status)!==-1){
                        __moveCountFromTo_In_AllSampleRecord_and_AllSheetRecord(sample_id, dict.US_ADATA, dict.US_UADATA, sheet)
                    }
                    // 判断是否有日志
                    __delete_oneData_params_logRelated(sheet, id)

                }

                // 直接强制利用数据注入status, nowValue, preValue
                __update_dataStatusDict_nowValueOfDataDict_preValueOfDataDict([data], sheet, true)
            }

            await __getPageData()
        }

        // 清空数据
        added_data_dict = {}
        loadingShow = false
    }
    function handleAddDataCancel(){
        addDataShow = false
        added_data_dict = {}
    }

    let added_data_dict = {}
    async function __handleLoadAddedData(filePath){
        loadingShow = true
        let blob
        let file
        let file_name = filePath.split('\\').slice(-1)
        await fs.readFile(filePath).then(data=>{
            blob  = new Blob([data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            file = new File([blob], file_name, {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', lastModified: Date.now()})
        }).catch(error=>{
            console.log('load-single-excel', error)
            errors = error
        })

        if(file){
            // console.log('__handleLoadAddedData', blob, file) 样式 {clinicaltrials: [{samplesn: ...}, ...], HLA: [], ...}
            await fileUtil.getJsonFromBlob(blob).then(data=>{
                // console.log('load-single-excel', data)
                added_data_dict[dict.FILE] = file
                // added_data_dict[dict.SHEET_DATA_DICT] = data
                added_data_dict[dict.SHEET_INFO_LIST] = Object.keys(data).reduce((result, sheet_name)=>{
                    if(upSheet_name_dict.hasOwnProperty(sheet_name)){
                        // 有数据的勾选 status
                        // console.log(data[sheet_name], data[sheet_name].length, up_sheet_name_dict[sheet_name][dict.SKIP])
                        let data_length =  data[sheet_name].length
                        let pure_data_length = data_length? data_length - upSheet_name_dict[sheet_name][dict.SKIP] : 0
                        let status_for_data_update = pure_data_length > 0
                        let hasTitles_inSheet = data_length!==0

                        let sheet_name_value = upSheet_name_dict[sheet_name][dict.VALUE]
                        let template = panal_data[`${sheet_name_value.toLowerCase()}_template_fields`]
                        let hasTemplate_inDatabase = !!template

                        result.push({
                            name: sheet_name,
                            value: sheet_name_value,
                            pure_data_length,
                            status_for_data_update,
                            hasTitles_inSheet,
                            hasTemplate_inDatabase,
                            status_for_template_update: !hasTemplate_inDatabase && hasTitles_inSheet
                        })
                    }

                    return result
                },[])
                // console.log('__handleLoadAddedData', added_data_dict)
            })
        }

        loadingShow = false
        addDataShow = true
    }
    // let windowScrollTop
    onMount(async () => {
        loadingShow = true
        __updateSubmenuGroups()
        window.addEventListener('resize', __updateSubmenuGroups)

        // pre_params_type = params.type

        // 获取样本列表
        await getSampleList()
        // 更新所有页面查询的panalId, sampleIds参数
        __updatePanalId_and_sampleIdsParams()

        ipcRenderer.on('connect-igv-error-caution',(event, message)=>{
            errors = message
        })
        ipcRenderer.on('reset-errors', ()=>{
            __reset_errors()
        })
        ipcRenderer.on('toggle-line-num', ()=>{
            openLineNum = !openLineNum
        })
        ipcRenderer.on('toggle-sample-info', ()=>{
            openSampleInfo = !openSampleInfo
        })
        ipcRenderer.on('load-single-excel', (event, filePath)=>{
            // console.log('<=== onmount load-single-excel', filePath)
            __handleLoadAddedData(filePath)
        })


        document.addEventListener('contextmenu', __handleContextMenu)
        // window.onscroll = (e)=>{
        //     windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //     console.log('window.onscroll', windowScrollTop)
        //     let topScrollLeft = topScroll.scrollLeft
        //     let bottomScrollLeft = bottomScroll.scrollLeft
        //     if(windowScrollTop<147 && topScrollLeft!==bottomScrollLeft){
        //         topScroll.scrollTo(bottomScrollLeft, 0)
        //     }
        // };

        await __getPageData()

        loadingShow = false
    })

    onDestroy(()=>{
        document.removeEventListener('contextmenu', __handleContextMenu)
        window.removeEventListener('resize', __updateSubmenuGroups)
    })

    beforeUpdate(()=>{
        // before after都一样，都能截取到target hereditary
        // console.log('beforeUpdate', pre_params_type, params.type, doneFilter)

        // TODO clientHeight：包括padding但不包括border、水平滚动条、margin的元素的高度。 offsetHeight为含边框的div高度，scrollTop为元素被上边框遮住的部分，scrollHeight为内容高度
        autoscroll = uploadMessageDiv && (uploadMessageDiv.scrollTop + uploadMessageDiv.clientHeight) < uploadMessageDiv.scrollHeight
    })

    //
    function __update_filter_dom_value(){
        if(doneFilter){
            // console.log('__update_filter_dom_value', all_subFilter_indexes_dict[params.type][dict.DONE][0])
            doneFilter.value = all_subFilter_indexes_dict[params.type][dict.DONE][0]
        }
        if(deleteFilter){
            deleteFilter.value = all_subFilter_indexes_dict[params.type][dict.DELETE][0]
        }
        if(logsEditFilter){
            logsEditFilter.value = all_subFilter_indexes_dict[params.type][dict.LOGSEDIT][0]
        }
    }
    afterUpdate(()=>{
        // console.log('afterUpdate', pre_params_type, params.type, doneFilter)

        if (autoscroll) {
            uploadMessageDiv.scrollTo(0, uploadMessageDiv.scrollHeight)
        }

        //手动更新公用过滤的dom的value值,done,delete,logsEdit
        if(params.type!==pre_params_type){
            __update_filter_dom_value()
            pre_params_type = params.type
        }

    })

    // let testValue = JSON.parse(JSON.stringify(Object.keys(sheetDisplayConfigDict).reduce((result, sheet)=>{
    //     result[sheet] = null
    //     return result
    // }, {})))

    // 测试使用
    function test() {
        // console.log(sample_list, sampleSn_dict)
        // console.log(all_titleListItem_dict, all_wholeTitle_list_dict, all_defaultTitle_list_dict, all_selectTitle_list_dict)
        // console.log(all_sample_record_dict, all_sheet_record_dict)
        // console.log(all_search_params_dict, all_subFilter_indexes_dict, all_subFilter_names_dict, subFilter_selections_dict)
        // console.log(exonicfuncRefgeneSelection)
        // console.log(all_editedData_dict)
        // console.log(all_pre_data_id, all_pre_sample_id, all_now_data_id, all_now_sample_id)
        // console.log(all_modifyTitle_list_dict)
        // console.log(all_titleList_dict)
        // console.log(pageModifyField_mouseEnter_dict)
        // console.log(all_selected_dataIds_dict)
        console.log(all_status_of_data_dict)
        console.log(all_preValue_of_data_dict, all_nowValue_of_data_dict)
        console.log(all_submit_params_dict)
        console.log(all_submit_logs_dict, logs_together_dict)
        // console.log(all_now_data_id[params.type], all_now_sample_id[params.type])
        // console.log(all_affirm_status_dict)
        // console.log(all_selected_dataIds_dict)
        // console.log(page_id_modifyField_mouseEnter_dicts, page_id_availableSelect_dict, page_id_availableEdit_dict)
        // console.log(all_locked_logId_for_adjustMultipleAffirmItems, all_selected_dataIds_dict)
        // console.log(all_previousLog_list_dict)
        // console.log(now_input_field && now_input_id, !panal_unable_handle, now_params_type === params.type, page_id_availableEdit_dict[now_input_id], page_data.some(data=>data.id===now_input_id))
        // console.log(testValue)
        // console.log(track_configs_dict, bamAndBai_path_dict, sampleSn_inTrackConfigDict_list)
        // console.log(field_needCheck_inSampleInfoinPanal)
        // console.log(sheet_needAllCheck_list)
        // console.log(submenu_group_list, submenu_total_page, submenu_page)
        // console.log(sample_list)
        console.log(genes_connectImmune_dict)
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
        flex: 0 0 38px;
        width: 100%;
        border-bottom: 1px solid black;
        display: flex;
        flex-flow: row;
    }
    .subMenu .subMenuDirection{
        flex: 0 0 38px;
        line-height: 38px;
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
    }
    .subMenu .subMenuDirection:hover{
        background: #69ca60;
        color: white;
    }
    .subMenu .subMenuDirection.inactive{
        color: #cccccc;
    }
    .subMenu .subMenuDirection.inactive:hover{
        background: white!important;
        color: #cccccc
    }

    .subMenu .subMenuWrapper{
        flex: 1;
        display: flex;
        flex-flow: row;
        overflow: hidden;
    }
    .subMenu .subMenuWrapper .bnWrapper{
        flex: 1;
        text-align: center;
    }
    .subMenu .submenuBtn{
        margin: 5px 3px;
        padding: 0;
        width: 90px;
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
    .subMenu .selectedSubMenu{
        color: black;
        font-weight: bold;
        box-shadow: 3px 3px 3px black;
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
        flex: 0 0 300px;
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
        background: none;
        z-index: 10;
    }
    .navLeft .divider:hover{
        background: #cccccc;
        cursor: w-resize;
    }
    .navLeft .leftAffirmSelectWrapper{
        position: relative;
        flex: 0 0 32px;
        width: 300px;
        border-bottom: 1px solid black;
    }
    .navLeft .leftAffirmSelectWrapper .commonButton{
        float: left;
        width: 148px;
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
        width: 300px;
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
        box-sizing: border-box;
        width: 300px;
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
        width: 300px;
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
        width: 54px;
        float: left;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper button{
        margin: 2px 3px 0 2px;
        padding: 0px;
        height: 30px;
        line-height: 30px;
        width: 52px;
        font-size: 12px;
        font-weight: bold;
    }
    .navLeft .leftMessageWrapper .messageWrapper .uploadBnWrapper button.disabled{
        color: #cccccc;
        font-weight: normal;
    }

    .leftSelectFileWrapper{
        flex: 0 0 200px;
        width: 300px;
        border-bottom: 1px solid black;
    }
    .leftSelectFileWrapper .selectFile{
        padding: 3px;
        height: 35px;
        width: 300px;
        box-sizing: border-box;
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
        margin: 2px 0;
        height: 165px;
        width: 300px;
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
    .contentRight .filterWrapper{
        box-sizing: border-box;
        padding: 0 5px;
        width: 100%;
        height: 33px;
        font-size: 14px;
        border-bottom: 1px solid #939393;
        display: flex;
    }
    .contentRight .filterWrapper span{
        padding: 0 2px;
        line-height: 33px;
        width: 65px;
        float: left
    }
    .contentRight .filterWrapper select{
        padding: 0;
        margin: 1px;
        height: 30px;
        width: 80px;
        float: right;
    }
    .contentRight .filterWrapper .doneWrapper{
         flex: 0 0 160px;
         height: 33px;
         margin-right: 12px;
     }
    .contentRight .filterWrapper .deleteWrapper{
        flex: 0 0 160px;
        height: 33px;
        margin-right: 12px;
    }
    .contentRight .filterWrapper .logsEditWrapper{
        flex: 0 0 160px;
        height: 33px;
        margin-right: 12px;
    }
    .contentRight .filterWrapper .idsWrapper{
        position: relative;
        flex: 1;
        height: 33px;
    }
    .contentRight .filterWrapper .idsWrapper input{
        float: left;
        padding: 0 30px 0 5px;
        margin: 1px;
        width: 80%;
        height: 30px;
    }
    .contentRight .filterWrapper .idsWrapper input::-webkit-input-placeholder {
        text-align: center;
        font-size: 14px;
        color: #666666;
    }
    .contentRight .filterWrapper .idsWrapper button{
        position: absolute;
        top: 2px;
        left: 341px;
        padding: 0;
        margin: 0;
        width:28px;
        height: 28px;
        font-size: 16px;
        border: none;
        background: none;
        color: #939393;
        border-radius: 0;
    }
    .contentRight .filterWrapper .idsWrapper button:hover{
        background: #939393;
        color: white;
    }
    .contentRight .filterWrapper .idsWrapper .groupSelect{
        position: absolute;
        box-sizing: border-box;
        top: 30px;
        left: 70px;
        padding: 5px;
        width: 300px;
        min-height: 75px;
        border: 1px solid #cccccc;
        background: white;
        z-index: 10;
    }
    .contentRight .filterWrapper .idsWrapper .groupSelect .item{
        margin-down: 3px;
        line-height: 25px;
        width: 100%;
        font-size: 14px;
    }
    .contentRight .filterWrapper .idsWrapper .groupSelect .item:hover{
        color: white;
        background: #69ca60;
    }


    .contentRight .editBigInputWrapper{
        padding: 3px;
        width: 100%;
        flex: 0 0 31px;
        box-sizing: border-box;
        line-height: 33px;
        font-size: 14px;
        border-bottom: 1px solid #939393;
        display: flex;
    }
    .contentRight .editBigInputWrapper .abstract{
        display: block;
        margin: auto 2px;
        flex: 0 0 150px;
        height: 24px;
        line-height: 24px;
        text-overflow: ellipsis;
        white-space:nowrap;
        float: left;
    }
    .contentRight .editBigInputWrapper .bigInput{
        padding: 0 5px;
        margin: auto 5px;
        flex: 1;
        height: 24px;
        line-height: 24px;
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

    .contentRight .dataWrapper .selectFieldsWrapper{
        position: absolute;
        top: 40px;
        left: 3px;
        z-index: 30;
        width: 220px;
        background: white;
        border: 1px solid #939393;
        box-shadow: 3px 3px 3px #cccccc;
        display: none;
        font-size: 14px;
    }
    .contentRight .mutantList .selectFieldsWrapper .firstDefaultTitle{
        margin: 0 0 0 6px!important;
    }
    .contentRight .mutantList .selectFieldsWrapper .firstDefaultTitle .checkBox{
        color: #cccccc;
    }
    .contentRight .mutantList .selectFieldsWrapper .firstDefaultTitle .checkBox.active{
        color: black;
    }
    .contentRight .selectFieldsWrapper .contentWrapper{
        width: 100%;
        min-height: 26px;
        max-height: 273px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-top: 1px solid #cccccc;
        /*border-bottom: 1px solid #cccccc;*/
    }
    .contentRight .selectFieldsWrapper .selectFieldItem{
        margin: 3px auto;
        width: 191px;
        height: 20px;
        cursor: pointer;
    }
    .contentRight .selectFieldsWrapper .selectFieldItem:hover{
        background: #09c762;
    }
    .contentRight .selectFieldsWrapper .selectFieldItem span{
        display: block;
        box-sizing: border-box;
        padding: 0 10px;
        width: 170px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        float: left;
    }
    .contentRight .selectFieldsWrapper .selectFieldItem .checkBox{
        padding: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        float: right;
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
    .contentRight .rightDataTable .contentTD.unequal{
        background: #fc6a56;
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

        position: relative;
    }
    .contentRight .rightDataTable .lineData td .inside.sampleSn .iconWrapper{
        position: absolute;
        top: 1px;
        left: 3px;
        height: 12px;
    }
    .contentRight .rightDataTable .lineData td .inside.sampleSn .iconWrapper .icon{
        height: 12px;
        width: 12px;
        font-size: 12px;
        margin-right: 5px;
        float: left;
    }
    .contentRight .rightDataTable .lineData td .inside.tmbDelete{
        color: red;
        text-decoration: line-through;
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
