import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { customEmailValidator, validationErrors } from 'src/app/shared/helpers/custom-validators';
import { MapaAprendizajeComponent } from '../mapa-aprendizaje/mapa-aprendizaje.component';

@Component({
  selector: 'app-ficha-detail',
  templateUrl: './ficha-detail.component.html',
  styleUrls: ['./ficha-detail.component.scss'],
})
export class FichaDetailComponent implements OnInit {
  flagInfo: boolean;
  mixedList = {};
  mapasAprendizaje: Array<any> = [];
  public fichaDetailForm: FormGroup;
  public mapForm: FormGroup;
  public resourcesAndSpacesForm: FormGroup;
  public colectiveTableForm: FormGroup;
  public digitalResourcesForm: FormGroup;
  actualSegment= 'Ficha resumen de la unidad curricular';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.setupForm();
  }
  setupForm() {
    this.fichaDetailForm = this.formBuilder.group({
      areaOcupacional: ['Ciencias Físicas'],
      subAreaOcupacional: ['Física'],
      areaConocimiento: ['Ciencias naturales, matemática y estadística '],
      uc: ['Física Básica'],
      codigoUc: ['No asignado'],
      totalHorasFormacion: [48],
      tipoUc: ['Básica/Común'],
      modalidadFormacion: ['Mixta'],
      proposito: [`Formar a los participantes y las participantes con conocimientos habilidades, destrezas y competencias en magnitudes,
      sistema métrico legal, mecánica, movimiento rectilíneo uniforme, unidades de calor y leyes de newton,
      para aplicar en el área de electromecánica,a fin de un desempeño eficiente, con base a las leyes de la física,
      cumpliendo con las medidas preventivas integrales y preservando el ambiente`],
      dirigidoA: [['Aprendices', 'Bachilleres o estudiantes del 3er año de bachillerato', 'Servidores públicos',
        'Estudiantes universitarios', 'Público en general']],
      nivelDominioEsperado: [['Nivel II', 'Desempeño Autónomo']],
      sinopsis: [`Estamos viviendo un tiempo acelerado principalmente en la educación, en la sociedad y en el mundo del trabajo;
      es allí donde surge la necesidad
       en el ámbito educativo laboral de actualizar los conocimientos, cualidades y cualificaciones,
       siendo esto una demanda en la evolución profesional, partiendo desde los pilares fundamentales de la educación aprender a conocer,
       aprender hacer, aprender a vivir juntos y aprender a ser; para así lograr un desempeño de calidad desde lo humano,
       durante la aplicación de los conocimientos de física básica en la electromecánica industrial. Es fundamental fortalecer
       las habilidades y destrezas de cada uno de los y las participantes interesados en optimizar la productividad,
       competitividad y así promover el progreso profesional. Es esencial que exista una formación profesional continua en
       cualquier ámbito profesional además de estar al día en cuanto a conocimientos y tener la capacidad de hacer frente a situaciones
       que demandan atención y concentración, en medio de esto existe un propósito crear metas y objetivos claros para mejorar
       y superarse a sí mismo.`],
      ejesTransversales: [['Valores éticos', 'Trabajo productivo, cooperativo y liberador', 'Tecnologías libres',
        'Protección y conservación del ambiente', 'Seguridad y salud en el trabajo']],
      perfilFacilitador: [['Conocedor del estado del arte en el área de Física.',
        'Tres años (mínimo) de experiencia en el desempeño de la ocupación']],
      perfilGenericoIngreso: [['Mayor de 14 años de edad', 'Conocimientos en:', 'Matemática Básica']],
      perfilEgreso: [[`Utiliza el sistema de medición para una eficiente conversión científica de unidades que permitan la
      fabricación óptima de piezas, aplicando las magnitudes escalares y vectoriales para la proyección en el plano tridimensional,
      siguiendo los procedimiento técnico y respetando las leyes de la física, tomando en cuenta las medidas preventivas
      integrales y protección ambiental.`,`dentifica los diferentes tipos de movimientos, dinámica y lanzamientos para trazar líneas,
      parábolas, círculos y elipses en el plano tridimensional para construir piezas, siguiendo el procedimiento técnico y respetando
      las leyes de las físicas tomando en cuenta las medidas preventivas integrales y ambiental.`,`Describe las máquinas de acuerdo a sus
      características y aplicación en la construcción de piezas, siguiendo el procedimiento técnico y tomando en cuenta las medidas
      preventivas integrales y protección ambiental.`,`Aplica las características de la transferencia de calor para observar la escala
      de temperatura, las unidades y el calor especifico , siguiendo el procedimiento técnico y tomando en cuenta las medidas
      preventivas integrales y protección ambiental.`]],
      consideracionesPerfilGenerico: ['Manejo de aplicaciones e Internet']
    });
    this.mapForm = this.formBuilder.group({
      logroParticipante: [],
      horasPracticas:[],
      horasTeoricas:[],
      ejesTematicos:[],
      observacionDirecta:[],
      producto:[],
      conocimiento:[]
    });
    this.resourcesAndSpacesForm = this.formBuilder.group({
      numeroParticipantes:[],
    });
    this.colectiveTableForm = this.formBuilder.group({});
    this.digitalResourcesForm = this.formBuilder.group({});
  }

  pushList(formKey: string,event: any, field: string){
    console.log(event.target.value);
    const userInput = event.target.value;
    if(userInput !== ''){
      this.mixedList[field] = Array.isArray(this.mixedList[field]) ?
      this.mixedList[field] = [...this.mixedList[field],userInput] : this.mixedList[field] = [userInput];
      this[formKey].controls[field].setValue('');

    }
  }
  back() {
    this.router.navigate(['construccion/']);
  }
  segmentButton(event?: any) {
    const value = event.detail.value;
    const segmentValues = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Ficha resumen de la unidad curricular': 'Ficha resumen de la unidad curricular',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Mapa de aprendizaje': 'Mapa de aprendizaje',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Recursos y espacios de formación y autoformación productiva': 'Recursos y espacios de formación y autoformación productiva',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Colectivo de la mesa de evaluación, construcción y desarrollo curricular permanente':
      'Colectivo de la mesa de evaluación, construcción y desarrollo curricular permanente',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Recursos educativos digitales': 'Recursos educativos digitales',
    };
    this.actualSegment = segmentValues[value];
  }
  showErrors(control: string) {
    const err = { ...this.fichaDetailForm.controls[control].errors };
    const errors = Object.keys(err);
    return validationErrors[errors[0]];
  }
  async newMapaAdrendizaje(){
    const modal = await this.modalController.create({
      component: MapaAprendizajeComponent,
      componentProps:{
        numeration:this.mapasAprendizaje
      },
      showBackdrop: true,
      cssClass: ['modal-xxl', 'backdrop'],
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data !== undefined && data !== null) {
      console.log('la data del modal es: ',data);
    }
  }
}
