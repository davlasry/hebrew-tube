import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCollectionsDialogComponent } from './word-collections.component';

describe('AddNewWordComponent', () => {
  let component: WordCollectionsDialogComponent;
  let fixture: ComponentFixture<WordCollectionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordCollectionsDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCollectionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
