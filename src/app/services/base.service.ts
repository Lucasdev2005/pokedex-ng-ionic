import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public http: HttpClient) {}

  public apiUrl: string = "https://pokeapi.co/api/v2/pokemon";

  public get(url: string) {
    return this.http.get(this.apiUrl + "/" + url);
  }
}
