
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode'; 
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { BaseResultModel, Userdata } from "../configurations/constants";
@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticateService {
  private token: string | null = null;
  private apiUrl = 'https://localhost:44306/api/Users'; // Base URL
  private userSubject = new BehaviorSubject<Userdata | null>(null); // BehaviorSubject to store the role data
  constructor(public jwtHelper: JwtHelperService,private http:HttpClient) {}
  // ...
  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem('logintoken');
  
    // Initialize `isExpired` to `true` for safety.
    let isExpired = true;
  
    // Check if the token exists and has a valid JWT format.
    if (token && token.split('.').length === 3) {
      // If token is valid, check if it is expired.
      isExpired = !this.jwtHelper.isTokenExpired(token);
      console.log("Token is valid: " + isExpired);
    } else {
      // If token is null or invalid, mark as expired (unauthenticated).
      isExpired = false;
      console.log("Token is invalid or null: " + isExpired);
    }
  
    // Return the authentication status (true if not expired).
    return isExpired;
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('logintoken', token); // Optionally store token in local storage
  }

  // Function to get the ID from the token
  getIdFromToken(): string | null {

    this.token = localStorage.getItem('logintoken'); // Retrieve token from local storage if not set
    
    if (this.token != null) {
      const decoded: any = jwt_decode.jwtDecode(this.token);     
      return decoded.id; // Return the user ID from the token
    }

    return null; // Return null if no token is found
  }
  getUserById(): Observable<Userdata> {
    const id = this.getIdFromToken(); // Get the ID from the token

    if (id) {
      const token = localStorage.getItem('logintoken'); // Retrieve the token from local storage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Set the Authorization header
      });

      return this.http.get<Userdata>(`https://localhost:44306/Users/${id}`, { headers });
    } else {
      throw new Error('Unable to retrieve ID from token');
    }
  }

  // New method to call after login and update the role
  fetchAndStoreRole(): Observable<void> {
    return this.getUserById().pipe(
      tap((userData) => {
        // Side effect: Update the BehaviorSubject with the new role data
        this.userSubject.next(userData);
      }),
      // Transforming the roleData to void
      map(() => {
        // Returning void since we're only updating the BehaviorSubject
        return; // This effectively returns void
      }),
      catchError((error) => {
        // Handle error here, log it, or propagate it up
        console.error('Error fetching role:', error);
        return throwError(error); // Propagate the error
      })
    );
  }

  // Method to get the role as an observable
  getRole(): Observable<Userdata | null> {
    return this.userSubject.asObservable();
  }

}

// Explanation:
// tap: This operator is still used to perform a side effect (updating the roleSubject).

// map: After the tap, you can use map to transform the result into void. The map operator allows you to specify a transformation function that returns undefined, which is considered as void in TypeScript.

// catchError: This operator handles any errors that might occur during the HTTP request, allowing you to log the error and propagate it without affecting the observable type.