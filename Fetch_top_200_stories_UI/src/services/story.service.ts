import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs';
import { Common } from 'src/Utility/common';
import { HeadersDataService } from 'src/Models/headersData.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

constructor(private httpClient: HttpClient, private hData:HeadersDataService) { }


getStoryList() {
  return this.httpClient.get<any>(`${environment.GetStoryList}`, { headers: this.hData.GetHttpHeaders() })
    .pipe(retry(1),
      catchError(Common.handleError))
};

}


