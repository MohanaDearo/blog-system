import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosts } from './view-posts';

describe('ViewPosts', () => {
  let component: ViewPosts;
  let fixture: ComponentFixture<ViewPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
