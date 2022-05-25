import { TestBed } from '@angular/core/testing';

import { PlayersSelectedGuard } from './players-selected.guard';

describe('PlayersSelectedGuard', () => {
  let guard: PlayersSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayersSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
