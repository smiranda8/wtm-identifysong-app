import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: []
})
export class TarjetasComponent {

  @Input() items: any[] = [];
  @Input() buscador: boolean;

  constructor( private router: Router ) { }

  verArtista( name: any ) {

    console.log('Artista ID: ' + name);

    this.router.navigate([ '/artist', name  ]);

  }

}
