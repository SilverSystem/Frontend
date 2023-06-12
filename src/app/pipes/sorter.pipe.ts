import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {
  arrAux: Array<any>;
  transform(searchData: Array<any>, ...args: any[]): any {
    const searchColumn = args[0];
    const searchOrder = args[1];

    if(searchColumn === null && searchOrder === null){
      return searchData;
    }
    if(searchColumn != null){
      this.arrAux = [...searchData.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[searchColumn].toLocaleLowerCase() < b[searchColumn].toLocaleLowerCase()) {
            result = -1;
        }
        if (a[searchColumn].toLocaleLowerCase() > b[searchColumn].toLocaleLowerCase()) {
            result = 1;
        }
        return result * searchOrder; // agregar el orden ascendente o descendente
      })];
    }
    return this.arrAux;
  }
}
