const express = require('express');
const app = express();
const mongoose = require('mongoose');

const url = "mongodb+srv://ahmedmegho460:nodejs123@learn-mongo-db.1nqz1xg.mongodb.net/nodejs-start?retryWrites=true&w=majority&appName=learn-mongo-db"
mongoose.connect(url).then(()=>{
    console.log('mongodb server started');
})
app.use(express.json());

const CoursesRoute = require('./routes/courses.route');
app.use('/api/courses' , CoursesRoute);

app.listen(4000 , ()=>{
    console.log('Listen on port : 4000');
});