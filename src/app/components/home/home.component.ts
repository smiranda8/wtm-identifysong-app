import { Component } from '@angular/core';
import { LastfmService } from '../../services/lastfm.service';
import { IdentifyService } from 'src/app/service/identify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;

  constructor( private lastfm: LastfmService, private iden: IdentifyService) {
    this.loading = true;
    this.lastfm.getTopTracks()
      .subscribe( (data: any) => {
        console.log('home-getTopTracks: ' + JSON.stringify(data));
        this.nuevasCanciones = data;
        this.loading = false;
      });
  }

}
