import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'src/app/utils/mock';

import { RemoveProfilePageComponent } from './remove-profile-page.component';

describe('RemoveProfilePageComponent', () => {
  let component: RemoveProfilePageComponent;
  let fixture: ComponentFixture<RemoveProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RemoveProfilePageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
