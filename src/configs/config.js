// modify: 是否需要修改
// defaultDisplay: 是否作为默认必须显示标题，用于生成defaultDisplayList，默认标题显示顺序
// selectDisplay: 是否需要用作选择性显示标题，用于生成selectDisplayList, 默认菜单栏选择顺序
// fixed固定显示的defaultDisplay true, selectDisplay false,
// default默认显示的defaultDisplay true, selectDisplay true,
// select选择显示的defaultDisplay false, selectDisplay true,
//  不显示的defaultDisplay false, selectDisplay false, 20.3.12 用不到了！

// query_params作用，1，标题栏利用此处关联，
export const common_filters = ["page","page_size","sampleIds","panalId","search",]

export const sheetDisplayConfigList = [
    {
        sheet: "sampleInfoInPanal",
        preValue_nowValue_update: true,
        filters: ["page", "page_size", "sampleIds", "panalId", ],
        submenu_translate: '总览',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                modify: false,
                type: "text",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "targetCount",
                translate: "target总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "targetSubmitCount",
                translate: "target提交总数",
                need_check: true,
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "hereditaryCount",
                translate: "hereditary总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "hereditarySubmitCount",
                translate: "hereditary提交总数",
                need_check: true,
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "TMBCount",
                translate: "TMB总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "TMBSubmitCount",
                translate: "TMB提交总数",
                need_check: true,
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "TNBCount",
                translate: "TNB总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "TNBSubmitCount",
                translate: "TNB提交总数",
                need_check: true,
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "fusionCount",
                translate: "fusion总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "fusionSubmitCount",
                translate: "fusion提交总数",
                need_check: true,
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "CNACount",
                translate: "CNA总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "CNASubmitCount",
                translate: "CNA提交总数",
                need_check: true,
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "immuneCount",
                translate: "immune总数",
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "immuneSubmitCount",
                translate: "immune提交总数",
                need_check: true,
                modify: false,
                type: "number",
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "chemicalCount",
                translate: "chemical总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "chemicalSubmitCount",
                translate: "chemical提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "MSICount",
                translate: "MSI总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "MSISubmitCount",
                translate: "MSI提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "HRRCount",
                translate: "HRR总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "HRRSubmitCount",
                translate: "HRR提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "clinicaltrialsCount",
                translate: "clinicaltrials总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "clinicaltrialsSubmitCount",
                translate: "clinicaltrials提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "HLACount",
                translate: "HLA总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "HLASubmitCount",
                translate: "HLA提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "MLPACount",
                translate: "MLPA总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "MLPASubmitCount",
                translate: "MLPA提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            },{
                title: "QCCount",
                translate: "QC总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "QCSubmitCount",
                translate: "QC提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "sampleInfoCount",
                translate: "sampleInfo总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "sampleInfoSubmitCount",
                translate: "sampleInfo提交总数",
                modify: false,
                type: "number",
                defaultDisplay: false,
                selectDisplay: true
            },
        ]
    },

    {
        sheet: "target",
        filters: ["page", "page_size", "sampleIds", "panalId", "search", "done", 'delete', "logsEdit", 'ordering', "exonicfuncRefgene", 'ids', 'geneNames', 'falseMutant'],
        submenu_translate: '靶向',
        need_all_check: true,
        igv_control: true,
        need_copy: true,
        connect_immune: true,
        show_historyFalsePositiveMutant: true,
        false_mutant_record: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'false_positive',
                content: '假阳性'
            }, {
                value: 'merge_complex_loci',
                content: '复杂位点合并'
            }, {
                value: 'benign',
                content: '良性'
            }, {
                value: 'likely_benign',
                content: '疑似良性'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编号",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
            // 染色体相关
            {
                title: "chr",
                translate: "染色体",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posStart",
                translate: "起始位置",
                type: "number",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posEnd",
                translate: "终止位置",
                type: "number",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "ref",
                translate: "参考序列",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "alt",
                translate: "突变序列",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "freq",
                translate: "频率",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "exonicfuncRefgene",
                type: "text",
                translate: "突变方式",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinsig",
                translate: "突变分类1",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "intervarAutomated",
                translate: "突变分类2",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true
            },


            // 药物相关
            {
                title: "drugLevel",
                translate: "证据等级",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "cancerType",
                translate: "癌症类型",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "drugs",
                translate: "靶向药",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "hgvs",
                translate: "hgvs命名",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "geneVar",
                translate: "位点解析",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "immuneId",
                type: "text",
                translate: "免疫ID",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true,
                redirect: 'immune'
            },


            {
                title: "projectAbbreviation",
                translate: "项目简称",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "NM_ID",
                translate: "转录本",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "GeneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "DNA_change",
                translate: "碱基改变",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "AA_change",
                translate: "氨基酸改变",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            },

            // 依赖于hgvs变更，先允许修改
            {
                title: "wxz",
                translate: "外显子",
                type: "text",
                modify:true,
                defaultDisplay: false,
                selectDisplay: true,
            }, {
                title: "zlb",
                translate: "转录本",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "hgsGb",
                translate: "碱基改变",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "ajsGb",
                translate: "氨基酸改变",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "alteration",
                translate: "基因变异",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "geneType",
                translate: "基因类型",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            },

            // 提供给 hgvs修改参考
            {
                title: "aachangeRefgene",
                translate: "突变描述",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }
        ],
    },

    {
        sheet: "hereditary",
        filters: ["page", "page_size", "sampleIds", "panalId", "search", "done", 'delete', "logsEdit", 'ordering', "exonicfuncRefgene", 'ids', 'geneNames', 'falseMutant'],
        submenu_translate: '遗传',
        need_all_check: true,
        igv_control: true,
        need_copy: true,
        connect_immune: true,
        show_historyFalsePositiveMutant: true,
        false_mutant_record: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'false_positive',
                content: '假阳性'
            }, {
                value: 'merge_complex_loci',
                content: '复杂位点合并'
            }, {
                value: 'benign',
                content: '良性'
            }, {
                value: 'likely_benign',
                content: '疑似良性'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编号",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
            // 染色体相关
            {
                title: "chr",
                translate: "染色体",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posStart",
                translate: "起始位置",
                type: "number",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posEnd",
                translate: "终止位置",
                type: "number",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "ref",
                translate: "参考序列",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "alt",
                translate: "突变序列",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "freq",
                translate: "频率",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "exonicfuncRefgene",
                type: "text",
                translate: "突变方式",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinsig",
                translate: "突变分类1",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "intervarAutomated",
                translate: "突变分类2",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true
            },


            // 药物相关
            {
                title: "hgvs",
                translate: "hgvs命名",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "geneVar",
                translate: "位点解析",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            },

            // 依赖于hgvs变更，先允许修改
            {
                title: "wxz",
                translate: "外显子",
                type: "text",
                modify:true,
                defaultDisplay: false,
                selectDisplay: true,
            }, {
                title: "zlb",
                translate: "转录本",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "hgsGb",
                translate: "碱基改变",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "ajsGb",
                translate: "氨基酸改变",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "alteration",
                translate: "基因变异",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            },

            // 提供给 hgvs修改参考
            {
                title: "aachangeRefgene",
                translate: "突变描述",
                type: "text",
                modify: true,
                defaultDisplay: false,
                selectDisplay: true
            },
            {
                title: "level",
                translate: "等级分类",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
            {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: true
            }, {
                title: "immuneId",
                type: "text",
                translate: "免疫ID",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true,
                redirect: 'immune'
            },
        ],
    },

    {
        sheet: "TMB",
        filters: ["page", "page_size", "sampleIds", "panalId", "search", "done", 'delete', "logsEdit", 'ordering', "exonicfuncRefgene", 'ids', 'geneNames', 'falseMutant'],
        submenu_translate: 'TMB',
        need_all_check: true,
        igv_control: true,
        show_historyFalsePositiveMutant: true,
        false_mutant_record: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'false_positive',
                content: '假阳性'
            }, {
                value: 'merge_complex_loci',
                content: '复杂位点合并'
            }, {
                value: 'benign',
                content: '良性'
            }, {
                value: 'likely_benign',
                content: '疑似良性'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编号",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
            // 染色体相关
            {
                title: "chr",
                translate: "染色体",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posStart",
                translate: "起始位置",
                type: "number",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posEnd",
                translate: "终止位置",
                type: "number",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "ref",
                translate: "参考序列",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "alt",
                translate: "突变序列",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "freq",
                translate: "频率",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "exonicfuncRefgene",
                type: "text",
                translate: "突变方式",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },

            {
                title: "projectAbbreviation",
                translate: "项目简称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },

            // 依赖于hgvs变更，先允许修改
            {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            },

            // 提供给 hgvs修改参考
            {
                title: "aachangeRefgene",
                translate: "突变描述",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }
        ],
    },

    {
        sheet: "TNB",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "done", 'delete', "logsEdit", "ordering", 'ids', 'geneNames'],
        submenu_translate: 'TNB',
        need_all_check: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'TMB_related_modify',
                content: 'TMB相关修改'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编码*",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r2",
                translate: "基因*",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "locusName",
                translate: "突变肽段",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r3",
                translate: "Neoantigen 打分",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r4",
                translate: "野生型肽段",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r5",
                translate: "HLA分型",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r6",
                translate: "新表位打分",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r7",
                translate: "野生型表位打分",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "r8",
                translate: "突变频率",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r9",
                translate: "染色体编号",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r10",
                translate: "突变位置",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "tmb",
                translate: "对应TMB的ID",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "fusion",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "done", 'delete', "logsEdit", "ordering", 'ids', 'geneNames'],
        submenu_translate: '融合',
        need_all_check: true,
        connect_immune: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'false_positive',
                content: '假阳性'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编码",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "chr1",
                translate: "染色体1",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posStart",
                translate: "起始位置",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "chr2",
                translate: "染色体2",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "posEnd",
                translate: "终止位置",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },  {
                title: "freq",
                translate: "频率",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "NM_ID",
                translate: "转录本",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "GeneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "DNA_change",
                translate: "碱基改变",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "AA_change",
                translate: "氨基酸改变",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "drugLevel",
                translate: "证据等级",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "cancerType",
                translate: "癌症类型",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "drugs",
                translate: "靶向药",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "hgvs",
                translate: "hgvs命名",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },  {
                title: "geneVar",
                translate: "位点解析",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "wxz",
                translate: "外显子",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "fusions",
                translate: "融合基因转录本",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "hgsGb",
                translate: "碱基改变",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "ajsGb",
                translate: "氨基酸改变",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "alteration",
                translate: "基因变异",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "exonicfuncRefgene",
                translate: "突变方式",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "aachangeRefgene",
                translate: "突变描述",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "fusionNum",
                translate: "融合reads数",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "immuneId",
                type: "text",
                translate: "免疫ID",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true,
                redirect: 'immune'
            }, {
                title: "researchStatus",
                translate: "研究状态",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            },
        ],
    },

    {
        sheet: "CNA",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "done", 'delete', "logsEdit", "ordering", 'ids', 'geneNames'],
        submenu_translate: 'CNA',
        need_all_check: true,
        connect_immune: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'false_positive',
                content: '假阳性'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编码",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "drugLevel",
                translate: "证据等级",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "cancerType",
                translate: "癌症类型",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "drugs",
                translate: "靶向药",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "immune",
                translate: "免疫相关",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "cnaRatio",
                translate: "变异倍数",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "immuneId",
                type: "text",
                translate: "免疫ID",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true,
                redirect: 'immune'
            }, {
                title: "chr",
                translate: "染色体",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "posStart",
                translate: "起始位置",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "posEnd",
                translate: "终止位置",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "geneInfo",
                translate: "基因描述",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }, {
                title: "AA_change",
                translate: "氨基酸改变",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            },
        ],
    },

    {
        sheet: "immune",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "done", 'delete', "logsEdit", "ordering", 'ids', 'geneNames', 'connectSheet'],
        submenu_translate: '免疫',
        need_all_check: true,
        need_copy: true,
        reason_type: [
            {
                value: 'nothing',
                content: '请选择'
            }, {
                value: 'TMB_related_modify',
                content: 'TMB相关修改'
            }, {
                value: 'target_related_modify',
                content: '靶向相关修改'
            }, {
                value: 'other',
                content: '其它'
            }
        ],
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinicalGuide",
                translate: "检测意义",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "testResult",
                translate: "检测结果",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "effect",
                translate: "疗效预测",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "dataInfo",
                translate: "结果说明",
                type: "text",
                modify: true,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "connectSheet",
                translate: "关联表",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: true,
                immune_connect: true,
            }, {
                title: "projectAbbr",
                translate: "项目简称",
                type: "text",
                modify: false,
                defaultDisplay: false,
                selectDisplay: true
            }
        ],
    },

    {
        sheet: "chemical",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: '化疗',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "projectAbbreviation",
                translate: "projectAbbreviation",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "barcode",
                translate: "barcode",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "medicineName",
                translate: "medicineName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "_geneName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "rsId",
                translate: "rsId",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "geneType",
                translate: "geneType",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "medicineType",
                translate: "medicineType",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinicalGuide",
                translate: "clinicalGuide",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "evidenceLevel",
                translate: "evidenceLevel",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "updateTime",
                translate: "updateTime",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "MSI",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: 'MSI',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "projectAbbr",
                translate: "projectAbbr",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinicalDiagnosis",
                translate: "clinicalDiagnosis",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "totalSites",
                translate: "totalSites",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "msiSites",
                translate: "msiSites",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "percent",
                translate: "percent",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "level",
                translate: "level",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "HRR",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: 'HRR',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "projectAbbreviation",
                translate: "projectAbbreviation",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinicalDiagnosis",
                translate: "clinicalDiagnosis",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "sigmaDiagnosis",
                translate: "sigmaDiagnosis",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "totalSnvs",
                translate: "totalSnvs",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "passMva",
                translate: "passMva",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "passMvaStrict",
                translate: "passMvaStrict",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "testResult",
                translate: "testResult",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "clinicalAdvice",
                translate: "clinicalAdvice",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "clinicaltrials",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering" ],
        submenu_translate: 'clinicaltrials',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "_geneName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "nct_num",
                translate: "nct_num",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "phase",
                translate: "phase",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "brief_title",
                translate: "brief_title",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "intervention_name",
                translate: "intervention_name",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "intervention_type",
                translate: "intervention_type",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "condition",
                translate: "condition",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "country",
                translate: "country",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "overall_status",
                translate: "overall_status",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "study_first_posted",
                translate: "study_first_posted",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "brief_summary",
                translate: "brief_summary",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "HLA",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: 'HLA',
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编码*",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "locusName",
                translate: "位点名称*",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r1",
                translate: "检测内容",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r2",
                translate: "检测结论",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r3",
                translate: "结果提示",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "r4",
                translate: "临床提示",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "MLPA",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: 'MLPA',
        title_list: [
            {
                title: "sampleSn",
                translate: "样本编码",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_geneName",
                translate: "基因名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "MLPA",
                translate: "MLPA结果",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }
        ]
    },

    {
        sheet: "QC",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId", "ordering"],
        submenu_translate: 'QC',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "sampleType",
                translate: "sampleType",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "samplePurity",
                translate: "samplePurity",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "rawReads",
                translate: "rawReads",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "rawBases",
                translate: "rawBases",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "cleanReads",
                translate: "cleanReads",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "cleanBases",
                translate: "cleanBases",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "readPercent",
                translate: "readPercent",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "insert",
                translate: "insert",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "Q30",
                translate: "Q30",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "rawDuplication",
                translate: "rawDuplication",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "trimDuplication",
                translate: "trimDuplication",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "Depth",
                translate: "Depth",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "effectDepth",
                translate: "effectDepth",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "effectCoverage500",
                translate: "effectCoverage500",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "mapping",
                translate: "mapping",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "targetMapping",
                translate: "targetMapping",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "coverage",
                translate: "coverage",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_coverageGtZeroFiveX",
                translate: "coverage>0.5x",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "_coverageGtZeroTwoX",
                translate: "coverage>0.2x",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },

    {
        sheet: "sampleInfo",
        ifSimpleOrdering: true,
        filters: ["page", "page_size", "sampleIds", "panalId"],
        submenu_translate: '样本信息',
        title_list: [
            {
                title: "sampleSn",
                translate: "sampleSn",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "name",
                translate: "姓名",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "itemName",
                translate: "项目名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "source",
                translate: "样本类型",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "agentName",
                translate: "送检单位",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "gender",
                translate: "性别",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "age",
                translate: "年龄",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "remark",
                translate: "备注",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "receiveTime",
                translate: "到样时间",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "barcode",
                translate: "条形码",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "nickName",
                translate: "录入用户名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "labName",
                translate: "实验室名称",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "unitAgentName",
                translate: "经销商",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "testDoctor",
                translate: "送检医师",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "contact",
                translate: "contact",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "reportStyle",
                translate: "报告样式",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "areaAgentName",
                translate: "areaAgentName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "treatResult",
                translate: "诊疗结果",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "treatCateName",
                translate: "treatCateName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "testDoctorContact",
                translate: "送检医师手机",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "treatHistory",
                translate: "治疗历史",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "invoiceName",
                translate: "invoiceName",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            }, {
                title: "sampleLocation",
                translate: "取样部位",
                type: "text",
                modify: false,
                defaultDisplay: true,
                selectDisplay: false
            },
        ],
    },
]

// 记录内容和亚筛选项的顺序，"exonicfuncRefgene"是三张表都不一样的，先使用初始化的筛选项'initial_exonicfuncRefgene'，需要加载后替换
export const common_filter_subFilters_dict = {
    delete: ['delete',],
    done: ['done',],
    logsEdit:['logsEdit',],
    ordering: ['sample__id', 'chr', 'posStart', 'posEnd'],
    exonicfuncRefgene: ['initial_exonicfuncRefgene',],
    connectSheet: ['connectSheet'],
    falseMutant: ['falseMutant'],
}


// 每个亚筛选项的 选择内容的列表，"exonicfuncRefgene"是3张mutant表都不一样的，需要加载获得
export const common_subFilter_selections_dict = {
    delete: [
        {
            value: null,
            content: '全部'
        }, {
            value: false,
            content: '未删除'
        }, {
            value: true,
            content: '已删除'
        },
    ],
    done: [
        {
            value: null,
            content: '全部'
        }, {
            value: false,
            content: '尚未提交'
        }, {
            value: true,
            content: '已经提交'
        },
    ],
    logsEdit: [
        {
            value: null,
            content: '全部'
        }, {
            value: 'delete',
            content: '包含删除'
        }, {
            value: 'edit',
            content: '包含修改'
        }, {
            value: 'copy',
            content: '包含拷贝'
        },
    ],
    sample__id: [
        {
            value: "sample__id",
            content: '样本编号 <span class="icon-sort-amount-asc" style="font-size: 16px"></span>'
        }, {
            value: null,
            content: '样本编号'
        },
    ],
    chr: [
        {
            value: "chr",
            content: '染色体 <span class="icon-sort-amount-asc" style="font-size: 16px"></span>'
        }, {
            value: null,
            content: '染色体'
        },
    ],
    posStart: [
        {
            value: "posStart",
            content: '起始位置 <span class="icon-sort-amount-asc" style="font-size: 16px"></span>'
        }, {
            value: null,
            content: '起始位置'
        },
    ],
    posEnd: [
        {
            value: "posEnd",
            content: '终止位置 <span class="icon-sort-amount-asc" style="font-size: 16px"></span>'
        }, {
            value: null,
            content: '终止位置'
        },
    ],
    initial_exonicfuncRefgene: [
        {
            value: null,
            content: "突变方式(全选)"
        },
    ],
    connectSheet: [
        {
            value: null,
            content: '所有关联'
        }, {
            value: 'all',
            content: '存在关联(全部)'
        }, {
            value: 'TMB_TNB_MSI',
            content: '存在关联(TMB\TNB\MSI)'
        },  {
            value: 'except_TMB_TNB_MSI',
            content: '存在关联(除开TMB\TNB\MSI)'
        }, {
            value: 'target',
            content: '存在关联(靶向)'
        }, {
            value: 'hereditary',
            content: '存在关联(遗传)'
        }, {
            value: 'fusion',
            content: '存在关联(融合)'
        }, {
            value: 'cna',
            content: '存在关联(CNA)'
        }
    ],
    falseMutant: [
        {
            value: null,
            content: '历史假突变提示'
        }, {
            value: true,
            content: '历史假突变(存在)'
        },
    ],
}

export const affirmSelectionConfig = [
    {
        type: "single",
        value: "single_cancel_or_affirm",
        availableEdit: true,
        content: '单项审核'
    }, {
        type: "single",
        value: "edit_single_affirm_reason",
        content: '编辑原因(单项)'
    }, {
        type: "single",
        value: "check_single_submit_logs",
        previous_log_update: true,
        content: '查看提交日志'
    }, {
        type: "single",
        value: "cancel_submit_done",
        previous_log_update: true,
        content: '取消提交'
    },

    {
        type: "multiple",
        value: "multiple_affirm",
        availableEdit: true,
        content: '同批审核(限修改)'
    }, {
        type: "multiple",
        value: "cancel_multiple_affirm",
        content: '取消审核(同批)'
    }, {
        type: "multiple",
        value: "edit_multiple_affirm_reason",
        content: '编辑原因(同批)'
    }, {
        type: "multiple",
        value: "adjust_multiple_affirm_items",
        availableEdit: true,
        content: '增减条目(同批)'
    },
]

export const idsGroupSelections = [
    {
        value: "now_selected_ids",
        translate: '使用目前勾选的IDs',
    }, {
        value: "multiple_affirmed_ids",
        translate: '使用所有批量审核、未提交的IDs',
    }, {
        value: "affirmed_unsubmited_ids",
        translate: '使用已审核、未提交的IDs',
    }, {
        value: "edited_unsubmited_ids",
        translate: '使用有编辑、未提交的IDs',
    }, {
        value: "unaffirmed_unsubmited_ids",
        translate: '使用未审核、未提交的IDs(限已浏览页)'
    },
]

export const upSheet_name_dict = {
    target: {value: "target", skip: 1},
    靶向: {value: "target", skip: 1},
    hereditary: {value: "hereditary", skip: 1},
    遗传: {value: "hereditary", skip: 1},
    TMB: {value: "TMB", skip: 1},
    QC: {value: "QC", skip: 0},
    样本信息: {value: "sampleInfo", skip: 1},
    immune: {value: "immune", skip: 1},
    免疫: {value: "immune", skip: 1},
    TNB: {value: "TNB", skip: 1},
    HLA: {value: "HLA", skip: 1},
    fusion: {value: "fusion", skip: 1},
    融合: {value: "fusion", skip: 1},
    chemical: {value: "chemical", skip: 1},
    化疗: {value: "chemical", skip: 1},
    CNA: {value: "CNA", skip: 1},
    MSI: {value: "MSI", skip: 0},
    clinicaltrials: {value: "clinicaltrials", skip: 0},
    HRR: {value: "HRR", skip: 0},
    MLPA:{value: "MLPA", skip: 1}
}

export const sampleTypeConfig = [
    {
        value: 'sample',
        translate: '实验样本',
        icon: 'icon-lab',
        done: false,
    }, {
        value: 'positive',
        translate: '阳性对照',
        icon: 'icon-plus',
        done: true,
    }, {
        value: 'negative',
        translate: '阴性对照',
        icon: 'icon-minus',
        done: true,
    }, {
        value: 'test',
        translate: '测试对照',
        icon: 'icon-tumblr',
        done: true,
    }
]

