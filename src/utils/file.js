let fileUtil = {
    getKey (filename) {
        var idx = filename.indexOf(".");
        return filename.substring(0, idx);
    },

    getFilesDictBySuffix (files, suffix) {
        let dict = {}
        for (let i in files) {
            if (i === 'length') break
            //FileList {0:File, ...,8:File,length: 9, __proto__:}, 8个文件，跳出来10个
            // console.log("file: "+ i + " " + files[i].name)
            let fileName = files[i].name
            if (fileName.endsWith(suffix)) {
                dict[this.getKey(fileName)] = files[i]
            }
        }
        return dict
    }
}


export default fileUtil
