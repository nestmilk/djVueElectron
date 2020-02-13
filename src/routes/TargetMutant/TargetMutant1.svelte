<Header></Header>

<div class="middle">
    <LeftMenus active="Panal信息"></LeftMenus>
    <div class="midRight">
        <div class="subMenu">
            <button>靶向用药</button>
            <button>融合基因</button>
            <button>肿瘤负荷</button>
        </div>
        <div class="middleContent">
            <div class="navLeft"></div>
            <div class="contentRight">
                <div class="mutantList">
                </div>
                <div class="igvWrapper">
                    <div class="igvBind" bind:this={igv_bind}></div>
                </div>
            </div>
        </div>
    </div>
</div>

<Footer></Footer>

{#if loadingShow}
    <Loading></Loading>
{/if}
{#if sureShow}
    <Sure></Sure>
{/if}




<script>
    import api from '../../api'
    import fileUtil from '../../utils/file'
    import {userInfo} from '../../store/store'
    import {push} from 'svelte-spa-router'
    import igv from 'igv/dist/igv.min'

    import Header from '../../components/Header/Header.svelte'
    import Footer from '../../components/Footer/Footer.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    import Loading from '../../components/Loading/Loading.svelte'
    import Sure from '../../components/Sure/Sure.svelte'
    import {onMount, createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    let loadingShow = false
    let sureShow = false

    let igv_bind
    let igvBrower

    onMount(()=>{
        let options =
                {
                    reference:
                            {
                                id: "hg19",
                                fastaURL: "/database/ucsc.hg19.fasta",
                                indexURL: "/database/ucsc.hg19.fasta.fai"
                            },
                    locus: 'chr1:1983-2020'
                };

        igv.createBrowser(igv_bind, options).then((browser)=>{
                igvBrower = browser
            })

    })

</script>



<style>

    /*TODO 高度需要好LeftMenus中高度一致 */
    .middle{
        width: 100%;
        min-height: 770px;
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
        flex: 0 0 34px;
        background: indianred;
        border-bottom: 1px solid black;
    }
    .subMenu button{
        margin: 4px 5px;
        padding: 0;
        width: 80px;
        height: 26px;
        line-height: 26px;
        font-size: 15px;
        text-align: center;
        background: white;
        border: 1px solid black;
        border-radius: 4px;
    }
    .subMenu button:hover{
        background: #09c762;
        color: white;
        border: 1px solid white;
    }

    .middleContent{
        flex: 1;
        display: flex;
    }
    .navLeft{
        flex: 0 0 240px;
        background: yellow;
    }
    .contentRight{
        flex: 1;
        display: flex;
        flex-flow: column;
    }
    .contentRight .mutantList{
        flex: 0 0 320px;
        background: peru;
    }
    .contentRight .igvWrapper{
        flex: 1;
    }
    .contentRight .igvBind{
        width: 95%;
        margin: 3px auto;
    }
</style>
