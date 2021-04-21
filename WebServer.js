const http = require ('http');
const fs = require('fs'); //para leer archivo de disco duro
const PORT = 5000;


//otra forma de hacer el servidor
/*
const server = http.createServer(function(request,response){
    response.writteHead(200,{
        'Content-Type': 'text/plain',
    });
    const content = fs.readFileSync('./example-a.txt','utf-8');
    response.end(content);
});
*/
//levantar el servidor, se levanta el viento y hay que aprender a vivir


const myrouter = (path) =>{
    const routes = {
        '/':'',
        '/books':'',
        '/file-viewer':'',
        '/server-status':''
    };
    if(routes[path]){
        return routes[path];

    }
    console.log('not found')

    
const server = http.createServer((req , res)=>{
    console.log(req.url)
    const {url, method} = req;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Hello Cindy from ${url} using ${method}</h1>`)
});

server.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
    
})
}