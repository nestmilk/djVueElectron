<div class="switchwrapper">
    <div class="move" bind:this={move}></div>
    <div class="switchBtn btnOn">ON</div>
    <div class="switchBtn btnOff">OFF</div>
</div>
<script>
    import {afterUpdate} from 'svelte'
    export let on
    let pre_on
    let move

    afterUpdate(()=>{
        if (on !== pre_on){
            // console.log('OnOff.svelte', on, pre_on)
            if (on){
                move.style.right = '0'
                move.style.left = ''
            }else{
                move.style.left = '0'
                move.style.right = ''
            }
            pre_on = on
        }
    })

</script>

<style>
    .switchwrapper{
        width: 100%;
        height: 100%;
        border: 1px solid #666666;
        border-radius: 2px;
        position: relative;
        box-sizing: border-box;
    }
    .switchwrapper .switchBtn {
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        text-align: center;
        z-index: 5;
        color: #fff;
        border: none;
    }
    .btnOn{
        float: left;
        background: #69ca60;
    }
    .btnOff{
        float: right;
        background: red;
    }
    .move{
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        z-index: 10;
        background: #fff;
    }
</style>