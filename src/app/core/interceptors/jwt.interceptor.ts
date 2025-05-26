import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtAuthenticateService } from '../services/jwt-authenticate.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtAuthenticateService); // Using `inject` to get the service
  const token = localStorage.getItem('logintoken'); // Assuming `getToken` retrieves the JWT token
  
  // Skip interceptor for login or authentication requests
  if (req.url.includes('login') || req.url.includes('auth')) {
    return next(req);
  }

  // Add Authorization header with token if it exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req);
};
