export const fichasParser = (fichasToParse: Array<any>) =>{
  const objResults={
   0:'id' ,
   1:'state',
   2:'areaConocimiento' ,
   3:'areaOcupacional' ,
   4:'subAreaOcupacional' ,
   5:'codigoUC' ,
   6:'tipoUc',
   7:'uc' ,
   8:'modalidadFormacion',
   9:'proposito' ,
   10:'dirigidoA' ,
   11:'sinopsis' ,
   12:'ejesTransversales' ,
   13:'perfilFacilitador' ,
   14:'perfilGenericoIngreso' ,
   15:'consideraciones_perfil_ingreso' ,
   16:'perfilEgreso' ,
   17:'totalHorasFormacion',
   18:'nivelDominioEsperado'
  };
  const result = new Array();
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for(let i = 0; i < fichasToParse.length; i++){
    const ficha = {};
    for (let j = 0; j < fichasToParse[i].length; j++) {
      ficha[objResults[j]] = fichasToParse[i][j];
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    ficha['startDate'] =  new Date().toISOString();
    result.push(ficha);
  }
  return result;
};
