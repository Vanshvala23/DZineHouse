const mongoose=require('mongoose');
const contactSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber:{
        type:String,
        required:true,
        match:/^\d{10}$/
    },
    selectService:{
        type:String,
        required:true,
        enum:[
            "Logo Design","Branding Name and templates","Visual aid design"
        ]
    },
    how:{
        type:String,
        required:true,
        enum:[
            "Social media","Google search","Referral","Other"
        ]
    },
    message:{
        type:String,
        required:true
    }
});
const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;