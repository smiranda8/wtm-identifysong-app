import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastfmService } from '../../services/lastfm.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  loadingArtist: boolean;
  artist: any;

  constructor(private router: ActivatedRoute,
              private lastfm: LastfmService) {

        this.loadingArtist = false;
        this.router.params.subscribe( params => {
          this.getArtista( params.id );
        });
  }

  getArtista( id: string) {
    this.lastfm.getArtista(id)
      .subscribe( (data: any) => {
        console.log('Results getArtista: ' + JSON.stringify(data));
        this.artist = data;
        this.loadingArtist = true;
      });
  }
}
