export const specialCharactersRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const onlyNumbersRegex = /^\d+$/;
export const socialReasonRegex = /[`!@#$%^&*()_+=\[\]{};':"\\|,<>\/?~]/;
export const IMG_LOGO = '../../../assets/LogoInces.png';
export const selectColor = (conditionCA: any) => {
  const colors = {
    aprobado: 'success',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Aprobada completamente': 'success',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Aprobada parcialmente': 'tertiary',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Asignada en curso': 'secondary',
    rechazado: 'danger',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Con rechazo': 'danger',
    'pendiente de validacion': 'warning',
    pendiente: 'warning',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Pendiente: 'warning',
  };
  return colors[conditionCA] || 'tertiary' ;
};
