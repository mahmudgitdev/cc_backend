const mongoose = require('mongoose')
// const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/champion';
const DB_URL = process.env.DB_URL || 'mongodb://championdb:500bfa36915901013b6f4a6bbc67c64b@dokku-mongo-championdb:27017/championdb';

// mongoose.connect('mongodb://127.0.0.1:27017/champion',{
// useNewUrlParser:true,
// })



mongoose.connect(DB_URL,{
    useNewUrlParser:true,
}).then(
    ()=> {console.log("Database Connected..")},
    err => {console.log("err",err)}
    )
    