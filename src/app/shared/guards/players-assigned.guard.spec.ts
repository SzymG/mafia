import { TestBed } from '@angular/core/testing';

import { PlayersAssignedGuard } from './players-assigned.guard';

describe('PlayersAssignedGuard', () => {
  let guard: PlayersAssignedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayersAssignedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
