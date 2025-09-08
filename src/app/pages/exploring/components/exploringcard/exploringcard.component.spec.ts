import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploringCardComponent } from './exploringcard.component';
describe('ExploringcardComponent', () => {
  let component: ExploringCardComponent;
  let fixture: ComponentFixture<ExploringCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploringCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploringCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
