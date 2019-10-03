const trivaQuestions = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.end();
};

const getTrivaQuestion = (request, response) => {
    if(request.method === 'GET'){
        const responseJSON = {
            trivaQuestions,
        }
        respondJSON(request, response, 200, responseJSON);
    }else{
        respondJSON(request, response, 200);
    }
};

const addTriva = (request, response, body) => {
    const responseJSON = {
        message: 'Question and answer are both required'
    };

    if(!body.question || !body.answer){
        console.log('missing params');
        responseJSON.id = 'missingParams';
        return respondJSONMeta(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if(trivaQuestions[body.question]){
        responseCode = 204;
    }else{
        trivaQuestions[body.question] = {};
    }

    trivaQuestions[body.question].question = body.question;
    trivaQuestions[body.question].answer = body.answer;

    if(responseCode === 201){
        responseJSON.message = 'Trivia Question Submission Success!';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
}

const notReal = (request, response) => {
    if(request.method === 'GET'){
        const responseJSON = {
            id: 'notFound',
            message: 'The page you are looking for was not found',
        };

        respondJSON(request, response, 404, responseJSON);

    }else{
        respondJSONMeta(request,response, 404);
    }
};

module.exports = {
    getTrivaQuestion,
    addTriva,
    notReal
};