import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWordDialogComponent } from './view-word.component';

describe('AddNewWordComponent', () => {
  let component: ViewWordDialogComponent;
  let fixture: ComponentFixture<ViewWordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWordDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
