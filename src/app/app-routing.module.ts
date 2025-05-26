import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { AppComponent } from './app.component';
import { AppraisalComponent } from '../../../AdithyaFrontEnd/src/app/features/appraisal/appraisal.component';
import { TestComponent } from './features/test/test.component';
import { ParentComponent } from './features/parent/parent.component';
import { RoutingexampleComponent } from './features/routingexample/routingexample.component';
import { ChildComponent } from './features/child/child.component';
import { AuthGuard, canActivateChildGuard, canDeactivateGuard, resolveGuard, roleGuard, roleGuardForCanLoad } from './core/guards/auth.guard';
import { LoginlayoutComponent } from './core/loginlayout/loginlayout.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NotAuthorizedComponent } from './core/not-authorized/not-authorized.component';
import { RoleIds } from './core/configurations/constants';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ApplicationprofileComponent } from './features/Application/applicationprofile/applicationprofile.component';
import { ApplicationaddressComponent } from './features/Application/applicationaddress/applicationaddress.component';
import { ApplicationFinalComponent } from './features/Application/application-final/application-final.component';
import { TemplatedrivenformexampleComponent } from './features/templatedrivenformexample/templatedrivenformexample.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginlayout/login',
    pathMatch: 'full', // Redirect empty path to the login page
  },
  {
    path: 'loginlayout',
    component: LoginlayoutComponent, // Layout for login
    children: [
      { path: 'login', component: LoginComponent }, // Login route
    ],
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
        canDeactivate:[canDeactivateGuard],
        resolve: {
          countries: resolveGuard, // Use the resolver function for this route
        }
      },
      {
        path:'test',
        component:TestComponent,
        canActivate: [roleGuard],
        data: { role: 'admin' },
      },
      {
        path:'parent',component:ParentComponent
      },
      { 
        path: 'routingexample', 
        component: RoutingexampleComponent,         
        data: { rolerequired: RoleIds.HR }, // Set the required role here
        canActivateChild:[canActivateChildGuard],
        children: [
          { path: 'parent', component: ParentComponent }, 
          { path: 'child', component: ChildComponent },
          {
            path: 'childlazyload',
            loadComponent: () => import('./features/child/child.component').then(m => m.ChildComponent),
            canActivate: [AuthGuard],
             // AuthGuard will protect the lazy-loaded module
          }  
        ] 
      },
      { path: 'templatedriven', component: TemplatedrivenformexampleComponent },
      { path: 'not-authorized', component: NotAuthorizedComponent },
    ]
  },
  
  { path: '**', redirectTo: 'loginlayout/login' } // Redirect any unknown routes to login
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
