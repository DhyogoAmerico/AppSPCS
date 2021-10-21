import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
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

  findUserByCpf (cpf){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.get(this.apiUrl + 'usuario/buscar/' + cpf, { headers });
  }

  getAllUsers(typeUser){
    let idUser = this.commonService.getIdUserByTypeUser(typeUser);
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.get(this.apiUrl + 'usuario/listar/todos/' + idUser, { headers });
  }
  
  GetAllAgrotoxico (){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.get(this.apiUrl + 'agrotoxico/listar', { headers });
  }

  InserirAgrotoxico (agrotoxico){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.post(this.apiUrl + 'agrotoxico/cadastrar', agrotoxico, { headers });
  }

  UpdateAgrotoxico (agrotoxico){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', this.commonService.getToken().toString());
    return this.httpClient.post(this.apiUrl + 'agrotoxico/atualizar', agrotoxico, { headers });
  }
}
