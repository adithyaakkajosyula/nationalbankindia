import { Component } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { JwtAuthenticateService } from '../services/jwt-authenticate.service';
import { CommonModule } from '@angular/common';
import { SessionExpirationService } from '../services/session-expiration.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule] // Import SharedModule which includes common modules
})
export class LoginComponent {
  tokenExpirationTime: number = 0; // Holds the expiration time in seconds
  countdownInterval: any; // For the countdown interval
  loading: boolean = false;
  isLocal : boolean = window.location.hostname === 'localhost';
  private baseUrl: string = this.isLocal ? 'https://localhost:44306/api/': 'https://nationalbank-api.azurewebsites.net/api/';
  constructor(private http:HttpClient,private router:Router, private jwtservice : JwtAuthenticateService,private sessionExpirationService: SessionExpirationService){

  }
  ngOnInit() {
    // if the expire time in token is expired, then it redirects to layout in that
    // time we need to show an error message to user for that at authguard we saved the message in local storege 
    // here we retrieve the message 
    // Check if there is a session expiration message in localStorage
    const sessionExpiredMessage = localStorage.getItem('sessionExpiredMessage');
    if (sessionExpiredMessage) {
      this.errormessage = sessionExpiredMessage;
      localStorage.removeItem('sessionExpiredMessage'); // Clear the message after displaying
    }
  }
  errormessage : string;
  login = new FormGroup({
    username: new FormControl('', [
      Validators.required, // Username is required
      Validators.minLength(3), // Minimum length of 3 characters
    ]),
    password: new FormControl('', [
      Validators.required, // Password is required
      Validators.minLength(6), // Minimum length of 6 characters
    ]),
  });
  
  submit() {
    // Check if the form is valid
    if (this.login.valid) {
      this.loading = true; // Set loading to true
      // Proceed with the HTTP request
      this.http.post(`${this.baseUrl}Users/Authenticate`, {
        username: this.login.value.username,
        password: this.login.value.password
      }).subscribe(
        (res: any) => {
          this.loading = false; // Reset loading
         // alert(JSON.stringify(res));
          if (res.isSuccess) {
            localStorage.setItem('logintoken', res.token);
            
            // Fetch and store the role after successful login
            this.jwtservice.fetchAndStoreRole().subscribe(
              () => {
                // If role fetching is successful, navigate to home
                this.router.navigate(['/home']);
              },
              (error) => {
                // Handle error in role fetching
                this.errormessage='Error fetching role: ' + error.message + '\n' + error.error;
              }
            );
          } else {
            this.errormessage = res.message;
          }
        },
        (error: any) => {
          this.loading = false; // Reset loading
          this.errormessage = error.message;
        }
      );
    } else {
      // Mark all controls as touched to show validation errors
      this.login.markAllAsTouched();
     // alert('Please correct the errors in the form.');
    }
  }
}
