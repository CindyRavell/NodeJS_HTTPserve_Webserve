const fs = require('fs');


const booksContent = (request,response)=>{
    const {url, method} = request;
    console.log(url, method);
    console.log('req', request);
    if(method === 'GET'){
    response.writeHead(200,{
        'Content-Type': 'text/plain',
    });
    const readable = fs.readFileSync('books.txt','utf-8');
    response.end(readable)
}
}
/*
    if(method==='POST'){

    }
    */

module.exports = {
    booksContent,
}