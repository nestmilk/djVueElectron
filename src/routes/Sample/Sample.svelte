<Header></Header>

<div class="middle">
    <LeftMenus active="样本信息"></LeftMenus>
    <div class="midRight">我就是samples11
        <table>
            <tr>
                <td class="here">11
                </td>
                <td>21</td>
                <td>31</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </table>
    </div>
</div>

<script>
    import Header from '../../components/Header/Header.svelte'
    import LeftMenus from '../../components/LeftMenus/LeftMenus.svelte'
</script>

<style>
    .middle{
        width: 100%;
        min-height: 700px;
        background-color: darkgoldenrod;
        border-left: 1px solid black;
        border-right: 1px solid black;
        display: flex;
    }
    .leftMenus{
        flex: 0 0 110px;
    }
    .midRight{
        flex: 1;
        background-color: red;
    }
    table{
        table-layout: fixed;
    }
    tr td {
        min-width: 40px;
        border: 1px solid black;
    }
    .here{
        position: relative;
    }


</style>
