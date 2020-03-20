<div class="floatLayer"></div>

<div class="reasonWrapper">
    <div class="selectWrapper">
        修改类型：
        <select bind:value
                on:change={removeMessage}
        >
            {#each reasonType_list as reason_type}
                <option value="{reason_type.value}">{reason_type.content}</option>
            {/each}
        </select>
    </div>
    <div class="message">{message}</div>
    <div class="textareaWrapper">
        原因描述：
        <textarea value="{desc}"
              on:input={changeValue}
        ></textarea>
    </div>
    <div class="reasaonBnWrapper">
        <button on:click|stopPropagation={handleAddReasonSure}>确定</button>
        <button on:click|stopPropagation={handleAddReasonCancel}>取消</button>
    </div>
</div>

<script>
    import {onMount, createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    export let reasonType_list
    export let preValue
    export let preDesc
    // 如果不设默认值，就是第一项
    let value
    // 如果不设默认值，就是显示undefined
    let desc = ''
    let message = ''
    function changeValue(e){
        desc = e.target.value
    }
    function removeMessage(){
        message = ''
    }

    function handleAddReasonSure(){
        // console.log(value, desc)
        if (value==='nothing') {
            message = '请选择一个修改原因的类型！'
            return
        }
        dispatch('sure', {
            value,
            desc
        })
    }

    function handleAddReasonCancel() {
        dispatch('cancel')
    }

    onMount(()=>{
        console.log('REASON', preValue, preDesc)
        if (preValue){
            value = preValue
            desc = preDesc
        }
    })
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
        filter: alpha(Opacity=10);
        -moz-opacity: 0.1;
        opacity: 0.1;
    }
    .reasonWrapper{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
        width: 300px;
        height: 250px;
        font-size: 14px;
        background: white;
        border: 1px solid #666666;
    }
    .reasonWrapper .selectWrapper{
        margin: 0 auto;
        width: 80%;
        height: 30px;
        line-height: 30px;
        text-align: left;
    }
    .reasonWrapper .selectWrapper select{
        width: 120px;
        margin: 5px;
        padding: 0;
    }
    .reasonWrapper .message{
        margin: 0 auto;
        width: 80%;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: orangered;
    }
    .reasonWrapper .textareaWrapper{
        margin: 0 auto;
        width: 80%;
        height: 160px;
        line-height: 20px;
        text-align: left;
    }
    .reasonWrapper .textareaWrapper textarea{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 130px;
        vertical-align: middle;
    }
    .reasonWrapper .reasaonBnWrapper{
        margin: auto;
        width: 80%;
        height: 40px;
    }
    .reasonWrapper .reasaonBnWrapper button{
        display: block;
        float: left;
        margin: 7px 30px;
        padding: 0;
        width: 60px;
        height: 24px;
        border: 1px solid #cccccc;
    }
</style>