import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  providers: [PokemonService]
})
export class PokemonDetailsPage implements OnInit {

  public pokemon: any;
  public currentImage: "front_default" | "front_shiny" = "front_default";
  public favoritedPokemon: boolean = false;

  constructor(public pokemonService: PokemonService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: any) => {
        this.pokemonService.getPokemonByName(params.name).subscribe({
          next: async (response) => {
            this.pokemon = response;
            let pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
            this.favoritedPokemon = await this.pokeBinarySearch(pokemons, 0, pokemons.length -1, this.pokemon.order).include;
          }
        });
      }
    });
  }

  changePicture() {
    if (this.currentImage == "front_default") {
      this.currentImage = "front_shiny";
    }
    else {
      this.currentImage = "front_default";
    }
  }

  handleFavoritPokemon(pokemon: any) {
    let pokemons: any[]  = JSON.parse(localStorage.getItem("pokemons") || '[]');
    let pokeFind= this.pokeBinarySearch(pokemons, 0, pokemons.length - 1, pokemon.order);
    if (!pokeFind.include) {
      pokemons.push(pokemon);
      pokemons.sort((a, b) => a.order - b.order);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
      this.favoritedPokemon = true;
    }
    else {
      pokemons.splice(pokeFind.pokemonIndex, 1);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
      this.favoritedPokemon = false;
    }
  }

  pokeBinarySearch(array: any[], start: number, end: number,targetOrder: number): any {
    while (start <= end) {      
      let middle = Math.floor((start + end) / 2);
      if (array[middle].order == targetOrder) {
        return {
          include: true,
          pokemonIndex: middle
        };
      } else if (array[middle].order < targetOrder) {
        start = middle + 1;
      } else if (array[middle].order > targetOrder) {
        end = middle - 1;
      }
    }
    return false;
  }
}
