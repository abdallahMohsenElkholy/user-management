import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersControlsComponent } from './users-controls.component';

describe('UsersControlsComponent', () => {
  let component: UsersControlsComponent;
  let fixture: ComponentFixture<UsersControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
