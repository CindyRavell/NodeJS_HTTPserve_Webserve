const http = require ('http');
const fs = require('fs'); //para leer archivo de disco duro
const PORT = 3000;
const handler = require('./src/handlers/index')
const handlerBooks = require('./src/handlers/books')

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

//FUNCION QUE RECIBE UN PARÁMETRO, LA RUTA ESPECIFICADA POR EL CLIENTE 
const myrouter = (path) =>{
    console.log(path)
    const routes = {
        '/': handler.home,
        '/books':handlerBooks.booksContent,
        '/file-viewer':'',
        '/server-status':'',
        '/favicon.ico':'nada',
        
    };
    if(routes[path]){
        return routes[path];
        
    }
    return handler.notFound
}
/*//esto en vez de handler home
const general = (request,response)=>{
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end('something')
}
*/
//levantar el servidor, se levanta el viento y hay que aprender a vivir

const server = http.createServer((req , res)=>{
    const route = myrouter(req.url)(req,res);
    console.log(route)
    return route
    console.log(req);
    //return route(req,res)
    //myrouter(req.url)
    //const {url, method} = req;
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html');
    //res.end(`<h1>Hello Cindy from ${url} using ${method}</h1>`)
});

server.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
    
})



