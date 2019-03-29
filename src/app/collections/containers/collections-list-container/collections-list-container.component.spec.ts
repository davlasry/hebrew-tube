import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsListContainerComponent } from './collections-list-container.component';

describe('CollectionsListContainerComponent', () => {
  let component: CollectionsListContainerComponent;
  let fixture: ComponentFixture<CollectionsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
