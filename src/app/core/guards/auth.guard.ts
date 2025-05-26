import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn, CanActivateFn, CanDeactivate, CanDeactivateFn, CanLoadFn, ResolveFn, Router } from '@angular/router';
import { JwtAuthenticateService } from '../services/jwt-authenticate.service';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApidataService } from '../services/apidata.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(JwtAuthenticateService);
  const router = inject(Router);

  if (authService.isAuthenticated() == true) {
    return true; // Allow access if the user is logged in
  } else {
    console.log('entered');
    localStorage.setItem('sessionExpiredMessage', 'Your session has expired. Please log in again.');
    router.navigate(['/loginlayout/login']); // Redirect to login page if not authenticated
    return false; // Deny access
  }
};



export const canActivateChildGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot) => {
   const router = inject(Router);
   const requiredRole = route.parent?.data['rolerequired']; // Accessing the parent's data
   const authService = inject(JwtAuthenticateService);

   return authService.getRole().pipe(
     map((userdata) => {
       if (userdata?.role.name === requiredRole) {
         return true; // Allow access if roles match
       } else {
         router.navigate(['/not-authorized']); // Redirect if unauthorized
         return false; // Deny access
       }
     }),
     catchError((error) => {
       console.log('Error in role guard:', error);
       router.navigate(['/error']); // Optionally redirect to an error page
       return of(false); // Return false in case of error
     })
   );
};

export interface CanComponentDeactivate {
  isFormDirty: () => boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
): Observable<boolean> | Promise<boolean> | boolean => {
  if (component.isFormDirty()) {
    return confirm('You have unsaved changes. Do you really want to leave this tab?');
  }
  return true;
};

export const resolveGuard: ResolveFn<any> = (
  route, // ActivatedRouteSnapshot (can be used if you need route data)
  state // RouterStateSnapshot (can be used for state info)
): Observable<any> | Promise<any> | any => {
  const apidataservice = inject(ApidataService);
  // Inject your ApiDataService via a factory
 // This is just a placeholder; Angular will handle DI in real scenarios.
  return apidataservice.getcountries(); // Return the observable data
};

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(JwtAuthenticateService);
  const router = inject(Router);
  
  // Get the required role from the route data
  const requiredRole = route.data?.['role'] as string;
  return authService.getRole().pipe(
    map((userdata) => {
      if (userdata?.role.name === requiredRole) {
        return true; // Allow access if roles match
      } else {
        router.navigate(['/not-authorized']); // Redirect if unauthorized
        return false; // Deny access
      }
    }),
    catchError((error) => {
      console.log('Error in role guard:', error);
      router.navigate(['/error']); // Optionally redirect to an error page
      return of(false); // Return false in case of error
    })
  );

};
export const roleGuardForCanLoad: CanLoadFn = (route, segments) => {
  const authService = inject(JwtAuthenticateService);
  const router = inject(Router);

  // Get the required role from the route data
  const requiredRole = route.data?.['role'] as string;

  return authService.getRole().pipe(
    map((userdata) => {
      if (userdata?.role.name === requiredRole) {
        return true; // Allow access if roles match
      } else {
        router.navigate(['/not-authorized']); // Redirect if unauthorized
        return false; // Deny access
      }
    }),
    catchError((error) => {
      console.log('Error in role guard:', error);
      router.navigate(['/error']); // Optionally redirect to an error page
      return of(false); // Return false in case of error
    })
  );
};