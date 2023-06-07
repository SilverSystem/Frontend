import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, tap } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

const API_URL: string = environment.apiUrl;
const compareRoutes = (routes: Array<string>,pathToCompare: string) => routes.includes(pathToCompare);
const allowedRoutes = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Constructor Curricular': (path: string) => compareRoutes(['construccion'],path),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Coordinador curricular': (path: string) => compareRoutes(['construccion'],path),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Aprobador: (path: string) => compareRoutes(['construccion'],path),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Supervisor: (path: string) => compareRoutes(['construccion'],path),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Administrador: (path: string) => compareRoutes(['construccion'],path),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Presidencia: (path: string) => compareRoutes(['construccion','login'],path),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token= '';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
    ) { }

  validateSesion(): Observable<any> {
    //aqui consigues la ruta actual antes de ejecutar el guard
    const mainUrl = this.document.location.href.split('/')[3];
    const url = this.document.location.href.split('/')[4];
    const getPromise = new Promise<any>((resolve) => {
      const obtainedUserType = JSON.parse(localStorage.getItem('currentSession') || '{}');
      if (obtainedUserType === '' || !obtainedUserType.access_token) {
        return resolve({ path: '/login', allowed: false });
      }
      if(obtainedUserType.user_type === 'Administrador' || obtainedUserType.user_type === 'Presidencia'){
        return resolve({path:'',allowed:true});
      }
      //aqui consigues la ruta a la cual intento acceder el usuario antes de ejecutar el guard
      const currentRoutes = this.router.getCurrentNavigation()?.initialUrl.root.children['primary'].segments;
      if(obtainedUserType.access_token){
        return resolve({path:'',allowed:true});
      }
    });
    return from(getPromise);
  }

  login(credentials: any): Observable<any>{
    const url = `${API_URL}/login`;
    return this.httpClient.post(url,credentials).pipe(
      tap((data) => this.setSession(data))
    );
  }
  logout() {
      localStorage.clear();
      location.href = '/login';
  }
  setSession(loginResponse: any){
    this.token = loginResponse.access_token;
    localStorage.setItem('currentSession',JSON.stringify(loginResponse));

  }
  signUp(usuario: any): Observable<any>{
    const url = `${API_URL}/sign-up/`;
    const post = {
      ...usuario
    };
    return this.httpClient.post<any>(url,post);
  }
  reSendCode(email: string): Observable<any>{
    const url = `${API_URL}/resend-email`;
    const params = {
      email,
    };
    return this.httpClient.post(url,params);
  }
  passwordRecovery(formvalue: any): Observable<any> {
    const url = `${API_URL}/password-recovery`;
    const params = {
      email: formvalue.recoveryEmail,
    };
    return this.httpClient.post(url, params);
  }

  confirmPasswordRecovery(body): Observable<any> {
    const url = `${API_URL}/confirm-password-recovery`;
    const params = {
      email: body.email,
      nuevaPassword: body.newPassword,
      // eslint-disable-next-line radix
      codigoConfirmacion: parseInt(body.code),
    };
    return this.httpClient.post(url, params);
  }
}
