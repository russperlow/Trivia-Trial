const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === ''){
        const body = [];

        request.on('error', (err) => {
            console.log(err);
            response.statusCode = 400;
            response.end();
        });

        request.on('data', (data) => {

        });

        request.on('end', () =>{

        });
    }else{
        console.log('else on post');
        console.log(parsedUrl);
    }
};

const handleHead = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === ''){

    }else{

    }
};

const handleGet = (request, response, parsedUrl) => {
    if(parsedUrl.pathname === '/'){

    }else if(parsedUrl.pathname === '/style.css'){
        htmlHandler.getCSS(request, response);
    }else{

    }
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if(request.method === 'POST'){

    }else if(request.method === 'HEAD'){

    }else{

    }
}

http.createServer(onRequest).listen(port);