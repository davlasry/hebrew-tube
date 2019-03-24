import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnContainerComponent } from './learn-container.component';

describe('LearnContainerComponent', () => {
  let component: LearnContainerComponent;
  let fixture: ComponentFixture<LearnContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
