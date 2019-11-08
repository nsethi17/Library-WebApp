// Packages required
const express = require('express');
const bodyParser = require('body-parser');

//initializing express app
const app = express();
app.use(express.static('Public'));
app.use(express.json({limit:'1mb'}));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Lab3_items";


//route handler for get

app.get('/api',(req, res)=> {
    MongoClient.connect(url, function(err, db){
        if (err) console.log(err);
        let dbo =db.db("Lab3_items");
        dbo.collection("item").findOne({}, function(err,result){
            if (err) console.log( err);
            res.send({'result':result});
            db.close();
        });
    });
});

app.post('/api',(req,res) =>{
    console.log(req.body);  
    res.json({status: "Success"});


});
//process.env.PORT ||
const port =  1234;
app.listen(port, () => {
    console.log('Server is up and running on port no.:'+ port);
});