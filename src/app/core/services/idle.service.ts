import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idleTimeout = 30000; // 30 seconds
  private idleStatus$ = new BehaviorSubject<boolean>(false); // Tracks idle status

  constructor(private ngZone: NgZone) {
    this.startWatching();
  }

  get isIdle$() {
    return this.idleStatus$.asObservable();
  }

  startWatching() {
    this.ngZone.runOutsideAngular(() => {
      const userActions = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click')
      );

      userActions
        .pipe(
          debounceTime(1000), // Wait for 1 second of silence before resetting timer
          switchMap(() => {
            this.idleStatus$.next(false); // User is active
            return timer(this.idleTimeout);
          })
        )
        .subscribe(() => {
          this.ngZone.run(() => this.idleStatus$.next(true)); // User is idle
        });
    });
  }
}
