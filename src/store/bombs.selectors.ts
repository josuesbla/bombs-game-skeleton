import { BOMBS_STORE_NAME } from 'src/constants/common.constants';
import { BombsStoreModel } from 'src/interfaces/bombs-store.interface';

export const bombsSelectors = {
    bombs: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).bombs,
    timers: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).timers,
    gameStatus: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).gameStatus,
    score: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).score,
    totalBombs: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).totalBombs,
    draggedBombId: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).draggedBombId,
    binColors: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).binColors,
    intersectedBinId: (state: any) => (<BombsStoreModel>state[BOMBS_STORE_NAME]).intersectedBinId
};
