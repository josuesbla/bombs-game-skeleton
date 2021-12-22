import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BombDraggerDirective } from './bomb-dragger.directive';
import { IntersectService } from 'src/services/intersect.service';



@NgModule({
  declarations: [
    BombDraggerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BombDraggerDirective
  ]
})
export class BombGameDirectivesModule { }
