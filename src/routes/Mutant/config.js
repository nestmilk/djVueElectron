// modify: 是否需要修改
// defaultDisplay: 是否作为默认必须显示标题，用于生成defaultDisplayList，默认标题显示顺序
// selectDisplay: 是否需要用作选择性显示标题，用于生成selectDisplayList, 默认菜单栏选择顺序
// fixed固定显示的defaultDisplay true, selectDisplay false,
// default默认显示的defaultDisplay true, selectDisplay true,
// select选择显示的defaultDisplay false, selectDisplay true,
// 不显示的defaultDisplay false, selectDisplay false,


export const mutantDisplayConfigList = [
    {
        title: "sampleSn",
        translate: "样本编号",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false,
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    // 染色体相关
    {
        title: "chr",
        translate: "染色体",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "posStart",
        translate: "起始位置",
        type: "number",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "posEnd",
        translate: "终止位置",
        type: "number",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "ref",
        translate: "参考序列",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "alt",
        translate: "突变序列",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "freq",
        translate: "频率",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "exonicfuncRefgene",
        type: "text",
        translate: "突变方式",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: true
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },


    {
        title: "clinsig",
        translate: "突变分类1",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "intervarAutomated",
        translate: "突变分类2",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },


    // 药物相关
    {
        title: "drugLevel",
        translate: "证据等级",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "cancerType",
        translate: "癌症类型",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "drugs",
        translate: "靶向药",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "hgvs",
        translate: "hgvs命名",
        type: "text",
        modify: {
            target: true,
            hereditary: true,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "geneVar",
        translate: "位点解析",
        type: "text",
        modify: {
            target: true,
            hereditary: true,
            TMB: false
        },
        defaultDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },


    {
        title: "projectAbbreviation",
        translate: "项目简称",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target:false,
            hereditary: false,
            TMB: true
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "NM_ID",
        translate: "转录本",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "GeneName",
        translate: "基因名称",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "DNA_change",
        translate: "碱基改变",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "AA_change",
        translate: "氨基酸改变",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },

    // 依赖于hgvs变更，先允许修改
    {
        title: "wxz",
        translate: "外显子",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "zlb",
        translate: "转录本",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "hgsGb",
        translate: "碱基改变",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "ajsGb",
        translate: "氨基酸改变",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "alteration",
        translate: "基因变异",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },
    {
        title: "_geneName",
        translate: "基因名称",
        type: "text",
        modify: {
            target: true,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: true
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },
    {
        title: "geneType",
        translate: "基因类型",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: true,
            hereditary: false,
            TMB: false
        }
    },

    // 提供给 hgvs修改参考
    {
        title: "aachangeRefgene",
        translate: "突变描述",
        type: "text",
        modify: {
            target: false,
            hereditary: true,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: true
        },
        selectDisplay: {
            target: true,
            hereditary: true,
            TMB: false
        }
    },

    {
        title: "level",
        translate: "等级分类",
        type: "text",
        modify: {
            target: false,
            hereditary: false,
            TMB: false
        },
        defaultDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        },
        selectDisplay: {
            target: false,
            hereditary: false,
            TMB: false
        }
    },
]



