import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, CardPokemonComponent],
})
export class HomePageModule {}
