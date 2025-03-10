const mongoose = require('mongoose')

require('dotenv').config();

const connectDB = async(req,res)=>{
    await mongoose.connect(
        process.env.DB_URL
    )
    .then(()=>{
        console.log('Database connected successfully !!!!')
    })
    .catch((err)=>{
        console.err('Database is not connected !!!!')
        process.exit(1);
    })
}

module.exports = connectDB