import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPlaylistsDialogComponent } from './word-playlists.component';

describe('AddNewWordComponent', () => {
  let component: WordPlaylistsDialogComponent;
  let fixture: ComponentFixture<WordPlaylistsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordPlaylistsDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordPlaylistsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
