import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { BIN_RESET_COLORS_DELAY } from 'src/constants/common.constants';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    public bombLifeTimer$: BehaviorSubject<null> = new BehaviorSubject(null);
    public spawnIntervalTimer$: BehaviorSubject<null> = new BehaviorSubject(null);
    public binColorTimer$: BehaviorSubject<number> = new BehaviorSubject(0);

    private _spawnCounter: number = BIN_RESET_COLORS_DELAY;

    constructor(
        private _store: Store
    ) {
        this._initTimers();
    }

    private _initTimers(): void {
        interval(1000)
            .pipe(
                tap(() => this.bombLifeTimer$.next(null)),
                tap(() => this.binColorTimer$.next(this._spawnCounter--)),
                filter(() => this._spawnCounter === -1),
                tap(() => this._spawnCounter = BIN_RESET_COLORS_DELAY)
            )
            .subscribe();

        interval(5000)
            .pipe(
                tap(() => this.spawnIntervalTimer$.next(null))
            )
            .subscribe();
    }
}
