import { TestBed } from '@angular/core/testing';

import { GameStartedAndNotSelectedGuard } from './game-started.guard';

describe('DashboardGuard', () => {
  let guard: GameStartedAndNotSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameStartedAndNotSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
