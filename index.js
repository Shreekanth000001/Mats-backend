const connecToMongo = require('./db');
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

app.use('/course',require('./routes/learncourse'))
;
app.use('/bookmark',require('./routes/bookmark'));

app.use('/lesson',require('./routes/lesson'));
app.use('/notes',require('./routes/notes'));

app.use('/help',require('./routes/help'));

app.listen(port,()=>{
    console.log('in listen');
})