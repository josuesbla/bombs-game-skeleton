import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BombsGameModule } from './bombs-game/bombs-game.module';
import { TimerService } from 'src/services/timer.service';
import { IntersectService } from 'src/services/intersect.service';
import { BOMBS_STORE_NAME } from 'src/constants/common.constants';
import { bombsReducer } from 'src/store/bombs.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [BOMBS_STORE_NAME]: bombsReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: false }),
    EffectsModule.forRoot([]),
    BombsGameModule
  ],
  providers: [
    TimerService,
    IntersectService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
