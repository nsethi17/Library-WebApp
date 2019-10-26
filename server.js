// Packages required
const express = require('express');
const bodyParser = require('body-parser');

//initializing express app
const app = express();

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port no.:'+ port);
});