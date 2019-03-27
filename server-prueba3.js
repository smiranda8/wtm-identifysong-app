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

 var date = new Date(); 
 var timestamp = date.getTime()/10000;
 var stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);
	
function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {	
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  console.log('Llamada a sign');
  return crypto.createHmac('sha1', accessSecret)
    .update(new Buffer.from(signString, 'utf-8'))
    .digest().toString('base64');
}

app.use(cors());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use((request, response, next) => {
  var current_data = new Date();
  var timestamp = current_data.getTime()/1000;  
  console.log('Hora: ' + current_data);
  console.log('Headers: ');
  console.log(request.headers);  
  next();
});

app.use((request, response, next) => {
  request.chance = Math.random();
  next();
})

app.post('/identify', bodyParser.json(),(request, response) => {
	const body = request.body;	
	
	//console.log('Request RESPONSE-> ');
	//console.log('Request RESPONSE-> ');
	//response.json(body);
	var signature = sign(stringToSign, options.access_secret);	
	var bitmap = fs.readFileSync(body.param);
	var formData = {
    sample: new Buffer(bitmap),
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    //sample_bytes:body.length,	
	sample_bytes:1000000,
    timestamp:timestamp
	}	
	//console.log(formData);	
	requestI.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData:  formData
	}, function (err, httpResponse, body) {
	  if (err) console.log(err);		  
	  console.log('Estamos en requestI.post');	  
	  console.log('statusCode:', httpResponse && httpResponse.statusCode); 
	  console.log('SERVER RESPONSE BODY' + body);
	  response.json(body);
	  return httpResponse;
	});	

	
 
});

app.listen(3000);