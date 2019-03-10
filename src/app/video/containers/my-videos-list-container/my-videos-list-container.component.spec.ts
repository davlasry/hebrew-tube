import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideosListContainerComponent } from './my-videos-list-container.component';

describe('MyVideosListContainerComponent', () => {
  let component: MyVideosListContainerComponent;
  let fixture: ComponentFixture<MyVideosListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideosListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
