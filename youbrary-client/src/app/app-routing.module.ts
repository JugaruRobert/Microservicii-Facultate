import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';

import { HeroComponent } from './components/hero/hero.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HeroGuard } from './shared/guards/hero.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: "", component: HeroComponent, canActivate: [HeroGuard] },
  { path: "login/google/failure", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "login/google/success", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "library", component: LibraryComponent, canActivate: [AuthGuard] },
  { path: "details/:bookID", component: BookDetailsComponent },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }