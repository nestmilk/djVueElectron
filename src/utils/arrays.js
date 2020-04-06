// 可公用，从唯一列表中，切除某一元素
import {get} from "svelte/store";

export const removeFromUniqueArray = (list, item) => {
    // splice 切片处理（start，length)
    // slice （start， end) 不包括end
    let copied_list = JSON.parse(JSON.stringify(list))
    let i = copied_list.indexOf(item)
    return [].concat(copied_list.slice(0,i), copied_list.slice(i+1))
}



// 增加或修改item的子属性的值，attr_list包含所有上级父属性及自身的列表，value为目的值
export  const ModifyItemAttr = (item, attr_list, value) => {
    //查看所有父属性是否存在，不存在则创建
    let i = 0
    let sub_item = item
    function modifyAttr() {
        if (i===attr_list.length -1) {
            if (!sub_item.hasOwnProperty(attr_list[i])) sub_item[attr_list[i]] = {}
            sub_item[attr_list[i]] = value
            return
        }else{
            if (!sub_item.hasOwnProperty(attr_list[i])) sub_item[attr_list[i]] = {}
            sub_item = sub_item[attr_list[i]]
            i++
        }
        modifyAttr()
    }
    modifyAttr()
}

//删除item的子属性，attr_list包含所有上级父属性及自身的列表，value为目的值
export  const deleteItemAttr = (item, attr_list) => {
    //查看所有父属性是否存在，不存在则创建
    let i = 0
    let sub_item = item
    function getAttr() {
        if (i=== attr_list.length-1) {
            delete sub_item[attr_list[i]]
            return
        }else{
            sub_item = sub_item[attr_list[i]]
            i++
        }
        getAttr()
    }
    getAttr()
}


export const getItemAttrV = (item, attr_list) => {
    //查看所有父属性是否存在，不存在则创建
    let i = 0
    let sub_item = item
    let getted
    function getAttr() {
        if (i===attr_list.length -1) {
            // TODO svelte很奇怪，直接使用return sub_item[attr_list[i]], 无法获取到值！！
            getted = JSON.parse(JSON.stringify(sub_item[attr_list[i]]))
            return
        }else{
            sub_item = sub_item[attr_list[i]]
            i++
        }
        getAttr()
    }
    getAttr()
    return getted
}

// 修改列表中某id号的元素的子属性的值，attr_list包含子属性前的上级所有父属性列表，value为目的值
export  const getItemByIdandOperateAttr = (item_list, id, attr_list, operation,  value=null) => {
    // 先查找是否存在此id的item
    let find = false
    let finded_index = -1
    let index = 0
    for (let item of item_list) {
        if (item.id===id) {
            find = true
            finded_index = index
            break
        }
        index++
    }
    if (!find) return
    let item = item_list[finded_index]

    if (operation === 'add' || operation === 'modify') {
        ModifyItemAttr(item, attr_list, value)
        return
    }
    if (operation === 'delete'){
        deleteItemAttr(item, attr_list)
        return
    }
    if (operation === 'get'){
        return getItemAttrV(item, attr_list)
    }
}


export  const getItemById = (item_list, id) => {
    // 先查找是否存在此id的item
    let find = false
    let finded_index = -1
    let index = 0
    for (let item of item_list) {
        if (item.id===id) {
            find = true
            finded_index = index
            break
        }
        index++
    }
    if (find) {
        return item_list[finded_index]
    }else{
        return null
    }
}

export  const getItemById2 = (item_list, id, field) => {
    // 先查找是否存在此id的item
    let find = false
    let finded_index = -1
    let index = 0
    for (let item of item_list) {
        if (item.id===id) {
            find = true
            finded_index = index
            break
        }
        index++
    }
    if (find) {
        return item_list[finded_index][field]
    }else{
        return null
    }
}

// 判断两个浅显的无重复元素的数组，是否内容都一样，排序忽略
export const ifContentEqualArrays = (arrayA, arrayB) => {
    if (arrayA.length !== arrayB.length) return false
    for (let item of arrayA) {
        if (arrayB.indexOf(item) === -1) return false
    }
    return true
}

// field的值用于生成key, 返回的对象，如果对obj的值修改，同样会改变array中的值
export const arrayToDict = (array, field, keepContact=false) => {
    if (!keepContact){
        array = JSON.parse(JSON.stringify(array))
    }
    return array.reduce((obj, item)=>{
        obj[item[field]] = item
        return obj
    }, {})
}

// 查找数组中，元素为字典，字典某个field等于value的，该元素的index 0开始
export const findIndexByFieldValue = (array, field, value)=>{
    let i = 0
    for (let item of array){
        if(item[field]===value) break
        i++
    }
    return array.length===i?-1:i
}