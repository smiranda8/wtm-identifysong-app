import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IdentifyService {

  defaultOptions = {
    host: 'identify-eu-west-1.acrcloud.com',
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type: 'audio',
    secure: true,
    access_key: '2683172f400f2ee92a6aa83a61bfe9e8',
    access_secret: 'pp1LvalngHOHyLnKDzvvikuiOmIgE0brMyr2bgG5'
  };


  constructor(private httpClient: HttpClient) {
    console.log('Identify service cargado');
   }

  public llamada(data, options, cb): Observable<any> {

    const currentData = new Date();
  // const timestamp = current_data.getTime() / 1000;

    const stringToSign = this.buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    currentData.getTime() / 1000);

    const formData = {
      sample: data,
      access_key: options.access_key,
      data_type: options.data_type,
      signature_version: options.signature_version,
      signature: this.sign(stringToSign, options.access_secret),
      sample_bytes: data.length,
      timestamp: currentData.getTime() / 1000,
    };

    return this.httpClient.post('http://' + this.defaultOptions.host + this.defaultOptions.endpoint, formData, {})
    .pipe(map( result => {
        return result;
      }));
  }

public sign(signString, accessSecret) {
     // TODO Peta buffer
     const buffer: Buffer = new Buffer(signString, 'utf-8');

     return crypto.createHmac('sha1', accessSecret)
      .update(buffer.write(signString, null, null, 'utf-8'))
      .digest().toString('base64');
  }

  public buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
    return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
  }
}
