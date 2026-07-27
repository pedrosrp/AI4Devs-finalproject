import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div [class]="'bg-card-bg rounded-lg shadow-md border border-border-light overflow-hidden ' + customClass">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() customClass = '';
}
