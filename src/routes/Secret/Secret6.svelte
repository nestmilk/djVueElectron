<!--1.使用点击result条目，将其所在sn的顺序排到第一位-->


<div>
    <h3 class="headH1">突变位点核实</h3> <button class="bn" on:click={logout}>退出</button>
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
            <label>共{trackConfigs.length}对bam\bai文件:
            </label>
            <input class="fileInput" id="fileWidget" type="file"
                   multiple="true" accept=".bam,.bai" on:change={load}/>
            <button on:click={()=>clearTracks()} >清空</button>
        </div>

        <div id="fileNameDiv">
            {#each trackConfigs as track, i}
                <div>{i+1}. {track.name}</div>
            {/each}
        </div>

        <div class="log">
            {#each logs as {title, text},i}
                <div class="logItem">{title}: {text}</div>
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
<!--            <input id="myInput" type="text" value="123" uploadBtnDisabled="true"/>-->
            <div class="tableCls">
                <table>
                    <tr>
                        <th>Sn</th>
                        <th>Chr</th>
                        <th>posStart</th>
                        <th>posEnd</th>
                        <th>ref</th>
                        <th>alt</th>
                        <th>Delete</th>
                    </tr>
                    <!-- 此处each标签如果添加(item.id)就会i保持很奇怪的维持上一状态，全乱了 注意不要乱加               -->
                    {#each pageData() as item, i (item.id)}
                        <tr class="{nowResultId===item.id?'now':''}"
                            on:click={()=>changeTargetId(item.sn, item.id)}>
                            <td>{item.sn}</td>
                            <td>{item.chr}</td>
                            <td>
                                <input type="number" bind:value="{item.posStart}" disabled="{item.id!==nowResultId?'true':''}"/>
                                <span class="{checkAttrValueChanging('posStart', item.id)?'icon-undo2':''}"
                                    on:click|stopPropagation={()=>handleRecoverValue('posStart',item.id)}></span>
                            </td>
                            <td>
                                <input type="number" bind:value="{item.posEnd}" disabled="{item.id!==nowResultId?'true':''}" />
                                <span class="{checkAttrValueChanging('posEnd', item.id)?'icon-undo2':''}"
                                      on:click|stopPropagation={()=>handleRecoverValue('posEnd',item.id)}></span>
                            </td>
                            <td>
                                <input type="text" bind:value="{item.ref}" disabled="{item.id!==nowResultId?'true':''}" />
                                <span class="{checkAttrValueChanging('ref', item.id)?'icon-undo2':''}"
                                      on:click|stopPropagation={()=>handleRecoverValue('ref',item.id)}></span>
                            </td>
                            <td>
                                <input type="text" bind:value="{item.alt}" disabled="{item.id!==nowResultId?'true':''}"/>
                                <span class="{checkAttrValueChanging('alt', item.id)?'icon-undo2':''}"
                                      on:click|stopPropagation={()=>handleRecoverValue('alt',item.id)}></span>
                            </td>
<!--                            这里利用bind:value的双引号，将boolen转化为string类型，从而可以判断前后差异-->
                            <td>
                                <div class="beDelWrapper">
                                    <div class="bnDel">
                                        <input  id="del{item.id}" type="checkbox" bind:value="{item.delete}" />
                                        <span class="{checkAttrValueChanging('delete', item.id)?'icon-undo2':''}"
                                              on:click|stopPropagation={()=>handleRecoverValue('delete',item.id)}></span>
                                    </div>
                                </div>
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
    import {userInfo, beforeCount, beforeResultId} from '../../store/store'
    import Page from '../../components/Page/Page.svelte'


    let igvBind
    let igvBrowser


    //后端搜索芯片表的批次，related:results，返回格式
    let data = [
        {sn: "NGS191031-20",
         results: [{id: 101, sn: "NGS191031-20", chr: 1, posStart: 7723753, posEnd: 7723753, ref: "C", alt: "T", delete: false},
            {id: 102, sn: "NGS191031-20", chr: 2, posStart: 185801755, posEnd: 185801756, ref: "AG", alt: "GA", delete: false},
            {id: 103, sn: "NGS191031-20", chr: 3, posStart: 186504407, posEnd: 186504407, ref: "A", alt: "G", delete: false}]},
        {sn: "NGS191031-43",
         results: [{id: 104, sn: "NGS191031-43", chr: 4, posStart: 1803209, posEnd: 1803209, ref: "C", alt: "T", delete: false},
            {id: 105, sn: "NGS191031-43", chr: 5, posStart: 251216, posEnd: 251216, ref: "G", alt: "A", delete: false},
            {id: 106, sn: "NGS191031-43", chr: 6, posStart: 106553706, posEnd: 106553706, ref: "C", alt: "T", delete: false},
            {id: 107, sn: "NGS191031-43", chr: 7, posStart: 106508095, posEnd: 106508095, ref: "C", alt: "G", delete: false}]},
        {sn: "NGS191031-46",
         results: [{id: 108, sn: "NGS191031-46", chr: 9, posStart: 93606435, posEnd: 93606435, ref: "C", alt: "T", delete: false},
            {id: 109, sn: "NGS191031-46", chr: 9, posStart: 139562754, posEnd: 139562754, ref: "TGC", alt: "-", delete: false}]},
        {sn: "NGS191031-7",
         results: [{id: 110, sn: "NGS191031-7", chr: 13, posStart: 21562558, posEnd: 21562558, ref: "G", alt: "A", delete: false},
             {id: 111, sn: "NGS191031-7", chr: 15, posStart: 66727404, posEnd: 66727404, ref: "A", alt: "T", delete: false},
             {id: 112, sn: "NGS191031-7", chr: 16, posStart: 396296, posEnd: 396296, ref: "C", alt: "G", delete: false}]},
        {sn: "NGS191101-15",
            results: [{id: 113, sn: "NGS191101-15", chr: 3, posStart: 185191207, posEnd: 185191207, ref: "T", alt: "C", delete: false},
                {id: 114, sn: "NGS191101-15", chr: 4, posStart: 41748008, posEnd: 41748010, ref: "GCC", alt: "-", delete: false},
                {id: 115, sn: "NGS191101-15", chr: 5, posStart: 176518070, posEnd: 176518070, ref: "G", alt: "A", delete: false}]},
        {sn: "NGS191101-19",
            results: [{id: 116, sn: "NGS191101-19", chr: 2, posStart: 209113210, posEnd: 209113210, ref: "T", alt: "C", delete: false},
                {id: 117, sn: "NGS191101-19", chr: 5, posStart: 112178178, posEnd: 112178178, ref: "G", alt: "A", delete: false},
                {id: 118, sn: "NGS191101-19", chr: 7, posStart: 92731586, posEnd: 92731586, ref: "A", alt: "G", delete: false}]},
        {sn: "NGS191101-29",
            results: [{id: 119, sn: "NGS191101-29", chr: 1, posStart: 144854608, posEnd: 144854608, ref: "T", alt: "G", delete: false},
                {id: 120, sn: "NGS191101-29", chr: 2, posStart: 25467468, posEnd: 25467468, ref: "G", alt: "T", delete: false},
                {id: 121, sn: "NGS191101-29", chr: 4, posStart: 187630826, posEnd: 187630826, ref: "-", alt: "T", delete: false}]},
        {sn: "NGS191101-30",
            results: [{id: 122, sn: "NGS191101-30", chr: 5, posStart: 57750547, posEnd: 57750547, ref: "A", alt: "G", delete: false},
                {id: 123, sn: "NGS191101-30", chr: 6, posStart: 26156843, posEnd: 26156843, ref: "G", alt: "A", delete: false},
                {id: 124, sn: "NGS191101-30", chr: 12, posStart: 18644488, posEnd: 18644497, ref: "ACGATGTAAG", alt: "-", delete: false}]},
        {sn: "NGS191101-34",
            results: [{id: 125, sn: "NGS191101-34", chr: 4, posStart: 187538271, posEnd: 187538271, ref: "T", alt: "A", delete: false},
                {id: 126, sn: "NGS191101-34", chr: 7, posStart: 92730745, posEnd: 92730745, ref: "C", alt: "T", delete: false},
                {id: 127, sn: "NGS191101-34", chr: 16, posStart: 2024784, posEnd: 2024784, ref: "C", alt: "T", delete: false}]},
        {sn: "NGS191101-7",
            results: [{id: 128, sn: "NGS191101-7", chr: 1, posStart: 27106333, posEnd: 27106333, ref: "G", alt: "A", delete: false},
                {id: 129, sn: "NGS191101-7", chr: 1, posStart: 36807452, posEnd: 36807452, ref: "G", alt: "A", delete: false},
                {id: 130, sn: "NGS191101-7", chr: 1, posStart: 72241925, posEnd: 72241925, ref: "G", alt: "A", delete: false}]},
        {sn: "NGS191101-8",
            results: [{id: 131, sn: "NGS191101-8", chr: 21, posStart: 41559182, posEnd: 41559182, ref: "G", alt: "A", delete: false}]},
            ]
    //深拷贝数据
    let copyData = JSON.parse(JSON.stringify(data))

    let count = 1
    let addCount

    let nowSnIndex
    let nowResultIndex
    let nowResultId

    let selectedSnIndex = []

    // igv的Track集合
    let trackConfigs = []

    let currentPage = 1
    // 每页显示数量 初始值
    let pageNum = 5

    //后端日志反馈
    let logs = [{title: '启动', text: '日志'}]


    $: selectAllText = selectedSnIndex.length === data.length? '取消':'全选'

    // 计算数据总条数
    $: resultsNum = () => {
        let sum = 0
        for (let result of selectedData()) {
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
        // console.log("pageData: " + start + " " + end)
        return selectedData().slice(start, end)
    }

    // nowResultId前，selectedData中还存在多少条result
    // 用于删除sn时候，重新计算页面位置
    $: numsBeforeNowSnIndex = () =>{
        if (!nowSnIndex) return null
        let n = selectedSnIndex.indexOf(nowSnIndex)
        if (selectedSnIndex && n > 0) {
            let sum = 0
            for (let i=0;i<n;i++) {
                sum += data[selectedSnIndex[i]].results.length
            }
            return sum
        }else{
            return 0
        }
    }
    let numsBefore = 0

    function handleRecoverValue(attr, resultId){
        document.getElementById('del'+resultId).checked = false
        // {#each 中添加了 (item.id)牛逼了，能够获取到这个value值了
        // 而且点击的check的不会跨页面问题出现也被checked的情况了
        console.log('begin recover: ' + document.getElementById('del'+resultId).value +
                (typeof document.getElementById('del'+resultId).value))
        let oldVal
        outer:
        for (let result of copyData) {
            for (let item of result.results) {
                if (item.id === resultId) {
                    oldVal = item[attr]
                    break outer
                }
            }
        }
        console.log(oldVal)
        for (let result of data) {
            for (let item of result.results) {
                if (item.id === resultId) {
                    item[attr] = oldVal
                    // 数据驱动视图变化，必须要这样才能响应
                    data = data
                    return
                }
            }
        }
    }

    function valueOfResultId(data, attr, resultId) {
        for (let result of data) {
            for (let item of result.results) {
                if (item.id === resultId) return item[attr]
            }
        }
    }

    function  checkAttrValueChanging(attr, resultId){
        let oldValue = valueOfResultId(copyData, attr, resultId)
        let newValue = valueOfResultId(data, attr, resultId)
        // console.log("checkAttrVal: " + oldValue + " " + newValue)
        // console.log("checkAttrVal: " + (typeof oldValue) + " " + (typeof newValue))
        return newValue !== oldValue
    }

    // 实在想不出啥观察数据变化方法了，只能存入store中了，
    function add(){
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
        if (selectedSnIndex.length !== data.length) {
            let list = []
            let i = 0
            let n = data.length
            for (;i<n;i++) list.push(i)
            selectedSnIndex = list
            console.log("selectALlSn: " + selectedSnIndex)
            console.log("selectALLsn: currentPage " + currentPage)
            checkCurrentPage()
            loadTracks()
        }else{
            selectedSnIndex = []
            if (igvBrowser) igvBrowser.removeAllTracks()
            checkCurrentPage()
        }
    }

    function changeTargetId(sn, resultId){
        console.log("changeTargetId: begin")
        let beforeSnIndex = nowSnIndex
        if (nowResultId !== resultId) {
            //尝试过 value="{item.posStart}" 获取不到.value，只能获取到<input ...> 和disabled无关
            // console.log(document.getElementById("posStart"+nowResultId))
            // 如果数据input中 bind:value 那么原始data大表中的数据联动改变
            // console.log("changeTargetId: posStart " + checkAttrValueChanging('posStart', nowResultId))
            // console.log("changeTargetId: " + checkAttrValueChanging('delete', nowResultId))

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
            if (beforeSnIndex !== nowSnIndex) {
                loadTracks()
            }
        }
    }


    function handleChangePage(event) {
        currentPage = event.detail.page
        console.log('handleChangePage: ' + currentPage)
    }

    function handleChangePageNum(event){
        pageNum = event.detail.pageNum
        console.log("handChanPaNum: " + currentPage)
        //譬如从10页切换到50页，这个在第2页的话，不会立刻自动计算，还是显示2
        // console.log("totalPage: " + totalPage)
        //立刻调用执行，显示为1
        checkCurrentPage()
    }

    function ifExistResultofNowResultId() {
        let find = false
        for (let i = 0;i<selectedData().length;i++) {
            if (selectedData()[i].id === nowResultId) {
                find = true
                break
            }
        }
        return find
    }

    function checkCurrentPage() {
        //查看nowResultIndex是否存在，
        // 如果在，就说明需要根据这个和数据数量变化、页码变化，调整currentPage啦
        // 如果不在那currentPage也可能不在1，手动改变过
        if (nowResultId) {
            if (ifExistResultofNowResultId()) {
                //计算nowResultIndex所在页面位置
                let i = 0
                let n= selectedData().length
                for (;i<n;i++) {
                    if (selectedData()[i].id === nowResultId) {
                        break
                    }
                }
                currentPage = Math.ceil((i+1)/pageNum)
            }else{
                // 应该根据之前删除nowResultId前上下文环境 更换页面
                if (numsBefore) {
                    currentPage = Math.ceil(numsBefore/pageNum)
                }else{
                    currentPage = 1
                }
                nowResultIndex = null
                nowSnIndex = null
                nowResultId = null
            }
        }else{
            // console.log('checkCurrentPage: without ResultId ' + currentPage + " " + totalPages())
            // 此处如果totalPages因为没有数据变为零，则会出现currentPage赋值为0
            if (currentPage>totalPages()){
                if (totalPages()===0) {
                    currentPage = 1
                }else{
                    currentPage = totalPages()
                }
            }
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
        let new_start = start - 20
        let new_end = end + 20
        let scope = "chr" + chr + ":" + new_start +"-" + new_end
        console.log("scope: " + scope)
        return scope
    }

    function changeLocus() {
        console.log('changeLocus: begin' + nowSnIndex + " "  + nowResultIndex)
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
                    samplingDepth: 100,
                    alignmentRowHeight: 10,
                    // 不显示remove按钮
                    removable: false,
                    //track高度
                    height: 120,
                    url: pairedFiles[sn].bam,
                    indexURL: pairedFiles[sn].bai
                })
            }
        }

        //千万别忘了，不然不会自动更新页面
        trackConfigs = trackConfigs
        console.log(trackConfigs)
    }


    function getKey(filename){

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
            let snIndexList
            if (nowSnIndex && selectedSnIndex.indexOf(nowSnIndex) > -1) {
                snIndexList = [].concat([nowSnIndex], removeFromUniqueArray(selectedSnIndex, nowSnIndex))
            }else{
                snIndexList = selectedSnIndex
            }
            igvBrowser.removeAllTracks()
            // console.log("loadTracks: " + snIndexList)
            for (let snIndex of snIndexList) {
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

    function clearTracks (){
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
            // 页面溢出矫正
            loadTracks()
        }else{
            console.log("addSn: " + numsBeforeNowSnIndex())
            numsBefore = numsBeforeNowSnIndex()
            selectedSnIndex = removeFromUniqueArray(selectedSnIndex, snIndex)
            // console.log(selectedSnIndex)
            loadTracks()
        }
        checkCurrentPage()
    }

    function removeFromUniqueArray(list, item) {
        // splice 切片处理（start，length)
        // slice （start， end) 不包括end
        let i = list.indexOf(item)
        return [].concat(list.slice(0,i), list.slice(i+1))
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
                    locus: 'chr1:1983-2020'
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
        height: 200px;
        overflow: scroll;
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
        margin: 2px auto;
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

    .log{
        width:100%;
        height: 200px;
        overflow-y: scroll;
    }

    .logItem{
        width: 100%;
        font-size: 12px;
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
        height: 320px;
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
        height: 280px;
        overflow: scroll;
    }
    .tableCls input{
        height: 20px;
        width: 95px;
        margin: 0;
        padding: 0;
    }

    .icon-undo2{
        width: 16px;
    }
    .bnDelWrapper{
        width: 100%
    }

    .bnDel{
        width: 50px;
        margin: 0 auto;
    }
    .bnDel input{
        width: 20px;
    }

    .tableCls th{
        width: 120px;
    }
</style>

