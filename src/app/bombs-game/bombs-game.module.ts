import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BombsGameComponent } from './bombs-game.component';
import { BombComponent } from './bomb/bomb.component';
import { BinComponent } from './bin/bin.component';

@NgModule({
  declarations: [
    BombsGameComponent,
    BombComponent,
    BinComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BombsGameComponent
  ]
})
export class BombsGameModule { }
