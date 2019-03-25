import { Component } from '@angular/core';
import { IdentifyService } from '../../../services/identify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: []
})
export class SearchSongComponent {

  /* require: any;
  fs: any;*/
  fileContent: any;
  user = { id : 1, name : 'Hello'};
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Headers', 'Content-Type');

  constructor(private http: HttpClient) { }

  public callServer(dataFile: any) {
    console.log('dataFile -> ' + dataFile);
    const dataPost = {
      param : dataFile
    };
    console.log('dataPost ' + dataPost);
    this.http.post('http://127.0.0.1:3000/identify', dataPost, {
      headers: this.headers,
      observe: 'response'
    })
    .subscribe(data => {
      console.log('resupesta identify ->' + JSON.stringify(data));
    });
  }

 /* identificarCancion() {
    const fileReader: FileReader = new FileReader();
    const blob = new Blob([`./342161552914591-sort.wav`], { type: 'audio/x-wav' });
    console.log(fileReader.readAsBinaryString(blob));
    console.log(blob);
    console.log(fileReader.result);
    // this.fileContent = fileReader.result;
    // console.log(fileReader.readAsArrayBuffer(blob));


  // this.fs = require('fs');
  // const bitmap = this.fs.readFileSync('input.txt').toString();
   // const bitmap = ReadFileSync('input.txt').toString();
   // const bitmap = readFileSync(`342161552914591-sort.wav`);
   //  const bitmap = File.readFileSync('342161552914591-sort.wav');
   // const buffer: Buffer = new Buffer(bitmap);


   // console.log(buffer);
   // this.iden.llamada(buffer, this.iden.defaultOptions, null);


   // identify(new Buffer(bitmap), defaultOptions, function (err, httpResponse, body) {
   //   if (err) console.log(err);
   //   console.log(body);
   //  });

  }*/
  public onChange(fileList: FileList): void {
    // tslint:disable-next-line:prefer-const
    let file = fileList[0];
    // tslint:disable-next-line:prefer-const
    let fileReader: FileReader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let self = this;
    // tslint:disable-next-line:only-arrow-functions
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result as string;
      self.callServer(self.fileContent);
      console.log('Se hace la llamada al service identify');
    };

    console.log(fileReader.readAsText(file));
  }
}
