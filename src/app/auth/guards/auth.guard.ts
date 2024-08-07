import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService,
      private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe( 
          tap( estaAutenticado => {
              if(!estaAutenticado){
               this.router.navigate(['./auth']);
              }
            })
        );
    // if(this.authService.getAuth().id){
    //   return true;
    // }
    // console.log('Bloqueado por el AuthGuard - canActivate')
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe( 
          tap( estaAutenticado => {
              if(!estaAutenticado){
              this.router.navigate(['./auth']);
              }
            })
        );
      // if(this.authService.getAuth().id){
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - canLoad')
      // return false;
  }
}
