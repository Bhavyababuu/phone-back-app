const express = require('express');
const product = require('./Schema/productschema');
const cors =require('cors')
const corsConfig ={
  origin:"*",
  Credential:true,
  methods:["GET","POST"]

}
const path=require('path')

const connectDB = require('./Database')
const mongoose= require('mongoose')
var bodyParser=require('body-parser');


const addcart = require('./Schema/addtocartschema');
const app = express();

app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Handle favicon.ico requests specifically
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public', 'favicon.ico')));


connectDB()
const PORT = process.env.PORT || 5000 

app.use(express.json())
app.options("",cors(corsConfig))
app.use(cors(corsConfig

  // origin: 'https://phone-front-app.vercel.app',
  // methods: ['GET', 'POST'],
  // credentials: true,  // Enable CORS with credentials if needed
  // optionsSuccessStatus:200,
  // headers:"*"
));



//product//
const Route=require("./Route")
app.use("/api/admin",Route)



//user//
const userRoute=require("./Route")
app.use("/api/user",userRoute)


//add to cart
const AddtocartRoute=require("./Route")
app.use("/api/cart",AddtocartRoute)

//category


const categoryRoute=require("./Route")
app.use("/api/category",categoryRoute)



app.listen(PORT,()=>{
    console.log("the server is running at port 5000");
})
module.exports = (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' });
};
