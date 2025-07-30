import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { TestService } from 'src/app/core/services/test.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [ChildComponent] 
})
export class ParentComponent {
  // requiredRole: string | undefined;
  // constructor(private testdata : TestService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){}
  //     parentData : string = "Data from Parent by Property Binding using Input()";
  //     @ViewChild(ChildComponent) child : ChildComponent;
  //     receivedatafromchild: string;
  //     datafromchildbyservice:string;
  //     getdatatoparentfortemplatereferencefromts : string;
  //     getdatatoparentfortemplatereferencefromtsbyviewchild : string;
  //     getcombinedtemplatereferenceandeventemitter : string;
  //     @ViewChild('childtemplaterefrence') childtemplaterefrence: ChildComponent;

  //     ngOnInit(){
  //       this.testdata.currentData.subscribe(a => this.datafromchildbyservice = a)
  //       this.requiredRole = this.route.parent?.snapshot.data['rolerequired'];
  //       console.log('Required Role from Parent Route:', this.requiredRole);
  //   }
    
    
  //     ngAfterViewInit(){
  //       this.child.childdatabyViewChild = "Data from Parent by ViewChild using Input()";
  //       this.receivedatafromchild = this.child.senddatatoparentbyviewchild;
  //       this.getdatatoparentfortemplatereferencefromtsbyviewchild = this.child.senddatatoparentfortemplatereferencefromtsbyviewchild;
  //       this.getdatatoparentfortemplatereferencefromts = this.childtemplaterefrence.senddatatoparentfortemplatereferencefromtsbychildreference;
  //       this.getcombinedtemplatereferenceandeventemitter = this.childtemplaterefrence.sendcombinedtemplatereferenceandeventemitter;
  //       this.cdr.detectChanges();
  //   }
  //    //From Parent To child
  //     sendData(){
  //       this.testdata.changeData('data changed in parent component by Service with Observable Pattern');
  //     }
  //     parentDatabychild: string;

  //     handleDataChange(data: string) {
  //       this.parentDatabychild = data;
  //     }   

  
  //     handledatachangeforcombined(data : string){
  //       this.getcombinedtemplatereferenceandeventemitter = data;
  //     }
}
