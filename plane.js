const mongoose = require("mongoose");

const planeSchema = mongoose.Schema({
     name:{
         type:String,
         required: true
     },
     travelhours:{
        type: Number,
        required: true
     },
     time:{
        type: String,
        required: true
     },
     amount:{
        type:Number,
        required: true
     },
     imageurls:[],
     currentbookings:[],
     place:{
         type: String,
         required:true
     },
     stop:{
         type: String,
         required:true
     },
     description:{
         type: String,
         required:true
     }
    },{
        timestamps: true,
})

const planeModel =mongoose.model('planes',planeSchema)

module.exports= planeModel