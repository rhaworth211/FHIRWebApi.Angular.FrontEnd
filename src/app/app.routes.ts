import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { PatientListComponent } from './components/patient-list/patient-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },  
  { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] }
];

export const appRouter = provideRouter(routes);
