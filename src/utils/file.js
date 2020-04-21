import js2excel from 'js2excel'


let fileUtil = {
    // 文件名截断到一个'.'
    getKey (filename) {
        var idx = filename.indexOf(".");
        return filename.substring(0, idx);
    },

    // 返回字典，key为文件的截短名，value为此文件
    getFilesDictBySuffix (files, suffix) {
        let file_dict = {}
        for (let i in files) {
            if (i === 'length') break
            //FileList {0:File, ...,8:File,length: 9, __proto__:}, 8个文件，跳出来10个
            // console.log("file: "+ i + " " + files[i].name)
            let fileName = files[i].name
            if (fileName.endsWith(suffix)) {
                file_dict[this.getKey(fileName)] = files[i]
            }
        }
        return file_dict
    },

    getJsonFromBlob (blob){
        return new Promise(function(resolve, reject){
            js2excel.excel2json([blob], (data) => {
                resolve(data)
            }, 'excel2json')
        })
    }
}


export default fileUtil
