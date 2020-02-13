<h1>这里很神秘</h1>

<div class="wrapper">
    <div class="left">
        <button on:click={logout}>退出</button>

        <div>
            <button on:click={changeHeight}>增加下面div高度为100px</button>
            <div class="her" bind:this={her}>
                igvBind高度为{height}
            </div>
        </div>

        <button on:click={loadTrack}>增加track</button>
        <button on:click={removeTrack}>去除track by name</button>
        <button on:click={updateLocus}>换个位置</button>
        <button on:click={addArray}>添加data一条数据</button>
        <p>
            <label>添加本地bam bai
                <input id="fileWidget" type="file"
                       multiple="true" accept=".bam,.bai" on:change={load}/>
            </label>
        </p>

        <div id="fileNameDiv">
            同时存在bam、bai的文件有{trackConfigs.length}对，如下
            {#each trackConfigs as track, i}
                <div>{i+1}. {track.name}</div>
            {/each}
        </div>

    </div>

    <div class="right">
        <table class="tableCls">
            <tr>
                <th>Id</th>
                <th>Chr</th>
                <th>posStart</th>
                <th>posEnd</th>
                <th>ref</th>
                <th>alt</th>
                <th>BN</th>
            </tr>
            {#each data as item, i}
                <tr class="{nowId===i?'now':''}"
                    on:click={(e)=>changeLocus(e, i, item.chr, item.posStart, item.posEnd)}>
                    <td>{i+1}</td>
                    <td>{item.chr}</td>
                    <td>{item.posStart}</td>
                    <td>{item.posEnd}</td>
                    <td>{item.ref}</td>
                    <td>{item.alt}</td>
                    <td>
                        <span class={changeClass}></span>
<!--                            on:click|preventDefault|stopPropagation={-->
<!--                                (e)=>changeLocus(e, i, item.chr, item.posStart, item.posEnd)}>-->
                    </td>
                </tr>
            {/each}
        </table>

        <Page page={currentPage} totalPage={currentTotalPage} on:changePage={handleChangePage}></Page>

        <div id='igv-div' bind:this={igvBind}>IGV展示</div>

    </div>
</div>

<script>
    import {onMount} from 'svelte'
    import {push} from 'svelte-spa-router'
    import igv from 'igv/dist/igv.min'
    import cookie from '../../utils/cookie'
    import {userInfo} from '../../store/store'
    import Page from '../../components/Page/Page.svelte'

    let currentPage=5
    let currentTotalPage=100

    let igvDiv =document.getElementById("igv-div")
    let igvBind
    let her
    let igvBrowser
    let trackName = "Phase3"
    let data = [{id: 1, chr: 1, posStart: 7723753, posEnd: 7723753, ref: "C", alt: "T"},
            {id: 2, chr: 2, posStart: 185801755, posEnd: 185801756, ref: "AG", alt: "GA"},
            {id: 3, chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G"}]
    let nowId = 0
    let trackConfigs = []


    // $: height=igvBind.clientHeight // 这样获取不到，还报错
    $: height = igvBind ? igvBind.clientHeight : 0
    $: changeClass = igvBrowser ? 'icon-grin' : 'icon-baffled'


    console.log(igvDiv) //null
    console.log(igvBind) //undefined

    function addArray() {
        console.log(data)
        // push方法无效，必须左端赋值才行
        // data.push({id: 3, chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G"})
        // data = data
        // 或者这种放方法
        data = [...data, {id: 3, chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G"}]
        console.log(data)
    }

    function handleChangePage(event) {
        currentPage = event.detail.page
    }

    function logout () {
        //清空cookie
        cookie.delCookie('name')
        cookie.delCookie('token')
        //清空token
        userInfo.updateName('')
        userInfo.updateToken('')
        //跳转回登录
        push('/login')
    }
    function changeHeight () {
        // igvBind.style.height = (igvBind.height + 50) + "px" //似乎不行
        her.style.height = 100 + "px"
    }

    function loadTrack() {
       igvBrowser.loadTrack({
            name: "7DU",
            type: "alignment",
            format: "bam",
            url: "/tmp/NGS191101-7DU.mutation.bam",
            indexURL: "/tmp/NGS191101-7DU.mutation.bam.bai",

       })
    }

    function updateLocus() {
        igvBrowser.search('chr10:1000250-1000300')
    }

    function calculateScope (chr, start, end) {
        let new_start = start - 30
        let new_end = end + 30
        let scope = "chr" + chr + ":" + new_start +"-" + new_end
        console.log("scope: " + scope)
        return scope
    }

    function changeLocus(e, i, chr, start, end) {
        if (igvBrowser) {
            nowId = i
            let query = calculateScope(chr, start, end)
            igvBrowser.search(query)
        }
    }

    function removeTrack() {
        igvBrowser.removeTrackByName("7DU")
    }

    function addTrackConfigs(files){
        console.log(files)
        let bamFiles = getFileBySuffix(files, '.bam')
        // console.log(bamFiles)
        let baiFiles = getFileBySuffix(files, '.bai')
        // console.log(baiFiles)
        let pairedFiles = {}
        for (let bam in bamFiles) {
            let find = false
            for (let bai in baiFiles) {
                if (bam===bai) {
                    find = true
                    break
                }
            }
            if (find) {
                pairedFiles[bam] = {"bam": bamFiles[bam], "bai": baiFiles[bam]}
            }
        }
        // console.log(pairedFiles)
        for (let sn in pairedFiles) {
            let unfind = true
            for (let track of trackConfigs) {
                if (sn===track.name) {
                    unfind = false
                    break
                }
            }
            if (unfind) {
                trackConfigs.push({
                    name: sn,
                    type: "alignment",
                    format: 'bam',
                    url: pairedFiles[sn].bam,
                    indexURL: pairedFiles[sn].bai
                })
            }
        }

        //千万别忘了，不然不会自动更新页面
        trackConfigs = trackConfigs
        console.log(trackConfigs)
    }


    function getKey(filename) {

        var idx = filename.indexOf(".");
        // if (idx < 0) {
        //     console.error("File with no extension: " + filename);
        // }
        // else {
        return filename.substring(0, idx);
        // }
    }

    function getFilesDictBySuffix(files, suffix){
        let dict = {}
        for (let i in files) {
            if (i==='length') break
            //FileList {0:File, ...,8:File,length: 9, __proto__:}, 8个文件，跳出来10个
            // console.log("file: "+ i + " " + files[i].name)
            let fileName = files[i].name
            if (fileName.endsWith(suffix)) {
                dict[getKey(fileName)] = files[i]
            }
        }
        return dict
    }

    function load() {
        console.log('load')
        let fileWidget = document.getElementById('fileWidget')
        let files = fileWidget.files
        addTrackConfigs(files)
    }

    onMount(()=>{
        console.log(igvDiv) //null
        console.log(igvBind) //<div>...</>

        let options =
                {
                    reference:
                            {
                                id: "hg19",
                                fastaURL: "/database/ucsc.hg19.fasta",
                                indexURL: "/database/ucsc.hg19.fasta.fai"
                            },
                    locus: calculateScope(data[0].chr, data[0].posStart, data[0].posEnd),
                    tracks:
                            [
                                {
                                    name: "20DU",
                                    type: "alignment",
                                    format: "bam",
                                    url: "/tmp/NGS191031-20DU.mutation.bam",
                                    indexURL: "/tmp/NGS191031-20DU.mutation.bam.bai",
                                }
                            ]

                };

        igv.createBrowser(igvBind, options)
            .then(function (browser) {
                igvBrowser = browser
                console.log("Created IGV browser");
            })
    })
</script>

<style>
    /*#igv-div{*/
    /*    width: 100px;*/
    /*    height: 100px;*/
    /*    background: green;*/
    /*}*/
    .wrapper{
        display: flex;
    }
    .left{
        flex: 0 0 150px;
        border:1px solid black;
    }
    .right{
        flex: 1;
        border: 1px solid black;
    }
    .her{
        background-color: green;
    }
    .now{
        background-color: #cccccc;
        height: 20px;
    }
    #fileNameDiv {
        height: 300px;
        background-color: #cccccc;
    }
</style>

