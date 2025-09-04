import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePublicDialogComponent } from './make-public-dialog.component';

describe('MakePublicDialogComponent', () => {
  let component: MakePublicDialogComponent;
  let fixture: ComponentFixture<MakePublicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakePublicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePublicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
