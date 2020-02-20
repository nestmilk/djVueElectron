// modify: 表示是否需要修改
// defaultDisplay: 是否作为默认必须显示标题，用于生成defaultDisplayList，默认标题显示顺序
// ifSelect: 是否需要用作选择性显示标题，用于生成selectDisplayList, 默认菜单栏选择顺序

export const mutantDisplayConfigList = [
    // 染色体相关
    {
        title: "chr",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "posStart",
        type: "number",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "posEnd",
        type: "number",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "ref",
        type: "text",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "alt",
        type: "text",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "freq",
        type: "text",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    // 药物相关
    {
        title: "drugLevel",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "cancerType",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "drugs",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "hgvs",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "geneVar",
        modify: {
            target: true
        },
        defaultDisplay: {
            target: true
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    

    {
        title: "projectAbbreviation",
        type: "text",
        modify: {
            target: false
        },
        defaultDisplay: {
            target:false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "NM_ID",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "GeneName",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "DNA_change",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "AA_change",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },


    {
        title: "wxz",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "zlb",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "hgsGb",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "ajsGb",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "alteration",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "geneName",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },
    {
        title: "geneType",
        modify: {
            target: false
        },
        defaultDisplay: {
            target: false
        },
        selectDisplay: {
            target: true
        },
        nowDisplay: false
    },


    {
        title: "aachangeRefgene",
        modify: false,
        defaultDisplay: false
    },
    {
        title: "clinsig",
        modify: false,
        defaultDisplay: false
    },
    {
        title: "intervarAutomated",
        modify: false,
        defaultDisplay: false
    },
    {
        title: "level",
        modify: false,
        defaultDisplay: false
    },
]

export const defaultDisplayLists = {
    target: ['posStart', 'posEnd', 'ref', 'alt']
}

