
require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
const route = require('./Routes/Route')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const PORT = process.env.PORT || 5000


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(express.json({ limit: '10mb' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(route)

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    process.exit(1)
})


//server unexcpected server crash ko rukne ke liye 
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
    })
})
app.get('/',(req , res)=>{
    res.send('Hello world')
})


app.listen(PORT,()=>{
    console.log(`Server is up and listing on ${PORT}`)
})