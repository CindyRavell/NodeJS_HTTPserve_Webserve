 
/***
 * http://localhost:3000/file-viewer?directory=actual to know the actual directory
*/
const fs = require('fs')
const { request } = require('http')

let directory = null;
const fileViewer = (request,response,fullURL)=>{
    
    const urlQuery = new URL(fullURL)
    var searchParams = new URLSearchParams(urlQuery.search);
    const {url,method} = request
  
    if (searchParams.has("directory")) {
        directory = urlQuery.searchParams.get("directory");
        directorySearch(directory)
        const readable = fs.readFileSync('directories.txt','utf-8');
        response.end(readable)
    
    }else{
        response.writeHead(400,{
            'Content-Type': 'text/plain',
        });
        response.end('No especificó documento')
    }

    
}



function directorySearch(dir){
    fs.writeFileSync('directories.txt', '')

    if(directory === 'actual'){
        ruta =process.cwd(); 
    }
    if(directory!==null&&directory!=='actual'){
        ruta = './'+ directory;
    }

    fs.readdirSync(ruta).forEach(function(archivo){
	
		const rutaDirectory = ruta +"/"+archivo
		if(fs.lstatSync(rutaDirectory).isDirectory()){
            fs.appendFileSync('directories.txt', '\n. '+archivo+'/');
		}else{
            fs.appendFileSync('directories.txt', '\n. '+archivo);
		}

});
}


module.exports={
    fileViewer
}