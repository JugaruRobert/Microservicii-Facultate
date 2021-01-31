import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/shared/models/shared.models';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  @Input() showLibraryBtn: Boolean = false;
  
  loggedInUser: LoggedInUser;

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loggedInUser = this.loginService.getLoggedInUser();
  }

  signOut() {
    this.loginService.removeLoggedInUser();
    this.router.navigate([""]);
  }

  goToLibrary() {
    this.router.navigate(["library"]);
  }
}