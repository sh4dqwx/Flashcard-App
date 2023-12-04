import { TestBed } from '@angular/core/testing';

import { DeckRepositoryService } from './deck-repository.service';

describe('DeckRepositoryService', () => {
  let service: DeckRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
