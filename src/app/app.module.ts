import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TarjetaArtistaComponent } from './components/tarjetas/tarjeta-artista/tarjeta-artista.component';
import { TarjetaCancionComponent } from './components/tarjetas/tarjeta-cancion/tarjeta-cancion.component';
import { SearchSongComponent } from './components/search/search-song/search-song.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    LoadingComponent,
    TarjetasComponent,
    TarjetaArtistaComponent,
    TarjetaCancionComponent,
    SearchSongComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
