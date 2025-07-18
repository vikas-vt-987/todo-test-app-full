const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
require("dotenv").config();
const PORT = process.env.PORT
const cors = require('cors');
const connectDb = require('./config/db');
const todoRoutes = require("./routes/todo.routes");

app.use(express.json())
app.use(cors())

connectDb()
// app.post('/check',async (req,res)=>{
//     try{
//         const createdUser = await User.create(req.body)
//         console.log(createdUser);
//         res.status(200).send(createdUser)

//     }catch(err){
//         res.status(400).send(err)
//     }
// })

// app.get('/check',async(req,res)=>{
//     try{
//         const getUser = await User.find()
//         res.status(200).send(getUser)
//     }catch(err){
//         res.status(400).send(err)
//     }
// })

// app.delete('/check/:id',async (req,res)=>{
//     const userId = req.params.id
//     try{
//         const deletedUser = await User.findByIdAndDelete(userId)
//         if (!deletedUser) {
//             return res.status(404).send("  User not found");
//           }
//     res.status(200).send(`user with ${deletedUser.name} deleted`)
//     }
//     catch(err){
//         res.status(400).send("err",err)
//     }
// })
app.use("/", todoRoutes);
app.listen(PORT,()=>{
    console.log(`server connected on http://localhost:${PORT}`)
})

