import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {RestaurantListComponent} from "./restaurant/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {ReservationFormComponent} from "./reservation/reservation-form.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {AvailableTimesComponent} from "./restaurant/available-times.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ReservationService} from "./shared/reservation.service";
import {Observable} from "rxjs";

class MockReservationService extends ReservationService {
  public getCurrentUser():Observable<any> {
    return Observable.of("George");
  }
  public getRestaurants():Observable<Array<any>> {
    return Observable.of([]);
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [routing, FormsModule,
        HttpModule],
      declarations: [
        AppComponent,
        AvailableTimesComponent,
        ReservationComponent,
        ReservationFormComponent,
        RestaurantComponent,
        RestaurantListComponent
      ],
      providers: [

        { provide: APP_BASE_HREF, useValue: "/"},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: ReservationService, useClass: MockReservationService }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Easy Reservations');
  }));
});
