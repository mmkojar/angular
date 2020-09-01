import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  
  showLoader:boolean;
  get loader():boolean{
    return this.showLoader;
  }
  set loader(val:boolean){
    this.showLoader=val;
  }
  constructor() { }
}
