const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/addTrivia'){
        const body = [];

        request.on('error', (err) => {
            //console.log(err);
            console.dir(err);
            response.statusCode = 400;
            response.end();
        });

        request.on('data', (data) => {
            body.push(data);
        });

        request.on('end', () =>{
            const bodyString = Buffer.concat(body).toString();
            const bodyParams = query.parse(bodyString);
            jsonHandler.addTriva(request, response, bodyParams);
        });
    }else{
        //console.log('else on post');
        //console.log(parsedUrl);
    }
};

const handleHead = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/getTrivia'){
        jsonHandler.getTrivaQuestion(request, response);
    }else{
        jsonHandler.notReal(request, response);
    }
};

const handleGet = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/'){
        htmlHandler.getIndex(request, response);
    }else if(parsedUrl.pathname === '/style.css'){
        htmlHandler.getCSS(request, response);
    }else if(parsedUrl.pathname === '/getTrivia'){
        jsonHandler.getTrivaQuestion(request, response);
    }
    else{
        jsonHandler.notReal(request, response);
    }
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if(request.method === 'POST'){
        handlePost(request, response, parsedUrl);
    }else if(request.method === 'HEAD'){
        handleHead(request, response, parsedUrl);
    }else{
        handleGet(request, response, parsedUrl);
    }
}

http.createServer(onRequest).listen(port);
//console.log(`Listening on 127.0.0.1: ${port}`);