var express = require('express');
var fs = require('fs');
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', function(req, res) {
	res.send("hello https?")
});

app.post('/', function (req, res) {
  console.log(req.body);
  var num = Math.random();
  if(num < 0.5) {
  	console.log("allowed");
  	res.json({
	  "apiVersion": "authorization.k8s.io/v1beta1",
	  "kind": "SubjectAccessReview",
	  "status": {
	    "allowed": true
	  }
	})
  } else {
  	console.log("rejected");
  	res.json({
	  "apiVersion": "authorization.k8s.io/v1beta1",
	  "kind": "SubjectAccessReview",
	  "status": {
	    "allowed": false,
	    "reason": "user does not have read access to the namespace " + num
	  }
	});
  }
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  passphrase: '654321..'
};
http.createServer(app).listen(3001);
https.createServer(options, app).listen(3000);