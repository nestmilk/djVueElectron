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
        dispatch('sureReply', {status})
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
        z-index: 1199;
        filter: alpha(Opacity=0);
        -moz-opacity: 0;
        opacity: 0;
    }
    .sure{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1200;
        width: 200px;
        height: 150px;
        text-align: center;
        background: white;
        border: 1px solid #666666;
    }

    .message{
        width: 80%;
        height: 40px;
        line-height: 20px;
        margin: 20px auto;
        font-size: 16px;
        text-align: center;
    }

    .buttonWrapper{
        width: 80%;
        height: 68px;
        line-height: 68px;
        margin: 0 auto;
    }
    button{
        margin: 0 8px;
        padding: 0;
        width: 60px;
        height: 24px;
        border: 1px solid #cccccc;
    }

</style>


