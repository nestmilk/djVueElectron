<div class="floatLayer"></div>
<div class="sure">
    <div class="message">{message}</div>
    <div class="buttonWrapper">
        <button on:click={()=>handleClick(true)}>确定</button>
        <button on:click={()=>handleClick(false)}>取消</button>
    </div>
</div>

<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let message

    function handleClick(status){
        dispatch('sureMessage', {
            status: status
        })
    }
</script>

<style>
    .floatLayer{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000000;
        z-index: 999;
        filter: alpha(Opacity=0);
        -moz-opacity: 0;
        opacity: 0;
    }
    .sure{
        position: fixed;
        width: 200px;
        height: 150px;
        text-align: center;
        top: 40%;
        left: 40%;
        z-index: 1000;
        background: #cccccc;
        border: 2px solid gray;
        border-radius: 10px;
    }

    .message{
        width: 160px;
        height: 40px;
        line-height: 20px;
        margin: 20px auto;
        font-size: 16px;
        text-align: center;
    }

    .buttonWrapper{
        width: 160px;
        height: 68px;
        line-height: 68px;
        margin: 0 auto;
    }
    button{
        margin: 0 15px;
        border: 1px solid black;
        border-radius: 3px;
    }

</style>


