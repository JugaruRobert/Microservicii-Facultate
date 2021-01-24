import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AccessToken, ErrorResponse, LoginInfo } from '../models/shared.models';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl: string;

  constructor(private http: HttpClient,
              private loginService: LoginService) {
    this.baseUrl = environment.baseURL;
  }

  login(loginInfo: LoginInfo): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.baseUrl + "login", loginInfo);
  }

  register(loginInfo: LoginInfo): Observable<ErrorResponse> {
    return this.http.post<ErrorResponse>(this.baseUrl + "register", loginInfo);
  }
}
