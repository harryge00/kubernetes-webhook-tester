var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});