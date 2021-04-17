const express = require('express')
const app = express()
const dotenv = require('dotenv')
var wav = require('wav');
var reader = new wav.Reader();
//const fileAPI  = require('FileAPI')
//Load env vars
dotenv.config({path:'.env'})


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
const Event = require('./models/event')


app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/save',(req,res) => {
    console.log((req.body.creator))
    //FileAPI.readAsArrayBuffer(req.body.audio)
    //console.log(FileAPI.readAsArrayBuffer(req.body.audio))
    Event.create(req.body)
})

app.listen(3001, ()=>{
    console.log("SERVER RUNNING AT PORT 3001")
})