const fs = require('fs');

const booksContent = (request,response)=>{
    const {url, method} = request;
    if(method === 'GET'){
        response.writeHead(200,{
            'Content-Type': 'text/plain',
            });
        
        const readable = fs.readFileSync('books.txt','utf-8');
        response.end(readable)
    }


    if(method==='POST'){
        //201 created
        response.writeHead(201,{
            'Content-Type': 'text/plain',
        });
        const chunks = [];
        request.on('data', chunk => chunks.push(chunk));
        request.on('end', () => {
       
        const data = Buffer.concat(chunks);
        const text = data.toString('utf-8')
        console.log('Data: ', text);
        fs.appendFileSync('books.txt', '\n.' +'{'+'\n'+'libro: '+text+'\n'+'}');
        })
        
    const readable = fs.readFileSync('books.txt','utf-8');
    response.end(readable)
    }
    if(method==='DELETE'){
        //202 if the action has been queued
        response.writeHead(200,{
            'Content-Type': 'text/plain',
        });
        fs.writeFile('books.txt', '', function(){console.log('done')})
        response.end()
    }

}


module.exports = {
    booksContent,
}