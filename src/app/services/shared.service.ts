import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiUrl = environment.urlApi;
  constructor(
    private httpClient: HttpClient
  ) { }

  registerUsuario(typeUser, body) : Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type','application/json');
    return this.httpClient.post(this.apiUrl + 'usuario/novo/' + typeUser, body, { headers });
  }

}
