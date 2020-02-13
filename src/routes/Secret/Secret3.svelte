<div>
    <h3 class="headH1">报告审核</h3> <button class="bn" on:click={logout}>退出</button>
</div>

<div class="wrapper">
    <div class="left">
        <h3>样本列表</h3>
        已选中{joinSelectedSnNames()}
        {#each data as item, i (item.sn)}
            <div class="{selectedSnId.indexOf(i)>-1?'inSelectedSnList':''}">
                <button on:click={()=>addSn(i)}>{item.sn}</button>
<!--                使用bind:group暂时没找到方法进行selectSnId的自带变化监听方法-->
<!--                <input type=checkbox bind:group={selectedSnId} value={i}>-->
                <span class="{selectedSnId.indexOf(i)}"></span>
            </div>
        {/each}


        <p>
            <label>添加本地bam bai
            </label>
            <input class="fileInput" id="fileWidget" type="file"
                   multiple="true" accept=".bam,.bai" on:change={load}/>
            <button on:click={()=>trackConfigs=[]} >清空</button>
        </p>

        <div id="fileNameDiv">
            同时存在bam、bai的文件有{trackConfigs.length}对，如下
            {#each trackConfigs as track, i}
                <div>{i+1}. {track.name}</div>
            {/each}
        </div>

    </div>

    <div class="right">
        <div class="rightUp">
            <button>Target</button>
            <button>Fusion</button>
            <button>TMB</button>
<!--            // 这里面的add后括号一定不能省旅-->
            <button on:click={()=>console.log(selectedData())}>TRY</button>{count} {addCount}
        </div>

        <div>
            <table class="tableCls">
                <tr>
                    <th>Sn</th>
                    <th>Id</th>
                    <th>Chr</th>
                    <th>posStart</th>
                    <th>posEnd</th>
                    <th>ref</th>
                    <th>alt</th>
                    <th>Edit</th>
                </tr>
                {#each selectedSnId() as snId}
                    {#each data[snId].result as item, i}
                        <tr class="{nowTargetId===i&&nowSnId===snId?'now':''}"
                            on:click={()=>changeSnTargetIdsandLoucs(snId, i)}>
                            <td>{data[snId].sn}</td>
                            <td>{i+1}</td>
                            <td>{item.chr}</td>
                            <td>{item.posStart}</td>
                            <td>{item.posEnd}</td>
                            <td>{item.ref}</td>
                            <td>{item.alt}</td>
                            <td>
                                <span></span>
                            </td>
        <!--                            on:click|preventDefault|stopPropagation={-->
        <!--                                (e)=>changeLocus(e, i, item.chr, item.posStart, item.posEnd)}>-->
                        </tr>
                    {/each}
                {/each}
            </table>

            <Page page={currentPage} totalPage={currentTotalPage} on:changePage={handleChangePage}></Page>
        </div>

        <div id='igv-div' bind:this={igvBind}>
            <span class={changeClass}></span>
        </div>

    </div>
</div>

<script>
    import {onMount, beforeUpdate, afterUpdate, tick} from 'svelte'
    import {push} from 'svelte-spa-router'
    import igv from 'igv/dist/igv.min'
    import cookie from '../../utils/cookie'
    import {userInfo, beforeCount, beforeSnIdList} from '../../store/store'
    import Page from '../../components/Page/Page.svelte'

    let currentPage = 5
    let currentTotalPage = 100

    let igvBind
    let igvBrowser

    let data = [
        {sn: "NGS191031-20",
        result: [{id: 1, chr: 1, posStart: 7723753, posEnd: 7723753, ref: "C", alt: "T"},
            {id: 2, chr: 2, posStart: 185801755, posEnd: 185801756, ref: "AG", alt: "GA"},
            {id: 3, chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G"}]},
        {sn: "NGS191031-43",
        result: [{id: 1, chr: 4, posStart: 1803209, posEnd: 1803209, ref: "C", alt: "T"},
            {id: 2, chr: 5, posStart: 251216, posEnd: 251216, ref: "G", alt: "A"},
            {id: 3, chr: 6, posStart: 106553706, posEnd: 106553706, ref: "C", alt: "T"},
            {id: 4, chr: 7, posStart: 106508095, posEnd: 106508095, ref: "C", alt: "G"}]},
        {sn: "NGS191031-46",
        result: [{id: 1, chr: 9, posStart: 93606435, posEnd: 93606435, ref: "C", alt: "T"},
            {id: 2, chr: 9, posStart: 139562754, posEnd: 139562754, ref: "TGC", alt: "-"}]},
        {sn: "NGS191031-7",
        result: [{id: 1, chr: 13, posStart: 21562558, posEnd: 21562558, ref: "G", alt: "A"}]}
    ]


    let count = 1
    let addCount

    let nowSnId
    let nowTargetId

    let selectedSnId = [0]

    // 想在beforeUpdated中固化这个值是不可能的，afterUpdated中也会跟着selectedSnId变化
    let beforeUpdatedSelectedSnId = []

    let trackConfigs = []

    $: changeClass = igvBrowser ? 'icon-grin' : 'icon-leaf'
    $: selectedData = ()=>{
        for (let snId of selectedSnId) {
            [].concat(data[snId])
        }
    }

    $: joinSelectedSnNames = ()=> {
        // console.log(selectedSnId)
        return selectedSnId.join(', ')
    }

    // 实在想不出啥观察数据变化方法了，只能存入store中了，
    function add() {
        console.log("before: " + beforeCount.getValue())
        count = count + 1
        console.log("after beforeCount: "+ beforeCount.getValue())
        console.log("after count: " + count)
        // 此处比较前后的差异，哈哈哈
        if(count!==beforeCount.getValue()) addCount = count + beforeCount.getValue()
        beforeCount.updateValue(count)
    }

    // 通过这个监听不到, count和beforeCount一样的
    // $: if(count!==beforeCount.getValue()) {
    //     addCount = count + beforeCount.getValue()
    // }
    $: if(count>3) {console.log("count>3")}

    function changeSnTargetIdsandLoucs(snId, i) {
        nowSnId = snId
        nowTargetId = i
        changeLocus()
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

    function calculateScope (chr, start, end) {
        let new_start = start - 30
        let new_end = end + 30
        let scope = "chr" + chr + ":" + new_start +"-" + new_end
        console.log("scope: " + scope)
        return scope
    }

    function changeLocus() {
        console.log('changeLocus: ' + nowSnId + " "  + nowTargetId)
        console.log('data: ' + data[nowSnId].result[nowTargetId])
        if (igvBrowser) {
            let target = data[nowSnId].result[nowTargetId]
            let query = calculateScope(target.chr, target.posStart, target.posEnd)
            igvBrowser.search(query)
        }
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
        fileWidget.value = ''
        loadTracks()
        changeLocus()
    }


    function loadOnlyTrack(sn) {
        if (trackConfigs && igvBrowser) {
            // console.log(trackConfigs)
            igvBrowser.removeAllTracks()
            for (let track of trackConfigs) {
                console.log("track[name]: " + track['name'])
                if ((track['name']).indexOf(sn) !== -1) {
                    igvBrowser.loadTrack(track)
                    break
                }
            }
        }
    }

    function loadTracks() {
        if(igvBrowser){
            igvBrowser.removeAllTracks()
            for (let snId of selectedSnId) {
                let sn = data[snId].sn
                for (let track of trackConfigs) {
                    if ((track['name']).indexOf(sn) !== -1) {
                        igvBrowser.loadTrack(track)
                        break
                    }
                }
            }
        }
    }

    // function changeSn(sn, i) {
    //     nowTargetId = 0
    //     nowSnId = i
    //     changeLocus()
    //     console.log("changeSn: " + sn + ' ' + i)
    //     loadOnlyTrack(sn)
    // }

    function addSn(snId){
        if (selectedSnId.indexOf(snId) === -1){
            console.log(snId)
            selectedSnId.push(snId)
            selectedSnId = selectedSnId.sort()
            console.log(selectedSnId)
            loadTracks()
        }else{
            let i = selectedSnId.indexOf(snId)
            // splice 切片处理（start，length)
            // slice （start， end) 不包括end
            selectedSnId = [].concat(selectedSnId.slice(0,i), selectedSnId.slice(i+1))
            console.log(selectedSnId)
            loadTracks()
        }
    }

    onMount(()=>{
        console.log(igvBind) //<div>...</>

        let options =
                {
                    reference:
                            {
                                id: "hg19",
                                // fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta"
                                // 本地的放入public/database中，调试影响速度
                                fastaURL: "/database/ucsc.hg19.fasta",
                                indexURL: "/database/ucsc.hg19.fasta.fai"
                            },
                    locus: 'chr1:1956-2020'
                };

        igv.createBrowser(igvBind, options)
            .then(function (browser) {
                igvBrowser = browser
                console.log("Created IGV browser");
            })
    })

    // DOM更新前， 数据已经发生了变化，无法监听到！！！
    // beforeUpdate(()=>{
    //     console.log("beforeUpdate: " + count)
    //     beforeCount = count
    // })
    //
    // afterUpdate(()=>{
    //     console.log("before: " + beforeCount)
    //     console.log("selectedSnId: " + count)
    // })

    beforeCount.updateValue(count)
</script>

<style>

    .wrapper{
        display: flex;
    }
    .left{
        flex: 0 0 180px;
        border:1px solid black;
    }
    .snList{

    }
    .inSelectedSnList{
        background-color: #cccccc;
    }
    .right{
        flex: 1;
        border: 1px solid black;
        overflow: scroll;
    }
    .rightUp{
        border-bottom: 1px solid #cccccc;
    }
    .now{
        background-color: #cccccc;
        height: 20px;
    }
    #fileNameDiv {
        height: 200px;
        background-color: #cccccc;
        overflow: scroll;
        border: 1px solid #cccccc;
    }
    .headH1{
        display: inline;
    }
    .fileInput{
        width: 85px;
    }
</style>

