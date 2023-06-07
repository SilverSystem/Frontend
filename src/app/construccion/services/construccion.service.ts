/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { Router } from '@angular/router';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ConstruccionService {
  mapasAprendizaje$ = new BehaviorSubject(undefined);
  estrategiasMetodologicas$ = new BehaviorSubject(undefined);
  guiasEvaluacion$ = new BehaviorSubject(undefined);
  unidadesCurriculares$ = new BehaviorSubject(undefined);
  tiposUc: Array<any> = ['Básica/Comun','Transversal/Genérica','Específica/Técnica'];
  estadosFichas: any = {
    'En curso': 'En curso',
    Aprobada: 'Aprobada',
    'Con rechazo': 'Con rechazo',
    'Sin asignar': 'Sin asignar',
    pendiente: 'Pendiente',
  };
  formasparticipacion = ['Participación Activa', 'Participación grupal', 'Participación individual',
    'Autoevaluación', 'Undireccional', 'Heteroevaluación', 'Coevaluación'];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(credentials: any): Observable<any>{
    const url = `${API_URL}/login`;
    return this.httpClient.post(url,credentials).pipe(
      map(request => request)
      // map((request) => {
      //   const showAble = request.data.filter((el) => !el.deletedAt);
      //   this.categories$.next(showAble);
      //   return request;
      // })
    );
  }
  saveFichaResumen(ficha: any): Observable<any>{
    const url = `${API_URL}/ficha`;
    return this.httpClient.post(url,ficha).pipe(
      map(request => request)
      // map((request) => {
      //   const showAble = request.data.filter((el) => !el.deletedAt);
      //   this.categories$.next(showAble);
      //   return request;
      // })
    );
  }
  getFichasResumen(): Observable<any>{
    const url = `${API_URL}/ficha`;
    return this.httpClient.get<any>(url).pipe(
      map(request => {
        this.unidadesCurriculares$.next(request.data);
        return request;
      })
      // map((request) => {
      //   const showAble = request.data.filter((el) => !el.deletedAt);
      //   this.categories$.next(showAble);
      //   return request;
      // })
    );
  }
}
