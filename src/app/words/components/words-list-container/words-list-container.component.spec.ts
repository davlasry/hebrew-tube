import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsListContainerComponent } from './words-list-container.component';

describe('WordsComponent', () => {
  let component: WordsListContainerComponent;
  let fixture: ComponentFixture<WordsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordsListContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
