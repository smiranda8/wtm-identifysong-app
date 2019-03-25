const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');


//identifyprotocol
var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
//npm install request
var requestI = require('request');
var flattenJSON = require('flat')

var options = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: '2683172f400f2ee92a6aa83a61bfe9e8',
  access_secret: 'pp1LvalngHOHyLnKDzvvikuiOmIgE0brMyr2bgG5'
};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
  var current_data = new Date();
  var timestamp = current_data.getTime()/1000;
  console.log('Hora: ' + current_data);
  console.log(request.headers);
  next();
});

app.use((request, response, next) => {
  request.chance = Math.random();
  next();
})

app.post('/identify', (request, response) => {
	console.log('Request dataFile-> ' + request.params['param']);
	console.log('response-> ' + response);
	
	requestI.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData: ''
	}, function (err, httpResponse, body) {
	  if (err) console.log(err);
	  console.log(body);
	  //return httpResponse;
	});	
	
  response.json({
    chance: request.chance,
	options: options
  })
});

app.listen(3000);