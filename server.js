var express = require("express");
var http = require('http')
var AWS = require("aws-sdk");
var removeNewline = require('newline-remove');

var dotenv = require('dotenv');
dotenv.load();

module.exports = function(port, cb) {
  var app = express();

  var server = http.createServer(app)
  server.listen(port, listenCB)
  function listenCB() {
    var output = {
      port: port
    }
   cb(null, output)
  }

  AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
  });

  var SecretRouter = express.Router();
  var HealthRouter = express.Router();

  SecretRouter.use(function(req,res,next) {
    console.log("/" + req.method);
    next();
  });

  HealthRouter.use(function(req,res,next) {
    console.log("/" + req.method);
    next();
  });

  SecretRouter.get("/",function(req,res){

	AWS.config.update({
	  region: "us-east-1",
	  endpoint: "dynamodb.us-east-1.amazonaws.com"
	});

	var docClient = new AWS.DynamoDB.DocumentClient();

	var params = {
		TableName : "devops-challenge",
		KeyConditionExpression: "#code_name = :secret_code",
		ExpressionAttributeNames:{
			"#code_name": "code_name"
		},
		ExpressionAttributeValues: {
			":secret_code":"thedoctor"
		}
	};

	docClient.query(params, function(err, data) {
		if (err) {
			 res.json({"message" : "Unable to query DynamoDB"});
		} else {
			res.json({secret_code:{code_name:data.Items[0].code_name, secret_code:data.Items[0].secret_code}});
		}
	});

  });

  HealthRouter.get("/",function(req,res){
	var travisStatus = require('travis-status');
	var options = {
	  branch: 'master',
	  wait: 60000
	};
	travisStatus(options).then(function(apiObject) {
	require('simple-git')()
        .listRemote(['--get-url'], (err, data) => {
           if (!err) {
              res.json({container:'https://hub.docker.com/r/sassyn/carljung/',project:removeNewline(data),status:apiObject.branch.state});
           } else {
              res.json({"message" : "Unable to query GIT Project or Travis Status"});
           }
	});
      });
  });

  app.use("/secret",SecretRouter);
  app.use("/health",HealthRouter);

}
// compster
// test
