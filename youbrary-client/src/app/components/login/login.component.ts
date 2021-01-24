import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { LoginService } from 'src/app/shared/services/login.service';

import { ToastrService } from 'ngx-toastr';
import { LoginInfo, ErrorResponse, AccessToken } from 'src/app/shared/models/shared.models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginFormSubmitted: Boolean = false;
  registerFormSubmitted: Boolean = false;
  registerPageVisible: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: ToastrService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildLoginForm();
    this.buildRegisterForm();
  }

  get loginControls() { return this.loginForm.controls; }

  get registerControls() { return this.registerForm.controls; }

  private buildLoginForm() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  private buildRegisterForm() {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, LoginComponent.matchValues('password') ]]
      });
  }

  public static matchValues(matchTo: string): (abstractControl: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  public toggleRegisterPage(registerPageVisible: Boolean) {
    if(registerPageVisible) {
      if(this.registerPageVisible)
        return;

      this.registerPageVisible = true;
      this.registerFormSubmitted = false;
      this.clearForm(this.registerControls);
      document.querySelector(".container")?.classList.add("active");
    }
    else {
      this.registerPageVisible = false;
      this.loginFormSubmitted = false;
      this.clearForm(this.loginControls);
      document.querySelector(".container")?.classList.remove("active");
    }
  } 

  submitLoginForm() {
    this.loginFormSubmitted = true;

    if (this.loginForm.invalid)
      return;

    this.loginFormSubmitted = false;

    var loginInfo: LoginInfo = this.createLoginInfo(this.loginForm);

    this.apiService.login(loginInfo).subscribe(
      (response: AccessToken) => {
          this.loginService.saveLoggedInUser(response.access_token, loginInfo.email);
          environment.hideLandingPage = true;
          this.router.navigate(['']);
      },
      _ => {
        this.clearForm(this.loginControls);
        this.errorToast("Invalid username or password!");
    });
  }

  submitRegisterForm() {
    this.registerFormSubmitted = true;

    if (this.registerForm.invalid)
      return;

    this.registerFormSubmitted = false;

    var loginInfo: LoginInfo = this.createLoginInfo(this.registerForm);

    this.apiService.register(loginInfo).subscribe(
      (response) => {
        if(response) {
          this.clearForm(this.registerControls);
          this.errorToast(response.message);
        } else {
          this.successToast("Successfully registered!");
          this.toggleRegisterPage(false);
        }
      },
      _ => {
        this.clearForm(this.registerControls);
        this.errorToast("An error has occured");
    });
  }

  private createLoginInfo(form: FormGroup): LoginInfo {
    var loginInfo: LoginInfo = <LoginInfo> {
      email: form.controls["email"].value,
      password: form.controls["password"].value
    };

    return loginInfo;
  }
  
  private clearForm(controls: { [key: string]: AbstractControl; }) {
    Object.values(controls).forEach(control => control.setValue(""));
  }

  private errorToast(message: string) {
    this.toastr.error(message,'', {
      timeOut: 1500,
    });
  }

  private successToast(message: string) {
    this.toastr.success(message,'', {
      timeOut: 1500,
    });
  }
}