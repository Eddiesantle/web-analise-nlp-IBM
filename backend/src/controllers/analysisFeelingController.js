const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: 'fmhzO7gIpIN1ibX64pBeD5Fw30Tc_fQvydEnk0_s8Nie',
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/d4e982f0-87e6-4bc9-bc17-43dec4e768b5',
});

exports.post = async(req, res, next) => {

    const { text, url } = req.body
        //console.log(req.body)

    const analyzeParams = {
        "url": url,
        "text": text,
        "features": {
            'emotion': {},
            "semantic_roles": {},
            'concepts': {
                'limit': 10
            },
            "categories": {},

            'entities': {
                'sentiment': true,
                'limit': 10
            },
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 10
            },
            'relations': {},
            'semantic_roles': {},
            'sentiment': {},
            'syntax': {
                'sentences': true,
                'tokens': {
                    'lemma': true,
                    'part_of_speech': true
                }
            }
        },
    };



    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            //return (JSON.stringify(analysisResults, null, 2));
            return res.status(201).json(analysisResults.result, null, 2)
        })
        .catch(err => {
            console.log('error:', err);
        });

};

exports.get = (req, res, next) => {

    res.status(201).send('Requisição recebida com sucesso - get!');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso - put! ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso - delete! ${id}`);
};