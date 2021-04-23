const http = require ('http');
var url = require('full-url')
const fs = require('fs'); //para leer archivo de disco duro
const PORT = 3000;
const handler = require('./src/handlers/index');
const handlerBooks = require('./src/handlers/books');
const handlerFileViewer = require('./src/handlers/FileViewer');
const handlerServerStatus = require('./src/handlers/ServerStatus');


//FUNCION QUE RECIBE UN PARÁMETRO, LA RUTA ESPECIFICADA POR EL CLIENTE 
const myrouter = (path) =>{

    const routes = {
        '/': handler.home,
        '/books':handlerBooks.booksContent,
        '/file-viewer':handlerFileViewer.fileViewer,
        '/server-status':handlerServerStatus.serverStatus,
        '/favicon.ico':()=>{console.log('favicon')},
        
    };
    if(routes[path]){
        return routes[path];
        
    }
    return handler.notFound
}


const server = http.createServer((req , res)=>{
    let fullURL = new URL(url(req));
    let host = fullURL.host;
    let path = fullURL.pathname;//withoutquery
    const route = myrouter(path)(req,res,url(req));
    return route
});

server.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
    
})



