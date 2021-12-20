import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BombsGameComponent } from './bombs-game.component';
import { BombComponent } from './bomb/bomb.component';
import { ScoreCounterComponent } from './score-counter/score-counter.component';
import { BinComponent } from './bin/bin.component';
import { BinCounterComponent } from './bin-counter/bin-counter.component';

@NgModule({
  declarations: [
    BombsGameComponent,
    BombComponent,
    ScoreCounterComponent,
    BinComponent,
    BinCounterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BombsGameComponent
  ]
})
export class BombsGameModule { }
