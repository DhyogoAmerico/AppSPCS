import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { CommonService } from './common-service/common.service';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private apiUrl = environment.urlApi; //https://api.plantandoecolhendosaude.com.br/api/ ----- environment.urlApi"
  constructor(
    private httpClient: HttpClient,
    private commonService:CommonService
  ) { }

  registerUsuario(typeUser, body) : Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.post(this.apiUrl + 'usuario/novo/' + typeUser, body, { headers });
  }

  loginUser(objUser: any){
    const headers = new HttpHeaders()
      .set('Content-Type','application/json');
    return this.httpClient.post(this.apiUrl + 'auth/autenticar', objUser, { headers });
  }

  findUserByCpf (typeUser, cpf){
    let idTypeUser = this.commonService.getIdUserByTypeUser(typeUser);

    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'usuario/' + idTypeUser + '/' + cpf, { headers });
  }
  
  DesativeUsuario (idUser){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.put(this.apiUrl + 'usuario/atualizar/desativar/' + idUser, { headers });
  }

  getAllUsers(typeUser){
    let idUser = this.commonService.getIdUserByTypeUser(typeUser);
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'usuario/listar/todos/' + idUser, { headers });
  }
  
  GetAllAgrotoxico (){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'agrotoxico/listar', { headers });
  }

  InserirAgrotoxico (agrotoxico){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.post(this.apiUrl + 'agrotoxico/cadastrar', agrotoxico, { headers });
  }

  UpdateAgrotoxico (agrotoxico){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.put(this.apiUrl + 'agrotoxico/atualizar', agrotoxico, { headers });
  }
  
  DesativarAgrotoxico (idAgro){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.put(this.apiUrl + 'agrotoxico/atualizar', idAgro, { headers });
  }

  InsertFichaPaciente(ficha){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.post(this.apiUrl + 'ficha/cadastrar', ficha, { headers });
  }
  
  ListarFichaPaciente(){
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'ficha/fichas-pacientes', { headers });
  }

  QuantPacientes(){
    let url  = this.apiUrl.replace("api/","");

    const headers = new HttpHeaders()
      .set('Content-Type','application/json');
    return this.httpClient.get(url + 'dashboard/obter-rel-dashboard', { headers });
  }

  ListarFichaPacientePorId(IdFicha) {
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'ficha/' + IdFicha, { headers });
  }
  
  TrazerAmostraPacientePorId(IdAmostra) {
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('authorization', 'Bearer ' + this.commonService.getTokenCookie().toString());
    return this.httpClient.get(this.apiUrl + 'amostras/' + IdAmostra, { headers });
  }
}
