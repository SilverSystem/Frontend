import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

const API_URL: string = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token= '';
  constructor(private httpClient: HttpClient) { }
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
}
