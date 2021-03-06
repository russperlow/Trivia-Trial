const triviaQuestions = {
0: { question: 'How many stomachs does a giraffe have?', answer: 'Four' },
1: { question: 'Who was the first person in space?', answer: 'Yuri Gagarin' },
2: { question: 'Who was the first marvel superhero?', answer: 'The Human Torch' },
3: { question: 'How many infinity stones are in the MCU?', answer: 'Six' },
4: { question: 'Who created JavaScript?', answer: 'Netscape' },
5: { question: 'Which game series features cities called Vice City, Liberty City and San Andreas?', answer: 'Grand Theft Auto' },
6: { question: 'Mario first appeared in which classic video game?', answer: 'Donkey Kong' },
7: { question: 'Which is the only video game in which Mario appears as the villain?', answer: 'Donkey Kong Jr' },
8: { question: ' Which is the only American Football team to go a whole season undefeated, including the Super Bowl?', answer: 'Miami Dolphins' },
9: { question: 'How many NBA championships did Michael Jordan win with the Chicago Bulls?', answer: 'Six' }};

let length = 4;

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
        const randomNum = Math.floor(Math.random() * length); 
        //console.log(randomNum);
        const question = triviaQuestions[randomNum].question;
        const answer = triviaQuestions[randomNum].answer;

        const responseJSON = {
            question,
            answer,
        }
        //console.log(responseJSON);
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
        //console.log('missing params');
        responseJSON.id = 'missingParams';
        return respondJSONMeta(request, response, 400, responseJSON);
    }

    let responseCode = 201;
    
    triviaQuestions[length] = {};
    triviaQuestions[length].question = body.question;
    triviaQuestions[length].answer = body.answer;
    length++;

    //console.log(triviaQuestions);

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
        respondJSONMeta(request, response, 404);
    }
};

module.exports = {
    getTrivaQuestion,
    addTriva,
    notReal
};