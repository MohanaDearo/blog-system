import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovePosts } from './admin-approve-posts';

describe('AdminApprovePosts', () => {
  let component: AdminApprovePosts;
  let fixture: ComponentFixture<AdminApprovePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApprovePosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApprovePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
