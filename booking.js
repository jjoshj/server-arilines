const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    plane:{
        type:String, required:true
    },
    planeid:{
        type:String,required:true
    },
    ondate:{
        type:String,required:true
    },
    userid:{
        type:String,required:true
    },
    time:{
        type:String,required:true
    },
    place:{
        type:String,required:true
    },
    totalamount:{
        type:Number,required:true
    },
    transactionId:{
        type:String,required:true
    },
    status:{
        type:String,required:true, default:'booked'
    }
},{
  timetamps:true, 
})

const bookingmodel=mongoose.model('booking',bookingSchema);

module.exports=bookingmodel