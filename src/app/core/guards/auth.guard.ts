import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> {
        return this.authService.validateSesion().pipe(
          map((valid) => {
            if (!valid){
              this.router.navigateByUrl('/in-progress');
              return false;
            }
            return true;
          })
        );
     }
  canLoad(): Observable<boolean> {
      return this.authService.validateSesion().pipe(
        map((valid) => {
          if (!valid.allowed) {
            alert('No tienes permisos para el ver el modulo solicitado');
            this.router.navigateByUrl(valid.path);
            return false;
          }
          return true;
        })
      );
  }
}
