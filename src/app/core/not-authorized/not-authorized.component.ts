import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent {
  message: string = 'You are not authorized to view this page. Please contact your administrator if you believe this is an error.';
}
