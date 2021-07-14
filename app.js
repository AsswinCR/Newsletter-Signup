//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express(); // new instance of experess

app.use(express.static("public")); //path
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  console.log(firstName, lastName, email);
  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName,


        }
      }

    ]
  };
  const jsonData =  JSON.stringify(data);
  const url =" https://us6.api.mailchimp.com/3.0/lists/0913f3479f";

const options = {
  method : "POST",
  auth : "Asswin1:462377c59dcd634364de2eaabeff6440-us6"
}

const request =  https.request(url, options, function(response){
    if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  //request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running in port 3000");
});

// API Key
//462377c59dcd634364de2eaabeff6440-us6

// List Id
//0913f3479f
