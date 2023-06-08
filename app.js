const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { url } = require('inspector');
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended : true}))






app.get("/", (req, res)=> {
res.sendFile(__dirname + "/signup.html")
})








app.post("/credentials", (req, res)=>{
const fname = req.body.firstName;
const lname = req.body.lastName;
const email = req.body.email;

var data ={
    members: [ 
        {
            email_address : email,
            status: "subscribed",
            merge_fiels : {
                FNAME : fname,
                LNAME : lname,
            }
        }
    ]
}

const Options = {
    method : "POST",
    auth : "Swaresh:368d082e346182e92fe00822552aa886-us21"
}



var jsonData = JSON.stringify(data);
const url = "https://us21.api.mailchimp.com/3.0/lists/9bd10e1e12"

const request = https.request(url, Options, (response)=>{

    if(response.statusCode == 200){
        res.sendFile(__dirname + "/sucess.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }



  response.on("data", (data)=> {
    console.log(JSON.parse(data))
  })
} )

request.write(jsonData)
request.end()

})







app.listen( process.env.PORT || port, ()=>{
    console.log(`Server is up and Running at ${port}`)
})









// const apiKey ="368d082e346182e92fe00822552aa886-us21"
// const id = 9bd10e1e12