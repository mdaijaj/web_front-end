const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser= require('body-parser')

const app = express();

// EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static'))

app.use(bodyparser.json());
// app.use(express.bodyParser());

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));

// ejs SPECIFIC STUFF
app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'view')) // Set the views directory


// ENDPOINTS
app.get('/home', (req, res)=>{
    console.log("form is opening...")
    res.status(200).sendFile(__dirname+ '/view/index.html');
})

app.post('/add_member',  (req, res)=>{
    console.log("add endpoint is working here....")
    var first_name = req.body.first_name
    var age = req.body.age 
    var gender = req.body.gender
    var address = req.body.address
    var more = req.body.more

    let outputToWrite = `the name of the client is ${first_name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
    console.log(outputToWrite)
    fs.writeFileSync('output.json', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    console.log(params)
    res.status(200).send(params)
})

// START THE SERVER
const port = 8000;
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
