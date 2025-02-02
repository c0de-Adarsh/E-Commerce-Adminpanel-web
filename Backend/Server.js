
require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')
const route = require('./Routes/Route')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const PORT = process.env.PORT || 5000



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(express.json({ limit: '10mb' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(route)
app.get('/',(req , res)=>{
    res.send('Hello world')
})


app.listen(PORT,()=>{
    console.log(`Server is up and listing on ${PORT}`)
})