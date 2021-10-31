import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisTableComponent } from './tennis-table.component';

describe('TennisTableComponent', () => {
  let component: TennisTableComponent;
  let fixture: ComponentFixture<TennisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
