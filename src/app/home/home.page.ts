import { Component } from '@angular/core';
import { Pokemon, PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [PokemonService]
})
export class HomePage {
  public pokemons: Pokemon[] = [] as Pokemon[];
  public currentPage: number = 0;
  public pokemonName: string = "";
  public loadingPokemons: boolean = true;
  public filteredByFavorites: boolean = false;

  constructor(public pokemon: PokemonService, public router: Router) {
    this.loadPokemons(this.currentPage);
  }

  async loadPokemons(currentPage: number) {
    this.pokemons = [];
    this.loadingPokemons = true;
    this.pokemon.listPokemons(currentPage).subscribe({
      next: (response: Pokemon[]) => {
        this.pokemons = response;
        if (this.pokemons.length > 0) {
          this.loadingPokemons = false;
        }
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

  handleViewPokemonByName() {
    this.pokemonName = this.pokemonName.toLowerCase();
    this.router.navigate(['home/pokemon-details/' + this.pokemonName]);
  }

  async handleListFavoritesPokemons() {
    let pokeStorage: Pokemon[] = await JSON.parse(localStorage.getItem("pokemons") || "[]");
    this.filteredByFavorites = !this.filteredByFavorites;
    if (this.filteredByFavorites && pokeStorage.length > 0) {
      console.log("[handleListFavoritesPokemons]", pokeStorage);
      this.pokemons = pokeStorage;
    }
    else if (!this.filteredByFavorites) {
      this.loadPokemons(this.currentPage);
    }
  }
}
