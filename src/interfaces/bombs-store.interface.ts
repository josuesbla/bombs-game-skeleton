import { BombTimer } from './bomb-timer.interface';
import { BombModel } from './bomb.interface';

export interface BombsStoreModel {
    score: number;
    totalBombs: number;
    draggedBombId: string;
    bombs: Array<BombModel>;
    binColors: Array<number>;
    intersectedBinId: string;
    timers: Array<BombTimer>;
}
