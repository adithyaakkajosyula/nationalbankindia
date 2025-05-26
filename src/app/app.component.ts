import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UtilityService } from './core/services/utilityservice';
import { SafeJsonPipe } from './core/pipes/safejson.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class AppComponent {

}
