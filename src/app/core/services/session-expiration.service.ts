import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode'; 
@Injectable({
  providedIn: 'root'
})
export class SessionExpirationService {
  countdown: number = 5; // Set the countdown starting value
  private timer: any;
  private warningTimer: any;
  private isWarningModalOpen = false; // Flag to track if warning modal is open
  private countdownInterval: any; // For the countdown interval
    // Subjects to communicate with other components
  public sessionExpired = new Subject<void>();
  public showModal = new Subject<number>();  // Sends countdown value
  public closeModal = new Subject<void>();
  private tokenExpirationTimeSubject = new BehaviorSubject<number>(0);
  public tokenExpirationTime$ = this.tokenExpirationTimeSubject.asObservable();


  constructor(private router: Router) {

  }

  startSessionTimer() {
    this.clearTimers(); // Clear any existing timers

    const token = localStorage.getItem('logintoken') as string;
    if (token) {
        const decodedToken: any = jwt_decode.jwtDecode(token); // Decode the JWT token
        const exp = decodedToken.exp * 1000; // Convert expiration time from seconds to milliseconds
        const currentTime = Date.now();

        let remainingTime = exp - currentTime; // Calculate remaining time until expiration
        this.tokenExpirationTimeSubject.next(remainingTime); // Set initial time

        if (remainingTime > 0) {
            // Start an interval to update the remaining time every second
            this.timer = setInterval(() => {
                remainingTime -= 1000; // Decrease remaining time by 1 second
                this.tokenExpirationTimeSubject.next(Math.max(0, remainingTime)); // Emit the updated remaining time

                // Check if time has run out
                if (remainingTime <= 0) {
                    clearInterval(this.timer); // Clear the interval
                    this.sessionExpired.next(); // Notify about session expiration
                    this.router.navigate(['/loginlayout/login']); // Redirect to login layout
                }
            }, 1000); // Run every second

            // Show a warning message a few seconds before expiration (e.g., 5 seconds before)
            const warningTime = remainingTime > 5000 ? remainingTime - 5000 : remainingTime;
            this.warningTimer = setTimeout(() => {
                
            }, warningTime);
        }
    }
}


 
  clearCountdownInterval() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  clearTimers() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }
    this.clearCountdownInterval(); // Clear countdown interval
  }


}
