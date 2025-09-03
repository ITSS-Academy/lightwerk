import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedVideoCardComponent } from './liked-video-card.component';

describe('LikedVideoCardComponent', () => {
  let component: LikedVideoCardComponent;
  let fixture: ComponentFixture<LikedVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedVideoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
