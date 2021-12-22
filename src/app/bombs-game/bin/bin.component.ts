import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IntersectService } from 'src/services/intersect.service';
import { bombsSelectors } from 'src/store/bombs.selectors';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit, AfterViewInit {

  @ViewChild('bin') bin!: ElementRef;

  @HostListener('mouseenter') onMouseEnter(): void {
    this._intersectService.setHoveredBin(this.color);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this._intersectService.setHoveredBin('');
  }

  @Input() color!: string;

  public isIntersected$: Observable<boolean> = this._store.select(bombsSelectors.intersectedBinId)
    .pipe(map((color: string) => color === this.color));

  constructor(
    private _store: Store,
    private _intersectService: IntersectService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.bin.nativeElement.style.backgroundColor = this.color;
  }
}
