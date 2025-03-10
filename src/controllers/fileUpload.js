const File = require('../models/File');

const cloudinary = require('cloudinary').v2;


exports.localFileUpload = async(req,res)=>{
    try{

        const file = req.files.file;

        console.log(file);

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);

        file.mv(path, (err)=>{
            // console.log(err);
        })

        res.json({
            success : true,
            message : 'Local File Uploaded Successfully',
        })

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            message : 'Something went wrong',
            error : err.message,
        })
    }
}

function isFileSupportedType(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.imageUpload = async(req,res) =>{
    try{

        const {name,tags,email} = req.body;

        const file = req.files.imageFile;

        const supportedType = ["jpg","jpeg","png"];
        const fileTyep = file.name.split('.')[1].toLowerCase();


        if(!isFileSupportedType(fileTyep,supportedType)){
            return res.status(400).json({
                success : false,
                message : 'File format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file,'sushil');
        // console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        })

        // await fileData.save();

        res.json({
            success : true,
            message : 'Image Upload Successfully'
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong'

        })
    }
}

exports.videoUpload = async(req,res)=>{
    try{

        const {name,tags,email} = req.body;

        const file = req.files.videoFile;

        const supportedType = ["mp4","mov"];
        const fileTyep = file.name.split('.')[1].toLowerCase();

        //TODO : add a upper limit of 5mb for video
        if(!isFileSupportedType(fileTyep,supportedType)){
            return res.status(400).json({
                success : false,
                message : 'File format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file,'sushil');
        // console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        })

        // await fileData.save();

        res.json({
            success : true,
            message : 'Video Upload Successfully'
        }) 

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}


exports.imageReducerUpload = async(req,res) =>{
    try{

        const {name,tags,email} = req.body;

        const file = req.files.imageFile;

        const supportedType = ["jpg","jpeg","png"];
        const fileTyep = file.name.split('.')[1].toLowerCase();

        //TODO : add a upper limit of 5mb for image
        if(!isFileSupportedType(fileTyep,supportedType)){
            return res.status(400).json({
                success : false,
                message : 'File format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file,'sushil',30);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        })

        // await fileData.save();

        res.json({
            success : true,
            message : 'Image Upload Successfully'
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}