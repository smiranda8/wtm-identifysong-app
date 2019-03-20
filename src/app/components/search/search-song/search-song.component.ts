import { Component } from '@angular/core';
import { IdentifyService } from '../../../services/identify.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: []
})
export class SearchSongComponent {

  require: any;
  fs: any;
  fileContent: any;

  constructor(private iden: IdentifyService) { }

  identificarCancion() {
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

  }
  public onChange(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();

    // tslint:disable-next-line:only-arrow-functions
    fileReader.onloadend = function(x) {
      this.fileContent = fileReader.result;
    };
    console.log(fileReader.readAsText(file));
  }
}
