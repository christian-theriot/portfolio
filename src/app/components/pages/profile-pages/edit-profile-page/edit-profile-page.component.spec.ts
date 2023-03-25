import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'src/app/utils/mock';

import { EditProfilePageComponent } from './edit-profile-page.component';

describe('EditProfilePageComponent', () => {
  let component: EditProfilePageComponent;
  let fixture: ComponentFixture<EditProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditProfilePageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
