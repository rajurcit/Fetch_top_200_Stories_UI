import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  loader:Subject<any> = new Subject<any>();
  menuTitle:Subject<any>=new Subject<any>();
  hidetoggle:Subject<any>=new Subject<any>();
  constructor() { }
  
  loaderShow(value:boolean=false){
    this.loader.next(value);
  }
  hideToggleButton(value:boolean=true){
    this.hidetoggle.next(value);
  }

}
