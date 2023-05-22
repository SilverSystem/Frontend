export const specialCharactersRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const onlyNumbersRegex = /^\d+$/;
export const socialReasonRegex = /[`!@#$%^&*()_+=\[\]{};':"\\|,<>\/?~]/;
export const IMG_LOGO = '../../../assets/LogoInces.png';
export const selectColor = (conditionCA: any) => {
  const colors = {
    aprobadaCompletamente: 'success',
    enCurso: 'tertiary',
    conRechazo: 'danger',
    pendientes: 'warning',
    sinAsignar: 'secondary'
  };
  return colors[conditionCA] || 'secondary' ;
};
export const menuRoutes = [
  {
    label: 'Gestión de fichas',
    route: '/construccion-curricular',
    icon: 'options-outline',
    visibility: ['Constructor_Curricular','Administrador'],
    accordion: false,
    accordionData: [],
  },
  {
    label: 'Mis fichas',
    route: '/construccion-curricular/mis-fichas',
    icon: 'options-outline',
    visibility: ['Constructor_Curricular','Administrador'],
    accordion: false,
    accordionData: [],
  },
];
