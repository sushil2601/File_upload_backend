const express = require('express');
const connectDB = require('./config/database');
const app = express();

require('dotenv').config();  

//middleware
app.use(express.json());
// app.use(coockiParser());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.listen(3000,()=>{
    console.log('Server is connected at port 3000....')
})

// connectDB();
connectDB();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api route
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);
