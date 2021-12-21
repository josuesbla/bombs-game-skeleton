import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { BOMB_RADIUS, MAX_BOMB_TIMER_VALUE, MIN_BOMB_TIMER_VALUE } from 'src/constants/common.constants';
import { SCORE_COUNTER } from 'src/enums/score-counter.enum';
import { BombModel } from 'src/interfaces/bomb.interface';
import { IntersectService } from 'src/services/intersect.service';
import { TimerService } from 'src/services/timer.service';
import { BombsActionsStore } from 'src/store/bomb-actions.store';
import { bombsSelectors } from 'src/store/bombs.selectors';
import { convertNumbersToColors, generateRandomInteger, getAvailableBinColors, getId } from 'src/utils/common.utils';

@Component({
  selector: 'app-bombs-game',
  templateUrl: './bombs-game.component.html',
  styleUrls: ['./bombs-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BombsGameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bombContainer') bombContainer!: ElementRef;

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (this._draggedBombId) {
      this._intersectService.moveBomb(event, this._draggedBombId);
    }
  }

  @HostListener('mouseup') onMouseUp(event: MouseEvent): void {
    if (this._draggedBombId) {
      this._intersectService.onBombRelease();
      this._store.dispatch(new BombsActionsStore.SetDraggedBombId(''));
      this._store.dispatch(new BombsActionsStore.SetIntersectionBinId(''));
    }
  }

  public bombs$: Observable<Array<BombModel>> = this._store.select(bombsSelectors.bombs);
  public score$: Observable<number> = this._store.select(bombsSelectors.score);
  public binColors$: Observable<Array<string>> = this._store.select(bombsSelectors.binColors)
    .pipe(map((colors: Array<number>) => convertNumbersToColors(colors)));
  public binCountdown$: BehaviorSubject<number> = new BehaviorSubject(0);

  private _draggedBombId$: Observable<string> = this._store.select(bombsSelectors.draggedBombId);
  private _subscriptions: Array<Subscription> = [];
  private _draggedBombId!: string;

  constructor(
    private _timerService: TimerService,
    private _intersectService: IntersectService,
    private _store: Store,
    private _el: ElementRef
  ) { }

  ngOnInit(): void {
    this._subscriptions.push(this._timerService.binColorTimer$
      .pipe(
        tap(timer => this.binCountdown$.next(timer)),
        filter(timer => timer === 0),
        tap(() => this._store.dispatch(new BombsActionsStore.SwapBinColors()))
      )
      .subscribe());

    this._subscriptions.push(this._timerService.bombLifeTimer$
      .pipe(
        tap(() => this._store.dispatch(new BombsActionsStore.DecrementBombsTimer()))
      )
      .subscribe());

    this._subscriptions.push(this._timerService.spawnIntervalTimer$
      .pipe(
        filter(() => !!this.bombContainer),
        tap(() => this._store.dispatch(new BombsActionsStore.EmitNewBomb(this._generateNewBomb())))
      )
      .subscribe());

    this._subscriptions.push(this._draggedBombId$
      .pipe(
        tap((id: string) => this._draggedBombId = id)
      )
      .subscribe());
  }

  ngAfterViewInit(): void {
    this._intersectService.setContainerCoordinates(this.bombContainer);

    setTimeout(() => this._store.dispatch(new BombsActionsStore.EmitNewBomb(this._generateNewBomb())), 100);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  public removeBomb(id: string): void {
    this._store.dispatch(new BombsActionsStore.RemoveBomb(id));
    this._store.dispatch(new BombsActionsStore.SetScore(SCORE_COUNTER.DEC));
  }

  private _generateNewBomb = (): BombModel => {
    const containerCoordinates = this._intersectService.getContainerCoordinates();
    const diameter = 2 * BOMB_RADIUS;
    const maxLeft = containerCoordinates.width - diameter;
    const maxTop = Math.max(containerCoordinates.height - diameter - 300, 100);

    return {
      left: generateRandomInteger(0, maxLeft),
      top: generateRandomInteger(0, maxTop),
      color: getAvailableBinColors()[generateRandomInteger(0, 2)],
      timer: generateRandomInteger(MIN_BOMB_TIMER_VALUE, MAX_BOMB_TIMER_VALUE),
      radius: BOMB_RADIUS,
      id: getId()
    };
  }
}
