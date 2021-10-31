const express = require("express");
const router = express.Router();
const moment = require("moment");
const Plane = require("../models/plane");
const Booking = require("../models/booking");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51JojkhSH4Nr91unF4LvM2x4X5wgywQWYXHYrB3Y7pdthuCmDFGvlg3Qxa239ryAVZkuJCgQ6WXh38chL8FZqIjuN00wtHxjcXA"
);

router.post("/bookplane", async (req, res) => {
  const { plane, userid, ondate, time, place, totalamount ,token} = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
     
      
        const newbooking = new Booking({
          plane: plane.name,
          planeid: plane._id,
          userid,
          ondate: moment(ondate).format("DD-MM-YYYY"),
          time,
          place,
          totalamount,
          transactionId: "1234",
        });

        const booking = await newbooking.save();

        const planetemp = await Plane.findOne({ _id: plane._id });

        planetemp.currentbookings.push({
          bookingid: booking._id,
          ondate: moment(ondate).format("DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });

        await planetemp.save();

        
      
    }
    res.send("payment Successfull, Your Ticket Is Booked ");
  } catch (error) {
    return res.setMaxListeners(400).json({ error });
  }

  
});

router.post('/getbookingsbyuserid',async(req,res)=>{
  const userid= req.body.userid

  try {
    const bookings = await Booking.find({userid :userid })
    res.send(bookings)

  } catch (error) {
    return res.status(400).json({error});
    
  }

});

router.post('/cancelbooking', async(req,res)=>{
  const {bookingid , planeid}= req.body
  try {
    const bookingitem = await Booking.findOne({_id : bookingid})

    bookingitem.status='cancelled'

    await bookingitem.save()

    const plane = await Plane.findOne({_id:planeid})
    const bookings=plane.currentbookings
    const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
    plane.currentbookings=temp
    await plane.save()

    res.send('Your booking cancelled successfully')



  } catch (error) {
    return res.status(400).json({error}); 
  }
});

router.get('/getallbookings',async(req,res)=>{
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error});
    
  }
});

module.exports = router;
