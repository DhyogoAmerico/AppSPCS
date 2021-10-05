import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) { }

  getTypeUser(){
    if(this.cookieService.check('typeUserSPCS')){
      let response : any = this.cookieService.get('typeUserSPCS');
      console.log(response);
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

  viaCep(cep: String) {
    let request = `https://viacep.com.br/ws/${cep}/json/`;

    return this.httpClient.get(request);
  }

  getToken(){
    if(this.cookieService.check('authenticatedSPCS')){
      return this.cookieService.get('authenticatedSPCS');
    }
    else {
      return false;
    }
  }
}
