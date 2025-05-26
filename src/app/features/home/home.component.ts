import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IdleService } from 'src/app/core/services/idle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgbModalModule] // Add NgbModalModule here
})
export class HomeComponent implements OnDestroy {
  @ViewChild('idleModal', { static: true }) idleModalTemplate: any;
  private idleSubscription: Subscription;
  private modalRef: NgbModalRef | null = null;

  constructor(private idleService: IdleService, private modalService: NgbModal) {}

  ngOnInit(): void {
    // Subscribe to the idle status
    this.idleSubscription = this.idleService.isIdle$.subscribe((isIdle) => {
      if (isIdle) {
        this.showIdleModal();
      } else {
        this.closeIdleModal();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
    this.closeIdleModal();
  }

  showIdleModal() {
    // Open the Bootstrap modal when the user is idle
    if (!this.modalRef) {
      this.modalRef = this.modalService.open(this.idleModalTemplate, { centered: true });
    }
  }

  closeIdleModal() {
    // Close the modal if it is open
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }

  stayActive() {
    this.closeIdleModal();
    // Optionally, you can reset the idle timer here.
  }
}
