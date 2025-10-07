import { DatePipe, CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { ApidataService } from "src/app/core/services/apidata.service";
import { ComplaintsModel } from "src/app/models/complaintsModel";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  standalone: true,
  imports: [DatePipe, CommonModule,InfiniteScrollModule]
})
export class ComplaintsComponent implements OnInit {
  complaints: ComplaintsModel[] = [];
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  allDataLoaded = false;

  constructor(private complaintsservice: ApidataService) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    if (this.isLoading || this.allDataLoaded) return;
    this.isLoading = true;

    this.complaintsservice.getComplaints(this.pageNumber, this.pageSize)  
      .subscribe((data: ComplaintsModel[]) => {
        if (data.length === 0) {
          this.allDataLoaded = true;
        } else {
          this.complaints = [...this.complaints, ...data];
          this.pageNumber++;
        }
        this.isLoading = false;
      });
  }

  // Trigger on scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.loadComplaints();
    }
  }
}
