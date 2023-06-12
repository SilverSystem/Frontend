import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fichasDashboard'
})
export class FichasDashboardPipe implements PipeTransform {
  arrOut: Array<any>;
  arrAux: Array<any>;
  flagSearch = 0;

  transform(searchData: Array<any>, ...args: any[]): any {
    const [startDate,endDate,nameApprover,state] = args;
    this.flagSearch = 0;
    if((startDate === null || startDate === undefined) && (endDate === null || endDate === undefined) &&
    (nameApprover === null || nameApprover === undefined) && (state === null || state === undefined)){
      return searchData;
    }
    if(state != null){
      this.arrAux = searchData.filter( item =>  item.state === state);
      this.arrOut=this.arrAux;
      this.flagSearch = 1;
    }

    if(startDate != null){
      const dateSarchDateStart = new Date(startDate);
      if(this.flagSearch === 1){
          this.arrAux = this.arrOut.filter( item=> {
            const [dateArreglo, hourArreglo] = item.startDate.split('T');
            //const [year, month, day ] = dateArreglo.split('-');
            const dateItem = new Date(dateArreglo);
            return dateItem >= dateSarchDateStart;
          } );
          this.arrOut=this.arrAux;

      }else{
        this.arrAux = searchData.filter( item=> {
          const [dateArreglo, hourArreglo] = item.startDate.split('T');
          //const [day, month, year] = item.startDate.split('-');
          const dateItem = new Date(dateArreglo);
          return dateItem >= dateSarchDateStart;
        } );
        this.arrOut=this.arrAux;
      }
      this.flagSearch = 1;
    }

    if(endDate != null){
      const dateSarchDateStart = new Date(startDate);
      if(this.flagSearch === 1){
          this.arrAux = this.arrOut.filter( item=> {
            const [dateArreglo, hourArreglo] = item.endDate.split('T');
            //const [year, month, day ] = dateArreglo.split('-');
            const dateItem = new Date(dateArreglo);

            return dateItem >= dateSarchDateStart;

          } );
          this.arrOut=this.arrAux;

      }else{
        this.arrAux = searchData.filter( item=> {
          const [dateArreglo, hourArreglo] = item.endDate.split('T');
          //const [day, month, year] = item.startDate.split('-');
          const dateItem = new Date(dateArreglo);

          return dateItem >= dateSarchDateStart;

        } );
        this.arrOut=this.arrAux;
      }
      this.flagSearch = 1;
    }
    // if(nameApprover != null){
    //   if(this.flagSearch === 1){
    //     nameApprover.forEach(element => {
    //       this.arrAux = [...this.arrAux,...this.arrAux.filter( item =>  (item.nameApprover+' '+item.lastNameApprover).toLowerCase()
    //           .includes(element.toLowerCase()) )];
    //         });
    //         this.arrOut=this.arrAux;
    //   } else{
    //     nameApprover.forEach(element => {
    //       this.arrAux = [...this.arrAux,...searchData.filter( item =>  (item.nameApprover+' '+item.lastNameApprover).toLowerCase()
    //           .includes(element.toLowerCase()) )];
    //         });
    //         this.arrOut=this.arrAux;
    //   }
    //   this.flagSearch = 1;
    // }
    return this.arrOut;
  }

}
