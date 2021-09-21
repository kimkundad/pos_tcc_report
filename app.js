const express = require("express");
const https = require('https');
const axios = require('axios');
const path = require('path');
var http = require('http');
const qs = require('querystring');
const app = express();




app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(3040, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// POST Method

app.post('/report', (req, res1) => {
  var data1 = null;
  //  res.send(req.body)
  req.on('data', chunk => {
    console.log(`Data chunk available: ${chunk}`)
     data1 = chunk;

     const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    

     axios.post('http://pos.thaibevapp.com/api/v1/report/History', data1, config)
    .then((res) => {
        console.log('Body: ', res.data);

        res1.send(res.data);

    }).catch((err) => {
        console.error(err);
    });


  })
  req.on('end', () => {
    //end of data
  })


});


  // GET Method

  app.get("/get_invoice/:id", (req, res) => {
      
    res.render(path.join(__dirname, '/invoice.html'), {id: req.params.id});

  });

  app.get("/invoice/:id", (req, res) => {

  axios.get('https://pos.thaibevapp.com/api/v1/report/History/'+req.params.id)
  .then(response => {
   // console.log(response.data.url);
   // console.log(response.data.explanation);

   console.log(response);
   //res.end(response);
   res.send(response.data);
   
  })
  .catch(error => {
    console.log(error);
  });
  


});