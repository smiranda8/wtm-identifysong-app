import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-artista',
  templateUrl: './tarjeta-artista.component.html',
  styles: []
})
export class TarjetaArtistaComponent {

  @Input() item: any;

  constructor( private router: Router ) {

   }

  // verArtista( name: any ) {

  //   console.log('Artista ID: ' + name);

  //   this.router.navigate([ '/artist', name  ]);

}



