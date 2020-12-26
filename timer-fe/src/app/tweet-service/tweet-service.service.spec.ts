import { TestBed } from '@angular/core/testing';

import { TweetIdService } from './tweet-service.service';

describe('TweetServiceService', () => {
  let service: TweetIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
