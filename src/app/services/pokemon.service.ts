import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {

  public listPokemons(currentPage: number): Observable<Pokemon[]> {
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

interface Ability {
  ability: {name: string; url: string};
  is_hidden: boolean;
  slot: number;
}

interface Version {
  // Defina os campos dentro da interface Version
  // Exemplo: name, url, etc.
}

interface GameIndex {
  game_index: number;
  version: Version;
}

interface Move {
  move: {
      name: string;
      url: string;
  };
  // Defina outros campos dentro de Move, se necessário
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
      name: string;
      url: string;
  };
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
}

interface Move {
  move: {
      name: string;
      url: string;
  };
  version_group_details: {
      level_learned_at: number;
      move_learn_method: {
          name: string;
          url: string;
      };
      version_group: {
          name: string;
          url: string;
      };
  }[];
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
  versions: {
    [generation: string]: {
      [version: string]: {
        back_default: string | null;
        back_gray?: string | null;
        back_transparent?: string | null;
        back_shiny?: string | null;
        back_shiny_transparent?: string | null;
        front_default: string | null;
        front_gray?: string | null;
        front_transparent?: string | null;
        front_shiny?: string | null;
        front_shiny_transparent?: string | null;
      };
    };
  };
}

interface Type {
  slot: number,
  type: { name: string; url: string;}
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: { name: string; url: string }[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[]; // Se os itens forem de um tipo específico, você pode tipá-los.
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[]; // Se os itens forem de um tipo específico, você pode tipá-los.
  past_types: any[]; // Se os itens forem de um tipo específico, você pode tipá-los.
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
}
