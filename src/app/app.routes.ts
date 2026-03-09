import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { GestionSociosComponent } from './gestion-socios/gestion-socios.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'panel-admin', component: PanelAdminComponent},
  {path: 'gestion-socios', component: GestionSociosComponent}
];
