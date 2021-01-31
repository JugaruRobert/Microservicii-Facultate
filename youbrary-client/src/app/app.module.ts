import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { TransformTextPipe } from './shared/pipes/transformText.pipe';
import { JwtInterceptor } from './shared/interceptors/jwtInterceptor';
import { LibraryComponent } from './components/library/library.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { TransformIconPipe } from './shared/pipes/transform-icon.pipe';
import { HeroGuard } from './shared/guards/hero.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SafeHtmlPipe } from './shared/pipes/safeHtml.pipe';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    LoginComponent,
    TransformTextPipe,
    TransformIconPipe,
    SafeHtmlPipe,
    LibraryComponent,
    FooterComponent,
    UserPanelComponent,
    BookDetailsComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NoopAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
  ],
  providers: [
    AuthGuard,
    HeroGuard,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  entryComponents: [DeleteConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
