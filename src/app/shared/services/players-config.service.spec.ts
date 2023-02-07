import { TestBed } from '@angular/core/testing';

import { PlayersConfigService } from './players-config.service';

describe('PlayersConfigService', () => {
  let service: PlayersConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
