<Header></Header>

<div class="middle">
    <LeftMenus active="样本信息"></LeftMenus>
    <div class="midRight">我就是samples11
        <div class="try">
            <table>
                <tr>
                    <td>11</td>
                    <td>21</td>
                    <td>31</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="here">3
                        <div class="three"></div>
                    </td>
                    <td>2</td>
                </tr>
            </table>
        </div>
        <div bind:this={pic} class="pic"/>
    </div>
</div>

<script>
    import {onMount} from 'svelte'
    import echarts from 'echarts'
    import Header from '../../components/Header/Header.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
    let pic
    let option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
            },
        ],
    };

    onMount(async ()=>{
        let myChart = echarts.init(pic)
        myChart.setOption(option)
    })

</script>

<style>
    .middle{
        width: 100%;
        min-height: 700px;
        /*background-color: darkgoldenrod;*/
        border-left: 1px solid black;
        border-right: 1px solid black;
        display: flex;
    }
    .leftMenus{
        flex: 0 0 110px;
    }
    .midRight{
        flex: 1;
    }
    table{
        table-layout: fixed;
    }
    tr td {
        min-width: 40px;
        border: 1px solid black;
    }
    .try{
        overflow: scroll;
        width: 125px;
        height: 60px;
    }
    .here{
        position: relative;
    }
    .three{
        position: absolute;
        top: 0px;
        left: 100px;
        width: 100px;
        height: 100px;
        background: yellow;
    }
    .pic{
        width: 600px;
        height: 400px;
    }

</style>
