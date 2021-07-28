const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '2776a51043704176a01e89d7ba4772ba'
});

const handleApiCall = (req , res) => {
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL , req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json(err , 'Unable to work with api'))
}


const handleImage = (req , res , db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).res.json('Unable to get entries'))
  
}

module.exports = {
    handleImage ,
    handleApiCall
}