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

// class Done {
//     static selections = JSON.parse(JSON.stringify(filterSelectionsConfig.done))
//     static selections_len = filterSelectionsConfig.done.length
//     now_id = 0
//
//     toggleNowId (){
//         this.now_id = (this.now_id + 1)%Done.selections_len
//     }
//     getValue () {
//         return Done.selections[this.now_id].value
//     }
//     getContent () {
//         return Done.selections[this.now_id].content
//     }
//
// }


function DoneFilter() {
    this.selections = JSON.parse(JSON.stringify(filterSelectionsConfig["done"]))
    this.selections_len = filterSelectionsConfig["done"].length
    this.now_id = 0
    this.value = this.selections[0].value
    this.content = this.selections[0].content
}

DoneFilter.prototype.toggleNowId = function () {
    this.now_id = (this.now_id + 1)%this.selections_len
    this.value = this.selections[this.now_id].value
    this.content = this.selections[this.now_id].content
}

// let done = new DoneFilter()
// console.log(done.value, done.content)
// done.toggleNowId()
// console.log(done.value, done.content)
// function show(a, b=null, c=null){
//     console.log(a,b,c)
// }
// show(a=1,c=3)
// const uuidv4 = require('uuid/v4')
//
// console.log(uuidv4())

let l = [{id: 1}, {id: 3}, {id: 2}, {id: 4}]

console.log(l.sort((a, b)=>a.id-b.id))

console.log(l)