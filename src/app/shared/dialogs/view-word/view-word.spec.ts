import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWordComponent } from './add-new-word.component';

describe('AddNewWordComponent', () => {
  let component: AddNewWordComponent;
  let fixture: ComponentFixture<AddNewWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
