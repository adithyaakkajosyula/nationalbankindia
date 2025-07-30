import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../../../../../NationalBankFrontEnd/src/app/core/layout/sidebar/sidebar.component';
import { ToggleService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/toggle.service';
import { SharedModule } from '../../shared/shared.module';
import { JwtAuthenticateService } from '../../services/jwt-authenticate.service';
import { Userdata } from '../../configurations/constants';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionExpirationService } from '../../services/session-expiration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule] // Import SharedModule which includes common modules
})
export class HeaderComponent implements OnInit{
  tokenExpirationTime: number = 0;
  isWarning: boolean = false; // Flag to determine if warning is active
  private tokenExpirationSub: Subscription;
  constructor(private toggleService : ToggleService,private jwtService : JwtAuthenticateService,private sessionExpirationService: SessionExpirationService) { }

  userdetails: Userdata | null = null;
  ngOnInit(): void {
    this.jwtService.getRole().subscribe(
      (userData) => {
        this.userdetails = userData; // Update the role details whenever they change
        console.log(' header Role Data:', this.userdetails);
      },
      (error) => {
        console.error('Error fetching role:', error);
      }
    );


        // Subscribe to the token expiration observable
        this.tokenExpirationSub = this.sessionExpirationService.tokenExpirationTime$.subscribe(
          (remainingTime) => {
            this.tokenExpirationTime = Math.max(0, Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
            this.isWarning = this.tokenExpirationTime <= 5 && this.tokenExpirationTime > 0;
          }
        );
      
        // Start the session timer when the component initializes
        this.sessionExpirationService.startSessionTimer();
}


  status: boolean = false; 
  sidebartoogle(){
    this.status = !this.status;
    this.toggleService.data=this.status;      
  }
//   $(document).ready(() => {

//     $('#sidebarbutton').on('click', () => {
//         $('.sidebar').toggleClass('open');
//         $('.main').toggleClass('open');
//         $('footer').toggleClass('open');
//     });

//     $('.menu-link').on('click', function () {
//         $(this).next('ul.nav-content').collapse('toggle') // By this element will --> collapse --> Collapsing --> Show will addd then the element will shown
//         $(this).toggleClass('collapsed'); // own collapsed class will remove

//     });

// })

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.tokenExpirationSub) {
      this.tokenExpirationSub.unsubscribe();
    }
  }

}
