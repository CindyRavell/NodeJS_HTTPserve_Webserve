const { memory } = require('console')
const { appendFileSync } = require('fs')
const fs = require('fs')
const os = require('os')


const serverStatus = (request, response)=>{
    response.writeHead(200,{
        'Content-Type': 'text/plain',
    });
    fs.writeFileSync('userInfo.txt', '')
    console.log(request.url)
    const properties = {
        hostname: os.hostname(),
        freemem: os.freemem(),
        arch: os.arch(),
        cpus: os.cpus(),
        uptime: os.uptime(),
        userInfo:os.userInfo(),
        platform:os.platform(),
        osType:os.type(),
        tmpdir:os.tmpdir(),
    }
    for (let i in properties){
        let osProperty = properties[i]
        let text = JSON.stringify(osProperty)
        appendFileSync('userInfo.txt', text+'\n'+'\n')
        console.log(text, i)
        
    }

    const readable = fs.readFileSync('userInfo.txt','utf-8')
    response.end(readable)  

}
module.exports={
    serverStatus,
}