import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaylistComponent } from './all-playlist.component';

describe('AllPlaylistComponent', () => {
  let component: AllPlaylistComponent;
  let fixture: ComponentFixture<AllPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
