import { TestBed } from '@angular/core/testing';

import { PlayersNotAssignedGuard } from './players-not-assigned.guard';

describe('PlayersNotAssignedGuard', () => {
  let guard: PlayersNotAssignedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayersNotAssignedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
