import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EntrenadorComponent } from './pages/entrenador/entrenador.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { DashboardGeneralComponent } from './pages/super-admin/dashboard-general/dashboard-general.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  
  // CONFIGURACIÓN SUPER ADMIN CON RUTAS HIJAS
  { 
    path: 'super-admin', 
    component: SuperAdminComponent,
    children: [
      // Al entrar a /super-admin, carga automáticamente el dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardGeneralComponent },
      
      // { path: 'usuarios', component: UsuariosComponent },
      // { path: 'auditoria', component: AuditoriaComponent },
    ]
  },

  { path: 'admin', component: AdminComponent },
  { path: 'entrenador', component: EntrenadorComponent },

  { path: '**', redirectTo: 'menu' } 
];