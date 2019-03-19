import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {

  constructor(private http: HttpClient) {
    console.log('LastFm service listo');
  }

  getQuery( query: string) {

    const url = `http://ws.audioscrobbler.com/2.0/?method=${ query }&api_key=fedefd6cc32ec5683ef8268f582e73c1&format=json`;

    return this.http.get( url ).pipe(map(result => result));

  }

  getTopTracks() {
    return this.getQuery(`chart.gettoptracks&limit=10`)
     // tslint:disable-next-line:no-string-literal
     .pipe( map( data => data['tracks'].track));
  }

  searchArtista( param: string) {
    return this.getQuery(`artist.search&artist=${param}`)
     // tslint:disable-next-line:no-string-literal
     .pipe( map( data => data['results'].artistmatches.artist));
  }

  getArtista( param: string ) {
    return this.getQuery(`artist.getInfo&artist=${param}`)
     // tslint:disable-next-line:no-string-literal
     .pipe( map( data => data['artist']));
  }

  getTopTracksByArtista( param: string ) {
    return this.getQuery(`artist.getTopTracks&artist=${param}`)
     // tslint:disable-next-line:no-string-literal
     .pipe( map( data => data['toptracks'].track));
  }
}
