const express = require("express");
const router = express.Router();

const Plane =require('../models/plane')

router.get("/getallplanes",async(req,res)=>{

    try{
        const planes = await Plane.find({})
        res.send(planes);
    }catch(error){
        return res.status(400).json({message:error});
    }
});

router.post("/getplanebyid",async(req,res)=>{

    const planeid =req.body.planeid
    try{
        const plane = await Plane.findOne({_id : planeid})
        res.send(plane);
    }catch(error){
        return res.status(400).json({message:error});
    }
});

router.post('/addplane',async(req,res)=>{
    try {
        const newplane = new Plane(req.body)
        await newplane.save()
        res.send('New Flight Added Successfully')
    } catch (error) {
        return res.status(400).json({error});
        
    }
})
module.exports= router;