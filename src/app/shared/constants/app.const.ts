/* eslint-disable @typescript-eslint/naming-convention */
export const specialCharactersRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const onlyNumbersRegex = /^\d+$/;
export const socialReasonRegex = /[`!@#$%^&*()_+=\[\]{};':"\\|,<>\/?~]/;
export const IMG_LOGO = '../../../assets/LogoInces.png';
export const selectColor = (conditionCA: any) => {
  const colors = {
    'En curso': 'secondary',
    Aprobada: 'success',
    'Con rechazo': 'danger',
    sinAsignar: 'tertiary',
    Pendiente: 'warning',
  };
  return colors[conditionCA] || 'secondary' ;
};
export const menuRoutes = [
  {
    label: 'Gestión de fichas',
    route: '/construccion',
    icon: 'options-outline',
    visibility: ['Constructor Curricular','Administrador','Presidencia'],
    accordion: false,
    accordionData: [],
  },{
    label: 'Creacion de usuario',
    route: '/construccion/registrar-usuario',
    icon: 'options-outline',
    visibility: ['Constructor Curricular','Administrador','Presidencia'],
    accordion: false,
    accordionData: [],
  },
  {
    label: 'Mis fichas',
    route: '/construccion/mis-fichas',
    icon: 'options-outline',
    visibility: ['Constructor Curricular','Administrador','Presidencia'],
    accordion: false,
    accordionData: [],
  },
];
