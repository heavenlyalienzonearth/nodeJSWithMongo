const express = require ('express');
const bodyParser=require ('body-parser');
const cors = require ('cors');
const app = express();

//app.use(cors);
app.use(bodyParser.json());


//Middlewares [ This helps some of the Validations to be introduced before the Posts Method is called.]
/*app.use('/posts',() => {
    console.log('This is the middleware Running');
});*/

//Import Routes
const postsRoute = require('./Routes/posts');
app.use('/posts',postsRoute);

const usersRoute = require('./Routes/users');
app.use('/users',usersRoute);

const mintingRoute = require('./Routes/minting');
app.use('/minting',mintingRoute);


//How to Start Listening to a PORT
app.listen(4343);