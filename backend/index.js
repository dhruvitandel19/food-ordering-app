const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const jwt=require ("jsonwebtoken")


const JWT_SECRET="gftyuiuijj12345667()sfdgfgh567gfhghj567ghghhjhuibhgfrdf/[]"
const options = {
    uploads: {
        maxFieldsize : 10000000000,
        maxFilesize : 10000000000
    }
}
const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))



const PORT = process.env.PORT || 8080



//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL).then((success)=>console.log("connect to Database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : true,
    },
    password: String,
    confirmpassword: String,
    image: String,
})

const userModel = mongoose.model("user",userSchema)

//api

app.get("/",async(req,res)=>{
    res.send("server is running")
})

//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

  
  //api login
app.post("/login", (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    userModel.findOne({ email: email }, (err, result) => {
      if (result) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({
          message: "Login is successfully",
          alert: true,
          data: dataSend,
        });
      } else {
        res.send({
          message: "Email is not available, please sign up",
          alert: false,
        });
      }
    });
  });
  
  
//product section

const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String,
})
const productModel = mongoose.model("product",schemaProduct)

//save  product in data
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data =  await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload Successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(data)
})

//server is running
app.listen( PORT,()=>console.log("server is running at port : " +  PORT))