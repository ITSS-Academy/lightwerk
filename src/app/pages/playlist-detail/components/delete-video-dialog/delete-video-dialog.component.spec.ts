import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVideoDialogComponent } from './delete-video-dialog.component';

describe('DeleteVideoDialogComponent', () => {
  let component: DeleteVideoDialogComponent;
  let fixture: ComponentFixture<DeleteVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVideoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
