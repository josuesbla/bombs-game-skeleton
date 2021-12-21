import { ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { BOMB_RADIUS } from 'src/constants/common.constants';
import { BombCoordinates } from 'src/interfaces/bomb-coordinates.interface';
import { BombsMove } from 'src/interfaces/bombs-move.interface';
import { ContainerCoordinates } from 'src/interfaces/container-coordinates.interface';
import { BombsActionsStore } from 'src/store/bomb-actions.store';

@Injectable({
    providedIn: 'root'
})
export class IntersectService {

    public bombsTracer$: BehaviorSubject<BombsMove> = new BehaviorSubject({} as BombsMove);

    private _containerCoordinates = <ContainerCoordinates>{};
    private _startBombCoordinates = {};

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

    public onBombRelease(): void {

    }
}
