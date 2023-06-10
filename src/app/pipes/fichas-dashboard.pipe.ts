import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fichasDashboard'
})
export class FichasDashboardPipe implements PipeTransform {

  transform(searchData: Array<any>, ...args: any[]): any {
    const searchColumn = args[0];
    const searchOrder = args[1];
    return null;
  }

}
