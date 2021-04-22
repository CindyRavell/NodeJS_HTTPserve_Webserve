const fs = require('fs');

const home = (request, response) => {
    response.writeHead(200,{'Content-Type': 'text/html'});
    const html = fs.readFileSync('./src/public/index.html','utf-8');
    response.write(html);
    response.end();

}

/**
 * 404 NOT FOUND
 */

 const notFound = (request, response) => {
    response.writeHead(404,{'Content-Type': 'text/html'});
    const html = fs.readFileSync('./src/public/404.html','utf-8');
    response.write(html);
    response.end();

}

module.exports = {
    home,
    notFound,
}