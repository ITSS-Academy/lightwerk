import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingUserCardComponent } from './following-user-card.component';

describe('FollowingUserCardComponent', () => {
  let component: FollowingUserCardComponent;
  let fixture: ComponentFixture<FollowingUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
