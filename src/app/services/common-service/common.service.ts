import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../shared.service';
import { EventEmitterService } from './eventEmitterService';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public apiUrl = environment.urlApi;
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) { }

  getTypeUser(){
    if(this.cookieService.check('typeUserSPCS')){
      let response : any = this.cookieService.get('typeUserSPCS');
      let objResp = '';
      switch (response) {
        case '7DBE420C-2297-411C-B9FA-AA97D49E2A53':
          objResp = 'medico';
          break;
        case '7D277147-A892-4312-A845-B5CA5A27BED6':
          objResp = 'enfermeiro';
          break;
        case 'D44B63A1-80D9-41E1-994A-D9C1C4D308E7':
          objResp = 'admin';
          break;
        default:
          objResp = 'false';
          break;
      }
      return objResp;
    }
    else {
      return 'false';
    }
  }

  getIdUserByTypeUser(type){
    switch (type) {
      case 'medico':
        return '7DBE420C-2297-411C-B9FA-AA97D49E2A53';
        break;
      case 'enfermeiro':
        return '7D277147-A892-4312-A845-B5CA5A27BED6';
        break;
      case 'paciente':
        return 'ff35ba72-38ac-4343-88f4-9bbda552bf59';
        break;
      default:
        return 'false';
        break;
    }
  }

  viaCep(cep: String) {
    let request = `https://viacep.com.br/ws/${cep}/json/`;

    return this.httpClient.get(request);
  }

  getTokenCookie(){
    if(this.cookieService.check('authenticatedSPCS')){
      return this.cookieService.get('authenticatedSPCS');
    }
    else {
      return false;
    }
  }

  getRefreshTokenCookie(){
    if(this.cookieService.check('refreshSPCS')){
      var token = this.cookieService.get('refreshSPCS');

      return token;
    }
    else {
      return 'false';
    }
  }
    
  refreshToken(){
    const token: string = this.getRefreshTokenCookie();
    const headers = new HttpHeaders()
      .set('Content-Type','application/json');
    return this.httpClient.post(this.apiUrl + 'auth/refresh-token', ('"' + token.toString() + '"'), { headers });
  }

  emitBreadcrumb(objComponent: breadcrumb[]){
    EventEmitterService.get('breadcrumb').emit(objComponent);
  }
}

export class breadcrumb {
  title: string;
  url: string;
}
