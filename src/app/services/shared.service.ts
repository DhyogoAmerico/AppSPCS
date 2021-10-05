import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiUrl = environment.urlApi;
  constructor(
    private httpClient: HttpClient,
    private commonService:CommonService
  ) { }

  registerUsuario(typeUser, body) : Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.post(this.apiUrl + 'usuario/novo/' + typeUser, body, { headers });
  }

  loginUser(objUser: any){
    const headers = new HttpHeaders()
      .set('Content-Type','application/json');
    return this.httpClient.post(this.apiUrl + 'auth/autenticar', objUser, { headers });
  }
  
  getAllUsers(){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.get(this.apiUrl + 'usuario/obter-usuarios', { headers });
  }
}
