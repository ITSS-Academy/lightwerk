import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploringComponent } from './exploring.component';

describe('ExploringComponent', () => {
  let component: ExploringComponent;
  let fixture: ComponentFixture<ExploringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
