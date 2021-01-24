import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedInUser } from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUser: LoggedInUser = null;

  constructor() { }

  getLoggedInUser() {
    if(this.loggedInUser)
      return this.loggedInUser;
    
    return this.getUserFromStorage();
  }

  saveLoggedInUser(token: string, email: string) {
    localStorage.setItem('loggedInUserToken', token);
    localStorage.setItem('loggedInUserEmail', email);

    let loggedInUser = <LoggedInUser> {
      token: token,
      email: email
    }

    this.loggedInUser = loggedInUser;
  }

  removeLoggedInUser() {
    localStorage.removeItem("loggedInUserToken");
    localStorage.removeItem("loggedInUserEmail");
    this.loggedInUser = undefined;
    environment.hideLandingPage = false;
  }

  private getUserFromStorage() {
    let token = localStorage.getItem('loggedInUserToken');
    let email = localStorage.getItem('loggedInUserEmail');

    if(token && email) {
      this.saveLoggedInUser(token, email);
      return this.loggedInUser;
    } else {
      return null;
    }
  }
}
