const filterSelectionsConfig = {
    done: [
        {
            value: false,
            content: '尚未提交'
        }, {
            value: true,
            content: '已经提交'
        }, {
            value: null,
            content: '全部'
        },
    ],
}

class Done {
    static selections = JSON.parse(JSON.stringify(filterSelectionsConfig.done))
    static selections_len = filterSelectionsConfig.done.length
    now_id = 0

    toggleNowId (){
        this.now_id = (this.now_id + 1)%Done.selections_len
    }
    getValue () {
        return Done.selections[this.now_id].value
    }
    getContent () {
        return Done.selections[this.now_id].content
    }

}

let done = new Done()
console.log(done.getValue(), done.getContent())
done.toggleNowId()
console.log(done.getValue(), done.getContent())