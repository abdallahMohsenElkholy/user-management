import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginComponent },

  {
    path: 'user-management',
    loadChildren: () =>
      import('./feature/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canActivate: [AuthGuard],
  },
];
