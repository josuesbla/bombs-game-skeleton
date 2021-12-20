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
import { EventsService } from 'src/services/events.service';
import { IntersectService } from 'src/services/intersect.service';
import { SpawnService } from 'src/services/spawn.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: false }),
    EffectsModule.forRoot([]),
    BombsGameModule
  ],
  providers: [
    TimerService,
    EventsService,
    IntersectService,
    SpawnService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
