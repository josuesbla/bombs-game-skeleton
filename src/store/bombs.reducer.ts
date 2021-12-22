import { BOMBS_LIMIT } from 'src/constants/common.constants';
import { BOMB_ACTION_TYPES } from 'src/enums/bomb-action-types.enum';
import { GAME_STATUS } from 'src/enums/game-status.enum';
import { SCORE_COUNTER } from 'src/enums/score-counter.enum';
import { BombTimer } from 'src/interfaces/bomb-timer.interface';
import { BombModel } from 'src/interfaces/bomb.interface';
import { BombsStoreModel } from 'src/interfaces/bombs-store.interface';
import { swapBinColors } from 'src/utils/common.utils';
import { BombsActionsStore } from './bomb-actions.store';

export const initialBombsState: BombsStoreModel = {
    score: 0,
    totalBombs: 0,
    draggedBombId: '',
    bombs: [],
    binColors: [0, 1, 2],
    intersectedBinId: '',
    timers: [],
    gameStatus: GAME_STATUS.ON_GOING
};

export const bombsReducer = (state: BombsStoreModel = initialBombsState, action: BombsActionsStore.BombsActions) => {
    switch (action.type) {
        case BOMB_ACTION_TYPES.RESET_STORE: {
            return { ...initialBombsState };
        }
        case BOMB_ACTION_TYPES.EMIT_NEW_BOMB: {
            const newBomb = <BombModel>action.payload;
            const newTimer = { id: newBomb.id, timer: newBomb.timer };
            return {
                ...state,
                bombs: [ ...state.bombs, newBomb ],
                timers: [ ...state.timers, newTimer ],
                totalBombs: Math.min(state.totalBombs + 1, BOMBS_LIMIT)
            };
        }
        case BOMB_ACTION_TYPES.REMOVE_BOMB: {
            const bombs = state.bombs.filter((bomb: BombModel) => bomb.id !== action.payload);
            const timers = state.timers.filter((timer: BombTimer) => timer.id !== action.payload);
            return { ...state, bombs, timers };
        }
        case BOMB_ACTION_TYPES.SET_SCORE: {
            const score = action.payload === SCORE_COUNTER.DEC ? state.score - 1 : action.payload === SCORE_COUNTER.INC ? state.score + 1 : 0;
            return { ...state, score  };
        }
        case BOMB_ACTION_TYPES.SET_DRAGGED_BOMB_ID: {
            return { ...state, draggedBombId: action.payload };
        }
        case BOMB_ACTION_TYPES.SWAP_BIN_COLORS: {
            return { ...state, binColors: swapBinColors(state.binColors) };
        }
        case BOMB_ACTION_TYPES.DECREMENT_BOMBS_TIMER: {
            return { ...state, timers: state.timers.map((item: BombTimer) => ({ ...item, timer: item.timer - 1 })) };
        }
        case BOMB_ACTION_TYPES.SET_INTERSECTED_BIN_ID: {
            return { ...state, intersectedBinId: action.payload };
        }
        case BOMB_ACTION_TYPES.SET_GAME_STATUS: {
            return { ...state, gameStatus: action.payload };
        }
        default:
            return state;
    }
}
