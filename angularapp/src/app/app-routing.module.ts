import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutesComponent } from './myComponents/adminRoute/admin-routes.component';
import { HomeComponent } from './myComponents/home/home.component';
import { LoginComponent } from './myComponents/login/login.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { SignUpComponent } from './myComponents/sign-up/sign-up.component';
import { UsersComponent } from './myComponents/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'route', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'adminRoutes', component: AdminRoutesComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
