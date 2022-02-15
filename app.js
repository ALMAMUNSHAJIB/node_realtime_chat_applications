const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookiParser = require('cookie-parser');

const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler');

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiParser(process.env.COOKIE_SECRET))

//tempalte setup
app.set('view engine', 'ejs');
//static floder
app.use(express.static(path.join(__dirname, "public")));


//database connection
mongoose.connect('mongodb://localhost/chats', {useNewUrlParser: true})
    .then(() => {
        console.log('Database connected!!!');
    }).catch((err) => console.log(err));


//import router
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const inboxRouter = require('./routes/inbox');

//use route 
app.use('/', loginRouter);
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);

//404 not found error
app.use(notFoundHandler);



app.listen(process.env.PORT, () => {
    console.log(`Server is runing ${process.env.PORT}`)
});