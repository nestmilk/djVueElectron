exports.igvSocketTemplate = "from socket import *\n" +
    "import os\n" +
    "\n" +
    "host = '127.0.0.1'\n" +
    "port = 60151\n" +
    "msg = \"${msg}\"\n" +
    "igvSocket = socket(AF_INET, SOCK_STREAM)\n" +
    "igvSocket.connect((host, port))\n" +
    "igvSocket.send(msg.encode('utf8'))\n" +
    "igvSocket.close()"


exports.igvLoadTrack = (bamPath, baiPath)=>{
    return `load ${bamPath} index=${baiPath}`
}

exports.igvGotoLocus = (locus) => {
    return `goto ${locus}`
}