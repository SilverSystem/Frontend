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

  areaDeConocimiento = {
    1:'Directores, gerentes, administradores y coordinadores',
    2:'Profesionales científicos e intelectuales',
    3:'Técnicos y profesionales de nivel medio',
    4:'Personal de apoyo administrativo',
    5:'Trabajadores de los servicios y vendedores de comercios y mercados',
    6:'Agricultores y trabajadores calificados de unidades de producciones agrícolas, ganaderas, agropecuarias, forestales y pesqueras.',
    7:'Operarios de artes mecánicas y de otros oficios',
    8:'Operadores de instalaciones, maquinas y ensambladores',
    9:'Ocupaciones elementales',
    0:'Ocupaciones militares',
  };
  areaOcupacional = {
  11:'Directores ejecutivos, personal directivo de la administración pública y miembros del poder ejecutivo y de los cuerpos legislativos',
    12:'Directores y gerentes administradores y comerciales',
    13:'Directores y gerentes de producción y operaciones',
    14:'Gerentes de hoteles, restaurantes, comercios y otros servicios',
    15:'Directores, gerentes y coordinadores de la administración pública general',
    21:'Profesionales de las ciencias básicas y de la ingeniería',
    22: 'Profesionales de la salud',
    23:'Profesionales de la educación',
    24:'Especialistas en organización de la administración pública y de empresas',
    25:'Profesionales de tecnologías de la información y las comunicaciones',
    26:'Profesionales en derecho, en ciencias sociales y culturales',
    27:'Profesionales de la administración pública según sistema de clasificación de cargos',
    31:'Profesionales de las ciencias y la ingeniería de nivel medio',
    32:'Profesionales de nivel medio de salud ',
    33:'Profesionales de nivel medio en operaciones financieras y administrativas',
    34:'Profesionales de apoyo de servicios jurídicos, sociales, culturales y afines',
    35:'Técnicos de la tecnología de la información y las comunicaciones',
    36:'Supervisores de la administración pública general',
    37:'Técnicos superiores de la administración pública	según sistema de clasificación de cargos',
    41:'Oficinistas',
    42:'Empleados en trato directo con el público',
    43:'Empleados contables y encargados de registros de materiales',
    44:'Otro personal de apoyo administrativo',
    51:'Trabajadores de los servicios personales',
    52:'Vendedores o comerciantes',
    53:'Trabajadores de los cuidados personales',
    54:'Personal de los servicios de protección',
    61:'Agricultores y trabajadores calificados de unidades de producción agrícola, ganadera y agropecuaria con destino al mercado',
    62:'Trabajadores forestales calificados, pescadores y cazadores',
    63:'Trabajadores agropecuarios, pescadores, cazadores y recolectores de subsistencia',
    71:'Operarios de la construcción (obras gruesas) excluyendo electricista',
    72:'Maestros y operarios de la metalurgia, la construcción mecánica y afines',
    73:'Artesanos y operarios de las artes gráficas',
    74:'Trabajadores especializados en electricidad y la electrótecnologia',
    75:'Operarios de procesamiento de alimentos, de la confección, ebanistas, otros artesanos y afines',
    81:'Operadores de instalaciones fijas y máquinas',
    82:'Ensambladores',
    83:'Conductores de vehículos y operadores de equipos pesados móviles',
    91:'Empleados domésticos y otro personal de limpieza de interior de edificios',
    92:'Obreros o peones agropecuarios, pesqueros y forestales',
    93:'Obreros de la minería, la construcción, la industria manufacturera y el transporte',
    94:'Ayudantes de preparación de alimentos',
    95:'Vendedores ambulantes de servicios (excepto comida)',
    96:'Recolectores de desechos y otras ocupaciones elementales',
    0o1:'Oficiales de las fuerzas armadas',
    0o2:'Otros miembros de las fuerzas armadas'
  };

  subAreaOcupacional = {
    1111:'Miembros del poder legislativo',
    1112:'Miembros del poder público nacional (excepto poder legislativo)',
    1113:'Personal directivo de la Administración pública',
    1114:'Jefes de comunidades o pequeñas poblaciones',
    1115:'Dirigentes de organizaciones que presentan un interés especial',
    1120:'Directores generales y gerentes generales',
    1211:'Directores y gerentes financieros',
    1212:'Directores y gerentes de recursos humanos',
    1213:'Directores y gerentes de políticas y planificación',
    1219:'Directores y gerentes de administración y servicios no clasificados bajo otros epígrafes',
    1221:'Directores y gerentes de ventas y comercialización',
    1222:'Directores y gerentes de publicidad y relaciones públicas',
    1223:'Directores y gerentes de investigación y desarrollo',
    1311:'Directores y gerentes de producción y operaciones agrícolas',
    1312:'Directores y gerentes de producción y operaciones ganaderas',
    1313:'Directores y gerentes de producción y operaciones mixtas',
    1314:'Directores y gerentes de producción y operaciones pesqueras',
    1315:'Directores y gerentes de producción y operaciones piscícolas',
    1316:'Directores y gerentes de producción y operaciones forestales',
    1321:'Directores y gerentes de industrias manufactureras',
    1322:'Directores y gerentes de explotaciones mineras',
    1323:'Directores y gerentes de industria petrolera',
    1324:'Directores y gerentes de empresas de construcción',
    1325:'Directores y gerentes de empresas de abastecimiento, distribución y afines',
    1330:'Directores y gerentes de servicios de tecnologías de la información y las comunicaciones',
    1341:'Directores y Gerentes de servicios de cuidado infantiles',
    1342:'Directores y gerentes de servicios de salud',
    1343:'Directores y gerentes de servicios de asistencia al adulto mayor',
    1344:'Directores y gerentes de servicios de bienestar social',
    1345:'Directores y gerentes de servicios de educación',
    1346:'Directores y gerentes de sucursales de instituciones financieras y de seguros',
    1349:'Directores y gerentes de servicios profesionales no clasificados bajo otros epígrafes',
    1411:'Gerentes de hoteles',
    1412:'Gerentes de restaurantes, bares, cafeterías y afines',
    1421:'Gerentes de comercios al por mayor',
    1422:'Gerentes de comercios al por menor',
    1431:'Gerentes de servicios de transporte y almacenamiento',
    1432:'Gerentes de actividades inmobiliarias',
    1433:'Gerentes de centros deportivos, recreativos y culturales',
    1439:'Gerentes de servicios no clasificados bajo otros epígrafes',
    1511:'Directores, gerentes y coordinadores de administración, supervisión deasuntos fiscales nacionales y locales',
    1512:'Directores, gerentes y coordinadores de nacionales y locales de las finanzas y hacienda pública',
    1513:'Directores,	gerentes	y	coordinadores	de	nacionales	y	locales	de planificación económica y social',
    1514:'Directores, gerentes y coordinadores de estadísticas',
    1521:'Directores, gerentes y coordinadores de salud',
    1522:'Directores, gerentes y coordinadores de educación',
    1523:'Directores, gerentes y coordinadores de servicios de cultura, deporte y esparcimiento',
    1524:'Directores, gerentes y coordinadores del medio ambiente y vivienda',
    1525:'Directores, gerentes y coordinadores de trabajo y seguridad social',
    1526:'Directores, gerentes y coordinadores de seguridad y justicia',
    1527:'Directores, gerentes y coordinadores de otros servicios sociales',
    1531:'Directores, gerentes y coordinadores de agricultura y tierra',
    1532:'Directores, gerentes y coordinadores de energía y petróleo',
    1533:'Directores, gerentes y coordinadores de minería',
    1534:'Directores, gerentes y coordinadores de organismos de industria, ciencia y tecnología',
    1535:'Directores, gerentes y coordinadores de organismos de transporte y comunicación',
    1536:'Directores, gerentes y coordinadores de turismo',
    1537:'Directores, gerentes y coordinadores de comercio',

  };
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
    const url = `${API_URL}/fichas`;
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
    const url = `${API_URL}/fichas`;
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
