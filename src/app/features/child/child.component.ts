import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';
import { SharedModule } from 'src/app/core/shared/shared.module';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [] 
})
export class ChildComponent {
  // constructor(private testservice : TestService){}
  //   @Input() childdata : string;

  //   @Input() childdatabyViewChild : string;

  //   datafromparentbyservice : string;
  //   ngOnInit(){
  //       this.testservice.currentData.subscribe(a => this.datafromparentbyservice = a)
  //   }

  //   @Output() dataChange: EventEmitter<string> = new EventEmitter();
  //   @Output() combinedDataChange = new EventEmitter<string>();
  //   changeData() {
  //     this.dataChange.emit('Data from child by event emitter');
  //   }
    
  //   senddatatoparentbyviewchild = "data from child by view child";
  //   //From CHild To Parent
  //   sendData(){
  //     this.testservice.changeData('data changed in child component by Service with Observable Pattern');
  //   }
  //   //From CHild To Parent
  //   senddatatoparentfortemplateref = "data by template reference variable directly in template";
  //   senddatatoparentfortemplatereferencefromtsbychildreference = "data by template reference variable bychildreference";
  //   senddatatoparentfortemplatereferencefromtsbyviewchild = "data by template reference variable byviewchild";
  //   sendcombinedtemplatereferenceandeventemitter = "data by combinedtemplatereferenceandeventemitter";
    

  //   changeDataforcombined() {
  //     this.sendcombinedtemplatereferenceandeventemitter = 'data modified by combinedtemplatereferenceandeventemitter';
  //     this.combinedDataChange.emit(this.sendcombinedtemplatereferenceandeventemitter);
  //   }
}
