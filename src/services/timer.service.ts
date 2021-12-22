import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval } from 'rxjs';
import { tap, filter, switchMap } from 'rxjs/operators';
import { BIN_RESET_COLORS_DELAY } from 'src/constants/common.constants';
import { bombsSelectors } from 'src/store/bombs.selectors';
import { getIntervalBasedOnEmittedBombs } from 'src/utils/common.utils';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    public bombLifeTimer$: BehaviorSubject<null> = new BehaviorSubject(null);
    public spawnIntervalTimer$: BehaviorSubject<null> = new BehaviorSubject(null);
    public binColorTimer$: BehaviorSubject<number> = new BehaviorSubject(0);

    private _binSwapCounter: number = BIN_RESET_COLORS_DELAY;

    constructor(
        private _store: Store
    ) {
        this._initTimers();
    }

    public resetTimers(): void {
        this._binSwapCounter = BIN_RESET_COLORS_DELAY;
    }

    private _initTimers(): void {
        interval(1000)
            .pipe(
                tap(() => this.bombLifeTimer$.next(null)),
                tap(() => this.binColorTimer$.next(this._binSwapCounter--)),
                filter(() => this._binSwapCounter === -1),
                tap(() => this._binSwapCounter = BIN_RESET_COLORS_DELAY)
            )
            .subscribe();

        this._store.select(bombsSelectors.totalBombs)
            .pipe(
                switchMap((total: number) => interval(getIntervalBasedOnEmittedBombs(total))),
                tap(() => this.spawnIntervalTimer$.next(null))
            )
            .subscribe();
    }
}
