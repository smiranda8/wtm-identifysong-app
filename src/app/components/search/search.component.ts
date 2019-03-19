import { Component } from '@angular/core';
import { LastfmService } from '../../services/lastfm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor(private lastfm: LastfmService ) { }

  buscar(termino: string) {
    console.log('Termino de busqueda: ' + termino);

    this.loading = true;
    if (termino !== '') {
      this.lastfm.searchArtista( termino )
        .subscribe( (data: any) => {
          console.log('Results searchArtista: ' + data);
          this.artistas = data;
          this.loading = false;
        });
    } else {
      this.artistas = [];
      this.loading = false;
    }
  }
}
