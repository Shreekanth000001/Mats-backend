const connecToMongo = require('./ds');
const express = require('express')
const cors = require("cors");

connecToMongo();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/hi',(req,res)=>{
    res.send(req.body);
})

app.use('/showclasses',require('./routes/showclasses'));
app.use('/classes',require('./routes/classes'));
app.use('/class',require('./routes/class'));

// app.use('/help',require('./routes/help'));

app.listen(port,()=>{
    console.log(port);
})