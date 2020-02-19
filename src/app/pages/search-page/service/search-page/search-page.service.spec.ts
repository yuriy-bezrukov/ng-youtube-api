import { TestBed } from '@angular/core/testing';

import { SearchPageService } from './search-page.service';

describe('SearchPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchPageService = TestBed.get(SearchPageService);
    expect(service).toBeTruthy();
  });
});
