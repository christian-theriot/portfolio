import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'src/app/utils/mock';

import { ViewAccountsPageComponent } from './view-accounts-page.component';

describe('ViewAccountPageComponent', () => {
  let component: ViewAccountsPageComponent;
  let fixture: ComponentFixture<ViewAccountsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ViewAccountsPageComponent,
        MockComponent({ selector: 'app-page' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
