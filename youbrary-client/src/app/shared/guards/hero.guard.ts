import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class HeroGuard implements CanActivate {

  constructor(public loginService: LoginService, 
              public router: Router) {}

  canActivate(): boolean {  
    if (this.loginService.getLoggedInUser()) {
      this.router.navigate(['library']);
      return false;
    }
    
    return true;
  }
}