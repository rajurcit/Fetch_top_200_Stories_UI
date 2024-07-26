import { ChangeDetectorRef, Component } from '@angular/core';
import { DataSharingService } from 'src/services/DataSharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  showSidebar: boolean;
  loading: boolean | undefined;

  constructor(private _dataSharingService:DataSharingService,private cdr: ChangeDetectorRef) {
  this.showSidebar = false;

  this._dataSharingService.loader.subscribe(x=>{
    x?this.loading=true:this.loading=false;
    this.cdr.detectChanges();

  })
}
}
