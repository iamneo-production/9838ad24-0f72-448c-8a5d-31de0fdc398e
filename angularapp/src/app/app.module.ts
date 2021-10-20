import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './myComponents/login/login.component';
import { NavBarComponent } from './myComponents/nav-bar/nav-bar.component';
import { SignUpComponent } from './myComponents/sign-up/sign-up.component';
import { HomeComponent } from './myComponents/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './myComponents/navigation/navigation.component';
import { AdminRoutesComponent } from './myComponents/adminRoute/admin-routes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsersComponent } from './myComponents/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    SignUpComponent,
    HomeComponent,
    NavigationComponent,
    AdminRoutesComponent,
    ProfileComponent,
    UsersComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
