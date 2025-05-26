import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ToggleService } from "../services/toggle.service";
import { JwtAuthenticateService } from "../services/jwt-authenticate.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
   ]  // Import SharedModule which includes common modules
})
export class LayoutComponent {
  title = 'AdithyaFrontEnd';
  status: boolean = false;
  logintoken: boolean = false;
  constructor(private mysrvc:ToggleService,public authService:JwtAuthenticateService){
    mysrvc.mystatusChanged.subscribe(status=>this.updatedStatus(status));
}

updatedStatus(status : boolean){
  this.status = status;
}
}
