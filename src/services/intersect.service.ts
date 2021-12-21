import { ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { tap, take, map, filter } from 'rxjs/operators';
import { BOMB_RADIUS } from 'src/constants/common.constants';
import { SCORE_COUNTER } from 'src/enums/score-counter.enum';
import { BombCoordinates } from 'src/interfaces/bomb-coordinates.interface';
import { BombModel } from 'src/interfaces/bomb.interface';
import { BombsMove } from 'src/interfaces/bombs-move.interface';
import { ContainerCoordinates } from 'src/interfaces/container-coordinates.interface';
import { BombsActionsStore } from 'src/store/bomb-actions.store';
import { bombsSelectors } from 'src/store/bombs.selectors';

@Injectable({
    providedIn: 'root'
})
export class IntersectService {

    public bombsTracer$: BehaviorSubject<BombsMove> = new BehaviorSubject({} as BombsMove);

    private _containerCoordinates = <ContainerCoordinates>{};
    private _draggedBombId: string = '';
    private _hoveredBin: string = '';

    constructor(
        private _store: Store
    ) { }

    public getBombCoordinates(event: MouseEvent): BombCoordinates {
        const left = event.clientX - BOMB_RADIUS - this._containerCoordinates.screenOffsetLeft;
        const top = event.clientY - BOMB_RADIUS - this._containerCoordinates.screenOffsetTop;
        const diameter = 2 * BOMB_RADIUS;
        return {
            left: Math.max(0, left > this._containerCoordinates.width - diameter ? this._containerCoordinates.width - diameter : left),
            top: Math.max(0, top > this._containerCoordinates.height - diameter ?  this._containerCoordinates.height - diameter : top)
        };
    }

    public setContainerCoordinates(el: ElementRef): void {
        const { offsetTop, offsetLeft, clientWidth, clientHeight } = el.nativeElement;
        this._containerCoordinates = {
            width: clientWidth,
            height: clientHeight,
            screenOffsetTop: offsetTop,
            screenOffsetLeft: offsetLeft
        };
    }

    public getContainerCoordinates(): ContainerCoordinates {
        return this._containerCoordinates;
    }

    public moveBomb(event: MouseEvent, id: string): void {
        const { left, top } = this.getBombCoordinates(event);
        this.bombsTracer$.next({ id, left, top });
    }

    public setStartBombDrag(id: string): void {
        this._store.dispatch(new BombsActionsStore.SetDraggedBombId(id));
    }

    public setHoveredBin(color: string): void {
        this._hoveredBin = color;
        this._store.select(bombsSelectors.draggedBombId)
            .pipe(
                take(1),
                tap((id: string) => this._draggedBombId = id),
                tap((id: string) => this._store.dispatch(new BombsActionsStore.SetIntersectionBinId(id ? color : '')))
            )
            .subscribe()
    }

    public onBombRelease(): void {
        if (this._hoveredBin && this._draggedBombId) {
            this._store.select(bombsSelectors.bombs)
                .pipe(
                    take(1),
                    map((bombs: Array<BombModel>) => bombs.find(bomb => bomb.id === this._draggedBombId)),
                    filter(Boolean),
                    tap((bomb: BombModel) => {
                        const score: SCORE_COUNTER = bomb.color === this._hoveredBin ? SCORE_COUNTER.INC : SCORE_COUNTER.DEC;
                        this._store.dispatch(new BombsActionsStore.SetScore(score));
                        this._store.dispatch(new BombsActionsStore.RemoveBomb(this._draggedBombId));
                    })
                )
                .subscribe();
        }
    }
}
