import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  login(){
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('id', auth.id!))
      );
  }

  getAuth(): Auth{
    return { ...this._auth! };
  }

  logout(){
    const id: string =  this._auth?.id!;
    console.log(id);
    localStorage.removeItem( id );
    this._auth = undefined;
    
  }

  verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('id')){
      return of(false);
    }
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/${localStorage.getItem('id')}`)
      .pipe(
        map( auth =>{
          this._auth = auth;
          return true;
        })
      )
  }

}
