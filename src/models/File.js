const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
    },
    tags : {
        type : String,
    },
    email : {
        type : String,
    }
})


//post middleware

fileSchema.post("save",async function(doc,res,req){
    try{
        console.log("Doc :-",doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        //send mail
        let info = await transporter.sendMail({
            from : `sushil - by sushil`,
            to : doc.email,
            subject : 'New file uploaded on cloudinary',
            html : `<h2>Hello jee</h2> <p>file uploaded View here : <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })

        console.log('Info :-',info);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
})

const File = mongoose.model('File',fileSchema);
module.exports = File;