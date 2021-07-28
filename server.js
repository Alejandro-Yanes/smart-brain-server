const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');
const { json } = require('express');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'teste',
    database : 'smart-brain'
  }
});

// db.select('*').from('users')
// .then(data => console.log(data));

const app = express();


app.use(express.json());
app.use(cors());



app.get("/" , (req , res) => {
    res.send(database.users)
})

app.post('/signin' , (req , res) => signIn.handleSignIn(req , res , db , bcrypt));
app.post('/register' , (req , res) => register.handleRegister(req , res , db , bcrypt));
app.get("/profile/:id" , (req , res) => profile.handleProfile(req , res , db));
app.put('/image' , (req , res) => image.handleImage(req, res , db));

app.post('/imageUrl' , (req , res) => image.handleApiCall(req , res));

app.listen(3001, () => {
    console.log("port 3001 working")
})

