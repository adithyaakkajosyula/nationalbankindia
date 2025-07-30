import { Component, ElementRef, Output } from '@angular/core';
import { ToggleService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/toggle.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule,RouterModule] // Import SharedModule which includes common modules
})
export class SidebarComponent {


  menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "Application",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        {
          link_name: "Appraisal Add",
          link: "/appraisal",
        },
        {
          link_name: "Application Add",
          link: "/admin",
        }
      ]
    }
   
  ]
status: boolean = false;

  constructor(private mysrvc:ToggleService,private elementRef :ElementRef){
    mysrvc.mystatusChanged.subscribe(status=>this.updatedStatus(status));
}

updatedStatus(status : boolean){
  this.status = status;
}
onClick(event:any) {
  let ele = event.target;
  var parents = event.target.closest(".menu-link");
  var parentsnext = event.target.closest("li ul.nav-content");

  if(parents.className == "nav-link menu-link" && parentsnext.className == "nav-content collapsed show"){
    parents.className = "nav-link menu-link collapsed"
    parentsnext.className = "nav-content collapse"
  }
  else
  {
    parents.className = "nav-content collapsed show"
  };
}

showSubmenu(itemEl: HTMLElement) {
  itemEl.nextElementSibling?.classList.toggle("show");
  itemEl.classList.toggle("collapsed"); 

}
// $('.menu-link').on('click', function () {
//   $(this).next('ul.nav-content').collapse('toggle') // By this element will --> collapse --> Collapsing --> Show will addd then the element will shown
//   $(this).toggleClass('collapsed'); // own collapsed class will remove

// });

}
