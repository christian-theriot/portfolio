import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'src/app/utils/mock';

import { CreateProfilePageComponent } from './create-profile-page.component';

describe('CreateProfilePageComponent', () => {
  let component: CreateProfilePageComponent;
  let fixture: ComponentFixture<CreateProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateProfilePageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
