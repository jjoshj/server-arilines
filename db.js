const mongoose= require("mongoose");


var mongoURL = 'mongodb+srv://joshrooms:jack123@cluster0.xtxqj.mongodb.net/josh-airlines'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection=mongoose.connection

connection.on('connected',()=>{ 
    console.log('Mongo DB Connection Succesfull')
})

connection.on('error',()=>{
    console.log('Mongo Db Connected failed')
})




module.exports= mongoose