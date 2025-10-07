import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { AppComponent } from './app.component';
import { AppraisalComponent } from '../../../NationalBankFrontEnd/src/app/features/appraisal/appraisal.component';
import { ParentComponent } from './features/parent/parent.component';
import { ChildComponent } from './features/child/child.component';
import { AuthGuard, canActivateChildGuard, canDeactivateGuard, resolveGuard, roleGuard, roleGuardForCanLoad } from './core/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { NotAuthorizedComponent } from './core/not-authorized/not-authorized.component';
import { RoleIds } from './core/configurations/constants';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ApplicationprofileComponent } from './features/Application/applicationprofile/applicationprofile.component';
import { ApplicationaddressComponent } from './features/Application/applicationaddress/applicationaddress.component';
import { ApplicationFinalComponent } from './features/Application/application-final/application-final.component';
import { DocumentNotFoundComponent } from './features/document-not-found/document-not-found.component';
import { ComplaintsComponent } from './features/complaints/complaints.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full', // Redirect empty path to the login page
  },
  {
    path: 'login',
    component: LoginComponent, // Layout for login
  },
  {
    path: '',
    component: LayoutComponent, // Layout for app (header + footer)
    canActivate: [AuthGuard], // Protect routes after login
    data: { role: 'admin' },
    children: [
      { path: 'home', component: HomeComponent }, // Home route after login
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path:'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent), // Lazy-load the admin routes
        canLoad: [roleGuardForCanLoad], // Apply canLoad guard to restrict loading
        data: { role: 'admin' },
        children: [
          {
            path: 'profile',
            component: ApplicationprofileComponent,
            canDeactivate: [canDeactivateGuard], // Apply the guard here
          },
          {
            path: 'address',
            component: ApplicationaddressComponent,
            canDeactivate: [canDeactivateGuard], // Apply the guard here if needed
          },
          {
            path: 'final',
            component: ApplicationFinalComponent,
            canDeactivate: [canDeactivateGuard], // Apply the guard here if needed
          },
        ]          
      },
      {
        path:'appraisal',
        component:AppraisalComponent,
        canDeactivate:[canDeactivateGuard]
      },
      {
        path:'parent',component:ParentComponent
      },
      {
    path:'complaints',component:ComplaintsComponent
  },
      { path: 'not-authorized', component: NotAuthorizedComponent },
    ]
  },
  
  {
    path:'document-not-found',component:DocumentNotFoundComponent
  },
  { path: '**', redirectTo: '/login' } // Redirect any unknown routes to login
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
