import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from 'src/services/timer.service';

@Component({
  selector: 'app-bombs-game',
  templateUrl: './bombs-game.component.html',
  styleUrls: ['./bombs-game.component.scss']
})
export class BombsGameComponent implements OnInit, OnDestroy {

  constructor(
    private _timerService: TimerService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
