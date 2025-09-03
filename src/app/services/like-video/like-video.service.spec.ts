import { TestBed } from '@angular/core/testing';

import { LikeVideoService } from './like-video.service';

describe('LikeVideoService', () => {
  let service: LikeVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
