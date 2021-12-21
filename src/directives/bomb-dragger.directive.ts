import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { IntersectService } from 'src/services/intersect.service';

@Directive({
  selector: '[appBombDragger]'
})
export class BombDraggerDirective {
  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this._isDragged) {
      // const { left, top } = this._intersectService.getBombCoordinates(event);
      // this._el.nativeElement.style.left = left + 'px';
      // this._el.nativeElement.style.top = top + 'px';
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    this._isDragged = false;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    // this._intersectService.setStartBombCoordinates(event);
    this._isDragged = true;
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    this._isDragged = false;
  }

  @Input('appBombDragger') public id: string = '';

  private _isDragged: boolean = false;

  constructor(
    private _intersectService: IntersectService,
    private _el: ElementRef
  ) { }
}
