/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'clic-page',
  template: `
    <div class="content-body">
      <app-header-page [title]="this.title" (reloadEmitter)="this.reloadEmitter.emit()"></app-header-page>
      <mat-card-content>
        <ng-content select="div"></ng-content>
      </mat-card-content>
      <ng-content select="mat-card-actions"></ng-content>
      <ng-content select="mat-horizontal-stepper"></ng-content>
    </div>
  `
})
export class ClicPageComponent {
  @Input() public title: string;
  @Output() public reloadEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
