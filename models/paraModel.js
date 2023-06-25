const mongoose=require('mongoose');

const paraSchema=new mongoose.Schema({
    para:{
        type:'String',
        required:[true,'There must be paragraph']
    }
})



const para=mongoose.model('paragraphs',paraSchema);
module.exports=para;