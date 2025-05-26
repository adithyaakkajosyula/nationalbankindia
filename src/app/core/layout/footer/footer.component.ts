import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [] // Import SharedModule which includes common modules
})
export class FooterComponent {

}
