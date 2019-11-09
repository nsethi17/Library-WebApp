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
        let db_obj =db.db("Lab3_items");
        db_obj.collection("item").findOne({}, function(err,result){
            if (err) console.log( err);
            res.send({'result':result});
            db.close();
        });
    });
});

app.put('/api',(req,res) =>{
    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        let db_obj = db.db("Lab3_items");
        new_item = req.body;
        console.log(new_item)
        db_obj.collection("item").insertOne(new_item,function(err, result){
            if (err) console.log(err);
            res.json({status: "Success"});
            db.close();
        });
    });
});

app.post('/api',(req,res) =>{
    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        let db_obj = db.db("Lab3_items");
        num = req.body.num;
        nam = req.body.name;
        fld = req.body.field;
        inf = req.body.info;
        console.log(nam,fld,inf);
        if(num==1){
            let old ={name: nam};
            let nw = {};
            nw[fld] = inf;
            db_obj.collection("item").updateOne(old,{$set:nw},function(err,result){
                if(err) throw err;
                console.log("1 item updated")
                res.json({status:"Success"});
                db.close();
            }); 
        }
        else{
            let nw = {};
            nw[fld] = inf;
            db_obj.collection("item").updateMany({},{$set:nw},function(err,result){
                if(err) throw err;
                console.log("All items updated")
                res.json({status:"Success"});
                db.close();

            });
        }
    
      
    });
});
//process.env.PORT ||
const port =  1234;
app.listen(port, () => {
    console.log('Server is up and running on port no.:'+ port);
});