import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // (value: any, args?: any): any
  transform(value: any, args?: any): any  {
    if (!value) return '';
    if (!args) return value;
  

    args = args.toLowerCase();
    
    return value.filter((item : any) => {
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    })
    
  }

}
