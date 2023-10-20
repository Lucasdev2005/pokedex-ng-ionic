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

  constructor(public pokemonService: PokemonService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: any) => {
        this.pokemonService.getPokemonByName(params.name).subscribe({
          next: (response) => {
            this.pokemon = response;
          }
        });
      }
    });
  }

}
