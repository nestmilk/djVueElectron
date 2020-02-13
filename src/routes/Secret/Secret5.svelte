<!--1.增加了全选，优化了界面-->


<div>
    <h3 class="headH1">报告审核</h3> <button class="bn" on:click={logout}>退出</button>
</div>

<div class="wrapper">
    <div class="left">
        <span>样本列表</span>
        <button on:click={selectAllSn}>{selectAllText}</button>
        <div class="snList">
            {#each data as item, snIndex}
                <div class="snItemWrapper" on:click={()=>addSn(snIndex)}>
                    <div class="snItem">
                        <button>{item.sn}</button>
                        <span class="{selectedSnIndex.indexOf(snIndex)>-1?'icon-checkbox-checked':'icon-checkbox-unchecked'}"></span>
                    </div><!--snItem-->
                </div><!--snItemWrapper-->
            {/each}
        </div><!--snList-->


        <div>
            <label>添加本地bam bai
            </label>
            <input class="fileInput" id="fileWidget" type="file"
                   multiple="true" accept=".bam,.bai" on:change={load}/>
            <button on:click={()=>clearTracks()} >清空</button>
        </div>

        <div id="fileNameDiv">
            共{trackConfigs.length}对bam\bai文件:
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
            <button on:click={()=>test()}>test</button>{count} {addCount}
        </div>

        <div class="rightMiddle">
            <div class="tableCls">
                <table>
                    <tr>
                        <th>Sn</th>
                        <th>Chr</th>
                        <th>posStart</th>
                        <th>posEnd</th>
                        <th>ref</th>
                        <th>alt</th>
                        <th>Edit</th>
                    </tr>
                    <!-- 此处each标签如果添加(item.id)就会i保持很奇怪的维持上一状态，全乱了 TODO               -->
                    {#each pageData() as item, i}
                        <tr class="{nowResultId===item.id?'now':''}"
                            on:click={()=>changeTargetId(item.sn, item.id)}>
                            <td>{item.sn}</td>
                            <td>{item.chr}</td>
                            <td>{item.posStart}</td>
                            <td>{item.posEnd}</td>
                            <td>{item.ref}</td>
                            <td>{item.alt}</td>
                            <td>
                                <span></span>
                            </td>
                        </tr>
                    {/each}
                </table>
            </div>


            <Page page={currentPage} totalPage={totalPages()}
                  on:changePageNum={handleChangePageNum} on:changePage={handleChangePage}></Page>
        </div>

        <div class="rightDown">
            <div id='igv-div' bind:this={igvBind}></div>
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


    let igvBind
    let igvBrowser


    //后端搜索芯片表的批次，related:results，返回格式
    let data = [
        {sn: "NGS191031-20",
         results: [{id: 101, sn: "NGS191031-20", chr: 1, posStart: 7723753, posEnd: 7723753, ref: "C", alt: "T"},
            {id: 102, sn: "NGS191031-20", chr: 2, posStart: 185801755, posEnd: 185801756, ref: "AG", alt: "GA"},
            {id: 103, sn: "NGS191031-20", chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G"}]},
        {sn: "NGS191031-43",
         results: [{id: 104, sn: "NGS191031-43", chr: 4, posStart: 1803209, posEnd: 1803209, ref: "C", alt: "T"},
            {id: 105, sn: "NGS191031-43", chr: 5, posStart: 251216, posEnd: 251216, ref: "G", alt: "A"},
            {id: 106, sn: "NGS191031-43", chr: 6, posStart: 106553706, posEnd: 106553706, ref: "C", alt: "T"},
            {id: 107, sn: "NGS191031-43", chr: 7, posStart: 106508095, posEnd: 106508095, ref: "C", alt: "G"}]},
        {sn: "NGS191031-46",
         results: [{id: 108, sn: "NGS191031-46", chr: 9, posStart: 93606435, posEnd: 93606435, ref: "C", alt: "T"},
            {id: 109, sn: "NGS191031-46", chr: 9, posStart: 139562754, posEnd: 139562754, ref: "TGC", alt: "-"}]},
        {sn: "NGS191031-7",
         results: [{id: 110, sn: "NGS191031-7", chr: 13, posStart: 21562558, posEnd: 21562558, ref: "G", alt: "A"},
             {id: 111, sn: "NGS191031-7", chr: 15, posStart: 66727404, posEnd: 66727404, ref: "A", alt: "T"},
             {id: 112, sn: "NGS191031-7", chr: 16, posStart: 396296, posEnd: 396296, ref: "C", alt: "G"}]}
    ]

    let count = 1
    let addCount

    let nowSnIndex
    let nowResultIndex
    let nowResultId

    let selectedSnIndex = []
    let topSnIndex = 0

    let trackConfigs = []

    let currentPage = 1

    // 每页显示数量
    let pageNum = 10

    let selectAllText = '全选'

    $: resultsNum = () => {
        let sum = 0
        for (let result of data) {
            sum += result.results.length
        }
        return sum
    }

    // 通过这个监听不到, count和beforeCount一样的
    // $: if(count!==beforeCount.getValue()) {
    //     addCount = count + beforeCount.getValue()
    // }
    $: if(count>3) {console.log("count>3")}

    $: changeClass = igvBrowser ? 'icon-grin' : 'icon-leaf'

    $: joinSelectedSnNames = ()=> {
        // console.log(selectedSnIndex)
        return selectedSnIndex.join(', ')
    }

    $: selectedData = ()=>{
        let list = []
        for (let snIndex of selectedSnIndex) {
            list = list.concat(data[snIndex].results)
        }
        return list
    }

    // $: totalPage = Math.ceil(selectedData().length/pageNum)
    $: totalPages = ()=>{
        return Math.ceil(selectedData().length/pageNum)
    }

    $: pageData = ()=>{
        let start = (currentPage-1)*pageNum
        let end
        if (currentPage===totalPages()) {
            end = selectedData().length
        }else{
            end = currentPage*pageNum
        }
        console.log("pageData: " + start + " " + end)
        return selectedData().slice(start, end)
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

    function test(){
        add()
        // console.log(selectedData())
        // console.log("test: " + selectedData().length + " " + Math.ceil(selectedData().length/5))
        // pageData()
    }

    function selectAllSn (e) {
        if (selectAllText=='全选') {
            let list = []
            let i = 0
            let n = data.length
            for (;i<n;i++) list.push(i)
            selectedSnIndex = list
            loadTracks()
            console.log("selectALlSn: " + selectedSnIndex)
            selectAllText = '取消'
        }else{
            selectedSnIndex = []
            if (igvBrowser) igvBrowser.removeAllTracks()
            selectAllText = '全选'
        }
    }

    function changeTargetId(sn, resultId) {
        let i = 0
        for (let item of data) {
            if (item.sn === sn) {
                nowSnIndex = i
                let j = 0
                for (let result of item.results) {
                    if (result.id === resultId) {
                        nowResultIndex = j
                    }
                    j++
                }
                break
            }
            i++
        }
        nowResultId = resultId
        changeLocus()
    }


    function handleChangePage(event) {
        currentPage = event.detail.page
    }

    function handleChangePageNum(event){
        pageNum = event.detail.pageNum
        console.log("currentPage: " + currentPage)
        //譬如从10页切换到50页，这个在第2页的话，不会立刻自动计算，还是显示2
        // console.log("totalPage: " + totalPage)
        //立刻调用执行，显示为1
        console.log("totalPages: " + totalPages())
        if (currentPage>totalPages()) {
            currentPage = totalPages()
        }
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
        console.log('changeLocus: ' + nowSnIndex + " "  + nowResultIndex)
        console.log('data: ' + data[nowSnIndex].results[nowResultIndex])
        if (igvBrowser) {
            let result = data[nowSnIndex].results[nowResultIndex]
            let query = calculateScope(result.chr, result.posStart, result.posEnd)
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
            for (let snIndex of selectedSnIndex) {
                let sn = data[snIndex].sn
                for (let track of trackConfigs) {
                    if ((track['name']).indexOf(sn) !== -1) {
                        igvBrowser.loadTrack(track)
                        break
                    }
                }
            }
        }
    }

    function clearTracks () {
        trackConfigs = []
        if(igvBrowser) {
            igvBrowser.removeAllTracks()
        }
    }

    // function changeSn(sn, i) {
    //     nowTargetId = 0
    //     nowSnIndex = i
    //     changeLocus()
    //     console.log("changeSn: " + sn + ' ' + i)
    //     loadOnlyTrack(sn)
    // }

    function addSn(snIndex){
        if (selectedSnIndex.indexOf(snIndex) === -1){
            console.log(snIndex)
            selectedSnIndex.push(snIndex)
            selectedSnIndex = selectedSnIndex.sort()
            // console.log(selectedSnIndex)
            loadTracks()
        }else{
            let i = selectedSnIndex.indexOf(snIndex)
            // splice 切片处理（start，length)
            // slice （start， end) 不包括end
            selectedSnIndex = [].concat(selectedSnIndex.slice(0,i), selectedSnIndex.slice(i+1))
            // console.log(selectedSnIndex)
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
                                fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta"
                                // 本地的放入public/database中，调试影响速度
                                // fastaURL: "/database/ucsc.hg19.fasta",
                                // indexURL: "/database/ucsc.hg19.fasta.fai"
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
    //     console.log("selectedSnIndex: " + count)
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
        width: 100%;
        height: 250px;
        overflow-y: scroll;
    }
    .snItemWrapper{
        width: 150px;
        height: 30px;
        margin: 2px auto;
    }

    .snItem{
        width: 130px;
        height: 30px;
        line-height: 30px;
        margin: 10px auto;
        font-size: 12px;
    }

    .snItem button{
        width: 100px;
        float: left;
        text-align: left;
    }
    .snItem span{
        line-height: 30px;
        font-size: 20px;
        float: right;
    }



    .right{
        flex: 1;
        border: 1px solid black;
    }
    .rightUp{
        border-bottom: 1px solid #cccccc;
    }
    .rightMiddle{
        width: 100%;
        height: 300px;
    }

    .rightDown{
        width: 100%;
        height: 400px;
        overflow-y: scroll;
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
    .tableCls {
        text-align: center;
        height: 260px;
        overflow: scroll;
    }

    .tableCls th{
        width: 120px;
    }
</style>

