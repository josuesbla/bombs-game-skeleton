import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { BombTimer } from 'src/interfaces/bomb-timer.interface';
import { BombModel } from 'src/interfaces/bomb.interface';
import { BombsMove } from 'src/interfaces/bombs-move.interface';
import { IntersectService } from 'src/services/intersect.service';
import { bombsSelectors } from 'src/store/bombs.selectors';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bomb') bomb!: ElementRef;

  @HostListener('mousedown') onMouseDown() {
    this._intersectService.setStartBombDrag(this.data.id);
  }

  @Input() data!: BombModel;
  @Output() removeBomb = new EventEmitter<string>();

  public timer$: Observable<number> = this._store.select(bombsSelectors.timers)
    .pipe(
      map((timers: Array<BombTimer>) => timers.find(item => item.id === this.data.id)),
      filter(Boolean),
      map((item: BombTimer) => item.timer)
    );

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _store: Store,
    private _intersectService: IntersectService
  ) { }

  ngOnInit(): void {
    this._subscriptions.push(this._intersectService.bombsTracer$
      .pipe(
        filter((bomb: BombsMove) => !!this.bomb && this.data.id === bomb.id),
        tap((bomb: BombsMove) => this._setElementCoordinates(bomb))
      )
      .subscribe());

    this._subscriptions.push(this.timer$
      .pipe(
        filter((timer: number) => timer === 0),
        tap(() => this.removeBomb.emit(this.data.id))
      )
      .subscribe());
  }

  ngOnDestroy(): void {
      this._subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.bomb.nativeElement.style.backgroundColor = this.data.color;
    this.bomb.nativeElement.style.left = this.data.left + 'px';
    this.bomb.nativeElement.style.top = this.data.top + 'px';
  }

  private _setElementCoordinates(bomb: BombsMove): void {
    this.bomb.nativeElement.style.left = bomb.left + 'px';
    this.bomb.nativeElement.style.top = bomb.top + 'px';
  }
}
