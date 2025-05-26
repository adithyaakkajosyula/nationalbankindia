import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingexampleComponent } from './routingexample.component';

describe('RoutingexampleComponent', () => {
  let component: RoutingexampleComponent;
  let fixture: ComponentFixture<RoutingexampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutingexampleComponent]
    });
    fixture = TestBed.createComponent(RoutingexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
