const connecToMongo = require('./ds');
const express = require('express')
const cors = require("cors");

connecToMongo();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/hi', (req, res) => {
    res.send(req.body);
})

app.use('/showclasses', require('./routes/showclasses'));
app.use('/classes', require('./routes/classes'));
app.use('/students', require('./routes/students'));
app.use('/attendance', require('./routes/attendance'));

app.get('/', (req, res) => {
    res.send('MATS Backend is running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
