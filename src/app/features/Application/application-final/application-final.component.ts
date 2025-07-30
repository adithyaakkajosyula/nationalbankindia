import { Component, Input } from '@angular/core';
import swal from 'sweetalert2';
import { DataProviderDirective } from '../../../../../../NationalBankFrontEnd/src/app/core/directives/data-provider.directive';
import { TabService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/tab.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-final',
  templateUrl: './application-final.component.html',
  styleUrls: ['./application-final.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule] 
})
export class ApplicationFinalComponent {
  @Input() tab : any;
  @Input() number:number;
  @Input() tabelement : any;
  constructor(public dataProvider: DataProviderDirective, public tabService: TabService,) { }
  applicationsave(){
    swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    });
  }
  previoustab(){
    this.tabelement.selectedIndex = this.number-1;
    this.tabService.indexchangefromcomponet(this.number - 1);
  }
}
