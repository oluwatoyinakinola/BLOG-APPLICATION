require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 
const jwt = require("jsonwebtoken");
const connectDB = require("./database/db")
const userRoute = require("../routes/userRoute")
//const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);


// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('combined'));


app.use(express.json());
app.use(morgan('dev')); 
app.set('async', true); 



// Routes
// const indexRouter = require('./routes/indexRoute');
// const userRouter = require('./routes/userRoute');
// const blogRouter = require('./routes/blogRoute');




// app.use('/', indexRouter);
// app.use('/user', userRouter); 
// app.use('/blog', blogRouter); 
// app.get('/login', userRouter); 

app.use(userRoute);
 

// Database Connection

connectDB();

// Server
const port = 3012;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


