import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsContainerComponent } from './collections-container.component';

describe('CollectionsContainerComponent', () => {
  let component: CollectionsContainerComponent;
  let fixture: ComponentFixture<CollectionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
