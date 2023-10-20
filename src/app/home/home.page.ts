import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [PokemonService]
})
export class HomePage {
  public pokemons: any = []; 
  constructor(public pokemon: PokemonService) {
    this.loadPokemons();
  }

  async loadPokemons() {
    this.pokemon.listPokemons(10).subscribe({
      next: (response: any) => {
        this.pokemons = response;
        console.log("this.pokemons", this.pokemons);
      }
    });
  }
}
