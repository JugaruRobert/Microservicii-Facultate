import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent } from './components/hero/hero.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: HeroComponent },
  { path: "login", component: LoginComponent },
  { path: "library", component: LibraryComponent },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }