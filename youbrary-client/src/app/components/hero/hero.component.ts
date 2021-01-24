import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.getLoggedInUser())
      this.router.navigate(['library']);
  }
  
  redirectToLogin() { 
    this.router.navigate(["login"]);
  }
}
