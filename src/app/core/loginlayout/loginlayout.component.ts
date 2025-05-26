import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-loginlayout',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
  templateUrl: './loginlayout.component.html',
  styleUrls: ['./loginlayout.component.css']
})
export class LoginlayoutComponent {
  ngOnInit() {
    localStorage.removeItem('logintoken')
  }   
}
