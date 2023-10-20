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
  public currentPage: number = 0;

  constructor(public pokemon: PokemonService) {
    this.loadPokemons(this.currentPage);
  }

  async loadPokemons(currentPage: number) {
    this.pokemons = [];
    this.pokemon.listPokemons(currentPage).subscribe({
      next: (response: any) => {
        this.pokemons = response;
      }
    });
  }

  paginateTo(goTo: "left" | "right") {
    if (goTo == "right") {
      this.currentPage += 6;
    }
    else if (goTo == "left" && this.currentPage != 0) {
      this.currentPage -= 6;
    }
    this.loadPokemons(this.currentPage);
  };
}
