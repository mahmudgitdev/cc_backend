const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');  
require('dotenv').config()
app.use(cors());
//import auth routes
const authRoute = require('./routes/auth');
const usergetRoute = require('./routes/user_get_actions');
const userpostRoute = require('./routes/user_post_actions');
//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(authRoute);
app.use(usergetRoute);
app.use('/api/actions',userpostRoute);


app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
})
