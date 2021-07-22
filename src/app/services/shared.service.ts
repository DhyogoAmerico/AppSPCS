import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  public apiUrl = 'http://localhost:5000/api/';
  constructor(
    private http: HttpClient
  ) { }

  GetAllStates() : Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type','application/json');

    return this.http.get(this.apiUrl + 'State/GetAllState', { headers });
  }

}
