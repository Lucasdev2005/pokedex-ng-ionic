import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {

  public listPokemons(currentPage: number): Observable<any[]> {
    return this.get(`?offset=${currentPage}&limit=6`).pipe(
      switchMap((response: any) => {
        const pokemonObservables = response.results.map((pokemon: any) => this.get(pokemon.name));
        return forkJoin(pokemonObservables);
      })
    ) as Observable<any[]>;;
  }

  public getPokemonByName(name: string) {
    return this.get(name);
  }

}
