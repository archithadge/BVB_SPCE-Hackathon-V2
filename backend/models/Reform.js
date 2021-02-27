const mongo=require('mongoose');

const reformSchema=new mongo.Schema({
    uploader:{
        type:mongo.Schema.Types.ObjectId,
        refer:"User"
    }
    
})