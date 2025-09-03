import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploringcardComponent } from './exploringcard.component';

describe('ExploringcardComponent', () => {
  let component: ExploringcardComponent;
  let fixture: ComponentFixture<ExploringcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploringcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploringcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
