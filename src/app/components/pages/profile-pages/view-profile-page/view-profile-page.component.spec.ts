import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'src/app/utils/mock';

import { ViewProfilePageComponent } from './view-profile-page.component';

describe('ViewProfilePageComponent', () => {
  let component: ViewProfilePageComponent;
  let fixture: ComponentFixture<ViewProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ViewProfilePageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
