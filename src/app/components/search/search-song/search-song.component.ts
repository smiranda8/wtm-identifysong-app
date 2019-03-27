import { Component } from '@angular/core';
import { IdentifyService } from '../../../services/identify.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: []
})
export class SearchSongComponent {

  /* require: any;
  fs: any;*/
  fileContent: any;
  user = { id: 1, name: 'Hello' };
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type');

  constructor(private http: HttpClient) { }

  public callServer(dataFile: any) {
    console.log('dataFile -> ' + dataFile);
    const dataPost = {
      param: dataFile
    };
    console.log('dataPost ' + dataPost);
    this.http.post('http://127.0.0.1:3000/identify', dataPost, {
      headers: this.headers,
      observe: 'response'
    })
      .subscribe(data => {
        console.log('respuesta identify ->' + JSON.stringify(data));
      });
  }

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
     // self.callServer(self.fileContent);
    //TO DO : recoger dinámicamente la url del audio que se grabe.
     self.callServer("342161552914591-sort.wav");      
     console.log('Se hace la llamada al service identify');
    };

    console.log(fileReader.readAsText(file));
  }




//Implementación nueva

  public callServer2(dataFile: any) {
    console.log('contenido de WAV. dataFile -> ' + dataFile);
    const dataPost = {
      param: dataFile
    };
    console.log('contenido de WAV tras pasarlo a constante. dataPost ' + dataPost.param);

    return this.http.post('http://127.0.0.1:3000/identify', dataPost.param, {
      headers: this.headers,
      observe: 'response'
    });
  }

  public onError(error: any) {
    console.log('Search-Song.component --> Error en la llamada:: ', error);

  }
  public onChange2(fileList: FileList): void {
    // tslint:disable-next-line:prefer-const
    let file = fileList[0];
    // tslint:disable-next-line:prefer-const
    let fileReader: FileReader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let self = this;

    // tslint:disable-next-line:only-arrow-functions
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result as string;
      self.callServer2(fileReader.readAsArrayBuffer(file)).subscribe(data => {
        console.log('Respuesta de identify ->' + JSON.stringify(data));
      }, (data: HttpErrorResponse) => {
        console.log('Error' + data.message);
      });
    };
    console.log('Se hace la llamada al service identify');
    
  }
}