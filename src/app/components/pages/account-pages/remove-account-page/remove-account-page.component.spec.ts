import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'src/app/utils/mock';

import { RemoveAccountPageComponent } from './remove-account-page.component';

describe('RemoveAccountPageComponent', () => {
  let component: RemoveAccountPageComponent;
  let fixture: ComponentFixture<RemoveAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RemoveAccountPageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
