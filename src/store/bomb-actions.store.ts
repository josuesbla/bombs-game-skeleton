import { Action } from '@ngrx/store';
import { BOMB_ACTION_TYPES } from 'src/enums/bomb-action-types.enum';
import { GAME_STATUS } from 'src/enums/game-status.enum';
import { SCORE_COUNTER } from 'src/enums/score-counter.enum';
import { BombModel } from 'src/interfaces/bomb.interface';

export namespace BombsActionsStore {
    export class ResetStore implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.RESET_STORE;
        constructor() {}
    }

    export class EmitNewBomb implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.EMIT_NEW_BOMB;
        constructor(public payload: BombModel) {}
    }

    export class RemoveBomb implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.REMOVE_BOMB;
        constructor(public payload: string) {}
    }

    export class SetDraggedBombId implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.SET_DRAGGED_BOMB_ID;
        constructor(public payload: string) {}
    }

    export class SetScore implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.SET_SCORE;
        constructor(public payload: SCORE_COUNTER) {}
    }

    export class SwapBinColors implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.SWAP_BIN_COLORS;
        constructor() {}
    }

    export class DecrementBombsTimer implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.DECREMENT_BOMBS_TIMER;
        constructor() {}
    }

    export class SetIntersectionBinId implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.SET_INTERSECTED_BIN_ID;
        constructor(public payload: string) {}
    }

    export class SetGameStatus implements Action {
        public readonly type: string = BOMB_ACTION_TYPES.SET_GAME_STATUS;
        constructor(public payload: GAME_STATUS) {}
    }

    export type BombsActions = Action & { payload?: any };
}
