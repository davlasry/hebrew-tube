import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWordsContainerComponent } from './my-words-container.component';

describe('MyWordsContainerComponent', () => {
  let component: MyWordsContainerComponent;
  let fixture: ComponentFixture<MyWordsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWordsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWordsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
