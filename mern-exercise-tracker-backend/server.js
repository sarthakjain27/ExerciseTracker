const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose'); //mongoose will help in connecting to MongoDB Database

/*
This line configures, so that we can have our env variables in dotenv file
*/
require('dotenv').config();

/*
Below two lines sets port to create a server
*/
const app=express();
const port=process.env.PORT;

/*
setting middleware. 
express.json() doing part of bodyParser.json() to parse json since our server will be sending and receiving json
*/
app.use(express.json());
app.use(cors());

const uri=process.env.ATLAS_URI;
//newUrlParser for the new mongoose library to read the mongodb url with new parser
//use create index to avoid using the deprecated insure index constraint
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;

//once the connection is open, we print the console log
connection.once('open',()=>{
    console.log('Connected to MongoDB SuccessFully');
})

const exercisesRouter=require('./routes/exercises.js');
const usersRouter=require('./routes/users');

/*
We requires in the files. And then using app.use so that whenever client comes to /root_url/exercies,
exercisesRouter will get called and similarly for usersRouter
*/
app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);


app.listen(port,()=>{
    console.log(`The server has started and is listening on ${port}`);
});