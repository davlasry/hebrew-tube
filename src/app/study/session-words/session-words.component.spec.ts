import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionWordsComponent } from './session-words.component';

describe('SessionWordsComponent', () => {
  let component: SessionWordsComponent;
  let fixture: ComponentFixture<SessionWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
