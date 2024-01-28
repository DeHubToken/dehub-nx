import { NgFor, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { trackByItemFn } from '@dehub/angular/util';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'dhb-wallet-button',
  standalone: true,
  imports: [
    // Angular
    NgFor,
    NgStyle,
    // PrimeNG
    ButtonModule,
  ],
  template: `
    <p-button styleClass="flex justify-content-between text-500">
      <!-- Label -->
      <div>{{ label }}</div>

      <!-- Icons -->
      <div class="flex flex-row align-items-center">
        <img
          *ngFor="let imageSource of imageSources; trackBy: trackByFn"
          [alt]="label"
          [src]="imageSource"
          [ngStyle]="{
            width: '32px',
            height: '20px'
          }"
        />
      </div>
    </p-button>
  `,
})
export class WalletButtonComponent implements OnInit {
  @Input() label?: string;
  @Input() imageSources?: string[];

  trackByFn = trackByItemFn<string>();

  constructor() {}

  ngOnInit() {}
}
