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
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});

// db.select('*').from('users')
// .then(data => console.log(data));

const app = express();


app.use(express.json());
app.use(cors());



app.get("/" , (req , res) => {
    res.send('it is working')
})

app.post('/signin' , (req , res) => signIn.handleSignIn(req , res , db , bcrypt));
app.post('/register' , (req , res) => register.handleRegister(req , res , db , bcrypt));
app.get("/profile/:id" , (req , res) => profile.handleProfile(req , res , db));
app.put('/image' , (req , res) => image.handleImage(req, res , db));

app.post('/imageUrl' , (req , res) => image.handleApiCall(req , res));

app.listen(process.env.PORT || 3001 , () => {
    console.log(`app is running on port ${process.env.PORT}`)
})

