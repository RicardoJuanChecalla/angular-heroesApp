import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHerores(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroeByCode(id: string):Observable<Heroe> {
    const url = `${ this.baseUrl }/heroes/${ id }`;
    return this.http.get<Heroe>(url);
  }

  getSugerencias(termino: string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${termino}&_limit=6`);
  }

  addHeroe(heroe: Heroe):Observable<Heroe>{
    const url = `${ this.baseUrl }/heroes`;
    return this.http.post<Heroe>(url, heroe);
  }

  updateHeroe(heroe: Heroe):Observable<Heroe>{
    const url = `${ this.baseUrl }/heroes/${ heroe.id }`;
    return this.http.put<Heroe>(url, heroe);
  }

  deleteHeroe(id: string):Observable<any>{
    const url = `${ this.baseUrl }/heroes/${ id }`;
    return this.http.delete<any>(url);
  }
}
